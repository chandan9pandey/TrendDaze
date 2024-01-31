const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

app.use(express.json());
app.use(cors());
dotenv.config();

//Database connection with MongoDB
mongoose.connect(process.env.DB_URL);

//API creation

app.get("/", (req, res) => {
	res.send("Express App is Running");
});

app.listen(process.env.PORT, (error) => {
	{
		if (!error) {
			console.log("Server listening on port " + process.env.PORT);
		} else {
			console.log("Error: " + error);
		}
	}
});
