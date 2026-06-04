# Gutendex SDK configuration


def make_config():
    return {
        "main": {
            "name": "Gutendex",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://gutendex.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "book": {},
            },
        },
        "entity": {
      "book": {
        "fields": [
          {
            "name": "author",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "bookshelf",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "copyright",
            "req": True,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "download_count",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "format",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "language",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "media_type",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "subject",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "summary",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "title",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "translator",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 11,
          },
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
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": 1800,
                      "kind": "query",
                      "name": "author_year_start",
                      "orig": "author_year_start",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": "true,false",
                      "kind": "query",
                      "name": "copyright",
                      "orig": "copyright",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "11,12,13",
                      "kind": "query",
                      "name": "ids",
                      "orig": "ids",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "en,fr",
                      "kind": "query",
                      "name": "language",
                      "orig": "language",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "text/html",
                      "kind": "query",
                      "name": "mime_type",
                      "orig": "mime_type",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "dickens great",
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "popular",
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "children",
                      "kind": "query",
                      "name": "topic",
                      "orig": "topic",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/books",
                "parts": [
                  "books",
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
                    "topic",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/books/{id}",
                "parts": [
                  "books",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
