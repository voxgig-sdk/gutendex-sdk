
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GutendexSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = GutendexSDK.test()
    equal(testsdk instanceof GutendexSDK, true,
      'GutendexSDK.test() must return a client synchronously')
  })

})
