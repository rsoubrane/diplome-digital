import React, { useState } from "react";

//Utils
import axios from "axios";
import Loading from "../components/Game/Loading";

export default function Diplome() {
	const [userId, setUserId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState();
	const [moyenne, setMoyenne] = useState();
	const [diplome, setDiplome] = useState();

	const getDiplome = e => {
		e.preventDefault();
		setLoading(true);
		const loadData = async () => {
			try {
				const res = await axios.get(
					`https://europe-west1-diplome-digital.cloudfunctions.net/api/user?user=${userId}`
				);
				if (res.data) sortData(res.data);
				setLoading(false);
			} catch (error) {
				throw error;
			}
		};
		loadData();
	};

	const sortData = data => {
		let sortedData = data.sort((a, b) => (a.note < b.note ? 1 : -1));
		let totalNotes = data.reduce(function(prev, cur) {
			return prev + cur.note;
		}, 0);

		let moyenne = Math.ceil(((totalNotes / (data.length * 20)) * 20) / 0.25) * 0.25;

		if (moyenne > 0 && moyenne < 5) setDiplome("Diplome 1");
		else if (moyenne > 5 && moyenne < 10) setDiplome("Diplome 2");
		else if (moyenne > 10 && moyenne < 15) setDiplome("Diplome 3");
		else if (moyenne > 15 && moyenne < 20) setDiplome("Diplome 4");

		setMoyenne(moyenne);
		setData(sortedData);
	};

	return !loading ? (
		<>
			<h1 className='text-center'>Entrez l'identifiant de l'étudiant</h1>
			<form onSubmit={getDiplome}>
				<label>ID</label>
				<input
					type='text'
					autoComplete='off'
					value={userId}
					onChange={e => setUserId(e.target.value)}
					required
					autoFocus
					placeholder="Entrez l'identifiant :"
				/>

				<button type='submit'>Valider</button>
			</form>

			{moyenne ? <h1>Votre moyenne : {moyenne}</h1> : null}
			{diplome ? <h1>Votre diplome : {diplome}</h1> : null}

			{data
				? data.map(game => (
						<div key={game.createdAt} className='my-5 border-black'>
							<h4>Game : {game.game}</h4>
							<h5>Score : {game.score}</h5>
							<h5>Note : {game.note}</h5>
						</div>
				  ))
				: null}
		</>
	) : (
		<Loading />
	);
}
