# Typed models for the Gutendex SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Book(TypedDict):
    authors: list
    bookshelves: list
    copyright: bool
    download_count: int
    formats: dict
    id: int
    languages: list
    media_type: str
    subjects: list
    summaries: list
    title: str
    translators: list


class BookLoadMatch(TypedDict):
    id: int


class BookListMatch(TypedDict, total=False):
    author_year_end: int
    author_year_start: int
    copyright: str
    ids: str
    language: str
    mime_type: str
    search: str
    sort: str
    topic: str
