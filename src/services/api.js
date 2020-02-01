import { db } from "./firebase";

export const getData = async theme => {
	let data = "";
	await db
		.collection("swiper")
		.doc(`${theme}`)
		.get()
		.then(doc => {
			if (!doc.exists) {
				console.log("No such document!");
			} else {
				data = doc.data();
				console.log("Document data:", doc.data());
			}
		})
		.catch(err => {
			console.log("Error getting document", err);
		});
	return data;
};

//Add new score
export const addScore = async (req, res) => {
	const newScore = {
		user: req.body.user,
		game: req.body.game,
		score: req.body.score,
		note: req.body.note,
		createdAt: new Date().toISOString()
	};

	await db
		.collection(`users`)
		.doc(`${req.body.user}`)
		.collection("scores")
		.doc(`${req.body.game}`)
		.set(newScore)
		.then(doc => {
			return res.end("Cannot " + req.method + " " + req.url);
		})
		.catch(err => {
			return console.log("Error getting documents", err);
		});

	await db
		.collection(`scores`)
		.doc()
		.set(newScore)
		.then(doc => {
			return res.end("Cannot " + req.method + " " + req.url);
		})
		.catch(err => {
			return console.log("Error getting documents", err);
		});
};
