import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { AssessmentProvider } from '../contexts/AssessmentContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IT Career Assessment',
  description: 'Discover your IT career path and get personalized recommendations',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AssessmentProvider>
          {children}
        </AssessmentProvider>
      </body>
    </html>
  );
}