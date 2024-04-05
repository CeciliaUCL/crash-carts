require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const WebSocket = require("ws");
const corsOptions = require("./backend/config/corsOptions");
const PORT = process.env.PORT || 3500;
const { ConnectionPool } = require("mssql");

// Define SQL server connection settings
const sqlConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	server: process.env.DB_SERVER,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
	options: {
		encrypt: true, // For Azure SQL
		trustServerCertificate: false, // Change to true if using self-signed certificates
	},
};

// Azure
// Custom modules to receive telemetry and send messages/methods through the IoT Hub.
const EventHubReader = require("./backend/scripts/event-hub-reader.js");
const DeviceController = require("./backend/scripts/device-controller.js");

// CORS
const cors = require("cors");
app.use(cors(corsOptions));

app.use("/", express.static(path.join(__dirname, "backend", "/public")));

const { Compartment } = require("./models"); // Adjust the path as necessary

// Route to get items in a specific compartment
app.get("/api/compartment/:name", async (req, res) => {
	try {
		const compartmentName = req.params.name;
		const compartment = await Compartment.findOne({
			name: compartmentName,
		}).populate("items.item");
		if (!compartment) {
			return res.status(404).send("Compartment not found");
		}
		res.json(compartment.items);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server error");
	}
});

// CONNECTING SERVER TO BUILD PATH
// const root = path.join(__dirname, "frontend", "build");
// app.use(express.static(root));

// app.get("/", function (req, res) {
// 	res.send({ sensorData: "100 grams" });
// });

// Websocket
// const websocketSetup = require("./backend/websocket");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on("connection", function connection(ws) {
	ws.on("message", function message(data) {
		console.log("Message received through WebSocket" + data);
		//Parse device from websocket data received (JSON field 'Device')
		const receivedMessage = JSON.parse(data);
		//Send cloud-to-device message:
		console.log("Sending message to " + receivedMessage.Device);
		DeviceController.sendMessageToDevice(
			receivedMessage.Device,
			"Message body",
			"send"
		);
	});
});

//1. Adding our telemetry reader... with a silly listener (it simply prints telemetry received to the console)
async function telemetryCallback(message, date, deviceId) {
	//a. Print to the console (just to check we are receiving telemetry)
	console.log(
		date + " --> Message from" + deviceId + ":\n" + JSON.stringify(message)
	);

	try {
		// const { body, enqueuedTime } = message;
		const { item, quantity, action, roi } = message;
		await updateInventory(item, quantity, action, roi);
		console.log("Inventory updated successfully.");
	} catch (error) {
		console.log(`Error updating inventory: ${error.message}`);
	}
}

// Function to update inventory in the database
async function updateInventory(item, quantity, action, roi) {
	let pool = await new ConnectionPool(sqlConfig).connect();
	try {
		let result = await pool
			.request()
			.input("ItemName", item)
			.input("Quantity", quantity)
			.input("Action", action)
			.input("CompartmentName", roi)
			// Assuming you have a stored procedure named 'UpdateInventory' in your SQL database
			.execute("UpdateInventory");

		console.log(result);
	} finally {
		pool.close();
	}
}

const eventHubReader = new EventHubReader(
	process.env.IotHubConnectionString,
	process.env.EventHubConsumerGroup
);
eventHubReader.startReadMessage(telemetryCallback);

//2. Adding our device controller...
DeviceController.startDeviceController();

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
