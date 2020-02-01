import React, { useState, useEffect } from "react";

//Utils
import { Table } from "reactstrap";
import axios from "axios";

//Components
import Header from "../components/Game/Header";
import Loading from "../components/Game/Loading";

export default function Scoreboard(props) {
	const { user } = props;

	const [data, setData] = useState();
	const [position, setPosition] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				const res = await axios.get(
					`https://europe-west1-diplome-digital.cloudfunctions.net/api/game?game=swiper`
				);
				if (res.data) {
					let scoreUser = res.data.filter(e => e.user === user);
					scoreUser.splice(1, scoreUser.length);
					let index = res.data.indexOf(scoreUser[0]);
					setPosition(index + 1);
					setData(res.data);
					setLoading(false);
				}
			} catch (error) {
				throw error;
			}
		};
		loadData();
	}, [user]);

	return (
		<div className='home-background'>
			{!loading ? (
				<>
					<div className='content'>
						<Header type='scoreboard' returnScore={props.returnScore} />

						{!position ? null : position === 1 ? (
							<h1 className='text-center'>Vous êtes {position}er</h1>
						) : (
							<h1 className='text-center'>Vous êtes {position}ème</h1>
						)}
					</div>
					<div className='container-scoreboard'>
						<div className='scoreboard'>
							<Table borderless hover responsive dark size='sm'>
								<thead>
									<tr>
										<th>#</th>
										<th>Pseudo</th>
										<th>Score</th>
										<th>Note</th>
									</tr>
								</thead>
								<tbody>
									{data
										? data.map((e, key) => (
												<tr key={key}>
													<th scope='row'>{key + 1}</th>
													<td>{e.user}</td>
													<td>{e.score}</td>
													<td>{e.note} / 20</td>
												</tr>
										  ))
										: null}
								</tbody>
							</Table>
						</div>
					</div>
				</>
			) : (
				<Loading />
			)}
		</div>
	);
}
