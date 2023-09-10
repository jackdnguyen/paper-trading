import React, { useState } from "react";
import "./StatsRow.css";
import StockSVG from "./stock.svg";
import { db } from "./firebase";
import { LISTS_TYPE } from "./util";
import Example from "./stockModal";

function StatsRow(props) {
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;

  const buyStock = () => {
    const modalProps = {
      isOpen: true,
      price: props.price,
      type: props.type,
      stockName: props.name,
    };
    props.handleModalOpen(modalProps);
    // console.log("buy", props.name);
    // if (props.type === LISTS_TYPE) {
    //   db.collection("myStocks")
    //     .where("ticker", "==", props.name)
    //     .get()
    //     .then((querySnapshot) => {
    //       if (querySnapshot.empty) {
    //         // Add record
    //         db.collection("myStocks").add({ ticker: props.name, shares: 1 });
    //       } else {
    //         // Update record
    //         querySnapshot.forEach(function (doc) {
    //           db.collection("myStocks")
    //             .doc(doc.id)
    //             .update({
    //               shares: (doc.data().shares += 1),
    //             });
    //         });
    //       }
    //     });
    //   // props.stateFunc(props.state => props.state.personal.shares+1)
    // }
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
