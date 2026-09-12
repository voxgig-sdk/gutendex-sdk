package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Gutendex",
			"slug": "gutendex",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://gutendex.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"book": map[string]any{},
			},
		},
		"entity": map[string]any{
			"book": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "authors",
						"req": true,
						"short": "List of authors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "bookshelves",
						"req": true,
						"short": "Project Gutenberg bookshelves the book belongs to",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "copyright",
						"req": true,
						"short": "Copyright status: true (copyrighted), false (public domain in USA), or null (no information)",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "download_count",
						"req": true,
						"short": "Number of downloads from Project Gutenberg",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "formats",
						"req": true,
						"short": "Available formats for the book, where keys are MIME types and values are download URLs",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Project Gutenberg ID number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "languages",
						"req": true,
						"short": "List of two-character language codes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "media_type",
						"req": true,
						"short": "Media type of the book",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subjects",
						"req": true,
						"short": "List of subjects associated with the book",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "summaries",
						"req": true,
						"short": "Book summaries",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"req": true,
						"short": "Book title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "translators",
						"req": true,
						"short": "List of translators",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "book",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1899,
											"kind": "query",
											"name": "author_year_end",
											"orig": "author_year_end",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1800,
											"kind": "query",
											"name": "author_year_start",
											"orig": "author_year_start",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "true,false",
											"kind": "query",
											"name": "copyright",
											"orig": "copyright",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "11,12,13",
											"kind": "query",
											"name": "ids",
											"orig": "ids",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en,fr",
											"kind": "query",
											"name": "language",
											"orig": "language",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "text/html",
											"kind": "query",
											"name": "mime_type",
											"orig": "mime_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "dickens great",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "popular",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "children",
											"kind": "query",
											"name": "topic",
											"orig": "topic",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/books",
								"segments": []any{
									map[string]any{
										"lit": "books",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"author_year_end",
										"author_year_start",
										"copyright",
										"ids",
										"language",
										"mime_type",
										"search",
										"sort",
										"topic",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"parts": []any{
									"books",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 84,
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/books/{id}",
								"segments": []any{
									map[string]any{
										"lit": "books",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"books",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
