# LiloMelawan

A modern, accessible, and article-focused website built with Next.js and Tailwind CSS. This project features clean typography, generous white space, dark/light mode toggle, and a focus on long-form article reading. Inspired by the design approach of [LogosID](https://logosid.vercel.app).

## Features

- **Minimalist Design**: Clean typography, generous whitespace, and focus on content
- **Dark/Light Mode**: Toggle between color themes with persistent preference
- **Markdown Content**: Write articles in MDX format with rich formatting
- **Responsive Layout**: Mobile-first design that looks great on all devices
- **Performance Optimized**: Fast load times with optimized images and minimal JavaScript
- **Accessibility**: Semantic HTML, keyboard navigation, and good contrast
- **SEO Friendly**: Meta tags, OpenGraph tags, and structured data

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/minimalist-blog.git
   cd minimalist-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Copy the `.env.example` file to `.env.local` and update the values:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
/minimalist-blog
├── components/           # React components
├── content/              # Markdown/MDX content
├── lib/                  # Utility functions
├── pages/                # Next.js pages
├── public/               # Static assets
├── styles/               # Global styles
├── .env.example          # Environment variables example
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # Project documentation
```

## Adding Content

### Creating Articles

Add new articles by creating `.mdx` files in the `content/articles` directory. Each article should include frontmatter metadata at the top:

```markdown
---
title: 'Article Title'
date: '2025-04-01'
excerpt: 'A brief description of the article'
coverImage: '/images/articles/cover-image.jpg'
categories: ['Philosophy', 'Book', 'Science & Technology', 'Opinion', 'Partisan']
---

Article content goes here...
```

#### How to Add a New Article

1. Create a new `.mdx` file in the `content/articles` directory with a descriptive filename (use hyphens instead of spaces)
2. Add the frontmatter as shown above:
   - `title`: The article title
   - `date`: Publication date in YYYY-MM-DD format
   - `excerpt`: A brief summary (shown in article listings)
   - `coverImage`: Path to the cover image (place images in `/public/images/articles/`)
   - `categories`: An array of categories (can include multiple)
3. Write your article content using Markdown syntax below the frontmatter
4. Save the file and rebuild/restart the application if needed

#### Categories

Each article can belong to one or multiple categories:
- `Philosophy`: Articles exploring philosophical ideas
- `Book`: Book reviews and analyses
- `Science & Technology`: Science and tech-related content
- `Opinion`: Personal viewpoints and commentary
- `Partisan`: Guest submissions and community-contributed content

Articles can have multiple categories by listing them in the frontmatter, e.g., `categories: ['Book', 'Philosophy']`


### Adding Images

Place article images in the `public/images/articles` directory. They can be referenced in your MDX files using the relative path from the `public` directory:

```markdown
![Alt text](/images/articles/example-image.jpg)
```

## Customization

### Styling

The project uses Tailwind CSS for styling. You can customize the design by editing the `tailwind.config.js` file.

### Theme Toggle

The dark/light mode toggle is implemented using the `next-themes` package and can be customized in the `components/ui/ThemeToggle.js` file.

### Fonts

The default fonts are Inter (sans-serif) and Merriweather (serif). You can change these in `tailwind.config.js` and update the font imports in `pages/_document.js`.

## Deployment

This project is ready to be deployed to [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by [LogosID](https://logosid.vercel.app)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)