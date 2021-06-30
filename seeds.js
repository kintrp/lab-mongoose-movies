const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity');
//const Movie = require('../models/Movie');

require("dotenv/config");

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
 
let celebrities = [
  {
    name: "Justin Timberlake",
    occupation : "Singer",
    catchPhrase : "Bringing sexy back",
  },
  {
    name: "Kim Kardashian",
    occupation : "Social Media",
    catchPhrase : "Honey, would you put a bumper sticker on a Bentley?",
  },
  {
    name: "Capital Bra",
    occupation : "Rapper",
    catchPhrase : "Backend is fun",
  },
];
 
Celebrity.insertMany(celebrities)
  .then(celebrities => {
    console.log(`Created ${celebrities.length} celebrities`);
 
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating X from the DB: ${err}`));