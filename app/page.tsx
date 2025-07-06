'use client';

import { useEffect, useState } from 'react';
import NewsGrid, { NewsItem } from './components/NewsGrid';
import RefreshButton from './components/RefreshButton';


interface NewsResponse {
  success: boolean;
  news: NewsItem[];
  timestamp: string;
  error?: string;
}

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Load saved news from localStorage on client-side only
  useEffect(() => {
    setIsClient(true);
    const savedNews = localStorage.getItem('cachedNews');
    const savedTimestamp = localStorage.getItem('lastNewsUpdate');
    
    if (savedNews) {
      try {
        setNews(JSON.parse(savedNews));
      } catch (e) {
        console.error('Failed to parse saved news', e);
      }
    }
    
    if (savedTimestamp) {
      setLastUpdated(savedTimestamp);
    }
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/news');
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data: NewsResponse = await res.json();
      if (!data.success) throw new Error(data.error || 'Unknown error');
      
      // Update state first
      const updateTime = new Date().toLocaleString();
      setNews(data.news);
      setLastUpdated(updateTime);
      
      // Then save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('cachedNews', JSON.stringify(data.news));
          localStorage.setItem('lastNewsUpdate', updateTime);
        } catch (e) {
          console.error('Failed to save to localStorage', e);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center gap-8 p-6 sm:p-10 max-w-7xl mx-auto min-h-screen">
      <header className="text-center flex flex-col gap-4 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
          <span role="img" aria-label="gazeta">📰</span> Najnowsze wiadomości z Polski
        </h1>
        
        <div className="flex flex-col items-center gap-4">
          <RefreshButton onRefresh={fetchNews} hasNews={isClient && news.length > 0} />
          {lastUpdated && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Ostatnia aktualizacja: {lastUpdated}
            </p>
          )}
        </div>
      </header>

      <div className="w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-zinc-600 dark:text-zinc-400">Ładowanie wiadomości...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center max-w-md mx-auto">
            <p className="text-red-600 dark:text-red-400 font-medium">Wystąpił błąd</p>
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{error}</p>
            <button
              onClick={fetchNews}
              className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Spróbuj ponownie
            </button>
          </div>
        ) : news.length > 0 ? (
          <NewsGrid news={news} />
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400">
              Brak wiadomości do wyświetlenia. Kliknij przycisk powyżej, aby załadować najnowsze wiadomości.
            </p>
          </div>
        )}
      </div>

      <footer className="mt-12 text-xs text-zinc-500 dark:text-zinc-400 text-center">
        Artem Andrieiev | grupa K2 | 
        Napędzane przez <a href="https://www.perplexity.ai/" className="underline" target="_blank" rel="noreferrer">Perplexity AI</a> • Zbudowane w oparciu o Next.js & Docker
      </footer>
    </main>
  );
}
