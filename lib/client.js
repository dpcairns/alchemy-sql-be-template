require('dotenv').config();

let client;


if(process.env.TEST) {
  const { newDb } = require('pg-mem');
  const db = newDb();
  class TestDb {
    connect() {
      this.db = db;
    }
  
    async query(sqlQuery, params = []) {
      const fakeSanitized = params
        .reduce((acc, curr, i) => {
          let mungedCurr;
          
          if(curr === true || curr === false) mungedCurr = curr;
          else if(!isNaN(Number(curr))) mungedCurr = Number(curr);
          else mungedCurr = `'${curr}'`;
          
          return acc.replace(`$${i + 1}`, mungedCurr);
        }, sqlQuery);

      const rows = await this.db.public.many(fakeSanitized); 

      return { rows };
    }
  
    end() {

    }
  }

  client = new TestDb();
} else {
// "require" pg (after `npm i pg`)
  const pg = require('pg');
  // Use the pg Client
  const Client = pg.Client;
  // note: you will need to create the database!
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSLMODE && { rejectUnauthorized: false }
  });
}
// export the client
module.exports = client;
