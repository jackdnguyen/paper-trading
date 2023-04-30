import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function LineGraph() {
  let dataX = [10, 15, 12];
  let dataY = [20, 10, 4];
  const [graphDataX, setGraphData, , graphDataY] = useState([]);

  const createMockData = () => {
    let dataX = [];
    let dataY = [];
    let value = 50;
    for (var i = 0; i < 366; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      value += Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 10);
      // data.push({ x: date, y: value });
      dataX.push(date);
      dataY.push(value);
    }
    setGraphData(dataX, dataY);
  };

  useEffect(() => {
    createMockData();
  }, []);
  console.log(graphDataX);
  console.log(graphDataY);
  return (
    <div className="linegraph">
      <Line
        data={{
          labels: graphDataX,
          datasets: [
            {
              type: "line",
              data: graphDataY,
              backgroundColor: "black",
              borderColor: "#5AC538",
              borderWidth: 2,
              pointBorderColor: "rgba(0,0,0,0)",
              pointBackgroundColor: "rgba(0,0,0,0)",
              pointHoverBackgroundColor: "#5AC538",
              pointHoverBorderColor: "#000000",
              pointHoverBorderWidth: 4,
              pointHoverRadius: 6,
            },
          ],
        }}
        options={{
          plugins: {
            legend: false,
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            y: {
              ticks: {
                display: false,
              },
            },
            x: {
              ticks: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default LineGraph;
