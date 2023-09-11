import "./App.css";
import React, { useState } from "react";
import Header from "./Header";
import Newsfeed from "./Newsfeed";
import Stats from "./Stats";

function App() {
  const [buyingPower, setBuyingPower] = useState(50000);
  return (
    <div className="App">
      <div className="app_header">
        <Header />
      </div>
      <div className="app_body">
        <div className="app_container">
          <Newsfeed
            buyingPower={buyingPower}
          />
          <Stats
            buyingPower={buyingPower}
            setBuyingPower={setBuyingPower}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
