const drop = require('./drop-tables.js');
const create = require('./create-tables.js');
const load = require('./load-seed-data.js');

module.exports = async function() {
  await drop();
  await create();
  await load();
};
