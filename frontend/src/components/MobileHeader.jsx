import { Menu } from 'lucide-react';

export default function MobileHeader({ onMenuToggle }) {
  return (
    <div className="mobile-header">
      <button className="mobile-menu-btn" onClick={onMenuToggle} aria-label="Open menu">
        <Menu size={24} />
      </button>
      <span className="mobile-header-title">गीता AI</span>
      <div style={{ width: 40 }} />
    </div>
  );
}
