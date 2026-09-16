-- Gutendex SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Gutendex",
      slug = "gutendex",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://gutendex.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["book"] = {},
      },
    },
    entity = {
      ["book"] = {
        ["fields"] = {
          {
            ["name"] = "authors",
            ["req"] = true,
            ["short"] = "List of authors",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "bookshelves",
            ["req"] = true,
            ["short"] = "Project Gutenberg bookshelves the book belongs to",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "copyright",
            ["req"] = true,
            ["short"] = "Copyright status: true (copyrighted), false (public domain in USA), or null (no information)",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "download_count",
            ["req"] = true,
            ["short"] = "Number of downloads from Project Gutenberg",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "formats",
            ["req"] = true,
            ["short"] = "Available formats for the book, where keys are MIME types and values are download URLs",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "Project Gutenberg ID number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "languages",
            ["req"] = true,
            ["short"] = "List of two-character language codes",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "media_type",
            ["req"] = true,
            ["short"] = "Media type of the book",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "subjects",
            ["req"] = true,
            ["short"] = "List of subjects associated with the book",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "summaries",
            ["req"] = true,
            ["short"] = "Book summaries",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "title",
            ["req"] = true,
            ["short"] = "Book title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "translators",
            ["req"] = true,
            ["short"] = "List of translators",
            ["type"] = "`$ARRAY`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "book",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1899,
                      ["kind"] = "query",
                      ["name"] = "author_year_end",
                      ["orig"] = "author_year_end",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 1800,
                      ["kind"] = "query",
                      ["name"] = "author_year_start",
                      ["orig"] = "author_year_start",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "true,false",
                      ["kind"] = "query",
                      ["name"] = "copyright",
                      ["orig"] = "copyright",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "11,12,13",
                      ["kind"] = "query",
                      ["name"] = "ids",
                      ["orig"] = "ids",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "en,fr",
                      ["kind"] = "query",
                      ["name"] = "language",
                      ["orig"] = "language",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "text/html",
                      ["kind"] = "query",
                      ["name"] = "mime_type",
                      ["orig"] = "mime_type",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "dickens great",
                      ["kind"] = "query",
                      ["name"] = "search",
                      ["orig"] = "search",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "popular",
                      ["kind"] = "query",
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "children",
                      ["kind"] = "query",
                      ["name"] = "topic",
                      ["orig"] = "topic",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/books",
                ["segments"] = {
                  {
                    ["lit"] = "books",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "author_year_end",
                    "author_year_start",
                    "copyright",
                    "ids",
                    "language",
                    "mime_type",
                    "search",
                    "sort",
                    "topic",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["parts"] = {
                  "books",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 84,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/books/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "books",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "books",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
