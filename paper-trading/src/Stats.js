import React, { useState, useEffect } from "react";
import "./Stats.css";
import axios from "axios";

const TOKEN = "cjrk339r01qionif3lkgcjrk339r01qionif3ll0";
const BASE_URL = "https://finnhub.io/api/v1/quote";

function Stats() {
  const [stockData, setStockData] = useState([]);

  const getStockData = (stock) => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch((error) => console.error("Error", error.message));
  };

  useEffect(() => {
    let tempStockData = [];
    const stocksList = [
      "AAPL",
      "MSFT",
      "TSLA",
      "FB",
      "BABA",
      "UBER",
      "DIS",
      "SBUX",
    ];
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getStockData(stock).then((res) => {
          tempStockData.push({
            name: stock,
            ...res.data,
          });
        })
      );
    });
    Promise.all(promises).then(() => {
      setStockData(tempStockData);
      console.log(tempStockData);
    });
  }, []);
  
  return (
    <div className="stats">
      <div className="stats_container">
        <div className="stats_header">
          <p>Stocks</p>
        </div>
        <div className="stats_content">
          <div className="stats_rows">{/* for current sotcks */}</div>
        </div>
        <div className="stats_header">
          <p>Lists</p>
        </div>
        <div className="stats_content">
          <div className="stats_rows">{/* stocks to buy */}</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
