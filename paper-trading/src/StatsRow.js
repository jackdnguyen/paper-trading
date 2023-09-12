import React, { useState } from "react";
import "./StatsRow.css";
import StockSVG from "./stock.svg";
import StockSVG2 from "./stock2.svg";
import { db } from "./firebase";
import { LISTS_TYPE, STOCKS_TYPE } from "./util";
import ReactModal from "react-modal";

function StatsRow(props) {
  const [isViewOptionsVisible, setViewOptions] = useState(false);
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;
  const buyStock = () => {
    const modalProps = {
      isOpen: true,
      price: props.price,
      type: props.type,
      stockName: props.name,
      shares: props.shares,
      error: "valid",
    };
    props.handleModalOpen(modalProps);
  };
  return (
    <div
      className="row"
      onMouseEnter={() => {
        setViewOptions(true);
      }}
      onMouseLeave={() => {
        setViewOptions(false);
      }}
    >
      <div className="row_intro">
        <h1>{props?.name}</h1>
        <p>{props.shares && Number(props.shares).toFixed(2) + " shares"}</p>
      </div>
      {isViewOptionsVisible && (
        <div>
          <button
            id="B1"
            onClick={() => {
              props.setDisplayStock(props.name);
            }}
          >
            View
          </button>
          <button id="B2" onClick={buyStock}>
            {props.type === STOCKS_TYPE ? "Sell" : "Buy"}
          </button>
        </div>
      )}
      {!isViewOptionsVisible && (
        <>
          <div className="row_chart">
            {percentage < 0 && <img alt="stock" src={StockSVG} height={16} />}
            {percentage > 0 && <img alt="stock" src={StockSVG2} height={16} />}
          </div>
          <div className="row_numbers">
            <p className="row_price">${props.price}</p>
            <p
              className={
                percentage > 0 ? "row_percentage" : "row_percentage red"
              }
            >
              {" "}
              {Number(percentage).toFixed(2)}%
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default StatsRow;
