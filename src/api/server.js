require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

let app = express();

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log("Connected to DND");
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 6200;

let userRouter = require('./routes/users');
app.use('/api/users', userRouter);

let characterRouter = require('./routes/characters');
app.use('/api/characters', characterRouter);


app.listen(PORT);
console.log("Juiced on port: ", PORT);
