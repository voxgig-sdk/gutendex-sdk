# Gutendex SDK utility: feature_add
module GutendexUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
