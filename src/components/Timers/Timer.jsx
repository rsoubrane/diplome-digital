import React from "react";

import ReactCountdownClock from "react-countdown-clock";

import "../../assets/styles/timer.scss";

export default function Timer(props) {
	const { time, endRound } = props;

	return (
		<ReactCountdownClock
			seconds={time}
			color='#fff'
			alpha={0.8}
			size={100}
			weight={10}
			fontSize='35px'
			onComplete={endRound}
		/>
	);
}
