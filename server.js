const express = require("express");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let port = 5000;

app.listen(posrt, () => {
  console.log(`Server is running on port ${port}.`);
});
