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
          article_id,
          title,
          topic,
          author,
          created_at,
          votes,
          article_img_url,
          comment_count
        }] = body.articles;
        expect(typeof article_id).toBe('number'); 
        expect(typeof title).toBe('string'); 
        expect(typeof topic).toBe('string');
        expect(typeof author).toBe('string');
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
          article_id,
          title,
          topic,
          author,
          body,
          created_at,
          votes,
          article_img_url
        } = bodyResponse.article
        expect(article_id).toBe(5);
        expect(typeof article_id).toBe('number'); 
        expect(typeof title).toBe('string'); 
        expect(typeof topic).toBe('string');
        expect(typeof author).toBe('string');
        expect(typeof body).toBe('string');
        expect(typeof created_at).toBe('string');
        expect(typeof votes).toBe('number');
        expect(typeof article_img_url).toBe('string');
       
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
    test(" GET - 404: Responds with an error with a valid article_id that does not exist", () => {
    return request(app)
      .get("/api/articles/99999999")
      .expect(404)
      .then(({ body}) => {
        expect(body.msg).toBe("Not Found");
      });
  });
})
describe("GET /api/articles/:article_id/comments", () => {
  test(" GET - 200: Responds with an empty array when passed and article/article_id that has no comments", () => {
    return request(app)
    .get("/api/articles/2/comments")
    .expect(200)
    .then(({ body}) => {
      expect(body.comments).toEqual([]);
    });
  });
   test("200: Responds with an object with the key of comments and an array of comments for a specific article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body : bodyResponse }) => {
        const [{ 
          comment_id,
          article_id,
          body,
          votes,
          author,
          created_at,
        }] = bodyResponse.comments
        expect(typeof comment_id).toBe('number');
        expect(article_id).toBe(1);
        expect(typeof body).toBe('string'); 
        expect(typeof votes).toBe('number');
        expect(typeof author).toBe('string');
        expect(typeof created_at).toBe('string');
        
        
        
    });
  })
   test("200: Responds with an object with the comments sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;

        const commentDates = comments.map(comment => comment.created_at);

        const sortedCommentsByDates =[ ...commentDates].sort((latestComment, earlierComment) => {  
          return new Date(earlierComment) - new Date(latestComment );
        })
        expect(commentDates).toEqual(sortedCommentsByDates); 
      });
  });
   test(" GET - 400: Responds with an error if article_id is not valid", () => {
    return request(app)
      .get("/api/articles/one/comments")
      .expect(400)
      .then(({ body}) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
     test(" GET - 404: Responds with an error with a valid article_id that does not exist", () => {
    return request(app)
      .get("/api/articles/99999999/comments")
      .expect(404)
      .then(({ body}) => {
        expect(body.msg).toBe("Not Found");
      });
  });
})
  describe("POST /api/articles/:article_id/comments", () => {
   test("POST - 201: Post a new comment for a specific article and responds with a newly posted comment ", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge",
        body: "Being consistent is a challenge"
      })
      .expect(201)
      .then(({ body : bodyResponse }) => {
        const { 
          comment_id,
          article_id,
          body,
          votes,
          author,
          created_at  
        } = bodyResponse.comment
         expect(typeof comment_id).toBe('number');
         expect(article_id).toBe(1);
         expect(typeof body).toBe('string');
         expect(typeof votes).toBe('number');
         expect(typeof author).toBe('string');
         expect(typeof created_at).toBe('string');  
      });
  });
    test(" POST - 400: Responds with an error when the request body is missing required fields username and body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({})
      .expect(400)
      .then(({ body}) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test(" POST - 404: Responds with an error when given a valid field but the reference value does not exist", () => {
    return request(app)
    .post("/api/articles/1/comments")
    .send({
      username: "Munchy200",
      body: "Being consistent is a challenge"
    })
    .expect(404)
    .then(({ body}) => {
      expect(body.msg).toBe("Not Found");
    });
  });
})
  describe("PATCH /api/articles/:article_id", () => {
     test("PATCH - 200: Responds with the article unchanged when sent a request with no information in the request body", () => {
    return request(app)
      .patch("/api/articles/4")
      .send({})
      .expect(200)
      .then(({body: bodyResponse})=> {
      const { 
         article_id,
         title,
         topic,
         author,
         body,
         created_at, 
         votes, 
         article_img_url
        } = bodyResponse.article
        expect(article_id).toBe(4);
        expect(typeof article_id).toBe('number');
        expect(typeof title).toBe('string');
        expect(typeof topic).toBe('string');
        expect(typeof author).toBe('string');
        expect(typeof body).toBe('string');
        expect(typeof created_at).toBe('string');
        expect(typeof votes).toBe('number');
        expect(typeof article_img_url).toBe('string');
      })
    })
   test("PATCH - 200: Responds with the updated article when sent a valid inc_votes object by article_id", () => {
    return request(app)
      .patch("/api/articles/4")
      .send({
        inc_votes: 70
        })
      .expect(200)
      .then(({ body: bodyResponse }) => {
        const { 
         article_id,
         title,
         topic,
         author,
         body,
         created_at, 
         votes, 
         article_img_url
        } = bodyResponse.article
        expect(article_id).toBe(4);
        expect(typeof article_id).toBe('number');
        expect(typeof title).toBe('string');
        expect(typeof topic).toBe('string');
        expect(typeof author).toBe('string');
        expect(typeof body).toBe('string');
        expect(typeof created_at).toBe('string');
        expect(typeof votes).toBe('number');
        expect(typeof article_img_url).toBe('string');
      });
  });
  test("PATCH - 200: Responds with the updated article when sent a valid inc_votes object by article_id to decrease the votes with a negative number", () => {
    return request(app)
      .patch("/api/articles/4")
      .send({
        inc_votes: -5
        })
      .expect(200)
      .then(({body: bodyResponse})=> {
      const { 
         article_id,
         title,
         topic,
         author,
         body,
         created_at, 
         votes, 
         article_img_url
        } = bodyResponse.article
        expect(article_id).toBe(4);
        expect(typeof article_id).toBe('number');
        expect(typeof title).toBe('string');
        expect(typeof topic).toBe('string');
        expect(typeof author).toBe('string');
        expect(typeof body).toBe('string');
        expect(typeof created_at).toBe('string');
        expect(typeof votes).toBe('number');
        expect(typeof article_img_url).toBe('string');
      })
    }) 
      test(" PATCH - 400: Responds with an error when the request body contains an invalid value", () => {
    return request(app)
      .patch("/api/articles/4")
      .send({inc_votes: "twenty"})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
    });
       test(" PATCH - 400: Responds with an error with a valid article_id that does not exist", () => {
    return request(app)
      .patch("/api/articles/99999999")
      .send({inc_votes: 120})
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
    });
  })

  