import React from "react";

import { Route, Switch } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import Diplome from "./pages/Diplome";
import Leaderboard from "./pages/Leaderboard";

//Assets
import "./assets/styles/breakpoints.scss";
import "./assets/styles/main.scss";
import "./assets/styles/pages/home.scss";
import "./assets/styles/pages/rules.scss";
import "./assets/styles/pages/game.scss";
import "./assets/styles/pages/score.scss";
import "./assets/styles/pages/scoreboard.scss";

export default function App() {
	return (
		<Switch>
			<Route exact path='/' component={Home} />
			<Route path='/diplome' component={Diplome} />
			<Route path='/leaderboard' component={Leaderboard} />
		</Switch>
	);
}
