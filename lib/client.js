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
      const fakeSanitized = sqlQuery
        .replace('$1', `'${params[0]}'`)
        .replace('$2', `'${params[1]}'`)
        .replace('$3', `'${params[2]}'`)
        .replace('$4', `'${params[3]}'`)
        .replace('$5', `'${params[4]}'`)
        .replace('$6', `'${params[5]}'`)
        .replace('$7', `'${params[6]}'`)
        .replace('$8', `'${params[7]}'`);

      const it = await this.db.public.many(fakeSanitized); 

      return { rows: it };
    }
  
    end() {
      console.log('ending!');
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
