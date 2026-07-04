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
    public array $author;
    public array $bookshelf;
    public bool $copyright;
    public int $download_count;
    public array $format;
    public int $id;
    public array $language;
    public string $media_type;
    public array $subject;
    public array $summary;
    public string $title;
    public array $translator;
}

/** Request payload for Book#load. */
class BookLoadMatch
{
    public int $id;
}

/** Match filter for Book#list (any subset of Book fields). */
class BookListMatch
{
    public ?array $author = null;
    public ?array $bookshelf = null;
    public ?bool $copyright = null;
    public ?int $download_count = null;
    public ?array $format = null;
    public ?int $id = null;
    public ?array $language = null;
    public ?string $media_type = null;
    public ?array $subject = null;
    public ?array $summary = null;
    public ?string $title = null;
    public ?array $translator = null;
}

