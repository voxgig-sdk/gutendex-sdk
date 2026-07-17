-- Gutendex SDK exists test

local sdk = require("gutendex_sdk")

describe("GutendexSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
