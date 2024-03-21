const axios = require("axios");
const format = require("pg-format");
const db = require("./connection");

// Function to seed the database with races and races results.
const seed = async () => {
  try {
    // Fetch data for all races in the 2023 season in JSON format
    const racesResponse = await axios.get(
      "https://ergast.com/api/f1/2023.json"
    );

    // Extract race details
    const races = racesResponse.data.MRData.RaceTable.Races;

    // Drop & create tables with CASCADE option to remove dependent objects
    await db.query(`DROP TABLE IF EXISTS races CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS race_results CASCADE;`);

    // Schema definitions for the races and race_results tables
    await db.query(`
      CREATE TABLE races (
        race_id SERIAL PRIMARY KEY,
        race_name VARCHAR(100) NOT NULL,
        circuit VARCHAR(100),
        date DATE
      );
    `);

    await db.query(`
      CREATE TABLE race_results (
        result_id SERIAL PRIMARY KEY,
        race_id INT REFERENCES races(race_id) ON DELETE CASCADE,
        driver VARCHAR(100),
        constructor VARCHAR(100),
        position INT,
        points INT,
        status VARCHAR(100)
      );
    `);

    // Insert race data into the races table
    const racesInsertQuery = format(
      `INSERT INTO races (race_name, circuit, date) VALUES %L RETURNING race_id;`,
      races.map((race) => [race.raceName, race.Circuit.circuitName, race.date])
    );
    const racesResult = await db.query(racesInsertQuery);
    const raceIds = racesResult.rows.map((row) => row.race_id);

    // Fetch and insert race results for each race
    for (let i = 0; i < races.length; i++) {
      const raceId = raceIds[i];
      const race = races[i];
      const raceResultsResponse = await axios.get(
        `https://ergast.com/api/f1/2023/${race.round}/results.json`
      );
      const raceResults =
        raceResultsResponse.data.MRData.RaceTable.Races[0].Results;

      const raceResultsInsertQuery = format(
        `INSERT INTO race_results (race_id, driver, constructor, position, points, status) VALUES %L;`,
        raceResults.map((result) => [
          raceId,
          `${result.Driver.givenName} ${result.Driver.familyName}`,
          result.Constructor.name,
          parseInt(result.position),
          parseInt(result.points),
          result.status,
        ])
      );
      await db.query(raceResultsInsertQuery);
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit with a non-zero status code in case of error
  }
};

module.exports = seed;
