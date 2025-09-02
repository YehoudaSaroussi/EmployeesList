import React from 'react';
import { Employee } from '../types';
import Table from './Table';
import Button from './Button';
import './EmployeeTable.css'; // Import the CSS file for styling

interface Props {
  employees: Employee[];
  onEdit: (emp: Employee) => void;
}

const EmployeeTable: React.FC<Props> = ({ employees, onEdit }) => {
  const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Actions'];
  const rows = employees.map((emp) => [
    emp.id,
    emp.firstName,
    emp.lastName,
    emp.email,
    <Button variant="secondary" onClick={() => onEdit(emp)}>
      Edit
    </Button>,
  ]);

  return <Table headers={headers} rows={rows} />;
};

export default EmployeeTable;

