-- Create schema if needed (optional; adjust if your MySQL already has the DB)

-- Use existing schema (Flyway assumes connection already points to companydb)
CREATE TABLE IF NOT EXISTS employees (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name  VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE
);
