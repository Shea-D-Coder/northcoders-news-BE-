const request = require('supertest')
const endpointsJson = require("../endpoints.json");
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index.js');
const db = require('../db/connection.js');
const app = require('../app.js')


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
      });
  });
})
  describe("GET /api/articles", () => {
   test("200: Responds with an object with the key of articles and the value of an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const [{ 
          author,
          title,
          article_id,
          topic,
          created_at,
          votes,
          article_img_url,
          comment_count
        }] = body.articles;
        expect(typeof author).toBe('string');
        expect(typeof title).toBe('string');
        expect(typeof article_id).toBe('number');
        expect(typeof topic).toBe('string');
        expect(typeof created_at).toBe('string');
        expect(typeof votes).toBe('number');
        expect(typeof article_img_url).toBe('string');
        expect(typeof comment_count).toBe('number');
      });
  });
  test("200: Responds with an object with the article body not included", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body
        articles.forEach((article) => {
        expect(article).not.toHaveProperty("body");   
      })
    });
  });
  test("200: Responds with an object with the articles sorted by date in desending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;

        const articleDates = articles.map(article => article.created_at);

        const sortedArticlesByDates =[ ...articleDates].sort((latestArticle, earlierArticle) => {  
          return new Date(earlierArticle) - new Date(latestArticle );
        })
        expect(articleDates).toEqual(sortedArticlesByDates); 
      });
  });
})
  describe("GET /api/users", () => {
   test("200: Responds with an object with the key of users and the value of an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const [{ 
          username,
          name,
          avatar_url
        }] = body.users;
        expect(typeof username).toBe('string');
        expect(typeof name).toBe('string');
        expect(typeof avatar_url).toBe('string');
      });
    })
  })
describe("GET /api/articles/:article_id", () => {
   test("200: Responds with an object of the correct article, with the key of article and the value of that specific article object", () => {
    return request(app)
      .get("/api/articles/5")
      .expect(200)
      .then(({ body : bodyResponse }) => {
        const { 
          author,
          title,
          article_id,
          body,
          topic,
          created_at,
          votes,
          article_img_url
        } = bodyResponse.article
        expect(article_id).toBe(5);
         expect(typeof author).toBe('string');
        expect(typeof title).toBe('string');
        expect(typeof article_id).toBe('number');
        expect(typeof body).toBe('string')
        expect(typeof topic).toBe('string');
        expect(typeof created_at).toBe('string');
        expect(typeof votes).toBe('number');
        expect(typeof article_img_url).toBe('string');
        console.log(author)
    });
  })
    test(" GET - 400: Responds with an error if id is not valid", () => {
    return request(app)
      .get("/api/articles/five")
      .expect(400)
      .then(({ body}) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
})

  