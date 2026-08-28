// Typed models for the Gutendex SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Book {
  authors: any[]
  bookshelves: any[]
  copyright: boolean
  download_count: number
  formats: Record<string, any>
  id: number
  languages: any[]
  media_type: string
  subjects: any[]
  summaries: any[]
  title: string
  translators: any[]
}

export interface BookLoadMatch {
  id: number
}

export interface BookListMatch {
  author_year_end?: number
  author_year_start?: number
  copyright?: string
  ids?: string
  language?: string
  mime_type?: string
  search?: string
  sort?: string
  topic?: string
}

