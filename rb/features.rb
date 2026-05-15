# Gutendex SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module GutendexFeatures
  def self.make_feature(name)
    case name
    when "base"
      GutendexBaseFeature.new
    when "test"
      GutendexTestFeature.new
    else
      GutendexBaseFeature.new
    end
  end
end
