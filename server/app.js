const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cookieParser());
dotenv.config({path: './config.env'});



require('./db/connection');
const User = require('./models/userSchema');
const Product = require('./models/productsSchema');



// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(require('./routes/auth'));
app.use(require('./routes/product'));
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));

// MongoDB URI
const db = process.env.DATABASE;

// Connect to MongoDB



// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Define other routes here
// app.use('/api/users', require('./routes/users'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
