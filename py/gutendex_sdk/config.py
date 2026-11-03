# Gutendex SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Gutendex",
            "slug": "gutendex",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "name": "authors",
            "title": "Authors",
            "type": "`$ARRAY`",
            "req": True,
            "short": "List of authors",
          },
          {
            "name": "bookshelves",
            "title": "Bookshelves",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Project Gutenberg bookshelves the book belongs to",
          },
          {
            "name": "copyright",
            "title": "Copyright",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "Copyright status: true (copyrighted), false (public domain in USA), or null (no information)",
          },
          {
            "name": "download_count",
            "title": "Download Count",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Number of downloads from Project Gutenberg",
          },
          {
            "name": "formats",
            "title": "Formats",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Available formats for the book, where keys are MIME types and values are download URLs",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Project Gutenberg ID number",
          },
          {
            "name": "languages",
            "title": "Languages",
            "type": "`$ARRAY`",
            "req": True,
            "short": "List of two-character language codes",
          },
          {
            "name": "media_type",
            "title": "Media Type",
            "type": "`$STRING`",
            "req": True,
            "short": "Media type of the book",
          },
          {
            "name": "subjects",
            "title": "Subjects",
            "type": "`$ARRAY`",
            "req": True,
            "short": "List of subjects associated with the book",
          },
          {
            "name": "summaries",
            "title": "Summaries",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Book summaries",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
            "short": "Book title",
          },
          {
            "name": "translators",
            "title": "Translators",
            "type": "`$ARRAY`",
            "req": True,
            "short": "List of translators",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "book",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/books",
                "segments": [
                  {
                    "lit": "books",
                  },
                ],
                "parts": [
                  "books",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {
                  "query": [
                    {
                      "name": "author_year_end",
                      "orig": "author_year_end",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1899,
                    },
                    {
                      "name": "author_year_start",
                      "orig": "author_year_start",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1800,
                    },
                    {
                      "name": "copyright",
                      "orig": "copyright",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "true,false",
                      "field": True,
                    },
                    {
                      "name": "ids",
                      "orig": "ids",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "11,12,13",
                    },
                    {
                      "name": "language",
                      "orig": "languages",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en,fr",
                    },
                    {
                      "name": "mime_type",
                      "orig": "mime_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "text/html",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "dickens great",
                    },
                    {
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "popular",
                    },
                    {
                      "name": "topic",
                      "orig": "topic",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "children",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/books/{id}",
                "segments": [
                  {
                    "lit": "books",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "books",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 84,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
