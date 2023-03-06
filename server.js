const express = require("express");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { data: "" });
});

app.post("/calculate", (req, res) => {
  let userCoins = req.body.userCoins;
  let currency = req.body.currency;

  let url = "https://api.coindesk.com/v1/bpi/currentprice.json";
  axios.get(url).then((response) => {
    let coinData = response.data;

    let result = {
      code: "",
      worth: "",
      disclaimer: coinData.disclaimer,
    };

    if (currency === "EUR") {
      result.code = coinData.bpi.EUR.code;
      result.worth = userCoins * coinData.bpi.EUR.rate_float;
    } else if (currency === "USD") {
      result.code = coinData.bpi.USD.code;
      result.worth = userCoins * coinData.bpi.USD.rate_float;
    } else if (currency === "GBP") {
      result.code = coinData.bpi.GBP.code;
      result.worth = userCoins * coinData.bpi.GBP.rate_float;
    }

    res.render("index", { data: result });
  });
});

let port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
