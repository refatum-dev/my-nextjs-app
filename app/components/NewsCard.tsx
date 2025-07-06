interface NewsCardProps {
  title: string;
  summary: string;
  source?: string;
  index: number;
}

export default function NewsCard({ title, summary, source, index }: NewsCardProps) {
  return (
    <article className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 flex flex-col gap-3 border border-zinc-100 dark:border-zinc-800">
      <header className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
          {index + 1}
        </span>
        <h2 className="text-lg font-semibold leading-tight flex-1">{title}</h2>
      </header>
      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{summary}</p>
      {source && (
        <footer className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Źródło: <a href={source}>{source}</a></footer>
      )}
    </article>
  );
}
