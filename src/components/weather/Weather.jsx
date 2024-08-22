import React, { useEffect, useState } from 'react';
import "../../index.css";
import M from "materialize-css"
import Chart from "chart.js/auto";
import { init } from './WeatherChartData';
import { handleEnter, setHeaderNFavicon } from '../helper/Helper';

const Weather = () => {
   const [input, setInput] = useState(null);
   const [loading, setLoading] = useState(false);
   const [chartData, setChartData] = useState({ yV1: [], yV2: [], location: null });

   useEffect(() => {
      M.AutoInit();
      setHeaderNFavicon("Flights - Weather");
   }, []);

   useEffect(() => {
      if (chartData.location) {
         const xV = [...Array(24).keys()];
         const tr = [...chartData.yV1, ...chartData.yV2].sort((a, b) => a - b);
         const min = Math.floor(tr[0] - 1);
         const max = Math.ceil(tr[tr.length - 1] + 1);

         const myChart = new Chart("myChart", {
            type: "line",
            data: {
               labels: xV,
               datasets: [
                  {
                     label: "Today",
                     fill: false,
                     lineTension: 0,
                     backgroundColor: "teal",
                     pointStyle: "rect",
                     borderColor: "rgb(75, 192, 192)",
                     data: chartData.yV1,
                  },
                  {
                     label: "Yesterday",
                     pointStyle: "rectRot",
                     fill: false,
                     lineTension: 0,
                     backgroundColor: "grey",
                     data: chartData.yV2,
                  },
               ],
            },
            options: {
               scales: {
                  x: {
                     title: {
                        display: true,
                        text: 'Hours',
                     },
                  },
                  y: {
                     title: {
                        display: true,
                        text: 'Temperature(°C)',
                     },
                     min, max,
                  },
               },
               plugins: {
                  legend: { display: true },
                  title: {
                     display: true,
                     text: `Weather trend for ${chartData.location.name}, ${chartData.location.region}, ${chartData.location.country}`,
                     fontSize: 16,
                  },
                  tooltips: {
                     enabled: true,
                     mode: 'index',
                     intersect: false,
                     callbacks: {
                        label: (tooltipItem, data) => {
                           const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                           const yValue = tooltipItem.raw;
                           return datasetLabel + ': ' + yValue;
                        },
                     },
                  },
               },
            },
         });

         return () => myChart.destroy();
      }
   }, [chartData]);

   return (
      <div className="Weather container center">
         <h3>Weather Information</h3>
         <div className="chart-input-container">
            <input
               type="search" id="chart-input"
               placeholder="Enter location.."
               onChange={e => setInput(e.target.value)}
               onKeyDown={e => handleEnter(e, ".chart-button")}
            />
            <i className="material-icons chart-button" type="button"
               onClick={e => init(input, setLoading, setChartData)}
            >search</i>
         </div>
         { loading && <div id="msgBox"></div> }
         <div className="chart-container" style={{ width: "100%", maxWidth: "600px", height: "300px" }}>
            <canvas id="myChart"></canvas>
         </div>
      </div>
   );
};

export default Weather;
