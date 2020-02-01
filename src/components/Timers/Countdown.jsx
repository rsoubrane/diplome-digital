import React, { Component } from "react";

import "../../assets/styles/timer.scss";
import { motion } from "framer-motion";

export default class Countdown extends Component {
	state = {
		seconds: 5
	};

	componentDidMount() {
		this.myInterval = setInterval(() => {
			const { seconds } = this.state;

			if (seconds > 0) {
				this.setState(({ seconds }) => ({
					seconds: seconds - 1
				}));
			}
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.myInterval);
	}

	render() {
		const { seconds } = this.state;
		const { lvl, startRound } = this.props;

		return (
			<div>
				{seconds === 0 ? (
					startRound()
				) : lvl === 1 ? (
					<motion.div
						className='text-black-50 font-weight-bold flex-column'
						animate={{
							x: [0, -200, 0, 200, 0],
							scale: [1, 1.2, 1, 1.2, 1]
						}}
						transition={{
							duration: 5,
							ease: "easeInOut",
							loop: Infinity
						}}>
						<h1 className='text-black-50 text-center font-weight-bold'>
							{seconds < 10 ? `0${seconds}` : seconds}
						</h1>
						<br />
						<p className='text-black-50 text-center font-weight-bold'>Swipe LEFT or RIGHT</p>
					</motion.div>
				) : (
					<motion.div
						className='text-black-50 font-weight-bold flex-column'
						animate={{
							y: [150, -50, 150, 350, 150],
							scale: [1, 1.2, 1, 1.2, 1]
						}}
						transition={{
							duration: 5,
							ease: "easeInOut",
							loop: Infinity
						}}>
						<h1>{seconds < 10 ? `0${seconds}` : seconds}</h1>
						<br />
						<p>Swipe LEFT, RIGHT, UP or DOWN</p>
					</motion.div>
				)}
			</div>
		);
	}
}
