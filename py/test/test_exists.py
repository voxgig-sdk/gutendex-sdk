# ProjectName SDK exists test

import pytest
from gutendex_sdk import GutendexSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GutendexSDK.test(None, None)
        assert testsdk is not None
