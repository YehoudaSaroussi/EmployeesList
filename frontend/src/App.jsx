import React, { useEffect, useState } from 'react';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const API_URL = "http://localhost:8080/api/employees"; // Ensure this points to the backend

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  return (
    <div>
      <h1>Employees List</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName} - {employee.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
