import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "book",
    "accessor": "Book",
    "op": "list",
    "method": "GET",
    "path": "/books",
    "args": [],
    "select": {
      "author_year_end": 1899,
      "author_year_start": 1800,
      "copyright": "true,false",
      "ids": "11,12,13",
      "language": "en,fr",
      "mime_type": "text/html",
      "search": "dickens great",
      "sort": "popular",
      "topic": "children"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "author_year_start",
      "author_year_end",
      "copyright",
      "ids",
      "languages",
      "mime_type",
      "search",
      "sort",
      "topic"
    ],
    "queryArgs": [
      {
        "name": "author_year_end",
        "wire": "author_year_end"
      },
      {
        "name": "author_year_start",
        "wire": "author_year_start"
      },
      {
        "name": "copyright",
        "wire": "copyright"
      },
      {
        "name": "ids",
        "wire": "ids"
      },
      {
        "name": "language",
        "wire": "languages"
      },
      {
        "name": "mime_type",
        "wire": "mime_type"
      },
      {
        "name": "search",
        "wire": "search"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "topic",
        "wire": "topic"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "count": 1,
      "next": "x",
      "previous": "x",
      "results": [
        {
          "id": 1,
          "title": "x",
          "subjects": [
            "x"
          ],
          "authors": [
            {
              "birth_year": 1,
              "death_year": 1,
              "name": "x"
            }
          ],
          "summaries": [
            "x"
          ],
          "translators": [
            {
              "birth_year": 1,
              "death_year": 1,
              "name": "x"
            }
          ],
          "bookshelves": [
            "x"
          ],
          "languages": [
            "x"
          ],
          "copyright": true,
          "media_type": "x",
          "formats": {
            "text/html": "https://www.gutenberg.org/ebooks/84.html.images",
            "application/epub+zip": "https://www.gutenberg.org/ebooks/84.epub.images",
            "text/plain": "https://www.gutenberg.org/files/84/84-0.txt"
          },
          "download_count": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "book",
    "accessor": "Book",
    "op": "load",
    "method": "GET",
    "path": "/books/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 84
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "title": "x",
      "subjects": [
        "x"
      ],
      "authors": [
        {
          "birth_year": 1,
          "death_year": 1,
          "name": "x"
        }
      ],
      "summaries": [
        "x"
      ],
      "translators": [
        {
          "birth_year": 1,
          "death_year": 1,
          "name": "x"
        }
      ],
      "bookshelves": [
        "x"
      ],
      "languages": [
        "x"
      ],
      "copyright": true,
      "media_type": "x",
      "formats": {
        "text/html": "https://www.gutenberg.org/ebooks/84.html.images",
        "application/epub+zip": "https://www.gutenberg.org/ebooks/84.epub.images",
        "text/plain": "https://www.gutenberg.org/files/84/84-0.txt"
      },
      "download_count": 1
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
