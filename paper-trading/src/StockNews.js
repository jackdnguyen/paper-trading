import React, { useEffect, useState } from "react";
import "./StockNews.css";

function StockNews(props) {
  const [stockNewsList, setStockNewsList] = useState([]);
  useEffect(() => {
    if (props.displayStock) {
      fetch(`/search?symbol=${props.displayStock}`)
        .then((res) => res.text())
        .then((data) => {
          const dataJSON = JSON.parse(data);
          setStockNewsList(dataJSON.news);
        });
    }
  }, [props.displayStock]);
  return (
    <div className="stockNews_container">
      {stockNewsList.map((news) => (
        <a href={news.link}>
          <h4>{news.title}</h4>
        </a>
      ))}
    </div>
  );
}

export default StockNews;
