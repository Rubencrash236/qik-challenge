# Taxi24

A progressive [NestJS](https://nestjs.com/) TypeScript backend for managing taxi trips, drivers, passengers, and billing.

---

## Prerequisites
### Easy Run (with Docker Compose)

If you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/) installed, you can start all required services with:

```bash
docker compose up
```

### 1. Install PostgreSQL (if not already installed)

On Ubuntu:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### 2. Create the `taxi_db` Database

Start PostgreSQL and create the database:

```bash
sudo service postgresql start
sudo -u postgres psql
```

Inside the PostgreSQL prompt, run:

```sql
CREATE DATABASE taxi_db;
\q
```

### 3. Configure Database Connection

Set your database connection settings in a `.env` file or your configuration (example):

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_DATABASE=taxi_db
```

Replace `your_password` with your actual PostgreSQL password.

---

## Project Setup

Install dependencies:

```bash
npm install
```

---

## Running the Application

### Development

```bash
npm run start
```

### Watch Mode

```bash
npm run start:dev
```

### Production

```bash
npm run start:prod
```

---

## Running Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```