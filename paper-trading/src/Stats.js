import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import "./Stats.css";
import StatsRow from "./StatsRow";
import { db } from "./firebase.js";
import { STOCKS_TYPE, LISTS_TYPE, pollFunc } from "./util";

const TOKEN = "cjrk339r01qionif3lkgcjrk339r01qionif3ll0";
const BASE_URL = "https://finnhub.io/api/v1/quote";

function Stats() {
  const [isOpen, setIsOpen] = useState(false);
  const [openModalProps, setModalProps] = useState({});
  const [stockData, setStockData] = useState([]);
  const [myStocks, setMyStock] = useState([]);
  const handleModalClose = (props) => {
    const modalProps = { ...props, isOpen: false };
    setModalProps(modalProps);
  };
  const handleModalOpen = (props) => {
    setModalProps(props);
  };
  const getStockData = (stock) => {
    return fetch(`/quote?symbol=${stock}`);
  };
  const getStoredData = (symbol) => {
    var index = stockData
      .map(function (e) {
        return e.name;
      })
      .indexOf(symbol);
    console.log(symbol);
    console.log(stockData[index]);
    return stockData[index];
  };
  const getMyStocks = () => {
    console.log(stockData);
    db.collection("myStocks").onSnapshot((snapshot) => {
      let promises = [];
      let tempStockData = [];
      snapshot.docs.map((doc) => {
        promises.push(
          tempStockData.push({
            id: doc.id,
            personal: doc.data(),
          })
        );
      });
      Promise.all(promises).then(() => {
        setMyStock(tempStockData);
      });
    });
  };
  const getStockList = () => {
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
        getStockData(stock)
          .then((res) => res.text())
          .then((data) => {
            const dataObj = JSON.parse(data);
            tempStockData.push({
              name: stock,
              data: dataObj,
            });
          })
      );
    });
    Promise.all(promises).then(() => {
      setStockData(tempStockData);
    });
  };
  useEffect(() => {
    console.log("Use effect stats.js");
    pollFunc(getStockList, Infinity, 5000);
    console.log(stockData);
    getMyStocks();
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
                key={stock.personal.ticker}
                name={stock.personal.ticker}
                openPrice={
                  getStoredData(stock.personal.ticker)?.data.regularMarketOpen
                }
                shares={stock.personal.shares}
                price={
                  getStoredData(stock.personal.ticker)?.data.regularMarketPrice
                }
                type={STOCKS_TYPE}
                handleModalOpen={handleModalOpen}
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
                key={stock.data.symbol}
                name={stock.data.symbol}
                openPrice={stock.data.regularMarketOpen}
                price={stock.data.regularMarketPrice}
                type={LISTS_TYPE}
                handleModalOpen={handleModalOpen}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="react-modal2">
        <ReactModal
          className="modal-content"
          overlayClassName="modal-overlay"
          isOpen={openModalProps.isOpen}
          contentLabel="Example Modal"
          onRequestClose={handleModalClose}
        >
          {openModalProps.type === STOCKS_TYPE && <h2>Sell Stock</h2>}
          {openModalProps.type === LISTS_TYPE && <h2>Buy Stock</h2>}

          <button onClick={handleModalClose}>X</button>
        </ReactModal>
      </div>
    </div>
  );
}

export default Stats;
