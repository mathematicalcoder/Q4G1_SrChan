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
  const data = req.body;
  if (!data.name || !data.gender) {
    // give error if name or gender is missing
    return res.status(400).send("At least one required field is missing!")
  } else {
    let output = "";
    // add basic info
    output += `name: ${data.name}<br>
    gender: ${data.gender}<br>
    number: ${data.number}<br>`
    // add guest info
    for (let i = 0; i < data.number; i++) {
      let nameId = `name${i+1}`
      let checkboxId = `checkbox${i+1}`
      output += `${nameId}: ${data[nameId]}<br>
      ${checkboxId}: ${data[checkboxId]}`
    }
  }
  res.render("happy.hbs", { output: output })
})

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
