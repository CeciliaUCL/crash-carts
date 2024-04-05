// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Landing from "./pages/Landing";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompartmentItems from "./components/CompartmentItems"; // Adjust the path as necessary
import CompartmentItemsTable from "./components/CompartmentItemsTable";

// function App() {
// 	return (
// 		<Routes>
// 			<Route path="/" element={<Layout />}>
// 				<Route index element={<Landing />} />
// 			</Route>
// 		</Routes>
// 	);
// }
function App() {
	return (
		// <Routes>
		// 	<Route path="/compartment/:name">
		// 		{/* Assuming you want to dynamically fetch the compartment name from the URL */}
		// 		{({ match }) => (
		// 			<CompartmentItems compartmentName={match.params.name} />
		// 		)}
		// 	</Route>
		// 	{/* Other routes */}
		// </Routes>
		<div className="App">
			<CompartmentItemsTable />
		</div>
	);
}

export default App;
