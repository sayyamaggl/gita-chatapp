import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, query }) {
  const [local, setLocal] = useState(query || '');
  const timer = useRef(null);

  useEffect(() => { setLocal(query || ''); }, [query]);

  const handleChange = (e) => {
    const v = e.target.value;
    setLocal(v);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch(v), 400);
  };

  return (
    <div className="reader-search-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search verses by keyword, topic, or meaning..."
          value={local}
          onChange={handleChange}
        />
        {local && (
          <button className="search-clear-btn" onClick={() => { setLocal(''); onSearch(''); }} aria-label="Clear">
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
