# Gutendex SDK configuration

module GutendexConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Gutendex",
        "slug" => "gutendex",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://gutendex.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "book" => {},
        },
      },
      "entity" => {
        "book" => {
          "fields" => [
            {
              "name" => "authors",
              "title" => "Authors",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "List of authors",
            },
            {
              "name" => "bookshelves",
              "title" => "Bookshelves",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "Project Gutenberg bookshelves the book belongs to",
            },
            {
              "name" => "copyright",
              "title" => "Copyright",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "Copyright status: true (copyrighted), false (public domain in USA), or null (no information)",
            },
            {
              "name" => "download_count",
              "title" => "Download Count",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Number of downloads from Project Gutenberg",
            },
            {
              "name" => "formats",
              "title" => "Formats",
              "type" => "`$OBJECT`",
              "req" => true,
              "short" => "Available formats for the book, where keys are MIME types and values are download URLs",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Project Gutenberg ID number",
            },
            {
              "name" => "languages",
              "title" => "Languages",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "List of two-character language codes",
            },
            {
              "name" => "media_type",
              "title" => "Media Type",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Media type of the book",
            },
            {
              "name" => "subjects",
              "title" => "Subjects",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "List of subjects associated with the book",
            },
            {
              "name" => "summaries",
              "title" => "Summaries",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "Book summaries",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Book title",
            },
            {
              "name" => "translators",
              "title" => "Translators",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "List of translators",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "book",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/books",
                  "segments" => [
                    {
                      "lit" => "books",
                    },
                  ],
                  "parts" => [
                    "books",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "author_year_end",
                        "orig" => "author_year_end",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1899,
                      },
                      {
                        "name" => "author_year_start",
                        "orig" => "author_year_start",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1800,
                      },
                      {
                        "name" => "copyright",
                        "orig" => "copyright",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "true,false",
                      },
                      {
                        "name" => "ids",
                        "orig" => "ids",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "11,12,13",
                      },
                      {
                        "name" => "language",
                        "orig" => "languages",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en,fr",
                      },
                      {
                        "name" => "mime_type",
                        "orig" => "mime_type",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "text/html",
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "dickens great",
                      },
                      {
                        "name" => "sort",
                        "orig" => "sort",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "popular",
                      },
                      {
                        "name" => "topic",
                        "orig" => "topic",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "children",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
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
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/books/{id}",
                  "segments" => [
                    {
                      "lit" => "books",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "books",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 84,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    GutendexFeatures.make_feature(name)
  end
end
