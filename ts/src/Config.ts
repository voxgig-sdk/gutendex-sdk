
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://gutendex.com',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      book: {
      },

    }
  }


  entity = {
    "book": {
      "fields": [
        {
          "name": "author",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "bookshelf",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "copyright",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 2
        },
        {
          "name": "download_count",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "format",
          "req": true,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 4
        },
        {
          "name": "id",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 5
        },
        {
          "name": "language",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 6
        },
        {
          "name": "media_type",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        },
        {
          "name": "subject",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 8
        },
        {
          "name": "summary",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 9
        },
        {
          "name": "title",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 10
        },
        {
          "name": "translator",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 11
        }
      ],
      "name": "book",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 1899,
                    "kind": "query",
                    "name": "author_year_end",
                    "orig": "author_year_end",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 1800,
                    "kind": "query",
                    "name": "author_year_start",
                    "orig": "author_year_start",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "true,false",
                    "kind": "query",
                    "name": "copyright",
                    "orig": "copyright",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "11,12,13",
                    "kind": "query",
                    "name": "ids",
                    "orig": "ids",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "en,fr",
                    "kind": "query",
                    "name": "language",
                    "orig": "language",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "text/html",
                    "kind": "query",
                    "name": "mime_type",
                    "orig": "mime_type",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "dickens great",
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "popular",
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "children",
                    "kind": "query",
                    "name": "topic",
                    "orig": "topic",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/books",
              "parts": [
                "books"
              ],
              "select": {
                "exist": [
                  "author_year_end",
                  "author_year_start",
                  "copyright",
                  "ids",
                  "language",
                  "mime_type",
                  "search",
                  "sort",
                  "topic"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 84,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/books/{id}",
              "parts": [
                "books",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

