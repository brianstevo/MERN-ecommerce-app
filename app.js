const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const DB =
	"mongodb+srv://brianstevo:root@t-shirt-db.86m3s.mongodb.net/mern-tshirt?retryWrites=true&w=majority";
mongoose
	.connect(process.env.DATABASE || DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: true,
	})
	.then(() => {
		// console.log(con.connection);
		console.log("DB connected");
	});

//MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
//routes

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);

app.use(express.static("client/build"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`App listening on port ${port} and on http://127.0.0.1:${port}`);
});
