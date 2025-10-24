// StatsCards.jsx
import React from "react";

const StatsCards = ({ stats }) => {
  return (
    <div className="stats-grid">
      {stats.map((s, i) => (
        <div key={i} className="stat-card">
          <h3>{s.title}</h3>
          <p>{s.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
