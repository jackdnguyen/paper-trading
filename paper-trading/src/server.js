const express = require("express");
const yahooFinance = require("yahoo-finance2").default; // NOTE the .default
var cors = require("cors");
const app = express();
app.use(cors());
const port = 5000;

app.get("/quote", async (req, res) => {
  let symbol = req.query.symbol;
  const result = await yahooFinance.quote(symbol, {
    fields: ["symbol", "regularMarketOpen", "regularMarketPrice"],
  });
  res.send(result);
});
app.get("/historical", async (req, res) => {
  const symbol = req.query.symbol;
  const timePeriod = req.query.interval;
  let periodOne = new Date();
  let interval = "";
  if (timePeriod === "1d") {
    periodOne.setDate(periodOne.getDate() - 1);
    interval = "15m";
  } else if (timePeriod === "5d") {
    periodOne.setDate(periodOne.getDate() - 5);
    interval = "30m";
  } else if (timePeriod === "1mo") {
    periodOne.setDate(periodOne.getDate() - 30);
    interval = "1d";
  } else if (timePeriod === "3mo") {
    periodOne.setDate(periodOne.getDate() - 90);
    interval = "1d";
  } else if (timePeriod === "1yr") {
    periodOne.setDate(periodOne.getDate() - 365);
    interval = "1d";
  }
  const queryOptions = { period1: periodOne, interval: interval };
  const result = await yahooFinance._chart(symbol, queryOptions);
  res.send(result);
});
app.get("/search", async (req, res) => {
  let symbol = req.query.symbol;
  const result = await yahooFinance.search(symbol);
  res.send(result);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
