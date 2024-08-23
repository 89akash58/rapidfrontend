import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SalesGrowth() {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("monthly");

  useEffect(() => {
    axios
      .get(`https://rapidbackend-n4nc.onrender.com/sales_growth/${interval}`)
      .then((response) => setData(response.data))
      .catch((error) =>
        console.error("Error fetching sales growth data:", error)
      );
  }, [interval]);

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Sales Growth Rate",
        data: data.map((item) => item.growth_rate),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="chart">
      <h2>Sales Growth Rate Over Time</h2>
      <select value={interval} onChange={(e) => setInterval(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>
      {/* {console.log(chartData)} */}
      <Line data={chartData} />
    </div>
  );
}

export default SalesGrowth;
