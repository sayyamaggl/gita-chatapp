from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Chapter(Base):
    __tablename__ = "chapters"

    id = Column(Integer, primary_key=True, index=True)
    chapter_number = Column(Integer, unique=True, index=True)
    name_meaning = Column(String)
    name_translation = Column(String)
    chapter_summary = Column(Text)
    chapter_summary_hindi = Column(Text)
    verses_count = Column(Integer)

    verses = relationship("Verse", back_populates="chapter")

class Verse(Base):
    __tablename__ = "verses"

    id = Column(Integer, primary_key=True, index=True)
    chapter_id = Column(Integer, ForeignKey("chapters.id"))
    verse_number = Column(Integer)
    text = Column(Text)
    transliteration = Column(Text)
    word_meanings = Column(Text)

    chapter = relationship("Chapter", back_populates="verses")
    translations = relationship("Translation", back_populates="verse")

class Translation(Base):
    __tablename__ = "translations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    verse_id = Column(Integer, ForeignKey("verses.id"))
    language = Column(String, index=True)
    author_name = Column(String)
    description = Column(Text)

    verse = relationship("Verse", back_populates="translations")
