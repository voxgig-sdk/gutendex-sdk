# Gutendex SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GutendexFeatures
  def self.make_feature(name)
    case name
    when "base"
      GutendexBaseFeature.new
    when "ratelimit"
      GutendexRatelimitFeature.new
    when "retry"
      GutendexRetryFeature.new
    when "test"
      GutendexTestFeature.new
    when "timeout"
      GutendexTimeoutFeature.new
    else
      GutendexBaseFeature.new
    end
  end
end
