// VoteResultChart.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const VoteResultChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/results").then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="chart-box">
      <h3>Voting Results</h3>
      <Bar
        data={{
          labels: data.map((d) => d.candidate),
          datasets: [
            {
              label: "Votes",
              data: data.map((d) => d.votes),
              backgroundColor: "#FFD700",
            },
          ],
        }}
      />
    </div>
  );
};

export default VoteResultChart;
