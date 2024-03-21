const seed = require('./seed');
const db = require('./connection');


// Calling the seed function to populate the database
// Once the seeding process completes, closing the database connection.
seed().then(()=>db.end())