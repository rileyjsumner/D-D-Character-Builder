let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let mongo = require('mongoose');
let bearerToken = require('express-bearer-token');
let oktaAuth = require('./auth');
let dnd = require('./dnd');

let db = mongo.connect("mongodb://localhost:27017/DND", function(err, response) {
  if(err) { console.log(err); }
  else { console.log("connected to " + db, " + ", response); }
});

let app = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bearerToken());
app.use(oktaAuth);
app.use(dnd());

const port = process.env.PORT || 8280;
// let Schema = mongo.Schema;
//
// let CharactersSchema = new Schema({
//   id: {type: Number },
//   name: { type: String },
//   race: { type: String },
//   subRace: { type: String },
//   class: { type: String },
//   subClass: { type: String },
//   archetype: { type: String },
//   abilityScores: { type: Array },
//   abilityModifiers: { type: Array },
//   equipment: { type: Array }
// }, { versionKey: false });

mongoose.connect(`mongodb://localhost:27017/DND`)
.then(() => {
  console.log("Collected to the DB");
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
});
