const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: '../config.env'});
const db = process.env.DATABASE;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));