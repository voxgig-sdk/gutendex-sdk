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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Authors",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of authors",
					},
					map[string]any{
						"name": "bookshelves",
						"title": "Bookshelves",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Project Gutenberg bookshelves the book belongs to",
					},
					map[string]any{
						"name": "copyright",
						"title": "Copyright",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Copyright status: true (copyrighted), false (public domain in USA), or null (no information)",
					},
					map[string]any{
						"name": "download_count",
						"title": "Download Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of downloads from Project Gutenberg",
					},
					map[string]any{
						"name": "formats",
						"title": "Formats",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Available formats for the book, where keys are MIME types and values are download URLs",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Project Gutenberg ID number",
					},
					map[string]any{
						"name": "languages",
						"title": "Languages",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of two-character language codes",
					},
					map[string]any{
						"name": "media_type",
						"title": "Media Type",
						"type": "`$STRING`",
						"req": true,
						"short": "Media type of the book",
					},
					map[string]any{
						"name": "subjects",
						"title": "Subjects",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of subjects associated with the book",
					},
					map[string]any{
						"name": "summaries",
						"title": "Summaries",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Book summaries",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
						"short": "Book title",
					},
					map[string]any{
						"name": "translators",
						"title": "Translators",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of translators",
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
								"kind": "http",
								"method": "GET",
								"orig": "/books",
								"segments": []any{
									map[string]any{
										"lit": "books",
									},
								},
								"parts": []any{
									"books",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "author_year_end",
											"orig": "author_year_end",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1899,
										},
										map[string]any{
											"name": "author_year_start",
											"orig": "author_year_start",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1800,
										},
										map[string]any{
											"name": "copyright",
											"orig": "copyright",
											"type": "`$STRING`",
											"kind": "query",
											"example": "true,false",
										},
										map[string]any{
											"name": "ids",
											"orig": "ids",
											"type": "`$STRING`",
											"kind": "query",
											"example": "11,12,13",
										},
										map[string]any{
											"name": "language",
											"orig": "languages",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en,fr",
										},
										map[string]any{
											"name": "mime_type",
											"orig": "mime_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "text/html",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
											"example": "dickens great",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "popular",
										},
										map[string]any{
											"name": "topic",
											"orig": "topic",
											"type": "`$STRING`",
											"kind": "query",
											"example": "children",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"books",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 84,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
