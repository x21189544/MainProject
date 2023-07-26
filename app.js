const express = require("express");
const app = express();
const port = 8080;

//Set the view engine to EJS
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//Serve static files from the 'public' directory
app.use(express.static("public"));

//Use Bootstrap
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

//Define routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/registerasset", (req, res) => {
  res.render("registerasset");
});

app.get("/updateasset", (req, res) => {
  res.render("updateasset");
});

app.get("/maintenance", (req, res) => {
  res.render("maintenance");
});

app.get("/reports", (req, res) => {
  res.render("reports");
});

app.get("/transfer", (req, res) => {
  res.render("transfer");
});

app.get("/endoflife", (req, res) => {
  res.render("endoflife");
});

//Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
