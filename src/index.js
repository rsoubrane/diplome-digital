import React from "react";
import ReactDOM from "react-dom";

//Utils
import { BrowserRouter } from "react-router-dom";

//Components
import App from "./App";

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
);
