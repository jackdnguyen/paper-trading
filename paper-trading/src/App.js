import "./App.css";
import React, { useState } from "react";
import Header from "./Header";
import Newsfeed from "./Newsfeed";
import Stats from "./Stats";
import { stocksList } from "./util";

function App() {
  const [buyingPower, setBuyingPower] = useState(50000);
  const [displayStock, setDisplayStock] = useState(
    stocksList[Math.floor(Math.random() * stocksList.length)]
  );
  const [stockData, setStockData] = useState([]);
  const [myStocks, setMyStock] = useState([]);
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
            setBuyingPower={setBuyingPower}
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
