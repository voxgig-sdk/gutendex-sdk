<?php
declare(strict_types=1);

// Gutendex SDK utility: feature_add

class GutendexFeatureAdd
{
    public static function call(GutendexContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
