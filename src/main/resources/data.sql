-- Use INSERT IGNORE to skip duplicates based on the UNIQUE constraint
INSERT IGNORE INTO employees (first_name, last_name, email) VALUES
  ('Ada', 'Lovelace', 'ada@company.com'),
  ('Alan', 'Turing', 'alan@company.com');
