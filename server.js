const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const db = process.env.MONGO_URI;

// Connect to MongoDB
if (db !== '[YOUR CONNECTION STRING HERE]') {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));
}

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', require('./api/api.js'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));