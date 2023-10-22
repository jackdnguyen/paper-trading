import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import "./Stats.css";
import StatsRow from "./StatsRow";
import { db } from "./firebase.js";
import { STOCKS_TYPE, LISTS_TYPE, pollFunc, stocksList } from "./util";
import { Close } from "@material-ui/icons";

function Stats(props) {
  const [openModalProps, setModalProps] = useState({});
  const [numOfTradeStocks, setNumTradeStocks] = useState(0);
  const handleModalClose = (props) => {
    const modalProps = { ...props, isOpen: false };
    setModalProps(modalProps);
  };
  const handleModalOpen = (props) => {
    setModalProps(props);
  };
  const handleInputChange = (input) => {
    setNumTradeStocks(input);
  };
  const handleOnSubmit = () => {
    let validateModal = { ...openModalProps };
    const value = openModalProps.price * numOfTradeStocks;
    if (value < 0 || numOfTradeStocks < 0) {
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
        db.collection("myStocks")
          .where("ticker", "==", openModalProps.stockName)
          .get()
          .then((querySnapShot) => {
            if (!querySnapShot.empty) {
              querySnapShot.forEach(function (doc) {
                if (doc.data().shares - numOfTradeStocks === 0) {
                  db.collection("myStocks").doc(doc.id).delete();
                } else {
                  db.collection("myStocks")
                    .doc(doc.id)
                    .update({
                      shares: (doc.data().shares -= numOfTradeStocks),
                    });
                }
              });
            }
          });
        props.setBuyingPower(props.buyingPower + value);
      }
    }
    if (openModalProps.type === LISTS_TYPE) {
      if (props.buyingPower < value) {
        validateModal = { ...validateModal, error: "invalid" };
        setModalProps(validateModal);
        return;
      } else {
        db.collection("myStocks")
          .where("ticker", "==", openModalProps.stockName)
          .get()
          .then((querySnapShot) => {
            if (!querySnapShot.empty) {
              querySnapShot.forEach(function (doc) {
                db.collection("myStocks")
                  .doc(doc.id)
                  .update({
                    shares: (doc.data().shares += parseFloat(numOfTradeStocks)),
                  });
              });
            } else {
              db.collection("myStocks").add({
                ticker: openModalProps.stockName,
                shares: parseFloat(numOfTradeStocks),
              });
            }
          });
        props.setBuyingPower(props.buyingPower - value);
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
    var index = props.stockData
      .map(function (e) {
        return e.name;
      })
      .indexOf(symbol);
    return props.stockData[index];
  };
  const getMyStocks = () => {
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
        props.setMyStock(tempStockData);
      });
    });
  };
  const getStockList = () => {
    let tempStockData = [];
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
      props.setStockData(tempStockData);
    });
  };
  useEffect(() => {
    getStockList();
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
            {props.myStocks.map((stock) => (
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
                setDisplayStock={props.setDisplayStock}
              />
            ))}
          </div>
        </div>
        <div className="stats_header stats_lists">
          <p>Lists</p>
        </div>
        <div className="stats_content">
          <div className="stats_rows">
            {props.stockData.map((stock) => (
              <StatsRow
                key={stock.data.symbol}
                name={stock.data.symbol}
                openPrice={stock.data.regularMarketOpen}
                price={stock.data.regularMarketPrice}
                type={LISTS_TYPE}
                handleModalOpen={handleModalOpen}
                setDisplayStock={props.setDisplayStock}
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
                    {Number(parseFloat(openModalProps.shares)).toFixed(2)}{" "}
                    shares
                  </p>
                </div>
              )}
              {openModalProps.type === LISTS_TYPE && (
                <div>
                  <h2>Buy {openModalProps.stockName}</h2>
                  <p className="modal-available-funds">
                    ${Number(props.buyingPower).toFixed(2)} Available
                  </p>
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
              <p>
                $
                {Number(
                  parseFloat(openModalProps.price) * numOfTradeStocks
                ).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="modal-submit">
            {openModalProps.type === STOCKS_TYPE && (
              <button onClick={handleOnSubmit}>Sell</button>
            )}
            {openModalProps.type === LISTS_TYPE && (
              <button onClick={handleOnSubmit}>Buy</button>
            )}
          </div>
        </ReactModal>
      </div>
    </div>
  );
}

export default Stats;
