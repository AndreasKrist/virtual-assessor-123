import Head from 'next/head';
import { useState } from 'react';
import ArticleCard from '../components/article/ArticleCard';
import SearchBar from '../components/ui/SearchBar';
import { getAllArticles } from '../lib/utils/mdx';

// Import components directly
let MotionMain, MotionH1, MotionDiv;

// Try to import from framer-motion, fall back to regular HTML elements
try {
  const { motion } = require('framer-motion');
  MotionMain = motion.main;
  MotionH1 = motion.h1;
  MotionDiv = motion.div;
} catch (e) {
  // Simple fallbacks that just render the children
  MotionMain = ({ children, ...props }) => <main {...props}>{children}</main>;
  MotionH1 = ({ children, ...props }) => <h1 {...props}>{children}</h1>;
  MotionDiv = ({ children, ...props }) => <div {...props}>{children}</div>;
}

export default function Partisan({ articles }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter articles that have the 'Partisan' category
  const partisanArticles = articles.filter(article => 
    article?.categories && 
    Array.isArray(article.categories) && 
    article.categories.includes('Partisan') &&
    (searchQuery === '' || 
      (article?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false) ||
      (article?.excerpt?.toLowerCase()?.includes(searchQuery.toLowerCase()) || false)
    )
  );

  // Make sure each article is a valid object
  const validPartisanArticles = partisanArticles.filter(article => 
    article && typeof article === 'object' && article.slug
  );

  return (
    <>
      <Head>
        <title>Partisan | LiloPikir</title>
        <meta name="description" content="Guest submissions and partisan articles" />
        <meta property="og:title" content="Partisan | LiloPikir" />
        <meta property="og:description" content="Guest submissions and partisan articles" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lilopikir.com/partisan" />
      </Head>

      <MotionMain 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container-narrow py-16"
      >
        <MotionDiv
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Partisan</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {/* Guest submissions and community-contributed articles */}
            Dari Rakyat Untuk Rakyat. Merupakan artikel kiriman Partisan
          </p>
        </MotionDiv>
        
        <SearchBar 
          placeholder="Search partisan articles..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="mb-10"
        />
        
        {partisanArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partisanArticles.map((article, index) => (
              <MotionDiv
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ArticleCard article={article} />
              </MotionDiv>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No partisan articles found matching your search.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Want to submit your own article? Contact us via the <a href="/about" className="text-red-600 dark:text-red-400 hover:underline">About page</a>.
            </p>
          </div>
        )}
      </MotionMain>
    </>
  );
}

export async function getStaticProps() {
  const articles = getAllArticles([
    'title',
    'slug',
    'date',
    'excerpt',
    'coverImage',
    'readingTime',
    'categories'
  ]);

  return {
    props: { articles },
  };
}