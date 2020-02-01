import React, { useState, useEffect } from "react";

//Utils
import { Row, Col, Button } from "reactstrap";
import axios from "axios";

//Components
import Header from "../components/Game/Header";
import Loading from "../components/Game/Loading";

export default function Score(props) {
	const { totalScore, totalQuestions, user, isScorePosted } = props;

	const note = Math.ceil(((totalScore / totalQuestions) * 20) / 0.25) * 0.25;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const data = {
			user,
			game: "swiper",
			score: totalScore,
			note
		};

		const sendScore = async () => {
			setLoading(true);
			try {
				const res = await axios.post(`https://europe-west1-diplome-digital.cloudfunctions.net/api/score`, data);
				if (res) setLoading(false);
			} catch (error) {
				throw error;
			}
		};
		if (isScorePosted === false) sendScore();
		else setLoading(false);
	}, [isScorePosted, note, user, totalScore]);

	const selectedOption = option => {
		if (option === 0) props.restartGame();
		else props.changeScreen(6);
	};

	return (
		<div className='home-background'>
			<Header type='score' />

			{!loading ? (
				<div className='content-score'>
					<div className='container-score'>
						<div className='score'>
							<h3 className='text-center'>
								Score total : {totalScore} / {totalQuestions}
							</h3>
							<h3 className='text-center'>Note : {note} / 20</h3>
						</div>
					</div>

					<Row className='justify-content-center align-items-center option-choice'>
						<Col xs='12' md='8'>
							<div className='container-button'>
								<Button
									onClick={() => {
										selectedOption(0);
									}}>
									Nouvelle Partie
								</Button>
							</div>
						</Col>
						<Col xs='12' md='8'>
							<div className='container-button'>
								<Button
									onClick={() => {
										selectedOption(1);
									}}>
									Classement
								</Button>
							</div>
						</Col>
					</Row>

					<Row className='justify-content-center'></Row>
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
}
