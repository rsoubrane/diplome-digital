const { functions } = require("./admin");

// const app = require("express")();
const express = require("express");
const cors = require("cors")({ origin: true });
const app = express();

app.use(cors);

const { getSwiper, addScore, getGameScores, getUserScores } = require("./api");

//Routes
app.get("/swiper", getSwiper);

//Scores
app.post("/score", addScore);
app.get("/game", getGameScores);
app.get("/user", getUserScores);

// Make the api accessible
exports.api = functions.region("europe-west1").https.onRequest(app);
