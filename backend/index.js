const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const Product = require("./models/product");
const User = require("./models/user");

app.use(express.json());
app.use(cors());
dotenv.config();

//Database connection with MongoDB
mongoose.connect(process.env.DB_URL);

//API creation

app.get("/", (req, res) => {
	res.send("Express App is Running");
});

// Image storage engine

const storage = multer.diskStorage({
	destination: "./upload/images", // Destination to store image
	filename: (req, file, cb) => {
		return cb(
			null,
			`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
			// file.fieldname is name of the field (image)
			// path.extname get the uploaded file extension
		);
	},
});

const upload = multer({ storage: storage });

//creating upload endpoint for images

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
	res.json({
		success: true,
		image_url: `${process.env.PORT}/images/${req.file.filename}`,
	});
});

// to add product

app.post("/addproduct", async (req, res) => {
	let products = await Product.find({});
	let id;
	if (products.length > 0) {
		let last_product_array = products.slice(-1);
		let last_product = last_product_array[0];
		id = last_product.id + 1;
	} else {
		id = 1;
	}
	const product = new Product({
		id: id,
		name: req.body.name,
		image: req.body.image,
		category: req.body.category,
		new_price: req.body.new_price,
		old_price: req.body.old_price,
	});
	console.log(product);
	await product.save();
	console.log("Saved");
	res.json({
		success: true,
		name: req.body.name,
	});
});

// to delete product

app.post("/removeproduct", async (req, res) => {
	await Product.findOneAndDelete({ id: req.body.id });
	console.log("Removed");
	res.json({
		success: true,
		name: req.body.name,
	});
});

// to get all products

app.get("/allproducts", async (req, res) => {
	let products = await Product.find({});
	console.log("All products fetched");
	res.send(products);
});

// to register a new user

app.post("/register", async (req, res) => {
	let cart = {};
	for (let i = 0; i < 300; i++) {
		cart[i] = 0;
	}
	const { username, email, password } = req.body;
	if (await User.findOne({ email: email })) {
		return res.status(400).json({
			success: false,
			error: "User found with same email address already registered",
		});
	} else if (!username || !password || !email) {
		res.json({ error: "Empty body received" });
	} else {
		bcrypt.hash(password, 10).then(async (hash) => {
			await User.create({
				name: username,
				email: email,
				password: hash,
				cartData: cart,
			})
				.then((user) => {
					const maxAge = 3 * 60 * 60;
					const token = jwt.sign(
						{ id: user._id, username },
						process.env.JWT_SECRET_KEY,
						{
							expiresIn: maxAge, // 3hrs in sec
						}
					);
					res.cookie("jwt", token, {
						httpOnly: true,
						maxAge: maxAge * 1000, // 3hrs in ms
					});
					res.status(201).json({
						success: true,
						message: "User successfully created",
						user: user._id,
						token,
					});
				})
				.catch((error) =>
					res.status(400).json({
						success: false,
						message: "User not successful created",
						error: error.message,
					})
				);
		});
	}
});

// for user sign-in

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			success: false,
			error: "Please fill in all the required fields",
		});
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(400).json({
				success: false,
				message: "Login not successful",
				error: "User not found",
			});
		} else {
			bcrypt.compare(password, user.password).then(function (result) {
				if (result) {
					const maxAge = 3 * 60 * 60;
					const token = jwt.sign(
						{ id: user._id, email },
						process.env.JWT_SECRET_KEY,
						{
							expiresIn: maxAge, // 3hrs in sec
						}
					);
					res.cookie("jwt", token, {
						httpOnly: true,
						maxAge: maxAge * 1000, // 3hrs in ms
					});
					res.status(201).json({
						success: true,
						message: "User successfully Logged in",
						user: user._id,
						token,
					});
				} else {
					res.status(400).json({
						success: false,
						error: "The username or password you entered is incorrect.",
					});
				}
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "An error occurred",
			error,
		});
	}
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
