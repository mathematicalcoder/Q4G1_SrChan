// Loads the express module
const express = require("express");
const hbs = require("hbs");

const bodyParser = require("body-parser");

const path = require("path");

//Creates our express server
const app = express();
const port = 3000;

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

//Sets a basic route

// Render the initial page with the number input form
app.get("/", (req, res) => {
  res.render("index");
});

// Create express route binder for draw.hbs and get the data from the url as parameters
// that came from index.hbs

app.get("/happy", (req, res) => {
  res.render("happy.hbs")
})

app.post("/happy", (req, res) => {
  // basic setup
  const data = req.body;
  let output = "";
  let song = "";
  let counter = 0;
  let coming = [];
  // define songs
  const song1 = ["Happy", "birthday", "to", "you", "Happy", "birthday", "to", "you", "Happy", "birthday", "dear", data.name, "Happy", "birthday", "to", "you!"]
  let song2 = []
  const song2Male = ["For", "he's", "a", "jolly", "good", "fellow", "For", "he's", "a", "jolly", "good", "fellow", "For", "he's", "a", "jolly", "good", "fellow", "which", "nobody", "can", "deny!"]
  const song2Female = ["For", "she's", "a", "jolly", "good", "fellow", "For", "she's", "a", "jolly", "good", "fellow", "For", "she's", "a", "jolly", "good", "fellow", "which", "nobody", "can", "deny!"]
  if (!data.name || !data.gender) {
    // give error if name or gender is missing
    return res.status(400).send("At least one required field is missing!")
  } else {
    // add basic info
    output += `name: ${data.name}<br>
    gender: ${data.gender}<br>
    number: ${data.number}<br>`
    // add guest info
    for (let i = 0; i < data.number; i++) {
      let nameId = `name${i+1}`
      let checkboxId = `checkbox${i+1}`
      output += `${nameId}: ${data[nameId]}<br>
      ${checkboxId}: ${data[checkboxId]}<br>`
      if (data[checkboxId] == "on") {
        coming.push(data[nameId])
      }
    }
    // add song 1
    for (word of song1) {
      song += `${coming[counter]}: ${word}<br>`
      counter += 1
      if (counter == coming.length) {
        counter = 0
      }
    }
    if (data.gender == "male") {
      song2 = song2Male
    } else {song2 = song2Female}
    song += `${coming[counter]}: ${song2}`
  }
  res.render("happy.hbs", { output: output, song })
})

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
