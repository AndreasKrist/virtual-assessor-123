import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export function getArticleSlugs() {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      return [];
    }
    return fs.readdirSync(articlesDirectory).filter(file => file.endsWith('.mdx'));
  } catch (error) {
    console.error('Error reading article directory:', error);
    return [];
  }
}

export function getArticleBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(articlesDirectory, `${realSlug}.mdx`);
  
  try {
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const timeToRead = readingTime(content);
    
    const article = {};
    
    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        article[field] = realSlug;
      }
      
      if (field === 'content') {
        article[field] = content;
      }
      
      if (field === 'readingTime') {
        article[field] = Math.ceil(timeToRead.minutes);
      }
      
      if (field === 'categories' && !data.categories) {
        // Default category if none specified
        article[field] = ['Opinion'];
      }
      
      if (data[field]) {
        article[field] = data[field];
      }
    });
    
    return article;
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export function getAllArticles(fields = []) {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug.replace(/\.mdx$/, ''), fields))
    .filter(article => article !== null);

  // Add default categories if missing
  articles.forEach(article => {
    if (fields.includes('categories') && (!article.categories || !Array.isArray(article.categories) || article.categories.length === 0)) {
      article.categories = ['Opinion'];
    }
  });
  
  // Sort articles by date in descending order
  return articles.sort((article1, article2) => {
    if (article1.date && article2.date) {
      return new Date(article2.date) - new Date(article1.date);
    }
    return 0;
  });
}