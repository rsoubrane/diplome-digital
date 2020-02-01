import React, { useState, useEffect } from "react";

//Utils
import { Table } from "reactstrap";
import axios from "axios";

//Components
import Header from "../components/Game/Header";
import Loading from "../components/Game/Loading";

//Assets
import "../assets/styles/pages/leaderboard.scss";

export default function PageScore() {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				const res = await axios.get(
					`https://europe-west1-diplome-digital.cloudfunctions.net/api/game?game=swiper`
				);
				if (res.data) setData(res.data);
				setLoading(false);
			} catch (error) {
				throw error;
			}
		};
		loadData();

		setInterval(function() {
			window.location.reload();
		}, 30000);
	}, []);

	return (
		<div className='home-background'>
			{!loading ? (
				<>
					<Header type='leaderboard' />

					<div className='content-leaderboard'>
						<div className='container-leaderboard'>
							<div className='leaderboard'>
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
					</div>
				</>
			) : (
				<Loading />
			)}
		</div>
	);
}
