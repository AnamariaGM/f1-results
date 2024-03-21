// Loading environment variables from .env file, if available.
require('dotenv').config();

// Importing the Express framework
const express = require('express')

// Create an Express application instance.
const app = express()

// Using the PORT environment variable if available, otherwise default to port 3000.
const port = process.env.PORT || 3000

// Importing controller functions for handling the routes.
const {
    getAllRaces,
    getRaceById,
    getAllRaceResults,
    getRaceResultsByRaceId}=require('./controllers/race-controllers')

// Middleware to parse incoming JSON data.
app.use(express.json())

// Routes for retrieving races
app.get('/api/races', getAllRaces)
app.get('/api/races/:race_id', getRaceById)

// Routes for retrieving race results
app.get('/api/race-results', getAllRaceResults)
app.get('/api/races/:race_id/results', getRaceResultsByRaceId)

// Export the Express application instance to be used by other modules.
module.exports=app


// If the file is run directly (not as part of a test), start the server
if (require.main === module) {
    // Starting the server and listen on the specified port
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}