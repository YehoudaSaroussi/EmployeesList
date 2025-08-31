import React, { useEffect, useState } from 'react';
import { Employee, EmployeeInput } from './types';
import {
  getEmployees,
  getEmployeeByEmail,
  createEmployee,
  updateEmployee
} from './api';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';
import EmailSearch from './components/EmailSearch';
import './App.css'; // Import the CSS file for styling

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Employee | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      setEmployees(await getEmployees());
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleFormSubmit = async (data: EmployeeInput, id?: number) => {
    setFormLoading(true);
    setError(null);
    try {
      if (id) {
        await updateEmployee(id, data);
      } else {
        await createEmployee(data);
      }
      setEditing(null);
      await fetchAll();
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Error saving employee');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (emp: Employee) => {
    setEditing(emp);
    setError(null);
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setError(null);
  };

  const handleSearch = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const emp = await getEmployeeByEmail(email);
      setEmployees([emp]);
    } catch (e: any) {
      if (e?.response?.status === 404) {
        setEmployees([]);
        setError('Not found');
      } else {
        setError(e?.response?.data?.error || 'Search failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEditing(null);
    setError(null);
    fetchAll();
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Employees Management</h1>
      <div className="app-section">
        <EmailSearch onSearch={handleSearch} onReset={handleReset} loading={loading} />
      </div>
      <div className="app-section">
        <EmployeeForm
          initial={editing}
          onSubmit={handleFormSubmit}
          loading={formLoading}
          onCancel={handleCancelEdit}
        />
      </div>
      {error && <div className="app-error">{error}</div>}
      {loading ? <div className="app-loading">Loading...</div> :
        <EmployeeTable employees={employees} onEdit={handleEdit} />}
      {employees.length === 0 && !loading && <div className="app-no-data">No employees found.</div>}
    </div>
  );
};

export default App;
