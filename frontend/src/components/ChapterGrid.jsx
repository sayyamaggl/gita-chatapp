import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import ChapterCard from './ChapterCard';
import { fetchChapters } from '../lib/api';

export default function ChapterGrid() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let c = false;
    fetchChapters()
      .then(d => { if (!c) setChapters(d || []); })
      .catch(() => { if (!c) setError(true); })
      .finally(() => { if (!c) setLoading(false); });
    return () => { c = true; };
  }, []);

  if (loading) return <div className="reader-loading"><Loader2 size={28} className="spin" /><p>Loading chapters...</p></div>;
  if (error) return <div className="reader-loading"><p>Failed to load chapters.</p></div>;

  return (
    <motion.div className="chapter-grid"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {chapters.map(ch => <ChapterCard key={ch.id} chapter={ch} />)}
    </motion.div>
  );
}
