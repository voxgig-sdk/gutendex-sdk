<?php
declare(strict_types=1);

// Gutendex SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

GutendexUtility::setRegistrar(function (GutendexUtility $u): void {
    $u->clean = [GutendexClean::class, 'call'];
    $u->done = [GutendexDone::class, 'call'];
    $u->make_error = [GutendexMakeError::class, 'call'];
    $u->feature_add = [GutendexFeatureAdd::class, 'call'];
    $u->feature_hook = [GutendexFeatureHook::class, 'call'];
    $u->feature_init = [GutendexFeatureInit::class, 'call'];
    $u->fetcher = [GutendexFetcher::class, 'call'];
    $u->make_fetch_def = [GutendexMakeFetchDef::class, 'call'];
    $u->make_context = [GutendexMakeContext::class, 'call'];
    $u->make_options = [GutendexMakeOptions::class, 'call'];
    $u->make_request = [GutendexMakeRequest::class, 'call'];
    $u->make_response = [GutendexMakeResponse::class, 'call'];
    $u->make_result = [GutendexMakeResult::class, 'call'];
    $u->make_point = [GutendexMakePoint::class, 'call'];
    $u->make_spec = [GutendexMakeSpec::class, 'call'];
    $u->make_url = [GutendexMakeUrl::class, 'call'];
    $u->param = [GutendexParam::class, 'call'];
    $u->prepare_auth = [GutendexPrepareAuth::class, 'call'];
    $u->prepare_body = [GutendexPrepareBody::class, 'call'];
    $u->prepare_headers = [GutendexPrepareHeaders::class, 'call'];
    $u->prepare_method = [GutendexPrepareMethod::class, 'call'];
    $u->prepare_params = [GutendexPrepareParams::class, 'call'];
    $u->prepare_path = [GutendexPreparePath::class, 'call'];
    $u->prepare_query = [GutendexPrepareQuery::class, 'call'];
    $u->result_basic = [GutendexResultBasic::class, 'call'];
    $u->result_body = [GutendexResultBody::class, 'call'];
    $u->result_headers = [GutendexResultHeaders::class, 'call'];
    $u->transform_request = [GutendexTransformRequest::class, 'call'];
    $u->transform_response = [GutendexTransformResponse::class, 'call'];
});
