import { motion } from 'framer-motion';
import '../styles/verse.css';

export default function VerseCard({ verse }) {
  return (
    <motion.div className="verse-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="verse-card-watermark">{verse.verse_number}</div>
      <div className="verse-card-header">Verse {verse.verse_number}</div>
      <div className="verse-card-sanskrit">{verse.text}</div>
      {verse.transliteration && <div className="verse-card-transliteration">{verse.transliteration}</div>}
      {verse.translations?.english && <div className="verse-card-translation">{verse.translations.english}</div>}
      {verse.word_meanings && (
        <div className="verse-card-meanings">
          <strong>Word Meanings: </strong>{verse.word_meanings}
        </div>
      )}
    </motion.div>
  );
}
