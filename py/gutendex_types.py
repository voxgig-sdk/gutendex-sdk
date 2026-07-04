# Typed models for the Gutendex SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Book:
    author: list
    bookshelf: list
    copyright: bool
    download_count: int
    format: dict
    id: int
    language: list
    media_type: str
    subject: list
    summary: list
    title: str
    translator: list


@dataclass
class BookLoadMatch:
    id: int


@dataclass
class BookListMatch:
    author: Optional[list] = None
    bookshelf: Optional[list] = None
    copyright: Optional[bool] = None
    download_count: Optional[int] = None
    format: Optional[dict] = None
    id: Optional[int] = None
    language: Optional[list] = None
    media_type: Optional[str] = None
    subject: Optional[list] = None
    summary: Optional[list] = None
    title: Optional[str] = None
    translator: Optional[list] = None

