<?php
declare(strict_types=1);

// Gutendex SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GutendexMakeContext
{
    public static function call(array $ctxmap, ?GutendexContext $basectx): GutendexContext
    {
        return new GutendexContext($ctxmap, $basectx);
    }
}
