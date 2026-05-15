<?php
declare(strict_types=1);

// Gutendex SDK utility: result_body

class GutendexResultBody
{
    public static function call(GutendexContext $ctx): ?GutendexResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
