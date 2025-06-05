const request = require('supertest')
const endpointsJson = require("../endpoints.json");
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index.js');
const db = require('../db/connection.js');
const app = require('../app.js')
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

beforeEach(() => { 
   return seed(data)
})

afterAll(() => {
return db.end()
})

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
})
  describe("GET /api/topics", () => {
   test("200: Responds with an object with the key of topics and the value of an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const [{ 
          slug,
          description,
          img_url
        }] = body.topics;
        expect(typeof slug).toBe('string');
        expect(typeof description).toBe('string');
        expect(typeof img_url).toBe('string');
        console.log(body)
      });
  });
})