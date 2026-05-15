
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { GutendexSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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
      if (maybeSkipControl(t, 'entityOp', 'book.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set GUTENDEX_TEST_BOOK_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let book_ref01_data = Object.values(setup.data.existing.book)[0] as any

    // LIST
    const book_ref01_ent = client.Book()
    const book_ref01_match: any = {}

    const book_ref01_list = await book_ref01_ent.list(book_ref01_match)


    // LOAD
    const book_ref01_match_dt0: any = {}
    book_ref01_match_dt0.id = book_ref01_data.id
    const book_ref01_data_dt0 = await book_ref01_ent.load(book_ref01_match_dt0)
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['GUTENDEX_TEST_BOOK_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'GUTENDEX_TEST_BOOK_ENTID': idmap,
    'GUTENDEX_TEST_LIVE': 'FALSE',
    'GUTENDEX_TEST_EXPLAIN': 'FALSE',
    'GUTENDEX_APIKEY': 'NONE',
  })

  idmap = env['GUTENDEX_TEST_BOOK_ENTID']

  const live = 'TRUE' === env.GUTENDEX_TEST_LIVE

  if (live) {
    client = new GutendexSDK(merge([
      {
        apikey: env.GUTENDEX_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
