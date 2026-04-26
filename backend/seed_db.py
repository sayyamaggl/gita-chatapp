import json
import os
import time
from sqlalchemy.orm import Session
from sqlalchemy.exc import OperationalError
from app.database import engine, Base, SessionLocal
from app.models import Chapter, Verse, Translation

DATA_DIR = 'data/pranesh-gita'

def wait_for_db():
    retries = 5
    while retries > 0:
        try:
            # Try to connect
            with engine.connect() as conn:
                return True
        except OperationalError:
            print("Database not ready yet, waiting 2 seconds...")
            time.sleep(2)
            retries -= 1
    raise Exception("Could not connect to database after several retries.")

def seed():
    wait_for_db()
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    
    if db.query(Chapter).first():
        print("Database already seeded.")
        db.close()
        return

    print("Seeding database...")

    with open(os.path.join(DATA_DIR, 'chapters.json'), 'r', encoding='utf-8-sig') as f:
        chapters = json.load(f)
        for c in chapters:
            chapter = Chapter(
                id=c['id'],
                chapter_number=c['chapter_number'],
                name_meaning=c['name_meaning'],
                name_translation=c['name_translation'],
                chapter_summary=c['chapter_summary'],
                chapter_summary_hindi=c['chapter_summary_hindi'],
                verses_count=c['verses_count']
            )
            db.add(chapter)

    with open(os.path.join(DATA_DIR, 'verse.json'), 'r', encoding='utf-8-sig') as f:
        verses = json.load(f)
        for v in verses:
            verse = Verse(
                id=v['id'],
                chapter_id=v['chapter_id'],
                verse_number=v['verse_number'],
                text=v['text'],
                transliteration=v['transliteration'],
                word_meanings=v['word_meanings']
            )
            db.add(verse)

    with open(os.path.join(DATA_DIR, 'translation.json'), 'r', encoding='utf-8-sig') as f:
        translations = json.load(f)
        
        for t in translations:
            lang = t['lang']
            author = t['authorName']
            
            if lang == "english" and author == "Swami Sivananda":
                trans = Translation(verse_id=t['verse_id'], language=lang, author_name=author, description=t['description'])
                db.add(trans)
            elif lang == "hindi" and author == "Swami Ramsukhdas":
                trans = Translation(verse_id=t['verse_id'], language=lang, author_name=author, description=t['description'])
                db.add(trans)

    db.commit()
    db.close()
    print("Database seeding completed!")

if __name__ == '__main__':
    seed()
