require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');

// connect to database
mongoose.connect(process.env.MONGO_URL);

// create express server
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + './../'));

// create server routers
router(app);

app.listen(3000, () => console.log('listening on 3000 yo buddy'));
