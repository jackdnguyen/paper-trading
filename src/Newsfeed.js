import React, { useEffect, useState } from "react";
import "./Newsfeed.css";
import LineGraph from "./LineGraph";
import TimeLine from "./TimeLine";
import Chip from "@material-ui/core/Chip";
import { Avatar } from "@material-ui/core";
import { ONE_DAY, FIVE_DAY, ONE_MONTH, THREE_MONTHS, ONE_YEAR } from "./util";
import StockNews from "./StockNews";

const popularTopics = [
  "Technology",
  "Top Movies",
  "Upcoming Earnings",
  "Crypto",
  "Cannabis",
  "Healthcare Supplies",
  "Index ETFs",
  "Technology",
  "China",
  "Pharma",
];

function Newsfeed(props) {
  const [priceHistory, setPriceHistory] = useState([]);
  const [interval, setInterval] = useState(FIVE_DAY);
  const [pricingInfo, setPricingInfo] = useState({});
  const [accountWorth, setAccountWorth] = useState(props.buyingPower);
  const [myStocksUpdated, setMyStocksUpdated] = useState(false);
  const [buyingPowerUpdated, setBuyingPowerUpdated] = useState(false);
  const getStoredData = (stock) => {
    if (props.stockData) {
      var index = props.stockData
        .map(function (e) {
          return e.name;
        })
        .indexOf(stock);
      return props.stockData[index];
    }
  };
  const getPricingInfo = () => {
    const stockInfo = getStoredData(props.displayStock);
    if (stockInfo) {
      const percentage =
        ((stockInfo.data.regularMarketPrice -
          stockInfo.data.regularMarketOpen) /
          stockInfo.data.regularMarketOpen) *
        100;
      const changeAmount = Number(
        parseFloat(stockInfo.data.regularMarketPrice * percentage) / 100
      ).toFixed(2);
      var isNegative = changeAmount > 0 ? '+' : '-';
      const changeAmountString =
        isNegative + '$' + String(Math.abs(changeAmount));
      setPricingInfo({
        price: stockInfo.data.regularMarketPrice,
        percentage: Number(percentage).toFixed(2),
        changeAmount: changeAmountString,
      });
    }
  };
  const calculateTotalAccountWorth = () => {
    let totalWorth = props.buyingPower;
    for (var i = 0; i < props.myStocks.length; ++i) {
      const stockData = getStoredData(props.myStocks[i].personal.ticker);
      if (stockData) {
        const stockWorth =
          props.myStocks[i].personal.shares * stockData.data.regularMarketPrice;
        totalWorth += stockWorth;
      }
    }
    setAccountWorth(totalWorth);
  };

  useEffect(async () => {
    const result = await fetch(
      `/historical?symbol=${props.displayStock}&interval=${interval}`
    )
      .then((res) => res.text())
      .then((data) => {
        const dataJSON = JSON.parse(data);
        setPriceHistory(dataJSON.quotes);
      });
  }, [interval, props.displayStock]);

  useEffect(() => {
    getPricingInfo();
  }, [props.stockData, props.displayStock])
  useEffect(() => {
    setBuyingPowerUpdated(true);
  }, [props.buyingPower])
  useEffect(() => {
    setMyStocksUpdated(true);
  }, [props.myStocks])
  useEffect(() => {
    if (props.stockData.length !== 0 && props.myStocks.length !== 0 && props.buyingPower !== null && myStocksUpdated && buyingPowerUpdated) {
      calculateTotalAccountWorth();
      setBuyingPowerUpdated(false);
      setMyStocksUpdated(false);
    }
  }, [props.myStocks, props.buyingPower, myStocksUpdated, buyingPowerUpdated, props.stockData])
  return (
    <div className="newsfeed">
      <div className="newsfeed_container">
        <div className="newsfeed_chartSection">
          <div className="newsfeed_portfolio">
            <h2>{props.displayStock}</h2>
            <h1>${pricingInfo.price}</h1>
            <p
              className={
                pricingInfo.percentage > 0
                  ? "newsfeed_percentage"
                  : "newsfeed_percentage red"
              }
            >
              {pricingInfo.changeAmount} ({pricingInfo.percentage}%) Today
            </p>
          </div>
          <div className="newsfeed_chart">
            <LineGraph
              priceHistory={priceHistory}
              percentage={pricingInfo.percentage}
            />
            <TimeLine interval={interval} setInterval={setInterval} />
          </div>
        </div>
        <div className="newsfeed_TotalSection">
          <h2>Investing Account</h2>
          <h2>
            $
            {Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
              Number(accountWorth)
            )}
          </h2>
        </div>
        <div className="newsfeed_buyingSection">
          <h2>Buying Power</h2>
          <h2>
            $
            {Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
              Number(props.buyingPower)
            )}
          </h2>
        </div>
        <div className="newsfeed_marketSection">
          <div className="newsfeed_marketBox">
            <p>{props.displayStock} news</p>
            <StockNews displayStock={props.displayStock} />
          </div>
        </div>
        <div className="newsfeed_popularListsSection">
          <div className="newsfeed_popularListsIntro">
            <h1>Popular lists</h1>
            <p>Show More</p>
          </div>
          <div className="newsfeed_popularListsBadges">
            {popularTopics.map((topic) => (
              <Chip
                className="topicBadge"
                variant="outlined"
                label={topic}
                avatar={
                  <Avatar
                    src={`https://avatars.dicebear.com/api/human/${topic}.svg`}
                  />
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsfeed;
