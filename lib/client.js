require('dotenv').config();

let client;

// "require" pg (after `npm i pg`)
const pg = require('pg');
// Use the pg Client
const Client = pg.Client;
// note: you will need to create the database!
const liveClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false }
});

if(process.env.TEST) {
  const TestDb = require('./TestDb.js');

  client = new TestDb();
} else {
  client = liveClient;
}
// export the client
module.exports = client;
