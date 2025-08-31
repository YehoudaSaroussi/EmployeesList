import React, { useState } from 'react';

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
        Search by Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          maxLength={255}
          required
        />
      </label>
      <button type="submit" disabled={loading}>Search</button>
      <button type="button" onClick={onReset} disabled={loading}>Reset</button>
    </form>
  );
};

export default EmailSearch;
