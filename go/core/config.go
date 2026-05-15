package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Gutendex",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://gutendex.com",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
						"name": "author",
						"req": true,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "bookshelf",
						"req": true,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "copyright",
						"req": true,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "download_count",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "format",
						"req": true,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "language",
						"req": true,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "media_type",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "subject",
						"req": true,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "summary",
						"req": true,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "title",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 10,
					},
					map[string]any{
						"name": "translator",
						"req": true,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 11,
					},
				},
				"name": "book",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": 1800,
											"kind": "query",
											"name": "author_year_start",
											"orig": "author_year_start",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "true,false",
											"kind": "query",
											"name": "copyright",
											"orig": "copyright",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "11,12,13",
											"kind": "query",
											"name": "ids",
											"orig": "ids",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "en,fr",
											"kind": "query",
											"name": "language",
											"orig": "language",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "text/html",
											"kind": "query",
											"name": "mime_type",
											"orig": "mime_type",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "dickens great",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "popular",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "children",
											"kind": "query",
											"name": "topic",
											"orig": "topic",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/books",
								"parts": []any{
									"books",
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/books/{id}",
								"parts": []any{
									"books",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
