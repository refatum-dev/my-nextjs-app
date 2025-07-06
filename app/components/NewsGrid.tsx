import NewsCard from "./NewsCard";

export interface NewsItem {
  title: string;
  summary: string;
  source?: string;
}

interface NewsGridProps {
  news: NewsItem[];
}

export default function NewsGrid({ news }: NewsGridProps) {
  if (news.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">No news articles available.</p>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {news.map((item, idx) => (
          <NewsCard key={idx} {...item} index={idx} />
        ))}
      </section>
    </div>
  );
}
