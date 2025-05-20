/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['images.unsplash.com'], // Add domains for remote images if needed
    },
    // Configure path aliases in jsconfig.json or tsconfig.json
    webpack: (config) => {
      // For handling MDX files
      config.module.rules.push({
        test: /\.mdx?$/,
        use: [
          {
            loader: '@mdx-js/loader',
          },
        ],
      });
  
      return config;
    },
  }
  
  module.exports = nextConfig