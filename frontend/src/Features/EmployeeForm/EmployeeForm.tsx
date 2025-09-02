import React, { useState, useEffect } from 'react';
import { EmployeeInput } from '../../types';
import Button from '../../components/Button/Button';
import './EmployeeForm.css';

interface Props {
  initial?: (EmployeeInput & { id?: number }) | null;
  onSubmit: (data: EmployeeInput, id?: number) => void;
  onCancel: () => void;
  loading: boolean;
}

const EmployeeForm: React.FC<Props> = ({ initial, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState<EmployeeInput>({ firstName: '', lastName: '', email: '' });

  useEffect(() => {
    if (initial) {
      setFormData(initial);
    }
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, initial?.id);
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2 className="employee-form-title">{initial ? 'Edit Employee' : 'Add New Employee'}</h2>
      {initial?.id && (
        <div className="employee-form-group">
          <label><strong>ID:</strong></label>
          <input
            type="text"
            value={initial.id}
            readOnly
            className="employee-form-input"
          />
        </div>
      )}
      <div className="employee-form-group">
        <label><strong>First Name:</strong></label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="employee-form-input"
          required
        />
      </div>
      <div className="employee-form-group">
        <label><strong>Last Name:</strong></label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="employee-form-input"
          required
        />
      </div>
      <div className="employee-form-group">
        <label><strong>Email:</strong></label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="employee-form-input"
          required
        />
      </div>
      <div className="employee-form-actions">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (initial ? 'Saving...' : 'Adding...') : initial ? 'Save' : 'Add'}
        </Button>
        {initial && (
          <Button type="button" variant="danger" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default EmployeeForm;
