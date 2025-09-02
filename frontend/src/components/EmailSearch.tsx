import React, { useState } from 'react';
import Button from './Button/Button';

type Props = {
  onSearch: (email: string) => void;
  onReset: () => void;
  loading: boolean;
};

const EmailSearch: React.FC<Props> = ({ onSearch, onReset, loading }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) onSearch(email.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <label>
        <strong>Search by Email:</strong>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          maxLength={255}
          required
        />
      </label>
      <Button type="submit" variant="yellow" disabled={loading}>Search</Button>
      <Button type="button" variant="yellow" onClick={onReset} disabled={loading}>Reset</Button>
    </form>
  );
};

export default EmailSearch;
