# Gutendex SDK feature factory

from feature.base_feature import GutendexBaseFeature
from feature.test_feature import GutendexTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GutendexBaseFeature(),
        "test": lambda: GutendexTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
