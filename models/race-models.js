// Importing the db connection
const db = require("../db/connection");

// Function to select all races from db
exports.selectRaces = () => {
  // Execute a SQL query to select all races from the 'races' table
  return db.query("SELECT * FROM races;").then((result) => {
    // Return the rows retrieved
    return result.rows;
  });
};

// Function to select a race by its ID from db
exports.selectRaceById = (race_id) => {
  // Execute a SQL query to select a race by its ID from the 'races' table
  return db
    .query("SELECT * FROM races WHERE race_id = $1;", [race_id])
    .then((result) => {
      // Return the first row retrieved from query results
      return result.rows[0];
    });
};

// Function to select all race results from the db
exports.selectAllRaceResults = () => {
  return db.query("SELECT * FROM race_results;").then((result) => {
    return result.rows;
  });
};

// Function to select race results by race ID from the db
exports.selectResultsByRaceId = (race_id) => {
  return db
    .query("SELECT * FROM race_results WHERE race_results.race_id = $1;", [
      race_id,
    ])
    .then((result) => {
      return result.rows;
    });
};
