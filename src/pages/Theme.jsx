import React from "react";

//Utils
import { Row, Col, Button } from "reactstrap";

//Components
import Header from "../components/Game/Header";

//Assets
import "../assets/styles/pages/theme.scss";

export default function Theme(props) {
	const { currentTheme } = props;
	const themesNames = ["Réseaux sociaux", "Jeux-vidéo"];
	const index = themesNames.indexOf(currentTheme);
	if (index !== -1) themesNames.splice(index, 1);

	const selectedTheme = selection => {
		props.returnTheme(selection);
	};

	return (
		<div className='home-background'>
			<Header type='theme' currentLvl={props.currentLvl} score={props.totalScore} />
			<div className='container-theme'>
				<div className='theme-rules'>
					<div className='rules-text'>
						<>
							<p className='text-center'>Alors, pas trop difficile ?</p>
							<p className='text-justify'>
								Bon allez, fini de rigoler. Il est temps de passer aux choses sérieuses !
							</p>
							<p className='text-justify'>
								Attention, les règles changent. Cette fois, il n’y a pas 2, pas 3, mais 4 choix (GAUCHE,
								DROITE, HAUT et BAS). À toi de balayer la carte centrale vers la bonne image !
							</p>
							<p className='text-center text-uppercase'>Bonne chance !</p>
						</>
					</div>
				</div>

				<Row className='justify-content-center align-items-start theme-choice'>
					<h2>Choisissez votre thème !</h2>
					{themesNames
						? themesNames.map((e, key) => (
								<Col key={key} xs='12' md='8'>
									<div className='container-button'>
										<Button
											onClick={() => {
												selectedTheme(e);
											}}>
											{e}
										</Button>
									</div>
								</Col>
						  ))
						: null}
				</Row>
			</div>
		</div>
	);
}
