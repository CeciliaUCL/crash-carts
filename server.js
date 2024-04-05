require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const WebSocket = require("ws");
const corsOptions = require("./backend/config/corsOptions");
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const { Item, Compartment } = require("./backend/model/model");

// CORS
const cors = require("cors");
app.use(cors(corsOptions));

app.use("/", express.static(path.join(__dirname, "backend", "/public")));

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

app.get("/api/compartments", async (req, res) => {
	try {
		const compartments = await Compartment.find().populate("items.item");
		res.json(compartments);
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

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected..."))
	.catch((err) => console.log(err));

// Azure
// Custom modules to receive telemetry and send messages/methods through the IoT Hub.
const EventHubReader = require("./backend/scripts/event-hub-reader.js");
const DeviceController = require("./backend/scripts/device-controller.js");
const eventHubReader = new EventHubReader(
	process.env.IotHubConnectionString,
	process.env.EventHubConsumerGroup
);
eventHubReader.startReadMessage(telemetryCallback);

//2. Adding our device controller...
DeviceController.startDeviceController();

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
	console.log(
		date + " --> Message from " + deviceId + ":\n" + JSON.stringify(message)
	);

	try {
		const { items, action, roi } = message; // Destructure to extract items, action, and roi directly

		// Ensure that items is an array and iterate over it
		if (Array.isArray(items)) {
			for (const { name: itemName, quantity } of items) {
				await updateInventory(itemName, quantity, action, roi);
			}
			console.log("Inventory updated successfully for all items.");
		}
	} catch (error) {
		console.log(`Error processing telemetry: ${error.message}`);
	}
}

async function updateInventory(itemName, quantity, action, roi) {
	try {
		// Attempt to find the compartment by its name (roi)
		let compartment = await Compartment.findOne({ name: roi });

		// If the compartment doesn't exist, create it
		if (!compartment) {
			console.log(`Compartment ${roi} not found. Creating new compartment.`);
			compartment = new Compartment({ name: roi, items: [] });
			// Note: The compartment is saved later after possibly adding items to it
		}

		// Attempt to find the item by its name
		let item = await Item.findOne({ name: itemName });
		if (!item) {
			console.log(`Item ${itemName} not found. Creating new item.`);
			item = new Item({ name: itemName });
			await item.save();
		}

		// Check if the item already exists in the compartment's items array
		let itemEntryIndex = compartment.items.findIndex((entry) =>
			entry.item.equals(item._id)
		);

		if (itemEntryIndex > -1) {
			// Item exists, update quantity based on the action
			if (action === "placed") {
				compartment.items[itemEntryIndex].quantity += quantity;
			} else if (action === "removed") {
				compartment.items[itemEntryIndex].quantity = Math.max(
					0,
					compartment.items[itemEntryIndex].quantity - quantity
				);
			}
		} else {
			// Item does not exist in the compartment, add it
			compartment.items.push({ item: item._id, quantity: quantity });
		}

		// Save the updated compartment (or new compartment)
		await compartment.save();
		console.log(
			`Inventory updated successfully for ${itemName} in compartment ${roi}.`
		);
	} catch (error) {
		console.error(`Error updating inventory: ${error.message}`);
	}
}

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
