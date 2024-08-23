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

function TotalSales() {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("monthly");

  useEffect(() => {
    axios
      .get(`https://rapidbackend-n4nc.onrender.com/total_sales/${interval}`)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((error) =>
        console.error("Error fetching total sales data:", error)
      );
  }, [interval]);

  const chartData = {
    labels: data.map((item) => new Date(item._id).toLocaleDateString()),
    datasets: [
      {
        label: "Total Sales",
        data: data.map((item) => item.total_sales),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="chart">
      <h2>Total Sales Over Time</h2>
      <select value={interval} onChange={(e) => setInterval(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>
      {/* <>{console.log(chartData)}</> */}
      <Line data={chartData} />
    </div>
  );
}

export default TotalSales;
