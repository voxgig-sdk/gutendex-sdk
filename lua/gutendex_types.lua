-- Typed models for the Gutendex SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Book
---@field author table
---@field bookshelf table
---@field copyright boolean
---@field download_count number
---@field format table
---@field id number
---@field language table
---@field media_type string
---@field subject table
---@field summary table
---@field title string
---@field translator table

---@class BookLoadMatch
---@field id number

---@class BookListMatch
---@field author? table
---@field bookshelf? table
---@field copyright? boolean
---@field download_count? number
---@field format? table
---@field id? number
---@field language? table
---@field media_type? string
---@field subject? table
---@field summary? table
---@field title? string
---@field translator? table

local M = {}

return M
