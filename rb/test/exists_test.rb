# Gutendex SDK exists test

require "minitest/autorun"
require_relative "../Gutendex_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = GutendexSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
