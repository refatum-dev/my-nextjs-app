'use client';

import { useState, useEffect } from 'react';

interface RefreshButtonProps {
  onRefresh: () => Promise<void>;
  hasNews?: boolean;
}

export default function RefreshButton({ onRefresh, hasNews = false }: RefreshButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Wait until after client-side hydration to show tooltip
  useEffect(() => {
    setIsMounted(true);
    setShowTooltip(!hasNews);
  }, [hasNews]);

  const handleClick = async () => {
    setLoading(true);
    setShowTooltip(false);
    try {
      await onRefresh();
    } finally {
      setLoading(false);
    }
  };

  // Don't render tooltip during SSR to avoid hydration mismatch
  if (!isMounted) {
    return (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium opacity-50 cursor-not-allowed"
        disabled
      >
        Ładowanie...
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        aria-label={hasNews ? 'Odśwież wiadomości' : 'Załaduj wiadomości'}
      >
        {loading ? 'Ładowanie…' : hasNews ? 'Odśwież wiadomości' : 'Załaduj wiadomości'}
      </button>
      
      {showTooltip && !loading && (
        <div 
          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap"
          role="tooltip"
        >
          <div className="absolute w-2 h-2 bg-zinc-800 rotate-45 bottom-[-4px] left-1/2 -translate-x-1/2"></div>
          Kliknij, aby załadować najnowsze wiadomości
        </div>
      )}
    </div>
  );
}
