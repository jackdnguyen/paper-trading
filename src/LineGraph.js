import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const options = {
  legend: {
    display: false,
  },
  hover: {
    intersect: false,
  },
  elements: {
    line: {
      tension: 0,
    },
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    displayColors: false,
    callbacks: {
        label: function(tooltipItems, data) { 
            return tooltipItems.yLabel + ' USD';
        }
    }
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
        },
        ticks: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
  },
};

function LineGraph(props) {
  const [data, setData] = useState([]);
  const [color, setColor] = useState("#5AC53B");
  useEffect(() => {
    if (props.priceHistory) {
      let data = [];
      for (var i = 0; i < props.priceHistory.length; ++i) {
        let date = new Date(props.priceHistory[i].date);
        data.push({
          x: date,
          y: props.priceHistory[i].open.toFixed(2),
        });
      }
      if (props.percentage > 0) {
        setColor("#5AC53B");
      } else {
        setColor("#fa6a6a");
      }
      setData(data);
    }
  }, [props.priceHistory, props.percentage]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                type: "line",
                backgroundColor: "black",
                borderColor: color,
                borderWidth: 2,
                pointBorderColor: "rgba(0, 0, 0, 0)",
                pointBackgroundColor: "rgba(0, 0, 0, 0)",
                pointHoverBackgroundColor: color,
                pointHoverBorderColor: "#000000",
                pointHoverBorderWidth: 4,
                pointHoverRadius: 6,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
