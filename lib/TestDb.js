const { newDb } = require('pg-mem');

const db = newDb();

class TestDb {
  connect() {
    this.db = db;
  }
  
  sanitizeQuery(query, params) {
    return params
      .reduce((acc, curr, i) => {
        let mungedCurr;
        
        if(curr === true || curr === false) mungedCurr = curr;
        else if(!isNaN(Number(curr))) mungedCurr = Number(curr);
        else mungedCurr = `'${curr}'`;
        
        return acc.replace(`$${i + 1}`, mungedCurr);
      }, query);
  }

  async query(sqlQuery, params = []) {
    const fakeSanitized = this.sanitizeQuery(sqlQuery, params);

    const rows = await this.db.public.many(fakeSanitized); 

    return { rows };
  }

  end() {

  }
}

module.exports = TestDb;