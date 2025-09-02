# Employees Management System

The Employees Management System is a full-stack application designed to manage employee records. It allows users to perform CRUD (Create, Read, Update) operations on employee data, search employees by email, and view all employees in a tabular format. The project is built using a React frontend, a Spring Boot backend, and MySQL as the database.

## Features

- Add new employees with first name, last name, and email.
- Edit existing employee details.
- Search employees by email.
- View all employees in a table with pagination support.
- Backend validation for data integrity.
- Responsive and user-friendly UI.

## Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Spring Boot, Java
- **Database**: MySQL
- **Build Tools**: Maven, npm
- **Other**: REST API, CSS for styling

## Project Structure

- **Frontend**: Located in `frontend/`, built with React and TypeScript.
- **Backend**: Located in `src/main/java/`, built with Spring Boot.
- **Database**: MySQL schema and data initialization scripts are in `src/main/resources/db/migration/` and `src/main/resources/data.sql`.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v16 or higher)
- Java (JDK 17 or higher)
- Maven
- MySQL (v8.0 or higher)

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/EmployeesList.git
   cd EmployeesList
   ```

2. **Configure the Database**

   - Create a MySQL database named `companydb`.
   - Adjust the database credentials in `src/main/resources/application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/companydb?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC
     spring.datasource.username=YOUR_USERNAME
     spring.datasource.password=YOUR_PASSWORD
     ```
   - Run the schema and data initialization scripts:
     ```sql
     source src/main/resources/db/migration/V1__create_employees.sql;
     source src/main/resources/data.sql;
     ```

3. **Run the Backend**

   - Navigate to the project root and build the backend:
     ```bash
     mvn clean install
     ```
   - Start the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```
   - The backend will be available at `http://localhost:8080`.

4. **Run the Frontend**
   - Navigate to the `frontend/` directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
   - The frontend will be available at `http://localhost:5173`.

### Project Flow

1. **Frontend**:

   - The user interacts with the React-based UI to manage employees.
   - Components like `EmployeeForm`, `EmployeeTable`, and `EmailSearch` handle specific functionalities.

2. **Backend**:

   - The Spring Boot backend exposes REST APIs for CRUD operations and email-based search.
   - The `EmployeeService` handles business logic, while `EmployeeController` manages API endpoints.

3. **Database**:
   - MySQL stores employee data with schema defined in `V1__create_employees.sql`.
   - Initial data is populated using `data.sql`.

### API Endpoints

- `GET /api/employees`: Fetch all employees.
- `GET /api/employees/by-email?email={email}`: Fetch an employee by email.
- `POST /api/employees`: Create a new employee.
- `PUT /api/employees/{id}`: Update an existing employee.

### Example Data

The database is pre-populated with the following employees:

- Ada Lovelace (`ada@company.com`)
- Alan Turing (`alan@company.com`)

### Troubleshooting

- **Database Connection Issues**: Ensure MySQL is running and the credentials in `application.properties` are correct.
- **Port Conflicts**: Check if ports `8080` (backend) and `5173` (frontend) are available.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgments

- Inspired by industry best practices for full-stack development.
- Special thanks to the open-source community for tools and libraries.
