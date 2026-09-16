

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GutendexSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('BookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GUTENDEX_TEST_LIVE=TRUE.
  afterEach(liveDelay('GUTENDEX_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GutendexSDK.test()
    const ent = testsdk.Book()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GUTENDEX_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'book.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"authors","req":true,"short":"List of authors","type":"`$ARRAY`","index$":0},{"active":true,"name":"bookshelves","req":true,"short":"Project Gutenberg bookshelves the book belongs to","type":"`$ARRAY`","index$":1},{"active":true,"name":"copyright","req":true,"short":"Copyright status: true (copyrighted), false (public domain in USA), or null (no information)","type":"`$BOOLEAN`","index$":2},{"active":true,"name":"download_count","req":true,"short":"Number of downloads from Project Gutenberg","type":"`$INTEGER`","index$":3},{"active":true,"name":"formats","req":true,"short":"Available formats for the book, where keys are MIME types and values are download URLs","type":"`$OBJECT`","index$":4},{"active":true,"name":"id","req":true,"short":"Project Gutenberg ID number","type":"`$INTEGER`","index$":5},{"active":true,"name":"languages","req":true,"short":"List of two-character language codes","type":"`$ARRAY`","index$":6},{"active":true,"name":"media_type","req":true,"short":"Media type of the book","type":"`$STRING`","index$":7},{"active":true,"name":"subjects","req":true,"short":"List of subjects associated with the book","type":"`$ARRAY`","index$":8},{"active":true,"name":"summaries","req":true,"short":"Book summaries","type":"`$ARRAY`","index$":9},{"active":true,"name":"title","req":true,"short":"Book title","type":"`$STRING`","index$":10},{"active":true,"name":"translators","req":true,"short":"List of translators","type":"`$ARRAY`","index$":11}],"id":{"field":"id","name":"id"},"name":"book","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1899,"kind":"query","name":"author_year_end","orig":"author_year_end","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":1800,"kind":"query","name":"author_year_start","orig":"author_year_start","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":"true,false","kind":"query","name":"copyright","orig":"copyright","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"11,12,13","kind":"query","name":"ids","orig":"ids","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"example":"en,fr","kind":"query","name":"language","orig":"language","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"example":"text/html","kind":"query","name":"mime_type","orig":"mime_type","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"example":"dickens great","kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":6},{"active":true,"example":"popular","kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$STRING`","index$":7},{"active":true,"example":"children","kind":"query","name":"topic","orig":"topic","reqd":false,"type":"`$STRING`","index$":8}]},"contract":{"id":"GET /books","json":"{\"operationId\":\"getBooks\",\"parameters\":[{\"description\":\"Find books with at least one author alive in or after this year. Must be a positive or negative integer.\",\"example\":1800,\"in\":\"query\",\"name\":\"author_year_start\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Find books with at least one author alive in or before this year. Must be a positive or negative integer.\",\"example\":1899,\"in\":\"query\",\"name\":\"author_year_end\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Filter by copyright status: true (existing copyrights), false (public domain in USA), or null (no information). Can be comma-separated.\",\"example\":\"true,false\",\"in\":\"query\",\"name\":\"copyright\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated list of Project Gutenberg ID numbers.\",\"example\":\"11,12,13\",\"in\":\"query\",\"name\":\"ids\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated list of two-character language codes.\",\"example\":\"en,fr\",\"in\":\"query\",\"name\":\"languages\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter books by MIME type. Matches books with MIME types starting with the given value.\",\"example\":\"text/html\",\"in\":\"query\",\"name\":\"mime_type\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Search author names and book titles. Words must be space-separated (URL-encoded as %20). Case-insensitive.\",\"example\":\"dickens great\",\"in\":\"query\",\"name\":\"search\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Sort order for books: 'ascending' (ID low to high), 'descending' (ID high to low), or 'popular' (most to least downloads, default).\",\"in\":\"query\",\"name\":\"sort\",\"required\":false,\"schema\":{\"default\":\"popular\",\"enum\":[\"ascending\",\"descending\",\"popular\"],\"type\":\"string\"}},{\"description\":\"Case-insensitive search for key-phrase in books' bookshelves or subjects.\",\"example\":\"children\",\"in\":\"query\",\"name\":\"topic\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"Total number of books for the query across all pages\",\"type\":\"integer\"},\"next\":{\"description\":\"URL to the next page of results, or null if on the last page\",\"nullable\":true,\"type\":\"string\"},\"previous\":{\"description\":\"URL to the previous page of results, or null if on the first page\",\"nullable\":true,\"type\":\"string\"},\"results\":{\"description\":\"Array of 0-32 book objects\",\"items\":{\"properties\":{\"authors\":{\"description\":\"List of authors\",\"items\":{\"properties\":{\"birth_year\":{\"description\":\"Year of birth, or null if unknown\",\"nullable\":true,\"type\":\"integer\"},\"death_year\":{\"description\":\"Year of death, or null if unknown\",\"nullable\":true,\"type\":\"integer\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"}},\"required\":[\"birth_year\",\"death_year\",\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"bookshelves\":{\"description\":\"Project Gutenberg bookshelves the book belongs to\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"copyright\":{\"description\":\"Copyright status: true (copyrighted), false (public domain in USA), or null (no information)\",\"nullable\":true,\"type\":\"boolean\"},\"download_count\":{\"description\":\"Number of downloads from Project Gutenberg\",\"type\":\"integer\"},\"formats\":{\"additionalProperties\":{\"format\":\"uri\",\"type\":\"string\"},\"description\":\"Available formats for the book, where keys are MIME types and values are download URLs\",\"example\":{\"application/epub+zip\":\"https://www.gutenberg.org/ebooks/84.epub.images\",\"text/html\":\"https://www.gutenberg.org/ebooks/84.html.images\",\"text/plain\":\"https://www.gutenberg.org/files/84/84-0.txt\"},\"type\":\"object\"},\"id\":{\"description\":\"Project Gutenberg ID number\",\"type\":\"integer\"},\"languages\":{\"description\":\"List of two-character language codes\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"media_type\":{\"description\":\"Media type of the book\",\"type\":\"string\"},\"subjects\":{\"description\":\"List of subjects associated with the book\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"summaries\":{\"description\":\"Book summaries\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"description\":\"Book title\",\"type\":\"string\"},\"translators\":{\"description\":\"List of translators\",\"items\":{\"properties\":{\"birth_year\":{\"description\":\"Year of birth, or null if unknown\",\"nullable\":true,\"type\":\"integer\"},\"death_year\":{\"description\":\"Year of death, or null if unknown\",\"nullable\":true,\"type\":\"integer\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"}},\"required\":[\"birth_year\",\"death_year\",\"name\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"id\",\"title\",\"subjects\",\"authors\",\"summaries\",\"translators\",\"bookshelves\",\"languages\",\"copyright\",\"media_type\",\"formats\",\"download_count\"],\"type\":\"object\"},\"maxItems\":32,\"minItems\":0,\"type\":\"array\"}},\"required\":[\"count\",\"next\",\"previous\",\"results\"],\"type\":\"object\"}}},\"description\":\"Successful response with paginated list of books\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"required\":[\"detail\"],\"type\":\"object\"}}},\"description\":\"Bad request\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/books","segments":[{"lit":"books"}],"select":{"exist":["author_year_end","author_year_start","copyright","ids","language","mime_type","search","sort","topic"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":84,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /books/{id}","json":"{\"operationId\":\"getBookById\",\"parameters\":[{\"description\":\"Project Gutenberg ID number of the book\",\"example\":84,\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"authors\":{\"description\":\"List of authors\",\"items\":{\"properties\":{\"birth_year\":{\"description\":\"Year of birth, or null if unknown\",\"nullable\":true,\"type\":\"integer\"},\"death_year\":{\"description\":\"Year of death, or null if unknown\",\"nullable\":true,\"type\":\"integer\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"}},\"required\":[\"birth_year\",\"death_year\",\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"bookshelves\":{\"description\":\"Project Gutenberg bookshelves the book belongs to\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"copyright\":{\"description\":\"Copyright status: true (copyrighted), false (public domain in USA), or null (no information)\",\"nullable\":true,\"type\":\"boolean\"},\"download_count\":{\"description\":\"Number of downloads from Project Gutenberg\",\"type\":\"integer\"},\"formats\":{\"additionalProperties\":{\"format\":\"uri\",\"type\":\"string\"},\"description\":\"Available formats for the book, where keys are MIME types and values are download URLs\",\"example\":{\"application/epub+zip\":\"https://www.gutenberg.org/ebooks/84.epub.images\",\"text/html\":\"https://www.gutenberg.org/ebooks/84.html.images\",\"text/plain\":\"https://www.gutenberg.org/files/84/84-0.txt\"},\"type\":\"object\"},\"id\":{\"description\":\"Project Gutenberg ID number\",\"type\":\"integer\"},\"languages\":{\"description\":\"List of two-character language codes\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"media_type\":{\"description\":\"Media type of the book\",\"type\":\"string\"},\"subjects\":{\"description\":\"List of subjects associated with the book\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"summaries\":{\"description\":\"Book summaries\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"description\":\"Book title\",\"type\":\"string\"},\"translators\":{\"description\":\"List of translators\",\"items\":{\"properties\":{\"birth_year\":{\"description\":\"Year of birth, or null if unknown\",\"nullable\":true,\"type\":\"integer\"},\"death_year\":{\"description\":\"Year of death, or null if unknown\",\"nullable\":true,\"type\":\"integer\"},\"name\":{\"description\":\"Full name of the person\",\"type\":\"string\"}},\"required\":[\"birth_year\",\"death_year\",\"name\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"id\",\"title\",\"subjects\",\"authors\",\"summaries\",\"translators\",\"bookshelves\",\"languages\",\"copyright\",\"media_type\",\"formats\",\"download_count\"],\"type\":\"object\"}}},\"description\":\"Successful response with book details\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"required\":[\"detail\"],\"type\":\"object\"}}},\"description\":\"Book not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/books/{id}","segments":[{"lit":"books"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"book","name__orig":"book","Name":"Book","name_":"book","name-":"book","NAME":"BOOK","index$":0}, {"active":true,"entity":"book","key$":"BasicBookFlow","kind":"basic","name":"BasicBookFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"book_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"book_ref01","srcdatavar":"book_ref01_data","suffix":"_dt0"},"match":{"id":"book01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-book_ref01"}}],"index$":1}]}, 'Book')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let book_ref01_data = Object.values(setup.data.existing.book)[0] as any

    // LIST
    const book_ref01_ent = client.Book()
    const book_ref01_match: any = {}

    const book_ref01_list = (await book_ref01_ent.list(book_ref01_match)).map((e: any) => e.data())


    // LOAD
    const book_ref01_match_dt0: any = {}
    book_ref01_match_dt0.id = book_ref01_data.id
    const book_ref01_data_dt0 = (await book_ref01_ent.load(book_ref01_match_dt0)).data()
    assert(book_ref01_data_dt0.id === book_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/book/BookTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GutendexSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['book01','book02','book03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GUTENDEX_TEST_BOOK_ENTID': idmap,
    'GUTENDEX_TEST_LIVE': 'FALSE',
    'GUTENDEX_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GUTENDEX_TEST_BOOK_ENTID']

  const live = 'TRUE' === env.GUTENDEX_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GUTENDEX_TEST_BOOK_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GutendexSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.GUTENDEX_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
