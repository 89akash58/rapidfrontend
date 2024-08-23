import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CustomerGeography() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://rapidbackend-n4nc.onrender.com/customer_geography")
      .then((response) => setData(response.data))
      .catch((error) =>
        console.error("Error fetching customer geography data:", error)
      );
  }, []);

  const chartData = {
    labels: data.map((item) => item._id),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
      },
    ],
  };

  return (
    <div className="chart">
      <h2>Geographical Distribution of Customers</h2>
      <Pie data={chartData} />
    </div>
  );
}

export default CustomerGeography;
