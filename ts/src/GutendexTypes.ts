// Typed models for the Gutendex SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Book {
  author: any[]
  bookshelf: any[]
  copyright: boolean
  download_count: number
  format: Record<string, any>
  id: number
  language: any[]
  media_type: string
  subject: any[]
  summary: any[]
  title: string
  translator: any[]
}

export interface BookLoadMatch {
  id: number
}

export type BookListMatch = Partial<Book>

