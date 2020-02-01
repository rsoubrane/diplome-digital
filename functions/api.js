const { db } = require("./admin");

//Fetch all the posts
exports.getSwiper =
	("*",
	async (req, res) => {
		const docRef = db.collection("swiper").doc(`${req.query.theme}`);
		await docRef
			.get()
			.then(doc => {
				if (!doc.exists) {
					console.log("No such document!");
					return res.send("Not Found");
				} else {
					console.log("Document data:", doc.data());
					return res.send(doc.data());
				}
			})
			.catch(err => {
				return console.log("Error getting documents", err);
			});
	});

//Add new score
exports.addScore =
	("*",
	async (req, res) => {
		const newScore = {
			user: req.body.user,
			game: req.body.game,
			score: req.body.score,
			note: req.body.note,
			createdAt: new Date().toISOString()
		};

		await db
			.collection(`users`)
			.doc(req.body.user)
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
	});

//Get Scores for game
exports.getGameScores = async (req, res) => {
	await db
		.collection("scores")
		.where("game", "==", req.query.game)
		.orderBy("score", "desc")
		.get()
		.then(snapshot => {
			let posts = [];

			if (snapshot.empty) {
				console.log("No matching documents.");
				return;
			}
			snapshot.forEach(doc => {
				posts.push(doc.data());
			});
			return res.json(posts);
		})
		.catch(err => {
			return console.log("Error getting documents", err);
		});
};

//Get Scores for user
exports.getUserScores =
	("*",
	async (req, res) => {
		await db
			.collection("users")
			.doc(req.query.user)
			.collection("scores")
			.get()
			.then(snapshot => {
				let scores = [];
				if (snapshot.empty) {
					console.log("No matching documents.");
					return;
				}
				snapshot.forEach(doc => {
					scores.push(doc.data());
				});
				return res.json(scores);
			})
			.catch(err => {
				console.log("Error getting documents", err);
			});
	});
