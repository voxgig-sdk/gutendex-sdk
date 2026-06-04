# Gutendex SDK

Query Project Gutenberg ebook metadata over a simple JSON web API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Gutendex

[Gutendex](https://gutendex.com) is a JSON web API that exposes metadata for the public-domain ebook collection at [Project Gutenberg](https://www.gutenberg.org). The project is open source and community-maintained on GitHub (`garethbjohnson/gutendex`), and the hosted instance lets you query books without setting up your own server.

What you get from the API:

- `GET /books` returns paginated lists of books, with filters for `author_year_start`/`author_year_end`, `copyright`, `ids`, `languages`, `mime_type`, `search`, `sort` (ascending, descending, popular), and `topic` (bookshelves and subjects).
- `GET /books/<id>` returns a single book by its Project Gutenberg ID.
- Each book object includes `id`, `title`, `subjects`, `authors`, `summaries`, `translators`, `bookshelves`, `languages`, `copyright`, `media_type`, `formats` (download URLs by MIME type), and `download_count`.

The underlying ebook content and metadata come from Project Gutenberg. The hosted API does not document authentication or rate limits, and CORS is reported as disabled, so browser-side calls may need a proxy. You can self-host from the source repository if you need a more reliable instance.

## Try it

**TypeScript**
```bash
npm install gutendex
```

**Python**
```bash
pip install gutendex-sdk
```

**PHP**
```bash
composer require voxgig/gutendex-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/gutendex-sdk/go
```

**Ruby**
```bash
gem install gutendex-sdk
```

**Lua**
```bash
luarocks install gutendex-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { GutendexSDK } from 'gutendex'

const client = new GutendexSDK({})

// List all books
const books = await client.Book().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o gutendex-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "gutendex": {
      "command": "/abs/path/to/gutendex-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Book** | A Project Gutenberg ebook record, including title, authors, languages, subjects, bookshelves, copyright status, and download links — listed at `/books` and fetched individually at `/books/<id>`. | `/books` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from gutendex_sdk import GutendexSDK

client = GutendexSDK({})

# List all books
books, err = client.Book(None).list(None, None)

# Load a specific book
book, err = client.Book(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'gutendex_sdk.php';

$client = new GutendexSDK([]);

// List all books
[$books, $err] = $client->Book(null)->list(null, null);

// Load a specific book
[$book, $err] = $client->Book(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/gutendex-sdk/go"

client := sdk.NewGutendexSDK(map[string]any{})

// List all books
books, err := client.Book(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Gutendex_sdk"

client = GutendexSDK.new({})

# List all books
books, err = client.Book(nil).list(nil, nil)

# Load a specific book
book, err = client.Book(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("gutendex_sdk")

local client = sdk.new({})

-- List all books
local books, err = client:Book(nil):list(nil, nil)

-- Load a specific book
local book, err = client:Book(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = GutendexSDK.test()
const result = await client.Book().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = GutendexSDK.test(None, None)
result, err = client.Book(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = GutendexSDK::test(null, null);
[$result, $err] = $client->Book(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Book(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GutendexSDK.test(nil, nil)
result, err = client.Book(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Book(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Gutendex

- Upstream: [https://gutendex.com](https://gutendex.com)

---

Generated from the Gutendex OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
