import React, { useState, useEffect } from "react";
import "./Stats.css";
import axios from "axios";
import StatsRow from "./StatsRow";
import { db } from "./firebase.js";

const TOKEN = "cjrk339r01qionif3lkgcjrk339r01qionif3ll0";
const BASE_URL = "https://finnhub.io/api/v1/quote";

function Stats() {
  const [stockData, setStockData] = useState([]);
  const [myStocks, setMyStock] = useState([]);
  const getStockData = (stock) => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch((error) => console.error("Error", error.message));
  };
  const getMyStocks = () => {
    db.collection("myStocks").onSnapshot((snapshot) => {
      let promises = [];
      let tempData = [];
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        promises.push(
          getStockData(doc.data().ticker).then((res) => {
            tempData.push({
              id: doc.id,
              data: doc.data(),
              info: res.data,
            });
          })
        );
      });
      Promise.all(promises).then(() => {
        setMyStock(tempData);
      });
    });
  };
  useEffect(() => {
    getMyStocks();
    let tempStockData = [];
    const stocksList = [
      "AAPL",
      "MSFT",
      "TSLA",
      "META",
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
    });
  }, []);
  return (
    <div className="stats">
      <div className="stats_container">
        <div className="stats_header">
          <p>Stocks</p>
        </div>
        <div className="stats_content">
          <div className="stats__rows">
            {myStocks.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                shares={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className="stats_header stats_lists">
          <p>Lists</p>
        </div>
        <div className="stats_content">
          <div className="stats_rows">
            {stockData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
