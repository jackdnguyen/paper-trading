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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// key={stock.data.symbol}
//                 name={stock.data.symbol}
//                 openPrice={stock.data.regularMarketOpen}
//                 shares={stock.personal.shares}
//                 price={stock.data.regularMarketPrice}
