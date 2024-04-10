# F1 Results API
This API provides information about Formula 1 races and race results for the 2023 season. It retrieves data from the Ergast API and populates a PostgreSQL database with the fetched information.
## Installation
1. Clone the repository to your local machine:
```
git clone https://github.com/AnamariaGM/f1-results.git
```
2. Navigate to the project directory:
```
cd f1-results
```
3. Install dependencies:
```
npm install
```
## Usage
### Setting up the Database
Before using the API, you need to set up the PostgreSQL database. Run the following command:
```
npm run setup-db
```
### Seeding the Database
After setting up the database, you need to populate it with data from the Ergast API. Run the following command:
```
npm run seed
```
### Starting the Server
Once the database is set up and seeded, you can start the server:
```
npm start
```
By default, the server will run on port 3000. You can access the API endpoints using tools like cURL or Postman.
## Environment Variables
The application uses environment variables for configuration. If the .env file is not already present in the root directory, you need to create one. Define the following variables in the `.env` file:

- `PGDATABASE`: Name of the new PostgreSQL database.
- `PORT`: Port number for the server. Default is 3000.
- `DB_USERNAME`: Your PostgreSQL username
- `DB_DATABASE`: Default database name

  Here's an example `.env` file:
```
PGDATABASE=f1_results
PORT=3000
DB_USERNAME="<your_username>"
DB_DATABASE="postgres"
```
## MVC Architecture

This project follows the MVC (Model-View-Controller) architecture pattern, which separates concerns into three main components:

1. Model: The model represents the data structure of the application. In this project, the models are responsible for interacting with the database. They contain functions to query and manipulate data.

2. View: In a web application context, the view is responsible for presenting data to the user. In this project, the view layer is not explicitly defined since it's primarily an API. However, the data returned by the API can be considered the "view" of the application.

3. Controller: The controller acts as an intermediary between the model and the view. It receives requests from the client, interacts with the model to fetch or manipulate data, and sends the appropriate response back to the client. In this project, the controllers handle incoming HTTP requests, call the appropriate functions in the models, and send responses to the client.

The separation of concerns provided by the MVC architecture makes the codebase more organized, maintainable, and scalable.

## Endpoints

### Get All Races

```
GET /api/races
```
Returns a list of all races in the database.

### Get Race by ID
```
GET /api/races/:race_id
```
Returns details of a specific race identified by its ID.

### Get All Race Results
```
GET /api/race-results
```
Returns a list of all race results in the database.

### Get Race Results by Race ID
```
GET /api/races/:race_id/results
```
Returns race results for a specific race identified by its ID.

## Running Tests
To run tests for this project, you can use the following command:

```
npm test
```
This command will execute the tests defined in the project. Make sure to set up the necessary databases and seed data before running the tests.

