import React, { useState } from "react";

//Utils
import { useSprings, animated, to as interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -2, scale: 1, rot: -10 + Math.random() * 20, delay: i * 30 }); //50 de base
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(3000px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

export function CardBasic(props) {
	const cards = props.questions;

	// The set flags all the cards that are flicked out
	const [gone] = useState(() => new Set());

	// Create a bunch of springs using the helpers above
	const [myProps, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) }));

	// Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
	const bind = useDrag(({ args: [index], down, movement: [mx], distance, direction: [xDir], velocity }) => {
		// If you flick hard enough it should trigger the card to fly out
		const trigger = velocity > 0.05;

		// Direction should either point left or right
		const dirX = mx < 0 ? -1 : 1;

		// If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
		if (!down && trigger) gone.add(index);
		set(i => {
			// We're only interested in changing spring-data for the current spring
			if (index !== i) return;
			const isGone = gone.has(index);

			let side = "";
			if (mx < 0) side = 0;
			else if (mx > 0) side = 1;
			else side = "";

			// When a card is gone it flies out left or right, otherwise goes back to zero
			const x = isGone ? (400 + window.innerWidth) * dirX : down ? mx : 0;

			if (isGone) props.checkResponse(side);

			// How much the card tilts, flicking it harder makes it rotate faster
			const rotX = mx / 100 + (isGone ? dirX * 10 * velocity : 0);

			// Active cards lift up a bit
			const scale = down ? 1.2 : 1;
			return {
				x,
				rotX,
				scale,
				delay: undefined,
				config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
			};
		});
		if (!down && gone.size === cards.length) props.endRound();
	});

	// Now we're just mapping the animated values to our view, that's it
	return myProps.map(({ x, y, rot, scale }, i) => (
		<animated.div key={i} style={{ x, y }}>
			{/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
			<animated.div
				{...bind(i)}
				style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]})` }}
			/>
		</animated.div>
	));
}

export function Card(props) {
	const cards = props.questions;

	// The set flags all the cards that are flicked out
	const [gone] = useState(() => new Set());

	// Create a bunch of springs using the helpers above
	const [myProps, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) }));

	// Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
	const bind = useDrag(({ args: [index], down, movement: [mx, my], distance, direction: [xDir, yDir], velocity }) => {
		// If you flick hard enough it should trigger the card to fly out
		const trigger = velocity > 0.05;

		// Direction should either point left, right, up or down
		const dirX = mx < 0 ? -1 : 1;
		const dirY = my < 0 ? -1 : 1;

		// If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
		if (!down && trigger) gone.add(index);
		set(i => {
			// We're only interested in changing spring-data for the current spring
			if (index !== i) return;
			const isGone = gone.has(index);

			let side = "";
			if (dirX === -1 && dirY === -1) {
				if (Math.abs(mx) < Math.abs(my)) side = 1;
				else side = 0;
			} else if (dirX === -1 && dirY === 1) {
				if (Math.abs(mx) < Math.abs(my)) side = 3;
				else side = 0;
			} else if (dirX === 1 && dirY === -1) {
				if (Math.abs(mx) < Math.abs(my)) side = 1;
				else side = 2;
			} else if (dirX === 1 && dirY === 1) {
				if (Math.abs(mx) < Math.abs(my)) side = 3;
				else side = 2;
			} else side = "";

			// When a card is gone it flies out left or right, otherwise goes back to zero
			let x, y;
			if (side === 0 || side === 2) {
				x = isGone ? (400 + window.innerWidth) * dirX : down ? mx : 0;
				y = isGone ? (window.innerHeight / 2) * dirY : down ? my : 0;
			} else if (side === 1 || side === 3) {
				x = isGone ? (window.innerWidth / 2) * dirX : down ? mx : 0;
				y = isGone ? (400 + window.innerHeight) * dirY : down ? my : 0;
			}

			if (isGone) props.checkResponse(side);

			// How much the card tilts, flicking it harder makes it rotate faster
			const rotX = mx / 100 + (isGone ? dirX * 10 * velocity : 0);

			// Active cards lift up a bit
			const scale = down ? 1.2 : 1;
			return {
				x,
				y,
				rotX,
				scale,
				delay: undefined,
				config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
			};
		});
		// if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || set(i => to(i)), 600);
		if (!down && gone.size === cards.length) props.endRound();
	});

	// Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once
	return myProps.map(({ x, y, rot, scale }, i) => (
		<animated.div key={i} style={{ x, y }}>
			{/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
			<animated.div
				{...bind(i)}
				style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]})` }}
			/>
		</animated.div>
	));
}
