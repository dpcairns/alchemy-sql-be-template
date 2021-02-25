require('dotenv').config();

const drop = require('../data/drop-tables-fn.js');
const create = require('../data/create-tables-fn.js');
const load = require('../data/load-seed-data-fn.js');

const fakeRequest = require('supertest');
const app = require('../lib/app');

process.env.TEXT = true;

const client = require('../lib/client.js');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      await drop();
      await create();
      await load();
      
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      process.env.TEXT = false;

      return client.end(done);
    });

    test('returns animals', async() => {
      const expectation = [
        {
          'id': 1,
          'name': 'bessie',
          'cool_factor': 3,
          'owner_id': 1
        },
        {
          'id': 2,
          'name': 'jumpy',
          'cool_factor': 4,
          'owner_id': 1
        },
        {
          'id': 3,
          'name': 'spot',
          'cool_factor': 10,
          'owner_id': 1
        }
      ];

      const data = await fakeRequest(app)
        .get('/animals')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
  });
});
