-- Typed models for the Gutendex SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Book
---@field authors table
---@field bookshelves table
---@field copyright boolean
---@field download_count number
---@field formats table
---@field id number
---@field languages table
---@field media_type string
---@field subjects table
---@field summaries table
---@field title string
---@field translators table

---@class BookLoadMatch
---@field id number

---@class BookListMatch
---@field authors? table
---@field bookshelves? table
---@field copyright? boolean
---@field download_count? number
---@field formats? table
---@field id? number
---@field languages? table
---@field media_type? string
---@field subjects? table
---@field summaries? table
---@field title? string
---@field translators? table

local M = {}

return M
