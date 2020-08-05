require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

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


//MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes

app.use('/api', authRouter);
app.use('/api', userRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App listening on port ${port} and on http://127.0.0.1:${port}`);
});



// 		"formidable": "^1.2.1",
// 		"i": "^0.3.6",
// 		"lodash": "^4.17.19",