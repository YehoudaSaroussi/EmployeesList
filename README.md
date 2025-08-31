# Employees Web App

## Prerequisites

- Java 21 (or 17+), Maven
- Node.js 18+
- MySQL running locally

## Database Setup

1. Create DB:
   ```
   CREATE DATABASE companydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Edit `src/main/resources/application.properties` with your MySQL username/password.
3. On backend startup, Flyway applies schema and `data.sql` seeds two employees.

## How to Run (Server, Client, Database)

### 1. Database (MySQL)

- Make sure MySQL is running locally.
- Create the database:
  ```
  CREATE DATABASE companydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  ```
- Edit `src/main/resources/application.properties` to set your MySQL username and password.

### 2. Server (Backend)

- Open a terminal in the project root.
- Start the backend server:
  ```
  mvn spring-boot:run
  ```
- The backend will run on [http://localhost:8080](http://localhost:8080).

### 3. Client (Frontend)

- IMPORTANT: the frontend lives in the `frontend/` subfolder. Run the following commands from inside that folder.

  ```
  cd frontend
  npm install
  npm run dev
  ```

- The frontend will run on [http://localhost:5173](http://localhost:5173).

## Backend

- Run:
  ```
  mvn spring-boot:run
  ```
- Test:
  ```
  curl http://localhost:8080/api/employees
  ```

## Frontend

- In the project root do NOT run `npm install` or `npm run dev` unless you actually have a package.json with those scripts in the root.
- Instead, open a terminal in the `frontend/` directory and run:
  ```
  cd frontend
  npm install
  npm run dev
  ```
  (defaults to http://localhost:5173)

Troubleshooting:

- If you see "Missing script: "dev"":

  1. Make sure you are in the `frontend/` folder: `pwd` or `cd frontend`.
  2. Run `npm run` to list available scripts. If `dev` is not listed, check `frontend/package.json` for the correct script name (e.g. `start` or `serve`) and run that instead, e.g. `npm run start`.
  3. If Node engine warnings appear (EBADENGINE), you can either upgrade Node to the required version or ignore the warning if the app still runs.

- If the backend fails on startup with:

  ```
  org.flywaydb.core.api.FlywayException: Unsupported Database: MySQL 8.0
  ```

  Use one of the following approaches:

  Quick workaround (start immediately)

  1. Disable Flyway auto-migration so the Spring app can start:
     - Edit `src/main/resources/application.properties` and add:
     ```
     # disable Flyway migrations (workaround)
     spring.flyway.enabled=false
     ```
  2. Apply the DB schema/data manually (mysql CLI, MySQL Workbench, or run SQL files against the DB). Example:
     ```
     mysql -u your_user -p companydb < src/main/resources/db/schema.sql
     mysql -u your_user -p companydb < src/main/resources/db/data.sql
     ```

  Proper fix (recommended)

  - Override/upgrade Flyway so it recognizes MySQL 8.0. Edit your `pom.xml` and add/override the Flyway dependency (example snippet to add under `<dependencies>`):
    ```xml
    <!-- Example: override Flyway to a newer compatible version -->
    <dependency>
      <groupId>org.flywaydb</groupId>
      <artifactId>flyway-core</artifactId>
      <version>9.22.4</version> <!-- pick a recent stable version -->
    </dependency>
    ```
    After changing `pom.xml` run:
    ```
    mvn clean package
    mvn spring-boot:run
    ```

  Notes

  - If you prefer not to override Flyway, upgrading Spring Boot to a newer patch release may also include a newer Flyway that fixes this detection issue.
  - If unsure which Flyway version to use, check the Flyway release notes or run the app with `debug` logging to get details about the database product string the driver returns.
  - After applying the proper fix, remove `spring.flyway.enabled=false` if you added it as a temporary workaround.

## Applying SQL initializer and running the backend

1. Make sure MySQL is running and create the database (if not already present):

```
mysql -u root -p
CREATE DATABASE IF NOT EXISTS companydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

2. Confirm these lines exist in src/main/resources/application.properties (you already applied them):

```
# Disable Flyway and use Spring SQL initializer
spring.flyway.enabled=false
spring.sql.init.mode=always
spring.sql.init.schema-locations=classpath:db/migration/V1__create_employees.sql
spring.sql.init.data-locations=classpath:data.sql
```

3. Build and run the backend from the project root:

```
mvn clean package
mvn spring-boot:run
```

Or simply:

```
mvn spring-boot:run
```

4. Watch the application logs for messages like "Executing SQL script from class path resource [data.sql]" or similar lines indicating the schema/data were applied. Also watch for Hikari pool startup and no Flyway errors.

5. Verify the app is running and data is loaded:

```
curl http://localhost:8080/api/employees
```

or check the table directly:

```
mysql -u root -p companydb -e "SELECT * FROM employees;"
```

Troubleshooting quick checks:

- If you see connection errors, verify spring.datasource.url/username/password in application.properties and that MySQL accepts connections from your host.
- If the schema/data were not applied, confirm the files exist at:
  - src/main/resources/db/migration/V1\_\_create_employees.sql
  - src/main/resources/data.sql
    and that classpath locations match the properties.
- To re-enable Flyway later, remove or set spring.flyway.enabled=true and upgrade/override Flyway in pom.xml if you again see "Unsupported Database: MySQL 8.0".

## Usage

- View all employees.
- Add a new employee.
- Edit an existing employee.
- Search by email (shows one result or "not found"); Reset to full list.

## Notes

- No delete, pagination, authentication, or extra features.
- Status codes: 201 create; 200 get/update; 404 not found; 409 duplicate email; 400 validation errors.

Exact commands — copy/paste these

1. Create the DB (non-interactive)

```
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS companydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
# you'll be prompted for the root password
```

Or interactive:

```
mysql -u root -p
# enter password when prompted
CREATE DATABASE IF NOT EXISTS companydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

2. Confirm SQL files are present (they should be in the repo):

```
ls src\main\resources\db\migration\V1__create_employees.sql
ls src\main\resources\data.sql
```

3. Build and run the backend (from project root)

```
mvn clean package
mvn spring-boot:run
```

or just:

```
mvn spring-boot:run
```

Watch the logs for lines like:

- "Executing SQL script from class path resource [data.sql]" (schema/data applied)
- "HikariPool-1 - Start completed." and "Started EmployeesApplication"

4. Verify API

```
curl http://localhost:8080/api/employees
```

or in MySQL after the app started:

```
mysql -u root -p -e "USE companydb; SHOW TABLES; SELECT COUNT(*) FROM employees;"
```

5. Start the frontend (in its folder)

```
cd frontend
npm install
npm run dev
```

If you get "Missing script: dev", run `npm run` to see available scripts or open `frontend/package.json` and add a "dev" script (e.g. "vite" or the appropriate start command).

Notes / quick checks

- Ensure spring.datasource.\* in src/main/resources/application.properties matches your MySQL credentials (check the trailing dot in your password is intended).
- If the SQL initializer didn't run, confirm:
  - spring.flyway.enabled=false
  - spring.sql.init.mode=always
  - schema/data locations match your file paths
- If backend still fails with DB errors, paste the exact error logs and I will provide the precise next fix.
