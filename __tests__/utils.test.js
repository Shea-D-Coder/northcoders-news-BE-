const { convertTimestampToDate} = require("../db/seeds/utils");
const { createLookupObject } = require("../db/seeds/utils");



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

