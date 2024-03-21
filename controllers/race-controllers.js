// Importing functions for querying the data, from the race models module
const {
  selectRaces,
  selectRaceById,
  selectAllRaceResults,
  selectResultsByRaceId,
} = require("../models/race-models.js");

// Controller function to retrieve all races
exports.getAllRaces = (req, res, next) => {
  // Call the function to fetch all races from database
  selectRaces()
    .then((races) => {
      // Send the retrieve races as a JSON response with a 200 status code
      res.status(200).send({ races });
    })
    .catch((err) => {
      // Handling errors
      next(err);
    });
};

// Controller function to retrieve a race by its ID
exports.getRaceById = (req, res, next) => {
  const { race_id } = req.params;
  // Check if the race ID is a valid integer
  if (!Number.isInteger(parseInt(race_id))) {
    return res.status(400).json({ error: "Invalid race ID" });
  }
  selectRaceById(race_id)
    .then((race) => {
      // Check if the race exists
      if (!race) {
        // Send a 404 response if the race does not exist
        res.status(404).json({ msg: "Race not found" });
      } else {
        res.status(200).send({ race });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// Controller function to retrieve all race results
exports.getAllRaceResults = (req, res, next) => {
  selectAllRaceResults()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((err) => {
      next(err);
    });
};

// Controller function to retrieve race results by race ID
exports.getRaceResultsByRaceId = (req, res, next) => {
  const { race_id } = req.params;
  // Check if the race ID is a valid integer
  if (!Number.isInteger(parseInt(race_id))) {
    return res.status(400).json({ error: "Invalid race ID" });
  }
  selectResultsByRaceId(race_id)
    .then((results) => {
      // Check if the race results exist
      if (results.length === 0) {
        // Send a 404 response if the race results do not exist
        res.status(404).json({ msg: "Race results not found" });
      } else {
        res.status(200).send({ results });
      }
    })
    .catch((err) => {
      next(err);
    });
};
