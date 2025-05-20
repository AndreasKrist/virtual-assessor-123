import Image from 'next/image';
import { formatDate } from '../../lib/utils/formatDate';

export default function ArticleHeader({ title, date, readingTime, coverImage }) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-4">
        {title}
      </h1>
      
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 space-x-3">
        <span>{formatDate(date)}</span>
        
        {readingTime && (
          <>
            <span className="inline-block w-1 h-1 bg-gray-500 dark:bg-gray-400 rounded-full"></span>
            <span>{readingTime} min read</span>
          </>
        )}
      </div>
      
      {coverImage && (
        <div className="relative w-full h-72 sm:h-96 md:h-[32rem] mx-0 sm:rounded-lg rounded-md overflow-hidden">
          <Image
            src={coverImage}
            alt={`Cover image for ${title}`}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 96vw, 1024px"
            className="object-cover"
          />
        </div>
      )}
    </header>
  );
}