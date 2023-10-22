import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Newsfeed from "./Newsfeed";
import Stats from "./Stats";
import { stocksList } from "./util";
import { db } from "./firebase"

function App() {
  const [buyingPower, setBuyingPower] = useState(null);
  const [displayStock, setDisplayStock] = useState(
    stocksList[Math.floor(Math.random() * stocksList.length)]
  );
  const [stockData, setStockData] = useState([]);
  const [myStocks, setMyStock] = useState([]);
  function updateBuyingPower(newBuyingPower) {
    const buyingPowerRef = db.collection('buyingPower').doc('buying');
    buyingPowerRef.set({
      power: newBuyingPower,
    })
    .then(() => {
      console.log("Buying power updated in the database");
    })
    .catch((error) => {
      console.error("Error updating buying power:", error);
    });
  }
  useEffect(() => {
    const buyingPowerRef = db.collection('buyingPower').doc('buying');
    const unsubscribe = buyingPowerRef.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (data) {
        setBuyingPower(data.power);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <div className="app_header">
        <Header setDisplayStock={setDisplayStock} />
      </div>
      <div className="app_body">
        <div className="app_container">
          <Newsfeed
            buyingPower={buyingPower}
            displayStock={displayStock}
            setDisplayStock={setDisplayStock}
            stockData={stockData}
            myStocks={myStocks}
          />
          <Stats
            buyingPower={buyingPower}
            setBuyingPower={updateBuyingPower}
            displayStock={displayStock}
            setDisplayStock={setDisplayStock}
            stockData={stockData}
            setStockData={setStockData}
            myStocks={myStocks}
            setMyStock={setMyStock}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
