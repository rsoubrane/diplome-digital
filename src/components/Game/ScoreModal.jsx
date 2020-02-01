import React, { useState, useEffect } from "react";

//Utils
import { Modal, ModalBody, Button } from "reactstrap";

//Assets
import "../../assets/styles/modal.scss";

export default function ScoreModal(props) {
	const { score, amountQuestions } = props;
	const [modal] = useState(true);
	const [message, setMessage] = useState();

	useEffect(() => {
		const badMessages = [
			"Sérieusement? Même mon chien aurait fait mieux...",
			"Tu répondais au pif ou quoi ?",
			"La prochaine fois évites de fermer les yeux",
			"Peux mieux faire... Ou pas ? ",
			"Mouais... Pas mal...",
			"Allez ! on y est presque ! "
		];
		const goodMessages = [
			"Pas mal ! ",
			"Tu es vraiment fort ! ",
			"Bien joué on a affaire a un sérieux concurrent ! ",
			"Score presque parfait! Steve Jobs n'a qu'à bien se tenir! ",
			"Un pur génie !!!"
		];
		const perfectMessage = ["WOW ! Score parfait ! Tu es le dieu du Digital"];

		const ratio = (score / amountQuestions) * 100;
		if (ratio < 35) setMessage(badMessages[Math.floor(Math.random() * badMessages.length)]);
		else if (35 < ratio < 90) setMessage(goodMessages[Math.floor(Math.random() * goodMessages.length)]);
		else setMessage(perfectMessage[0]);
	}, [score, amountQuestions]);

	const toggle = () => {
		props.closeModal();
	};

	return (
		<div className='modal-container'>
			<Modal isOpen={modal} size='xl'>
				<ModalBody>
					<div className='container-body'>
						<div className='container-message'>
							<h5>{message}</h5>
						</div>
						<div className='container-score'>
							<h1>Score</h1>
							<h1>
								{score} / {amountQuestions}
							</h1>
						</div>
						<div className='container-button'>
							<Button onClick={toggle}>Continuer</Button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
}
