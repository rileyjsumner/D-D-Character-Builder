let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let createError = require('createerror');
let dataBaseConfig = require('./db/db');

mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
  console.log('Connected to DB');
}, error => {
  console.log('Error: + ', error);
});

const userRoute = require('./routes/user.routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist/dnd')));

app.use('/api', userRoute);

const PORT = process.env.PORT || 6200;

app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});

app.use((req, res, next) => {
  next(createError({
    name: '404',
    message: 'File not found'
  }));
});

app.get('/', (req, res) => {
  res.send('invalid endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/dnd/index.html'));
});

app.use(function (err, req, res, next) {
  console.log(err.message);
  if(!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
