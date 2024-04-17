import React, { useState, useEffect } from "react";

function CompartmentItemsTable() {
	const [compartments, setCompartments] = useState([]);

	useEffect(() => {
		const fetchCompartments = async () => {
			try {
				const response = await fetch("http://localhost:3500/api/compartments/");
				console.log(response);
				const data = await response.json();
				setCompartments(data);
			} catch (error) {
				console.error("Error fetching compartments:", error);
			}
		};

		fetchCompartments();
	}, []);

	return (
		<div>
			<h2>Inventory Overview</h2>
			<table>
				<thead>
					<tr>
						<th>Compartment</th>
						<th>Items</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					{compartments.map((compartment, compIndex) => (
						<React.Fragment key={compIndex}>
							{compartment.items.map((item, itemIndex) => (
								<tr key={itemIndex}>
									{itemIndex === 0 && (
										<td rowSpan={compartment.items.length}>
											{compartment.name}
										</td>
									)}
									<td>{item.item.name}</td>
									<td>{item.quantity}</td>
								</tr>
							))}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default CompartmentItemsTable;
