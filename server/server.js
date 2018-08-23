//the below line takes whats in the .env file and 
//stores it in process.env
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser'); //to access req.body
const mongoose = require('mongoose');

//connect to database
mongoose.connect(process.env.MONGO_URL);

//create express server
const app = express();
app.use(bodyParser.json())
app.use(express.static(__dirname + './../'))

//create server routers
const router = require('./router');
router(app);

//REMEMBER, the dev server listen is different. It will not accept get and post requests. 
app.listen(3000, () => console.log('listening on 3000 yo buddy'))