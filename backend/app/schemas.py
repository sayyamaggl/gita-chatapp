from pydantic import BaseModel
from typing import Dict, List, Optional

class ChapterBase(BaseModel):
    id: int
    chapter_number: int
    name_meaning: str
    name_translation: str
    chapter_summary: str
    chapter_summary_hindi: str
    verses_count: int

    class Config:
        from_attributes = True

class VerseBase(BaseModel):
    id: int
    chapter_id: int
    verse_number: int
    text: str
    transliteration: str
    word_meanings: str
    translations: Dict[str, str] = {}

    class Config:
        from_attributes = True

class QuoteResponse(VerseBase):
    chapter_info: dict

class ChapterWithVerses(BaseModel):
    chapter: ChapterBase
    verses: List[VerseBase]

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
