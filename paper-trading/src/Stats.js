import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import "./Stats.css";
import StatsRow from "./StatsRow";
import { db } from "./firebase.js";
import { STOCKS_TYPE, LISTS_TYPE, pollFunc } from "./util";
import { Close } from "@material-ui/icons";

const TOKEN = "cjrk339r01qionif3lkgcjrk339r01qionif3ll0";
const BASE_URL = "https://finnhub.io/api/v1/quote";

function Stats(props) {
  const [openModalProps, setModalProps] = useState({});
  const [stockData, setStockData] = useState([]);
  const [myStocks, setMyStock] = useState([]);
  const [numOfTradeStocks, setNumTradeStocks] = useState(0);
  const handleModalClose = (props) => {
    const modalProps = { ...props, isOpen: false };
    setModalProps(modalProps);
  };
  const handleModalOpen = (props) => {
    setModalProps(props);
  };
  const handleInputChange = (input) => {
    console.log(numOfTradeStocks);
    setNumTradeStocks(input);
  };
  const handleOnSubmit = () => {
    let validateModal = { ...openModalProps };
    const value = openModalProps.price * numOfTradeStocks;
    if ((value < 0) || (numOfTradeStocks < 0)) {
      validateModal = { ...validateModal, error: "invalid" };
      setModalProps(validateModal);
      return;
    }
    if (openModalProps.type === STOCKS_TYPE) {
      if (openModalProps.shares < numOfTradeStocks) {
        validateModal = { ...validateModal, error: "invalid" };
        setModalProps(validateModal);
        return;
      } else {
        db.collection("myStocks").where("ticker", "==", openModalProps.stockName).get().then((querySnapShot => {
          if(!querySnapShot.empty) {
            querySnapShot.forEach(function (doc) {
              if ((doc.data().shares - numOfTradeStocks) === 0) {
                db.collection("myStocks")
                  .doc(doc.id)
                  .remove();
              } else {
                db.collection("myStocks")
                  .doc(doc.id)
                  .update({
                    shares: (doc.data().shares -= numOfTradeStocks),
                  });
              }
            })
          }
        }))
        props.setBuyingPower((props.buyingPower + value))
      }
    }
    validateModal = { ...validateModal, error: "valid" };
    setModalProps(validateModal);
    handleModalClose(validateModal);
    return;
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
    // pollFunc(getStockList, Infinity, 5000);
    getStockList();
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
          <div className="modal-header">
            <div>
              {openModalProps.type === STOCKS_TYPE && (
                <div>
                  <h2>Sell {openModalProps.stockName}</h2>
                  <p className="modal-available-funds">
                    {openModalProps.shares} shares
                  </p>
                </div>
              )}
              {openModalProps.type === LISTS_TYPE && (
                <div>
                  <h2>Buy {openModalProps.stockName}</h2>
                  <p className="modal-available-funds">$4.22 Available</p>
                </div>
              )}
            </div>
            <Close onClick={handleModalClose} />
          </div>
          <div className="modal-info">
            <div className="modal-info-content">
              <p>Number of shares</p>
              <input
                defaultValue={0}
                type="float"
                value={numOfTradeStocks}
                onChange={(e) => {
                  handleInputChange(e.target.value);
                }}
                className={openModalProps.error}
              ></input>
            </div>
            <div className="modal-info-content">
              <p>Market price</p>
              <p>${parseFloat(openModalProps.price) * numOfTradeStocks}</p>
            </div>
          </div>
          <div className="modal-submit">
            {openModalProps.type === STOCKS_TYPE && (
              <button onClick={handleOnSubmit}>Sell</button>
            )}
            {openModalProps.type === LISTS_TYPE && <button>Buy</button>}
          </div>
        </ReactModal>
      </div>
    </div>
  );
}

export default Stats;
