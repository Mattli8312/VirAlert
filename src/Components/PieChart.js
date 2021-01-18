import React from "react";
import "./style.css";
import { Pie } from "react-chartjs-2";

function PieChart(Props) {
  return (
    <div className="Chart">
      <h1>{Props.name}</h1>
      <Pie
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              data: [Props.data.cases, Props.data.recovered, Props.data.deaths],
              backgroundColor: [
                "rgba(255,0,0,0.6)",
                "rgba(0,255,255,0.6)",
                "rgba(0,0,0,0.6)"
              ],
              hoverBackgroundColor: ["red", "cyan", "black"]
            }
          ]
        }}
      />
    </div>
  );
}

export default PieChart;
