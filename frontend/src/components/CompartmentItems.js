import React, { useState, useEffect } from "react";

function CompartmentItems({ compartmentName }) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		// Function to fetch items
		const fetchItems = async () => {
			try {
				const response = await fetch(`/api/compartment/${compartmentName}`);
				if (!response.ok) {
					throw new Error("Could not fetch items for compartment");
				}
				const data = await response.json();
				setItems(data);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchItems();
	}, [compartmentName]); // This effect depends on the compartmentName prop

	return (
		<div>
			<h2>Items in {compartmentName}</h2>
			<ul>
				{items.map((itemEntry, index) => (
					<li key={index}>
						Item: {itemEntry.item.name}, Quantity: {itemEntry.quantity}
					</li>
				))}
			</ul>
		</div>
	);
}

export default CompartmentItems;
