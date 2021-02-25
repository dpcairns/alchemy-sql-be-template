require('dotenv').config();

const setupDb = require('../data/setup-db.js');

const fakeRequest = require('supertest');
const app = require('../lib/app');

const client = require('../lib/client.js');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      await setupDb();
      
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
