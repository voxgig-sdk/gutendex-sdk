<?php
declare(strict_types=1);

// Typed models for the Gutendex SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Book entity data model. */
class Book
{
    public array $authors;
    public array $bookshelves;
    public bool $copyright;
    public int $download_count;
    public array $formats;
    public int $id;
    public array $languages;
    public string $media_type;
    public array $subjects;
    public array $summaries;
    public string $title;
    public array $translators;
}

/** Request payload for Book#load. */
class BookLoadMatch
{
    public int $id;
}

/** Request payload for Book#list. */
class BookListMatch
{
    public ?array $authors = null;
    public ?array $bookshelves = null;
    public ?bool $copyright = null;
    public ?int $download_count = null;
    public ?array $formats = null;
    public ?int $id = null;
    public ?array $languages = null;
    public ?string $media_type = null;
    public ?array $subjects = null;
    public ?array $summaries = null;
    public ?string $title = null;
    public ?array $translators = null;
}

