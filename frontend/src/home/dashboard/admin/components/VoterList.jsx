// VoterList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const VoterList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/students").then(res => {
      setStudents(res.data);
    });
  }, []);

  return (
    <div className="voter-list">
      <h3>Voter List</h3>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Roll No</th></tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.roll}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoterList;
