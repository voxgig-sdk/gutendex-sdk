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
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "req" => true,
              "short" => "List of authors",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "bookshelves",
              "req" => true,
              "short" => "Project Gutenberg bookshelves the book belongs to",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "copyright",
              "req" => true,
              "short" => "Copyright status: true (copyrighted), false (public domain in USA), or null (no information)",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "download_count",
              "req" => true,
              "short" => "Number of downloads from Project Gutenberg",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "formats",
              "req" => true,
              "short" => "Available formats for the book, where keys are MIME types and values are download URLs",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "id",
              "req" => true,
              "short" => "Project Gutenberg ID number",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "languages",
              "req" => true,
              "short" => "List of two-character language codes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "media_type",
              "req" => true,
              "short" => "Media type of the book",
              "type" => "`$STRING`",
            },
            {
              "name" => "subjects",
              "req" => true,
              "short" => "List of subjects associated with the book",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "summaries",
              "req" => true,
              "short" => "Book summaries",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "title",
              "req" => true,
              "short" => "Book title",
              "type" => "`$STRING`",
            },
            {
              "name" => "translators",
              "req" => true,
              "short" => "List of translators",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "book",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1899,
                        "kind" => "query",
                        "name" => "author_year_end",
                        "orig" => "author_year_end",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 1800,
                        "kind" => "query",
                        "name" => "author_year_start",
                        "orig" => "author_year_start",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "true,false",
                        "kind" => "query",
                        "name" => "copyright",
                        "orig" => "copyright",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "11,12,13",
                        "kind" => "query",
                        "name" => "ids",
                        "orig" => "ids",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "en,fr",
                        "kind" => "query",
                        "name" => "language",
                        "orig" => "language",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "text/html",
                        "kind" => "query",
                        "name" => "mime_type",
                        "orig" => "mime_type",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "dickens great",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "popular",
                        "kind" => "query",
                        "name" => "sort",
                        "orig" => "sort",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "children",
                        "kind" => "query",
                        "name" => "topic",
                        "orig" => "topic",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/books",
                  "parts" => [
                    "books",
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 84,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/books/{id}",
                  "parts" => [
                    "books",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
