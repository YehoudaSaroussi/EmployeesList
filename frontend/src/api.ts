import axios from 'axios';
import type { Employee, EmployeeInput } from './types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' }
});

export async function getEmployees(): Promise<Employee[]> {
  const res = await api.get<Employee[]>('/employees');
  return res.data;
}

export async function getEmployeeByEmail(email: string): Promise<Employee> {
  const res = await api.get<Employee>(`/employees/by-email`, { params: { email } });
  return res.data;
}

export async function createEmployee(body: EmployeeInput): Promise<Employee> {
  const res = await api.post<Employee>('/employees', body);
  return res.data;
}

export async function updateEmployee(id: number, body: EmployeeInput): Promise<Employee> {
  const res = await api.put<Employee>(`/employees/${id}`, body);
  return res.data;
}
