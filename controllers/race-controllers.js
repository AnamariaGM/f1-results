// Importing functions for querying the data, from the race models module
const {
    selectRaces,
    selectRaceById,
    selectAllRaceResults,
    selectResultsByRaceId
}=require('../models/race-models.js')

// Controller function to retrieve all races
exports.getAllRaces=(req, res, next)=>{
    // Call the function to fetch all races from database
    selectRaces().then((races) => {
        // Send the retrieve races as a JSON response with a 200 status code
        res.status(200).send({races})
    })
}

// Controller function to retrieve a race by its ID
exports.getRaceById=(req, res, next) => {
    const {race_id}=req.params
    selectRaceById(race_id).then((race)=>{
        res.status(200).send({race})
    })
}

// Controller function to retrieve all race results
exports.getAllRaceResults=(req,res, next)=>{
    selectAllRaceResults().then((result)=>{
        res.status(200).send({result})
    })
}

// Controller function to retrieve race results by race ID
exports.getRaceResultsByRaceId=(req,res, next)=>{
    const{race_id}=req.params
    selectResultsByRaceId(race_id).then((results)=>{
        res.status(200).send({results})
    })
}