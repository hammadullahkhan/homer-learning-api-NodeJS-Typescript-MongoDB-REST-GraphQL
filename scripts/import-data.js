const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const chalk = require('chalk');

const fileToRead = './scripts/../data/stories.csv';
const mongoDBUrl = 'mongodb://localhost/homerlearningdb';
const stories = [];
let StoriesSchema;

console.log(chalk.blue(`\nImport Data Utility Script:`));
console.log(`Data File: ${fileToRead}`);
console.log(`Database URL: ${mongoDBUrl}`);

connectToDB();
setSchema();
readFile();


// --------------------- FUNCTIONS ---------------------
function setSchema() {
  const Schema = mongoose.Schema;
  StoriesSchema = new Schema({
    title: { type: String, unique: true, required: true, minlength: 1, maxlength: 255, trim: true },
    privacy: { type: String, required: true, minlength: 1, maxlength: 10, trim: true },
    likes: { type: Number, default: 0, required: true },
    launch_date: { type: Date, default: Date.now(), required: true }
  });
}

function connectToDB() {
  mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
  const db = mongoose.connection;

  db.on("open", function(ref) {
    console.log("Connected to mongo server.");
  });

  db.on("error", function(err) {
    console.log("Could not connect to mongo server!");
  });
}

function readFile() {
  fs.createReadStream(fileToRead)
  .pipe(csv())
  .on('data', (item) => stories.push(item) )
  .on('end', () => bulkInsert() );
}

function bulkInsert() {
  const StoriesModel = mongoose.model('stories', StoriesSchema );
  StoriesModel.insertMany(stories, (err, docs) => {
    if (err) terminate(err);
    console.log(chalk.green(`Total Records Inserted: ${docs.length}\n`));
    exit();
  })
}

function terminate(err) {
  console.log(chalk.red(`\n!!!Program terminated due to Error(s)!!! `));
  console.log(`${err.errmsg}\n`);
  exit();
}

function exit() {
  process.exit(1);
}
