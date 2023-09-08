import React from "react";
import "./StatsRow.css";
import StockSVG from "./stock.svg";
import { db } from "./firebase";

function StatsRow(props) {
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;

  const buyStock = () => {
    // console.log("buy", props.name);
    db.collection("myStocks")
      .where("ticker", "==", props.name)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // Add record
        } else {
          // Update record
        }
      });
  };
  return (
    <div className="row" onClick={buyStock}>
      <div className="row_intro">
        <h1>{props?.name}</h1>
        <p>{props.shares && props.shares + " shares"}</p>
      </div>
      <div className="row_chart">
        <img alt="stock" src={StockSVG} height={16} />
      </div>
      <div className="row_numbers">
        <p className="row_price">${props.price}</p>
        <p className="row_percentage"> {Number(percentage).toFixed(2)}%</p>
      </div>
    </div>
  );
}

export default StatsRow;
