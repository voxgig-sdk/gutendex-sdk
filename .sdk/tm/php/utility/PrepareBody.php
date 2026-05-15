<?php
declare(strict_types=1);

// Gutendex SDK utility: prepare_body

class GutendexPrepareBody
{
    public static function call(GutendexContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
