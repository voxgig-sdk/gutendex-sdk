# Gutendex SDK utility: prepare_body
require_relative 'media'
module GutendexUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return GutendexUtilities.raw_body(ctx.reqdata) if GutendexUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
