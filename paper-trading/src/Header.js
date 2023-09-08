import React from "react";
import Logo from "./papertrading.svg";
import "./Header.css";

function Header() {
  return (
    <div className="header_wrapper">
      <div className="header_logo">
        <img src={Logo} alt="Logo" width={25} />
        <a href="#">Paper Trading</a>
      </div>
      <div className="header_search">
        <div className="header_searchContainer">
          <input placeholder="Search" type="text" />
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
