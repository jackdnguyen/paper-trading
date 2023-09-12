import React, { useState } from "react";
import Logo from "./papertrading.svg";
import "./Header.css";
import { stocksList } from "./util";

function Header(props) {
  const [searchList, setSearchList] = useState(stocksList);
  const handleInputChange = (e) => {
    const val = e.target.value;
    const inputSearchList = stocksList.filter((stock) => {
      return stock.toLowerCase().includes(val.toLowerCase());
    });
    setSearchList(inputSearchList);
  };
  return (
    <div className="header_wrapper">
      <div className="header_logo">
        <img src={Logo} alt="Logo" width={25} />
        <a href="#">Paper Trading</a>
      </div>
      <div className="header_search">
        <div className="header_searchContainer">
          <input
            placeholder="Search"
            type="text"
            onChange={handleInputChange}
          />
          <div class="list-group">
            {searchList.map((stock) => (
              <div
                className="li"
                onMouseDown={() => {
                  props.setDisplayStock(stock);
                }}
              >
                {stock}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="header_menuItems">
        <a href="#">Stocks</a>
        <a href="#">Portfolio</a>
        <a href="#">Cash</a>
        <a href="#">Messages</a>
        <a href="#">Account</a>
      </div>
    </div>
  );
}

export default Header;
