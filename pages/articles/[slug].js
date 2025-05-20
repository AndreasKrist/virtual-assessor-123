import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import ArticleHeader from '../../components/article/ArticleHeader';
import ArticleContent from '../../components/article/ArticleContent';
import ReadingProgressBar from '../../components/ui/ReadingProgressBar';
import { getArticleBySlug, getAllArticles } from '../../lib/utils/mdx';

export default function Article({ article, content }) {
  return (
    <>
      <Head>
        <title>{article.title} | LiloMelawan</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={`${article.title} | LiloMelawan`} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://lilomelawan.com/articles/${article.slug}`} />
        {article.coverImage && <meta property="og:image" content={article.coverImage} />}
      </Head>

      {/* Add the Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Changed from container-narrow to article-container for more whitespace */}
      <article className="article-container py-10 md:py-16">
        <ArticleHeader
          title={article.title}
          date={article.date}
          readingTime={article.readingTime}
          coverImage={article.coverImage}
        />
        
        <ArticleContent>
          <MDXRemote {...content} />
        </ArticleContent>
      </article>
    </>
  );
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'excerpt',
    'coverImage',
    'readingTime',
  ]);

  const mdxOptions = {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypePrism, { showLineNumbers: true }]],
  };

  const content = await serialize(article.content, { mdxOptions });

  return {
    props: {
      article,
      content,
    },
  };
}

export async function getStaticPaths() {
  const articles = getAllArticles(['slug']);

  return {
    paths: articles.map((article) => {
      return {
        params: {
          slug: article.slug,
        },
      };
    }),
    fallback: false,
  };
}