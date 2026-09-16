# Gutendex SDK feature factory

from gutendex_sdk.feature.base_feature import GutendexBaseFeature
from gutendex_sdk.feature.ratelimit_feature import GutendexRatelimitFeature
from gutendex_sdk.feature.retry_feature import GutendexRetryFeature
from gutendex_sdk.feature.test_feature import GutendexTestFeature
from gutendex_sdk.feature.timeout_feature import GutendexTimeoutFeature


_FEATURES = {
    "base": lambda: GutendexBaseFeature(),
    "ratelimit": lambda: GutendexRatelimitFeature(),
    "retry": lambda: GutendexRetryFeature(),
    "test": lambda: GutendexTestFeature(),
    "timeout": lambda: GutendexTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
