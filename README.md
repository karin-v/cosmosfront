# Cosmos Odyssey

## Technologies Used

- **Frontend:** Vue.js 3.2.13, JavaScript
- **Backend:** Spring Boot, Java
- **Database:** PostgreSQL

## System Requirements

- Java 23
- Node.js 22.14.0
- Vue.js 3.x
- Gradle
- PostgreSQL

## Setup Instructions

### Database Setup

1. Ensure PostgreSQL is installed and running
2. Create a database for the space travel application
3. Use the SQL script `create_cosmosdb_tables.sql` provided in the project to set up database tables

### Backend Setup

1. Open the project in IDE or terminal
2. Run the Spring Boot application
3. Backend server will start at http://localhost:8080

### Frontend Setup

1. Open the project in IDE or terminal
2. Install dependencies
3. Run the Vue.js application
4. Frontend application will be available at http://localhost:8081

## Existing Functionality

- **Planet Selection:** Users can select origin and destination planets
- **Route Filtering:** Displays routes between selected planets
- **Sorting:** Routes can be sorted by price, distance, or travel time (ascending or descending)
- **User Registration:** Possibility to register an account that is saved to the database
- **Login View:** User interface has a login form (authentication not implemented)
- **Price List Validity:** Backend checks pricelists validity
- **Reservation Submission:** Users can make reservations, which are validated before saving to the database
  
## Functionality Under Development

- Actual login authentication
- Booking functionality in frontend
