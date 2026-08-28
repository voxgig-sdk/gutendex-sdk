# frozen_string_literal: true

# Typed models for the Gutendex SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Book entity data model.
#
# @!attribute [rw] authors
#   @return [Array]
#
# @!attribute [rw] bookshelves
#   @return [Array]
#
# @!attribute [rw] copyright
#   @return [Boolean]
#
# @!attribute [rw] download_count
#   @return [Integer]
#
# @!attribute [rw] formats
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] languages
#   @return [Array]
#
# @!attribute [rw] media_type
#   @return [String]
#
# @!attribute [rw] subjects
#   @return [Array]
#
# @!attribute [rw] summaries
#   @return [Array]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] translators
#   @return [Array]
Book = Struct.new(
  :authors,
  :bookshelves,
  :copyright,
  :download_count,
  :formats,
  :id,
  :languages,
  :media_type,
  :subjects,
  :summaries,
  :title,
  :translators,
  keyword_init: true
)

# Request payload for Book#load.
#
# @!attribute [rw] id
#   @return [Integer]
BookLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Book#list.
#
# @!attribute [rw] author_year_end
#   @return [Integer, nil]
#
# @!attribute [rw] author_year_start
#   @return [Integer, nil]
#
# @!attribute [rw] copyright
#   @return [String, nil]
#
# @!attribute [rw] ids
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] mime_type
#   @return [String, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] topic
#   @return [String, nil]
BookListMatch = Struct.new(
  :author_year_end,
  :author_year_start,
  :copyright,
  :ids,
  :language,
  :mime_type,
  :search,
  :sort,
  :topic,
  keyword_init: true
)

