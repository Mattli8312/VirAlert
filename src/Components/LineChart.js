import React, { useState, useEffect } from "react";
import "./style.css";
import { Line } from "react-chartjs-2";
function LineChart() {
  const [labels, setLabels] = useState([]);
  const [casedata, setCaseData] = useState([]);

  useEffect(() => {
    async function FetchData() {
      await fetch("https://disease.sh/v3/covid-19/historical/all")
        .then((data) => data.json())
        .then((results) => {
          const label_data = [];
          const case_data = [];
          let pre_data = 0;
          for (let date in results["cases"]) {
            if (!pre_data) {
              pre_data = results["cases"][date];
            } else {
              label_data.push(date);
              case_data.push(results["cases"][date] - pre_data);
              pre_data = results["cases"][date];
            }
          }
          setLabels(label_data);
          setCaseData(case_data);
        });
    }
    FetchData();
    console.log("Fetch!");
  }, []);
  return (
    <div className="Chart">
      <h1>Global Scale</h1>
      <Line
        options={{
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }}
        data={{
          labels: labels,
          datasets: [
            {
              backgroundColor: "rgba(204,0,0,0.5)",
              label: "New cases",
              data: casedata
            }
          ]
        }}
      />
    </div>
  );
}

export default LineChart;
