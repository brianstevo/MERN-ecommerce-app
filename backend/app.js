require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: true,
	})
	.then(() => {
		// console.log(con.connection);
		console.log('DB connected');
	});

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

// "body-parser": "^1.19.0",
// 		"cookie-parser": "^1.4.4",
// 		"cors": "^2.8.5",
// 		"dotenv": "^8.2.0",
// 		"express": "^4.17.1",
// 		"express-validator": "^6.2.0",
// 		"formidable": "^1.2.1",
// 		"i": "^0.3.6",
// 		"jsonwebtoken": "^8.5.1",
// 		"lodash": "^4.17.19",
// 		"mongoose": "^5.7.7",
// 		"morgan": "^1.9.1",
// 		"nodemon": "^2.0.4",
// 		"uuid": "^8.3.0"
