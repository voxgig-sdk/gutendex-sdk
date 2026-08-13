# Gutendex SDK feature factory

from gutendex_sdk.feature.base_feature import GutendexBaseFeature
from gutendex_sdk.feature.test_feature import GutendexTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GutendexBaseFeature(),
        "test": lambda: GutendexTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
