# Gutendex SDK utility: make_context

from core.context import GutendexContext


def make_context_util(ctxmap, basectx):
    return GutendexContext(ctxmap, basectx)
