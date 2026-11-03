

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GutendexSDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('book hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GutendexSDK.test(offline).Book().stream('list')) { }
    }, /offline/)

    for await (const _item of GutendexSDK.test(offline).Book()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GutendexSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Book().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GutendexSDK.test().Book().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GutendexSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Book().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Book().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GutendexSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Book().list({"author_year_end":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GUTENDEX_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'book.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"authors":{"a":true,"h":"Authors","n":"authors","r":true,"sh":"List of authors","t":"`$ARRAY`","key$":"authors","index$":0},"bookshelves":{"a":true,"h":"Bookshelves","n":"bookshelves","r":true,"sh":"Project Gutenberg bookshelves the book belongs to","t":"`$ARRAY`","key$":"bookshelves","index$":1},"copyright":{"a":true,"h":"Copyright","n":"copyright","r":true,"sh":"Copyright status: true (copyrighted), false (public domain in USA), or null (no information)","t":"`$BOOLEAN`","key$":"copyright","index$":2},"download_count":{"a":true,"h":"Download Count","n":"download_count","r":true,"sh":"Number of downloads from Project Gutenberg","t":"`$INTEGER`","key$":"download_count","index$":3},"formats":{"a":true,"h":"Formats","n":"formats","r":true,"sh":"Available formats for the book, where keys are MIME types and values are download URLs","t":"`$OBJECT`","key$":"formats","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Project Gutenberg ID number","t":"`$INTEGER`","key$":"id","index$":5},"languages":{"a":true,"h":"Languages","n":"languages","r":true,"sh":"List of two-character language codes","t":"`$ARRAY`","key$":"languages","index$":6},"media_type":{"a":true,"h":"Media Type","n":"media_type","r":true,"sh":"Media type of the book","t":"`$STRING`","key$":"media_type","index$":7},"subjects":{"a":true,"h":"Subjects","n":"subjects","r":true,"sh":"List of subjects associated with the book","t":"`$ARRAY`","key$":"subjects","index$":8},"summaries":{"a":true,"h":"Summaries","n":"summaries","r":true,"sh":"Book summaries","t":"`$ARRAY`","key$":"summaries","index$":9},"title":{"a":true,"h":"Title","n":"title","r":true,"sh":"Book title","t":"`$STRING`","key$":"title","index$":10},"translators":{"a":true,"h":"Translators","n":"translators","r":true,"sh":"List of translators","t":"`$ARRAY`","key$":"translators","index$":11}},"id":{"field":"id","name":"id"},"name":"book","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /books","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1899,"k":"query","n":"author_year_end","or":"author_year_end","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1800,"k":"query","n":"author_year_start","or":"author_year_start","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"true,false","k":"query","n":"copyright","or":"copyright","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"11,12,13","k":"query","n":"ids","or":"ids","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":"en,fr","k":"query","n":"language","or":"languages","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"text/html","k":"query","n":"mime_type","or":"mime_type","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":"dickens great","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":"popular","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":"children","k":"query","n":"topic","or":"topic","r":false,"t":"`$STRING`","index$":8}]},"k":"http","m":"GET","o":"/books","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"books"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /books/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":84,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/books/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"books"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"book","name__orig":"book","Name":"Book","name_":"book","name-":"book","NAME":"BOOK","index$":0}, {"active":true,"entity":"book","key$":"BasicBookFlow","kind":"basic","name":"BasicBookFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"book_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"book_ref01","srcdatavar":"book_ref01_data","suffix":"_dt0"},"m":{"id":"book01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-book_ref01"}}],"index$":1,"route":"GET /books/{id}","record":{}}]}, 'Book', {"GET /books":{"protocol":"http","parameters":[{"name":"author_year_start","in":"query","description":"Find books with at least one author alive in or after this year. Must be a positive or negative integer.","required":false,"schema":{"type":"integer"},"example":1800,"index$":0},{"name":"author_year_end","in":"query","description":"Find books with at least one author alive in or before this year. Must be a positive or negative integer.","required":false,"schema":{"type":"integer"},"example":1899,"index$":1},{"name":"copyright","in":"query","description":"Filter by copyright status: true (existing copyrights), false (public domain in USA), or null (no information). Can be comma-separated.","required":false,"schema":{"type":"string"},"example":"true,false","index$":2},{"name":"ids","in":"query","description":"Comma-separated list of Project Gutenberg ID numbers.","required":false,"schema":{"type":"string"},"example":"11,12,13","index$":3},{"name":"languages","in":"query","description":"Comma-separated list of two-character language codes.","required":false,"schema":{"type":"string"},"example":"en,fr","index$":4},{"name":"mime_type","in":"query","description":"Filter books by MIME type. Matches books with MIME types starting with the given value.","required":false,"schema":{"type":"string"},"example":"text/html","index$":5},{"name":"search","in":"query","description":"Search author names and book titles. Words must be space-separated (URL-encoded as %20). Case-insensitive.","required":false,"schema":{"type":"string"},"example":"dickens great","index$":6},{"name":"sort","in":"query","description":"Sort order for books: 'ascending' (ID low to high), 'descending' (ID high to low), or 'popular' (most to least downloads, default).","required":false,"schema":{"type":"string","enum":["ascending","descending","popular"],"default":"popular"},"index$":7},{"name":"topic","in":"query","description":"Case-insensitive search for key-phrase in books' bookshelves or subjects.","required":false,"schema":{"type":"string"},"example":"children","index$":8}]},"GET /books/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"Project Gutenberg ID number of the book","required":true,"schema":{"type":"integer"},"example":84,"index$":0}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
