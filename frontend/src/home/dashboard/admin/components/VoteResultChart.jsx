// VoteResultChart.jsx
import React, { useEffect, useState } from "react";
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
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VoteResultChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace with your backend endpoint
    axios.get("http://localhost:8080/api/admin/results")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const chartData = {
    labels: data.map((d) => d.candidate || "Unknown"),
    datasets: [
      {
        label: "Votes",
        data: data.map((d) => d.votes || 0),
        backgroundColor: "#FFD700",
      },
    ],
  };

  return (
    <div className="chart-box">
      <h3>Voting Results</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default VoteResultChart;
