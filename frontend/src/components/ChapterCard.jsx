import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ChapterCard({ chapter }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link to={`/read/${chapter.id}`} className="chapter-card">
        <span className="chapter-card-num">Chapter {chapter.chapter_number}</span>
        <h3 className="chapter-card-title">{chapter.name_meaning}</h3>
        <p className="chapter-card-desc">{chapter.name_translation}</p>
      </Link>
    </motion.div>
  );
}
