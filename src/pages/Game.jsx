import React, { useState, useEffect } from "react";

//Utils
import { Row } from "reactstrap";
import axios from "axios";

//Game Components
import Header from "../components/Game/Header";
import Lvl from "../components/Game/Lvl";
import Loading from "../components/Game/Loading";

//Services
import ScoreModal from "../components/Game/ScoreModal";

//Assets
import Loader from "../assets/images/loading.gif";

export default function Game(props) {
	const { theme } = props;

	const [currentScreen, setCurrentScreen] = useState(props.currentScreen);
	const [questions, setQuestions] = useState();
	const [answers, setAnswers] = useState();
	const [correctAnswers, setCorrectAnswers] = useState();
	const [amountQuestions, setAmountQuestions] = useState(0);
	const [score, setScore] = useState(0);
	const [showCountdown, setShowCountdown] = useState(true);
	const [showTime, setShowTime] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const loadData = async () => {
			try {
				const res = await axios.get(
					`https://europe-west1-diplome-digital.cloudfunctions.net/api/swiper?theme=${theme}`
				);
				if (res.data) setData(res.data);
				setLoading(false);
			} catch (error) {
				throw error;
			}
		};
		loadData();
	}, [theme]);

	const setData = data => {
		let ques = [];
		let cans = [];
		let ans = [];

		data.questions.sort(function() {
			return Math.round(Math.random()) - 0.5;
		});
		data.questions.map(el => {
			ques.push(el.image);
			cans.push(el.correct);
			return ques && cans;
		});
		data.answers.map(el => ans.push(el));
		setQuestions(ques);
		setAnswers(ans);
		setCorrectAnswers(cans);
		setAmountQuestions(ques.length);
	};

	const returnScore = score => {
		setScore(score);
	};

	const changeScreen = () => {
		setCurrentScreen(currentScreen + 1);
		if (currentScreen === 2) props.changeScreen(3, score, amountQuestions);
		if (currentScreen === 4) props.changeScreen(5, score, amountQuestions);
		setShowCountdown(true);
	};

	const startRound = () => {
		setShowTime(true);
		setShowCountdown(false);
	};

	const endRound = () => {
		setShowTime(false);
		changeScreen();
	};

	const handleModal = () => {
		setIsModalOpen(!isModalOpen);
		changeScreen();
	};

	return (
		<div className='container-game'>
			<div className='game-background'>
				{!loading ? (
					<>
						<Header
							type='game'
							lvlName={props.lvlName}
							score={score}
							amountQuestions={amountQuestions}
							time={props.time}
							showTime={showTime}
							endRound={endRound}
						/>
						<Row className='content'>
							{currentScreen === 1 || currentScreen === 2 ? (
								questions && answers ? (
									<>
										<Lvl
											lvl={1}
											currentScreen={currentScreen}
											questions={questions}
											answers={answers}
											correctAnswers={correctAnswers}
											returnScore={returnScore}
											startRound={startRound}
											endRound={endRound}
											showCountdown={showCountdown}
										/>

										{currentScreen === 2 ? (
											//Score Lvl 1
											<ScoreModal
												closeModal={handleModal}
												score={score}
												amountQuestions={amountQuestions}
											/>
										) : null}
									</>
								) : null
							) : currentScreen === 4 || currentScreen === 5 ? (
								loading ? (
									<div className='loader-container'>
										<img src={Loader} className='loader' alt='Loading' height='180' />
									</div>
								) : (
									<>
										<Lvl
											lvl={2}
											currentScreen={currentScreen}
											questions={questions}
											answers={answers}
											correctAnswers={correctAnswers}
											returnScore={returnScore}
											startRound={startRound}
											endRound={endRound}
											showCountdown={showCountdown}
										/>

										{currentScreen === 5 ? (
											//Score Lvl 2
											<ScoreModal
												closeModal={handleModal}
												score={score}
												amountQuestions={amountQuestions}
											/>
										) : null}
									</>
								)
							) : null}
						</Row>
					</>
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
}
