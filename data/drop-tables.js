const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

module.exports = async function() {

  try {
    console.log(' dropping tables . . . ', getEmoji(), getEmoji(), getEmoji());
    await client.connect();
    
    await client.query(`
            DROP TABLE IF EXISTS animals;
            DROP TABLE IF EXISTS users;
        `);

    console.log(' drop tables complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
};
