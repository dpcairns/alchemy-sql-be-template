const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

module.exports = async function() {
  try {
    // run a query to create tables
    await client.query(`
                  CREATE TABLE users (
                      id SERIAL PRIMARY KEY,
                      email VARCHAR(256) NOT NULL,
                      hash VARCHAR(512) NOT NULL
                  );           
                  CREATE TABLE animals (
                      id SERIAL PRIMARY KEY NOT NULL,
                      name VARCHAR(512) NOT NULL,
                      cool_factor INTEGER NOT NULL,
                      owner_id INTEGER NOT NULL,
                      CONSTRAINT fk_owner_id
                        FOREIGN KEY(owner_id) 
                        REFERENCES users(id)
              );
          `);
  
    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  
};
  