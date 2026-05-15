<?php
declare(strict_types=1);

// Gutendex SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class GutendexFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new GutendexBaseFeature();
            case "test":
                return new GutendexTestFeature();
            default:
                return new GutendexBaseFeature();
        }
    }
}
