/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Force include these classes to avoid purging
  safelist: [
    'bg-blue-50',
    'bg-blue-100',
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-indigo-600',
    'text-blue-600',
    'text-blue-700',
    'text-blue-800',
    'text-white',
    'border-blue-100',
    'border-blue-300',
    'border-blue-500',
    'border-blue-600',
    'hover:bg-blue-50',
    'hover:bg-blue-700',
    'hover:border-blue-300',
  ],
  theme: {
    extend: {
      // Simplify the color scheme to avoid complex nested values
      colors: {
        blue: {
          50: '#EBF5FF',
          100: '#D6EBFF',
          200: '#ADD6FF',
          300: '#84BEFF',
          400: '#5AA6FF',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        indigo: {
          600: '#4F46E5',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}