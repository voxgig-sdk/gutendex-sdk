// Typed models for the Gutendex SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Book is the typed data model for the book entity.
type Book struct {
	Author []any `json:"author"`
	Bookshelf []any `json:"bookshelf"`
	Copyright bool `json:"copyright"`
	DownloadCount int `json:"download_count"`
	Format map[string]any `json:"format"`
	Id int `json:"id"`
	Language []any `json:"language"`
	MediaType string `json:"media_type"`
	Subject []any `json:"subject"`
	Summary []any `json:"summary"`
	Title string `json:"title"`
	Translator []any `json:"translator"`
}

// BookLoadMatch is the typed request payload for Book.LoadTyped.
type BookLoadMatch struct {
	Id int `json:"id"`
}

// BookListMatch is the typed request payload for Book.ListTyped.
type BookListMatch struct {
	Author *[]any `json:"author,omitempty"`
	Bookshelf *[]any `json:"bookshelf,omitempty"`
	Copyright *bool `json:"copyright,omitempty"`
	DownloadCount *int `json:"download_count,omitempty"`
	Format *map[string]any `json:"format,omitempty"`
	Id *int `json:"id,omitempty"`
	Language *[]any `json:"language,omitempty"`
	MediaType *string `json:"media_type,omitempty"`
	Subject *[]any `json:"subject,omitempty"`
	Summary *[]any `json:"summary,omitempty"`
	Title *string `json:"title,omitempty"`
	Translator *[]any `json:"translator,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
