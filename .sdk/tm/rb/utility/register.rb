# Gutendex SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

GutendexUtility.registrar = ->(u) {
  u.clean = GutendexUtilities::Clean
  u.done = GutendexUtilities::Done
  u.make_error = GutendexUtilities::MakeError
  u.feature_add = GutendexUtilities::FeatureAdd
  u.feature_hook = GutendexUtilities::FeatureHook
  u.feature_init = GutendexUtilities::FeatureInit
  u.fetcher = GutendexUtilities::Fetcher
  u.make_fetch_def = GutendexUtilities::MakeFetchDef
  u.make_context = GutendexUtilities::MakeContext
  u.make_options = GutendexUtilities::MakeOptions
  u.make_request = GutendexUtilities::MakeRequest
  u.make_response = GutendexUtilities::MakeResponse
  u.make_result = GutendexUtilities::MakeResult
  u.make_point = GutendexUtilities::MakePoint
  u.make_spec = GutendexUtilities::MakeSpec
  u.make_url = GutendexUtilities::MakeUrl
  u.param = GutendexUtilities::Param
  u.prepare_auth = GutendexUtilities::PrepareAuth
  u.prepare_body = GutendexUtilities::PrepareBody
  u.prepare_headers = GutendexUtilities::PrepareHeaders
  u.prepare_method = GutendexUtilities::PrepareMethod
  u.prepare_params = GutendexUtilities::PrepareParams
  u.prepare_path = GutendexUtilities::PreparePath
  u.prepare_query = GutendexUtilities::PrepareQuery
  u.result_basic = GutendexUtilities::ResultBasic
  u.result_body = GutendexUtilities::ResultBody
  u.result_headers = GutendexUtilities::ResultHeaders
  u.transform_request = GutendexUtilities::TransformRequest
  u.transform_response = GutendexUtilities::TransformResponse
}
