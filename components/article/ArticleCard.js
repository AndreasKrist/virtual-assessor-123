import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '../../lib/utils/formatDate';

export default function ArticleCard({ article }) {
  if (!article || typeof article !== 'object') {
    return null;
  }

  // Function to truncate excerpt text to keep cards more square
  const truncateExcerpt = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength).trim();
    return `${truncated}...`;
  };

  return (
    <article className="modern-card h-full flex flex-col">
      {article.coverImage && (
        <div className="w-full h-48 relative overflow-hidden rounded-t-xl">
          <Link href={`/articles/${article.slug}`} className="block w-full h-full">
            <Image
              src={article.coverImage}
              alt={`Cover image for ${article.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </Link>
        </div>
      )}
      
      <div className="p-4 flex-1 flex flex-col">
        {article.categories && article.categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {article.categories.map(category => (
              <span key={category} className="text-xs font-medium px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full">
                {category}
              </span>
            ))}
          </div>
        )}
        
        <Link href={`/articles/${article.slug}`} className="block group">
          <h2 className="text-lg font-bold font-serif mb-1 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {article.title}
          </h2>
        </Link>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2 space-x-2">
          <span>{formatDate(article.date)}</span>
          
          {article.readingTime && (
            <>
              <span className="inline-block w-1 h-1 bg-gray-500 dark:bg-gray-400 rounded-full"></span>
              <span>{article.readingTime} min</span>
            </>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {truncateExcerpt(article.excerpt)}
        </p>
        
        <Link 
          href={`/articles/${article.slug}`} 
          className="inline-flex items-center text-red-600 dark:text-red-400 text-sm font-medium transition hover:text-red-700 dark:hover:text-red-300 mt-auto"
        >
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </article>
  );
}