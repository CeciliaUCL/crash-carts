const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	// Add other item-specific fields here
});

const compartmentSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	items: [
		{
			item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
			quantity: Number,
		},
	],
	// Add other compartment-specific fields here
});

const Item = mongoose.model("Item", itemSchema);
const Compartment = mongoose.model("Compartment", compartmentSchema);

module.exports = { Item, Compartment };
