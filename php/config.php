<?php
declare(strict_types=1);

// Gutendex SDK configuration

class GutendexConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Gutendex",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://gutendex.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "book" => [],
                ],
            ],
            "entity" => [
        'book' => [
          'fields' => [
            [
              'name' => 'authors',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'bookshelves',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'copyright',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'download_count',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'formats',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'languages',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'media_type',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'subjects',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'summaries',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'title',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'translators',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'book',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1899,
                        'kind' => 'query',
                        'name' => 'author_year_end',
                        'orig' => 'author_year_end',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1800,
                        'kind' => 'query',
                        'name' => 'author_year_start',
                        'orig' => 'author_year_start',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'true,false',
                        'kind' => 'query',
                        'name' => 'copyright',
                        'orig' => 'copyright',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '11,12,13',
                        'kind' => 'query',
                        'name' => 'ids',
                        'orig' => 'ids',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'en,fr',
                        'kind' => 'query',
                        'name' => 'language',
                        'orig' => 'language',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'text/html',
                        'kind' => 'query',
                        'name' => 'mime_type',
                        'orig' => 'mime_type',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'dickens great',
                        'kind' => 'query',
                        'name' => 'search',
                        'orig' => 'search',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'popular',
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'children',
                        'kind' => 'query',
                        'name' => 'topic',
                        'orig' => 'topic',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/books',
                  'parts' => [
                    'books',
                  ],
                  'select' => [
                    'exist' => [
                      'author_year_end',
                      'author_year_start',
                      'copyright',
                      'ids',
                      'language',
                      'mime_type',
                      'search',
                      'sort',
                      'topic',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 84,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/books/{id}',
                  'parts' => [
                    'books',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return GutendexFeatures::make_feature($name);
    }
}
