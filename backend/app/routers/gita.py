import random
from datetime import datetime
from zoneinfo import ZoneInfo
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api", tags=["gita"])

DBDep = Annotated[Session, Depends(get_db)]

@router.get("/chapters")
def get_chapters(db: DBDep):
    chapters = db.query(models.Chapter).order_by(models.Chapter.chapter_number).all()
    return {"chapters": chapters}

@router.get("/chapter/{chapter_id}")
def get_chapter_verses(chapter_id: int, db: DBDep):
    chapter = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
        
    verses = db.query(models.Verse).filter(models.Verse.chapter_id == chapter_id).order_by(models.Verse.verse_number).all()
    
    verses_data = []
    for v in verses:
        v_dict = {
            "id": v.id,
            "chapter_id": v.chapter_id,
            "verse_number": v.verse_number,
            "text": v.text,
            "transliteration": v.transliteration,
            "word_meanings": v.word_meanings,
            "translations": {t.language: t.description for t in v.translations}
        }
        verses_data.append(v_dict)
        
    return {"chapter": chapter, "verses": verses_data}

@router.get("/quote")
def get_random_quote(db: DBDep):
    verses_count = db.query(models.Verse).count()
    if verses_count == 0:
        raise HTTPException(status_code=404, detail="No verses found")
        
    ist_zone = ZoneInfo("Asia/Kolkata")
    current_date = datetime.now(ist_zone).date()
    
    # Use a localized random generator seeded by the current date
    daily_random = random.Random(str(current_date))
    random_id = daily_random.randint(1, verses_count)
    
    verse = db.query(models.Verse).filter(models.Verse.id == random_id).first()
    
    if not verse:
        raise HTTPException(status_code=404, detail="Verse not found")
    
    verse_data = {
        "id": verse.id,
        "chapter_id": verse.chapter_id,
        "verse_number": verse.verse_number,
        "text": verse.text,
        "transliteration": verse.transliteration,
        "word_meanings": verse.word_meanings,
        "translations": {t.language: t.description for t in verse.translations},
        "chapter_info": {
            "name_meaning": verse.chapter.name_meaning,
            "chapter_number": verse.chapter.chapter_number
        }
    }
    
    return verse_data

@router.get("/search")
def search_gita(
    q: str = Query(..., min_length=2, description="Search query string"), 
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=50, description="Items per page"),
    db: DBDep = DBDep
):
    """
    Search across verses (Sanskrit/transliteration), word meanings, chapter summaries, 
    and english/hindi translations for a keyword with pagination.
    """
    search_term = f"%{q}%"
    
    # Base query for searching across all related text fields
    base_query = db.query(models.Verse).join(
        models.Translation, models.Verse.id == models.Translation.verse_id, isouter=True
    ).join(
        models.Chapter, models.Verse.chapter_id == models.Chapter.id, isouter=True
    ).filter(
        or_(
            models.Verse.text.ilike(search_term),
            models.Verse.transliteration.ilike(search_term),
            models.Verse.word_meanings.ilike(search_term),
            models.Translation.description.ilike(search_term),
            models.Chapter.chapter_summary.ilike(search_term),
            models.Chapter.chapter_summary_hindi.ilike(search_term)
        )
    ).distinct()
    
    # Calculate totals
    total_results = base_query.count()
    total_pages = (total_results + limit - 1) // limit
    
    # Calculate offset and fetch paginated results
    offset = (page - 1) * limit
    results = base_query.offset(offset).limit(limit).all()
    
    # Format the verses
    formatted_verses = []
    for verse in results:
        formatted_verses.append({
            "id": verse.id,
            "chapter_id": verse.chapter_id,
            "verse_number": verse.verse_number,
            "text": verse.text,
            "transliteration": verse.transliteration,
            "word_meanings": verse.word_meanings,
            "translations": {t.language: t.description for t in verse.translations},
            "chapter_info": {
                "name_meaning": verse.chapter.name_meaning,
                "chapter_number": verse.chapter.chapter_number
            }
        })
            
    return {
        "query": q,
        "results": formatted_verses,
        "pagination": {
            "current_page": page,
            "limit": limit,
            "total_results": total_results,
            "total_pages": total_pages,
            "has_more": page < total_pages
        }
    }
