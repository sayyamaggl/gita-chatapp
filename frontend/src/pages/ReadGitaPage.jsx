import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, SearchX, ChevronLeft, ChevronRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ChapterGrid from '../components/ChapterGrid';
import VerseCard from '../components/VerseCard';
import { searchVerses } from '../lib/api';

export default function ReadGitaPage() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const performSearch = useCallback(async (q, page = 1) => {
    if (!q.trim() || q.trim().length < 2) {
      setSearchResults([]); setPagination(null); setIsSearching(false); return;
    }
    try {
      setIsSearching(true); setSearchError(false);
      const data = await searchVerses(q, page, 10);
      setSearchResults(data.results || []);
      setPagination({ total: data.pagination?.total_results || 0, page: data.pagination?.current_page || 1, pages: data.pagination?.total_pages || 1 });
      setCurrentPage(page);
    } catch { setSearchError(true); }
    finally { setIsSearching(false); }
  }, []);

  const handleSearch = (q) => { setQuery(q); setCurrentPage(1); performSearch(q, 1); };
  const scrollTop = () => document.querySelector('.app-main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  const nextPage = () => { if (currentPage < (pagination?.pages || 1)) { performSearch(query, currentPage + 1); scrollTop(); } };
  const prevPage = () => { if (currentPage > 1) { performSearch(query, currentPage - 1); scrollTop(); } };

  return (
    <div className="reader-container" style={{ height: '100%', overflowY: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>The Bhagavad Gita</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Explore the deepest truths of the universe</p>
      </div>

      <SearchBar query={query} onSearch={handleSearch} />

      {query.length >= 2 ? (
        <div>
          {isSearching ? (
            <div className="reader-loading"><Loader2 className="spin" size={28} /><p>Searching...</p></div>
          ) : searchError ? (
            <div className="search-empty"><p>Search failed. Try again.</p></div>
          ) : searchResults.length > 0 ? (
            <>
              <h3 className="search-results-header">
                Found <span className="search-results-highlight">{pagination?.total}</span> verses for "{query}"
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <AnimatePresence mode="popLayout">
                  {searchResults.map(r => <VerseCard key={r.id} verse={r} />)}
                </AnimatePresence>
              </div>
              {pagination && pagination.pages > 1 && (
                <div className="pagination-controls">
                  <button className="pagination-btn" onClick={prevPage} disabled={currentPage === 1}><ChevronLeft size={16} /> Prev</button>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Page {currentPage} of {pagination.pages}</span>
                  <button className="pagination-btn" onClick={nextPage} disabled={currentPage === pagination.pages}>Next <ChevronRight size={16} /></button>
                </div>
              )}
            </>
          ) : (
            <div className="search-empty"><SearchX size={40} className="search-empty-icon" /><p>No verses found for "{query}".</p></div>
          )}
        </div>
      ) : (
        <ChapterGrid />
      )}
    </div>
  );
}
