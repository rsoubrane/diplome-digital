import React from "react";

//Utils
import { Row, Col } from "reactstrap";

//Components
import Timer from "../Timers/Timer";

//Assets
import Prev from "../../assets/images/home/next.png";

export default function Header(props) {
	const { type, showTime } = props;

	return (
		<Row className='header justify-content-center align-items-center text-center'>
			{type === "game" ? (
				<>
					<Col>
						<h3>{props.lvlName}</h3>
					</Col>
					<Col className={`container-timer ${showTime === true ? "d-block" : "d-none"}`}>
						{showTime === true ? <Timer {...props} /> : null}
					</Col>
					<Col>
						<h3>
							Score : {props.score} / {props.amountQuestions}
						</h3>
					</Col>
				</>
			) : type === "score" ? (
				<>
					<Col></Col>
					<Col>
						<h3>Résultat</h3>
					</Col>
					<Col></Col>
				</>
			) : type === "theme" ? (
				<>
					<Col></Col>
					<Col>
						<h3>Level {props.currentLvl}</h3>
					</Col>
					<Col>
						<h3>Total : {props.score}</h3>
					</Col>
				</>
			) : type === "scoreboard" ? (
				<>
					<Col className='justify-content-center'>
						<img
							src={Prev}
							alt='Previous'
							className='button-prev'
							onClick={() => props.returnScore("block")}
						/>
					</Col>
					<Col>
						<h3>Classement</h3>
					</Col>
					<Col></Col>
				</>
			) : type === "leaderboard" ? (
				<>
					<Col></Col>
					<Col>
						<h3>Classement</h3>
					</Col>
					<Col></Col>
				</>
			) : null}
		</Row>
	);
}
