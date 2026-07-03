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
            "auth": {
                "prefix": "Bearer",
            },
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
            "active": True,
            "name": "author",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "bookshelf",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "copyright",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "download_count",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "format",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "language",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "media_type",
            "req": True,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "subject",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "summary",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "title",
            "req": True,
            "type": "`$STRING`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "translator",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 11,
          },
        ],
        "name": "book",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": 1899,
                      "kind": "query",
                      "name": "author_year_end",
                      "orig": "author_year_end",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": 1800,
                      "kind": "query",
                      "name": "author_year_start",
                      "orig": "author_year_start",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": "true,false",
                      "kind": "query",
                      "name": "copyright",
                      "orig": "copyright",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "11,12,13",
                      "kind": "query",
                      "name": "ids",
                      "orig": "ids",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "en,fr",
                      "kind": "query",
                      "name": "language",
                      "orig": "language",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "text/html",
                      "kind": "query",
                      "name": "mime_type",
                      "orig": "mime_type",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "dickens great",
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "popular",
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "children",
                      "kind": "query",
                      "name": "topic",
                      "orig": "topic",
                      "reqd": False,
                      "type": "`$STRING`",
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": 84,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
