import React, { useState } from "react";

//Utils
import { Col } from "reactstrap";
import { motion } from "framer-motion";

//Components
import { Card, CardBasic } from "./Card";
import Countdown from "../Timers/Countdown";

export default function Lvl(props) {
	const { currentScreen, showCountdown, startRound, lvl, answers, correctAnswers, returnScore } = props;

	const [answer, setAnswer] = useState();
	const [isCorrect, setIsCorrect] = useState();
	const [score, setScore] = useState(0);

	const checkResponse = res => {
		setAnswer(res);
		let correct = correctAnswers.pop();

		if (res === correct) {
			setScore(score + 1);
			returnScore(score + 1);
			setIsCorrect(true);
		} else {
			setIsCorrect(false);
		}

		setTimeout(() => {
			setAnswer();
		}, 200);
	};

	return lvl === 1 ? (
		<>
			<Col
				className={`split-pane left-side ${
					answer === 0 && isCorrect === true
						? "correct"
						: answer === 0 && isCorrect === false
						? "error"
						: null
				}`}>
				<motion.div
					animate={{
						opacity: [0.5, 1],
						scale: [0.5, 1]
					}}
					transition={{
						duration: 3,
						ease: "linear"
					}}>
					<img src={answers[0]} alt='Apple' />
				</motion.div>
			</Col>
			<Col
				className={`split-pane right-side ${
					answer === 1 && isCorrect === true
						? "correct"
						: answer === 1 && isCorrect === false
						? "error"
						: null
				}`}>
				<motion.div
					animate={{
						opacity: [0, 1],
						scale: [0.7, 1]
					}}
					transition={{
						duration: 2,
						ease: "linear"
					}}>
					<img src={answers[1]} alt='Facebook' />
				</motion.div>
			</Col>
			{currentScreen === 1 ? (
				<div className='card'>
					{showCountdown === true ? (
						<Countdown lvl={1} startRound={startRound} />
					) : (
						<CardBasic checkResponse={checkResponse} {...props} />
					)}
				</div>
			) : null}
		</>
	) : (
		<>
			<div className='wrapper'>
				<div
					className={`left-side ${
						answer === 0 && isCorrect === true
							? "correct"
							: answer === 0 && isCorrect === false
							? "error"
							: null
					}`}>
					<img src='https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png' alt='0' />
				</div>
				<div
					className={`up-side ${
						answer === 1 && isCorrect === true
							? "correct"
							: answer === 1 && isCorrect === false
							? "error"
							: null
					}`}>
					<img src='https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png' alt='up' />
				</div>
				<div
					className={`right-side ${
						answer === 2 && isCorrect === true
							? "correct"
							: answer === 2 && isCorrect === false
							? "error"
							: null
					}`}>
					<img src='https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png' alt='right' />
				</div>
				<div
					className={`down-side ${
						answer === 3 && isCorrect === true
							? "correct"
							: answer === 3 && isCorrect === false
							? "error"
							: null
					}`}>
					<img src='https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png' alt='down' />
				</div>

				<motion.div
					animate={{
						opacity: [0, 1],
						scale: [0.7, 1]
					}}
					transition={{
						duration: 2,
						ease: "linear"
					}}>
					<img className='answer left' src={answers[0]} alt='Answer 1' />
				</motion.div>
				<motion.div
					animate={{
						opacity: [0, 1],
						scale: [0.7, 1]
					}}
					transition={{
						duration: 2,
						ease: "linear"
					}}>
					<img className='answer up' src={answers[1]} alt='Answer 2' />
				</motion.div>
				<motion.div
					animate={{
						opacity: [0, 1],
						scale: [0.7, 1]
					}}
					transition={{
						duration: 2,
						ease: "linear"
					}}>
					<img className='answer right' src={answers[2]} alt='Answer 3' />
				</motion.div>
				<motion.div
					animate={{
						opacity: [0, 1],
						scale: [0.7, 1]
					}}
					transition={{
						duration: 2,
						ease: "linear"
					}}>
					<img className='answer down' src={answers[3]} alt='Answer 4' />
				</motion.div>
			</div>
			<div className='card'>
				{currentScreen === 4 && showCountdown === true ? (
					<Countdown lvl={2} startRound={startRound} />
				) : currentScreen === 4 && showCountdown === false ? (
					<Card checkResponse={checkResponse} {...props} />
				) : null}
			</div>
		</>
	);
}
