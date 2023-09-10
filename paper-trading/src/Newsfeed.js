import React from "react";
import "./Newsfeed.css";
import LineGraph from "./LineGraph";
import TimeLine from "./TimeLine";
import Chip from "@material-ui/core/Chip";
import { Avatar } from "@material-ui/core";

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
  return (
    <div className="newsfeed">
      <div className="newsfeed_container">
        <div className="newsfeed_chartSection">
          <div className="newsfeed_portfolio">
            <h1>$114,656</h1>
            <p>+$44.63 (+0.04%) Today</p>
          </div>
          <div className="newsfeed_chart">
            <LineGraph />
            <TimeLine />
          </div>
        </div>
        <div className="newsfeed_buyingSection">
          <h2>Buying Power</h2>
          <h2>${props.buyingPower}</h2>
        </div>
        <div className="newsfeed_marketSection">
          <div className="newsfeed_marketBox">
            <p>Markets Closed</p>
            <h1>Happy Thanksgiving</h1>
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
