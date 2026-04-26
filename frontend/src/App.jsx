import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import CosmicBackground from './components/CosmicBackground';
import AppLayout from './components/AppLayout';
import AskKrishnaPage from './pages/AskKrishnaPage';
import ReadGitaPage from './pages/ReadGitaPage';
import ChapterVersesPage from './pages/ChapterVersesPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CosmicBackground />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<AskKrishnaPage />} />
            <Route path="read" element={<ReadGitaPage />} />
            <Route path="read/:chapterId" element={<ChapterVersesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
