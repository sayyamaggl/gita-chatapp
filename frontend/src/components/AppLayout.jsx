import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import '../styles/layout.css';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <div className={`sidebar-backdrop${sidebarOpen ? ' visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="app-main">
        <MobileHeader onMenuToggle={() => setSidebarOpen(true)} />
        <div className="app-main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
