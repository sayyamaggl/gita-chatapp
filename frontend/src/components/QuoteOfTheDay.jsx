import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { fetchQuoteOfTheDay } from '../lib/api';
import '../styles/quote.css';

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuoteOfTheDay()
      .then(setQuote)
      .catch(e => console.error('Quote load failed', e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="quote-section">
        <div className="quote-card quote-loading">
          <Loader2 size={28} className="spin" />
          <span>Loading daily wisdom...</span>
        </div>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="quote-section">
      <motion.div className="quote-card"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="quote-eyebrow">Verse of the Day</div>
        <div className="quote-sanskrit">{quote.text}</div>
        <div className="quote-translation">{quote.translations?.english}</div>
        <div className="quote-ref">
          Chapter {quote.chapter_info?.chapter_number}, Verse {quote.verse_number}
          {quote.chapter_info?.name_meaning && ` — ${quote.chapter_info.name_meaning}`}
        </div>
      </motion.div>
    </div>
  );
}
