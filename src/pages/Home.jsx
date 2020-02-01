import React, { useState } from "react";

//Game Components
import Rules from "./Rules";
import Game from "./Game";
import Score from "./Score";
import Theme from "./Theme";
import Scoreboard from "./Scoreboard";

export default function Home() {
	const themeNames = ["Culture générale", "Réseaux sociaux", "Jeux-vidéo"];
	const themeSlugs = ["general", "scandals", "video_games"];
	const [user, setUser] = useState();
	const [totalScore, setTotalScore] = useState(0);
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [selectedTheme, setSelectedTheme] = useState(0);
	const [isScorePosted, setIsScorePosted] = useState(false);

	const [currentScreen, setCurrentScreen] = useState(0);

	const startGame = newUSer => {
		setUser(newUSer);
		if (user) setCurrentScreen(1);
	};

	const restartGame = () => {
		setUser("");
		setSelectedTheme(0);
		setTotalScore(0);
		setTotalQuestions(0);
		setIsScorePosted(false);
		changeScreen(0, 0, 0);
	};

	const changeScreen = (screen, score, amountQ) => {
		if (score && amountQ) {
			setTotalScore(totalScore + score);
			setTotalQuestions(totalQuestions + amountQ);
		}
		setCurrentScreen(screen);
	};

	const returnTheme = theme => {
		const index = themeNames.indexOf(theme);
		setSelectedTheme(index);
		setCurrentScreen(currentScreen + 1);
	};

	const returnScore = () => {
		setIsScorePosted(true);
		setCurrentScreen(5);
	};

	return (
		<div className='container-home'>
			{currentScreen === 0 ? (
				//Rules
				<Rules startGame={startGame} />
			) : currentScreen === 1 ? (
				//Game Lvl 1
				<Game
					theme={themeSlugs[selectedTheme]}
					time={62}
					lvlName={`Lvl 1 : ${themeNames[selectedTheme]}`}
					currentScreen={currentScreen}
					changeScreen={changeScreen}
				/>
			) : currentScreen === 3 ? (
				//Theme choice for lvl 2
				<Theme
					currentLvl={2}
					currentTheme={themeNames[selectedTheme]}
					returnTheme={returnTheme}
					totalScore={totalScore}
				/>
			) : currentScreen === 4 ? (
				//Game Lvl 2
				<Game
					theme={themeSlugs[selectedTheme]}
					time={62}
					lvlName={`Lvl 2 : ${themeNames[selectedTheme]}`}
					currentScreen={currentScreen}
					changeScreen={changeScreen}
				/>
			) : currentScreen === 5 ? (
				//Score Total
				<Score
					user={user}
					currentScreen={currentScreen}
					restartGame={restartGame}
					totalScore={totalScore}
					totalQuestions={totalQuestions}
					changeScreen={changeScreen}
					isScorePosted={isScorePosted}
				/>
			) : currentScreen === 6 ? (
				//Scoreboard
				<Scoreboard user={user} returnScore={returnScore} />
			) : null}
		</div>
	);
}
