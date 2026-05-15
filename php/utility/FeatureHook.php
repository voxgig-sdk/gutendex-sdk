<?php
declare(strict_types=1);

// Gutendex SDK utility: feature_hook

class GutendexFeatureHook
{
    public static function call(GutendexContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
