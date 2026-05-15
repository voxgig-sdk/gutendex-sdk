<?php
declare(strict_types=1);

// Gutendex SDK utility: result_headers

class GutendexResultHeaders
{
    public static function call(GutendexContext $ctx): ?GutendexResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
