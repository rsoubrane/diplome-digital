import React, { useState } from "react";

//Utils
import { Row, Col } from "reactstrap";

//Assets
import Logo from "../assets/images/home/logo.png";
import Start from "../assets/images/home/start.png";
import Next from "../assets/images/home/next.png";

export default function Rules(props) {
	const { startGame } = props;

	const [sceneDetails, setSceneDetails] = useState(false);
	const [userId, setUserId] = useState("");

	const openDetails = () => {
		setSceneDetails(!sceneDetails);
	};

	const onFormSubmit = e => {
		e.preventDefault();
		startGame(userId);
	};

	return (
		<div className='home-background'>
			<img src={Logo} alt='Logo' className={`logo ${sceneDetails === true ? "details" : null}`} />

			<div className={`container-details mt-3 ${sceneDetails === true ? "details" : null}`}>
				<div className='details-rules'>
					<div className='rules-text'>
						<p className='text-center'>Bienvenue, es-tu prêt à SWIPER?! </p>
						<p className='text-justify'>
							Les règles sont simples: balayer la carte au centre de l’écran vers la droite ou vers la
							gauche en fonction des options offertes!{" "}
						</p>
						<p className='text-justify'>
							Attention, tu as 60 secondes pour répondre à un maximum de questions et remporter un maximum
							de points!
						</p>
						<p className='text-center text-uppercase'>Bonne chance !</p>
					</div>
				</div>

				<form onSubmit={onFormSubmit}>
					<Row className='justify-content-center align-items-center details-id my-5'>
						<Col xs='12' md='8'>
							<div className='container-input'>
								<input
									type='text'
									value={userId}
									required
									onChange={e => setUserId(e.target.value)}
									autoComplete='off'
									placeholder='Entrez votre pseudo :'
								/>
							</div>
						</Col>
					</Row>

					<Row className='justify-content-center'>
						<input className='button-next' src={Next} type='image' alt='next' />
					</Row>
				</form>
			</div>

			<img
				src={Start}
				alt='Start'
				className={`start ${sceneDetails === true ? "details" : null}`}
				onClick={() => openDetails()}
			/>
		</div>
	);
}
