export default function ArticleContent({ children }) {
  return (
    <div className="prose dark:prose-dark lg:prose-lg max-w-none mx-auto [&>p]:text-justify">
      {children}
    </div>
  );
}