import React, { useState } from "react";
import "./TimeLine.css";
import { ONE_DAY, FIVE_DAY, ONE_MONTH, THREE_MONTHS, ONE_YEAR } from "./util";
function TimeLine(props) {
  return (
    <div className="timeline_container">
      <div className="timeline_buttons_container">
        <div
          className={
            props.interval === ONE_DAY
              ? "timeline_button active"
              : "timeline_button"
          }
          onClick={() => {
            props.setInterval(ONE_DAY);
          }}
        >
          1D
        </div>
        <div
          className={
            props.interval === FIVE_DAY
              ? "timeline_button active"
              : "timeline_button"
          }
          onClick={() => {
            props.setInterval(FIVE_DAY);
          }}
        >
          5D
        </div>
        <div
          className={
            props.interval === ONE_MONTH
              ? "timeline_button active"
              : "timeline_button"
          }
          onClick={() => {
            props.setInterval(ONE_MONTH);
          }}
        >
          1M
        </div>
        <div
          className={
            props.interval === THREE_MONTHS
              ? "timeline_button active"
              : "timeline_button"
          }
          onClick={() => {
            props.setInterval(THREE_MONTHS);
          }}
        >
          3M
        </div>
        <div
          className={
            props.interval === ONE_YEAR
              ? "timeline_button active"
              : "timeline_button"
          }
          onClick={() => {
            props.setInterval(ONE_YEAR);
          }}
        >
          1Y
        </div>
      </div>
    </div>
  );
}

export default TimeLine;
