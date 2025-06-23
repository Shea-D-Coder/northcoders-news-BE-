const { convertTimestampToDate} = require("../db/seeds/utils");
const { createLookupObject } = require("../db/seeds/utils");
const { checkExists } = require ("../models/utils")
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index.js');

beforeEach(() => { 
   return seed(data)
})

afterAll(() => {
return db.end()
})

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});


describe("createLookupObject", () => {
  test(" returns an empty object when passed an empty array", () => {
    const key = 'title'
    const value = 'article_id'
    expect(createLookupObject([], key, value)).toEqual({})
  })
  test(" returns an object with the correct key and value referenced when passed an array with one object", () => {
    const input = [{  article_id: 1, title: 'zombies'}]

    const key = 'title'
     const value = 'article_id'

    const expected = { zombies: 1}
    const actual = createLookupObject(input, key, value)
    expect(actual).toEqual(expected)
  })
  test(" returns an object with the correct keys and values referenced when passed an array with multiple object", () => {
     const input = [
                   { article_id: 1, title: "You Only Look Once"},
                   { article_id: 2, title: "Zombie Apocalypse" },
                   { article_id: 3, title: "Fantastic Yeast"},
                   { article_id: 4, title: "The case of the disappearing toe"}
                  ]
     const key = 'title'
     const value = 'article_id'
    const expected = {
                      "You Only Look Once": 1,
                      "Zombie Apocalypse": 2,
                      "Fantastic Yeast":3,
                      "The case of the disappearing toe": 4
                      }
    const actual = createLookupObject(input, key, value)
    expect(actual).toEqual(expected)          
  })
  test(" the original array has not been mutated ", () => {
  const input = [
                   { article_id: 1, title: "You Only Look Once"},
                   { article_id: 2, title: "Zombie Apocalypse" },
                   { article_id: 3, title: "Fantastic Yeast"},
                   { article_id: 4, title: "The case of the disappearing toe"}
                  ]
   
    const inputCopy = [];
    for (const obj of input){
      inputCopy.push({...obj})
    }
                  
    createLookupObject(input)
    expect(input).toEqual(inputCopy) 
  })
})

describe("checkExists", () => {
  test(" returns true when the topic exists on the topic table", () => {
    const table = 'topics'
    const column = 'slug'
    const value = 'mitch'

    return checkExists(table, column, value)
    .then ((actual) => {
      const expected = true
      expect(typeof actual).toBe("boolean")
      expect(actual).toBe(expected)
    })
  })
   test(" returns false when the topic does not exists on the topic table", () => {
    const table = 'topics'
    const column = 'slug'
    const value = 'mango'

    return checkExists(table, column, value)
    .then ((actual) => {
      const expected = false
      expect(typeof actual).toBe("boolean")
      expect(actual).toBe(expected)
    })
  })
   test(" returns true when the username exists on the user table", () => {
    const table = 'users'
    const column = 'username'
    const value = 'butter_bridge'

    return checkExists(table, column, value)
    .then ((actual) => {
      const expected = true
      expect(typeof actual).toBe("boolean")
      expect(actual).toBe(expected)
    })
  })
   test(" returns false when the username does not exists on the user table", () => {
    const table = 'users'
    const column = 'username'
    const value = 'shea_d_coder'

    return checkExists(table, column, value)
    .then ((actual) => {
      const expected = false
      expect(typeof actual).toBe("boolean")
      expect(actual).toBe(expected)
    })
  })
  test(" returns true when the article exists on the articles table", () => {
    const table = 'articles'
    const column = 'article_id'
    const value = 1

    return checkExists(table, column, value)
    .then ((actual) => {
      const expected = true
      expect(typeof actual).toBe("boolean")
      expect(actual).toBe(expected)
    })
  })
})


