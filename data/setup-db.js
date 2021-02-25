const client = require('../lib/client');
const drop = require('./drop-tables.js');
const create = require('./create-tables.js');
const load = require('./load-seed-data.js');

module.exports = async function() {
  await client.connect();
  
  await drop();
  await create();
  await load();

  await client.end();
};
