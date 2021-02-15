require('dotenv').config();
// "require" pg (after `npm i pg`)
const pg = require('pg');
// Use the pg Client
const Client = pg.Client;
// note: you will need to create the database!
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false }
});

// export the client
module.exports = client;
