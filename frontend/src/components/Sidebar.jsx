import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, MessageSquare, BookText, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const NAV_ITEMS = [
  { to: '/', label: 'Ask Krishna', icon: MessageSquare, desc: 'Seek divine guidance' },
  { to: '/read', label: 'Read the Gita', icon: BookText, desc: 'Explore chapters & verses' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { theme, toggleTheme, isDharma, isVishvarupa } = useTheme();
  const location = useLocation();

  const close = () => { if (window.innerWidth <= 768) onClose?.(); };

  return (
    <aside className={`sidebar${isOpen ? ' mobile-open' : ''}`}>
      <div className="sidebar-brand">
        <motion.div className="sidebar-brand-icon"
          whileHover={{ scale: 1.08, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <BookOpen size={22} />
        </motion.div>
        <div>
          <div className="sidebar-brand-title">गीता AI</div>
          <div className="sidebar-brand-subtitle">Divine Wisdom</div>
        </div>
      </div>

      <div className="sidebar-ornament"><hr className="sidebar-ornament-line" /></div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);
          return (
            <NavLink key={item.to} to={item.to} className={`sidebar-nav-item${active ? ' active' : ''}`} onClick={close}>
              <Icon size={20} /><span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <hr className="sidebar-footer-ornament" />
        <motion.button className="theme-toggle-btn" onClick={toggleTheme}
          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
        >
          <div className="theme-toggle-icon-wrap">
            <AnimatePresence mode="wait" initial={false}>
              {isDharma ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Sun size={20} />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Moon size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="theme-toggle-label">
            <span className="theme-toggle-label-primary">{isDharma ? 'Dharma' : 'Vishvarupa'}</span>
            <span className="theme-toggle-label-secondary">{isDharma ? 'Earthly — Day' : 'Cosmic — Night'}</span>
          </div>
          <AnimatePresence>
            {isVishvarupa && (
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
                style={{ marginLeft: 'auto', display: 'flex' }}
              >
                <Sparkles size={14} style={{ color: 'var(--gold)', opacity: 0.6 }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </aside>
  );
}
