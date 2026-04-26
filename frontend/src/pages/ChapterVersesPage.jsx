import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import VerseCard from '../components/VerseCard';
import { fetchChapterVerses } from '../lib/api';

export default function ChapterVersesPage() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    let c = false;
    setLoading(true); setCurrentPage(1);
    fetchChapterVerses(chapterId)
      .then(d => { if (!c) setChapter(d); })
      .catch(() => { if (!c) setError(true); })
      .finally(() => { if (!c) setLoading(false); });
    return () => { c = true; };
  }, [chapterId]);

  if (loading) return <div className="reader-loading"><Loader2 size={28} className="spin" /><p>Loading verses...</p></div>;
  if (error || !chapter) return (
    <div className="reader-container" style={{ textAlign: 'center', padding: '4rem' }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Could not load verses.</p>
      <Link to="/read" className="chapter-verses-back"><ArrowLeft size={14} /> Back to Chapters</Link>
    </div>
  );

  const total = chapter.verses?.length || 0;
  const pages = Math.ceil(total / perPage);
  const start = (currentPage - 1) * perPage;
  const visible = chapter.verses?.slice(start, start + perPage) || [];

  return (
    <div className="reader-container" style={{ height: '100%', overflowY: 'auto' }}>
      <div className="chapter-verses-header">
        <Link to="/read" className="chapter-verses-back"><ArrowLeft size={14} /> All Chapters</Link>
        <h1 className="chapter-verses-title">Chapter {chapter.chapter?.chapter_number}: {chapter.chapter?.name_meaning}</h1>
        <div className="chapter-verses-subtitle">{chapter.chapter?.name_translation}</div>
      </div>

      <div className="verses-list">
        <AnimatePresence mode="popLayout">
          {visible.map(v => <VerseCard key={v.id} verse={v} />)}
        </AnimatePresence>
      </div>

      {pages > 1 && (
        <div className="pagination-controls">
          <button className="pagination-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft size={16} /> Prev</button>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Page {currentPage} of {pages}</span>
          <button className="pagination-btn" onClick={() => setCurrentPage(p => Math.min(pages, p + 1))} disabled={currentPage === pages}>Next <ChevronRight size={16} /></button>
        </div>
      )}
    </div>
  );
}
