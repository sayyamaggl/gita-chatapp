import axios from 'axios';

// During dev, Vite proxy handles /api → backend.
// In production, adjust this to the actual backend URL.
const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ==================== GITA ENDPOINTS ==================== */

export async function fetchChapters() {
  const res = await api.get('/chapters');
  return res.data.chapters;
}

export async function fetchChapterVerses(chapterId) {
  const res = await api.get(`/chapter/${chapterId}`);
  return res.data; // { chapter, verses }
}

export async function fetchQuoteOfTheDay() {
  const res = await api.get('/quote');
  return res.data;
}

export async function searchVerses(query, page = 1, limit = 10) {
  const res = await api.get('/search', {
    params: { q: query, page, limit },
  });
  return res.data; // { query, results, pagination }
}

/* ==================== CHAT ENDPOINT ==================== */

export async function sendChatMessage(message) {
  const res = await api.post('/chat/', { message });
  return res.data.response;
}

export default api;
