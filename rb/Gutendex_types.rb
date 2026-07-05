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
# @!attribute [rw] author
#   @return [Array]
#
# @!attribute [rw] bookshelf
#   @return [Array]
#
# @!attribute [rw] copyright
#   @return [Boolean]
#
# @!attribute [rw] download_count
#   @return [Integer]
#
# @!attribute [rw] format
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] language
#   @return [Array]
#
# @!attribute [rw] media_type
#   @return [String]
#
# @!attribute [rw] subject
#   @return [Array]
#
# @!attribute [rw] summary
#   @return [Array]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] translator
#   @return [Array]
Book = Struct.new(
  :author,
  :bookshelf,
  :copyright,
  :download_count,
  :format,
  :id,
  :language,
  :media_type,
  :subject,
  :summary,
  :title,
  :translator,
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
# @!attribute [rw] author
#   @return [Array, nil]
#
# @!attribute [rw] bookshelf
#   @return [Array, nil]
#
# @!attribute [rw] copyright
#   @return [Boolean, nil]
#
# @!attribute [rw] download_count
#   @return [Integer, nil]
#
# @!attribute [rw] format
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] language
#   @return [Array, nil]
#
# @!attribute [rw] media_type
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [Array, nil]
#
# @!attribute [rw] summary
#   @return [Array, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] translator
#   @return [Array, nil]
BookListMatch = Struct.new(
  :author,
  :bookshelf,
  :copyright,
  :download_count,
  :format,
  :id,
  :language,
  :media_type,
  :subject,
  :summary,
  :title,
  :translator,
  keyword_init: true
)

