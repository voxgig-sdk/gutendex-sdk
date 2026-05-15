# Gutendex SDK utility: make_context
require_relative '../core/context'
module GutendexUtilities
  MakeContext = ->(ctxmap, basectx) {
    GutendexContext.new(ctxmap, basectx)
  }
end
