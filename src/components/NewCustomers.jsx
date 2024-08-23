import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function NewCustomers() {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("monthly");

  useEffect(() => {
    axios
      .get(`https://rapidbackend-n4nc.onrender.com/new_customers/${interval}`)
      .then((response) => setData(response.data))
      .catch((error) =>
        console.error("Error fetching new customers data:", error)
      );
  }, [interval]);

  const chartData = {
    labels: data.map((item) => new Date(item._id).toLocaleDateString()),
    datasets: [
      {
        label: "New Customers",
        data: data.map((item) => item.count),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="chart">
      <h2>New Customers Added Over Time</h2>
      <select value={interval} onChange={(e) => setInterval(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>
      <Bar data={chartData} />
    </div>
  );
}

export default NewCustomers;
