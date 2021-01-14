const express = require("express");
//const morgan = require("morgan");
const mongoose = require("mongoose");

// importing routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");

// express app
const app = express();

// connect to mongodb
const dbURI =
	"mongodb+srv://markoivan:test1234@cluster0.0ibdu.mongodb.net/rentacar?retryWrites=true&w=majority";
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => app.listen(3000))
	.catch((err) => console.log(`DB error occured: ${err}`));

// register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("public"));

// ROUTES
// auth routes
app.use(authRoutes);
// car routes
app.use(carRoutes);

// 404 page
app.use((req, res) => {
	res.status(404).render("404");
});
