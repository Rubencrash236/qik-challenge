# Taxi24 API

A RESTful API for managing passengers, drivers, and trips for a taxi service.

---

## Endpoints

### Root

- `GET /`  
  Returns: `"Hello World!"`

---

### Passenger

- `GET /rest/Passenger`  
  Get all passengers.

- `GET /rest/Passenger/:id`  
  Get a passenger by ID.

- `GET /rest/Passenger/available/nearby`  
  **Body:** `{ "latitude": number, "longitude": number }`  
  Get the 3 closest available drivers to a location.

---

### Driver

- `GET /rest/Driver`  
  Get all drivers.

- `GET /rest/Driver/available`  
  Get all available drivers.

- `GET /rest/Driver/available/nearby`  
  **Body:** `{ "latitude": number, "longitude": number }`  
  Get all available drivers within 3km of a location.

- `GET /rest/Driver/:id`  
  Get a driver by ID.

---

### Trip

- `GET /rest/Trip`  
  Get all trips.

- `GET /rest/Trip/active`  
  Get all active trips.

- `GET /rest/Trip/:id`  
  Get a trip by ID.

- `POST /rest/Trip/create`  
  **Body:** `{ "passengerId": number, "destinationLatitude": number, "destinationLongitude": number }`  
  Create a new trip request (assigns a nearby driver).

- `POST /rest/Trip/complete`  
  **Body:** `{ "id": number }`  
  Complete a trip (generates a bill).

---

## Quick Start with Docker Compose

1. Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.
2. Run the following command in the project root:

   ```sh
   docker compose up
   ```

3. The API will be available at [http://localhost:3000](http://localhost:3000).

---

## Manual Setup (Local Development)

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start PostgreSQL:**

   - You need a PostgreSQL instance running with:
     - user: `postgres`
     - password: `1234`
     - database: `taxi_db`
   - You can use Docker:

     ```sh
     docker run --name taxi24-db -e POSTGRES_PASSWORD=1234 -e POSTGRES_USER=postgres -e POSTGRES_DB=taxi_db -p 5432:5432 -d postgres
     ```

3. **Configure environment (if needed):**

   - The database connection is set in [`src/app.module.ts`](src/app.module.ts) to connect to `challenge-qik-db:5432` by default (for Docker).  
   - For local development, you may want to change `host` to `localhost` or set up your `/etc/hosts` accordingly.

4. **Run the application:**

   ```sh
   npm run start:dev
   ```

5. **Seed Data:**

   - The application seeds the database automatically on startup using [`SeederService`](src/seeder.service.ts).

---

## Project Structure

- `src/Passenger` - Passenger module, controller, service, entity
- `src/Driver` - Driver module, controller, service, entity
- `src/Trip` - Trip module, controller, service, entity, bill
- `src/seeder.service.ts` - Seeds the database with initial data

---

## Notes

- All endpoints accept and return JSON.
- The API uses TypeORM and NestJS.
- Database tables are created and seeded automatically on first run.
