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

function CustomerLTV() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://rapidbackend-n4nc.onrender.com/customer_ltv")
      .then((response) => setData(response.data))

      .catch((error) =>
        console.error("Error fetching customer LTV data:", error)
      );
  }, []);

  const chartData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        label: "Average Customer Lifetime Value",
        data: data.map((item) => item.avg_ltv),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="chart">
      <h2>Customer Lifetime Value by Cohorts</h2>
      <Line data={chartData} />
    </div>
  );
}

export default CustomerLTV;
