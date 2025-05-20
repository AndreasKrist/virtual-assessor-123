import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Donate() {
  return (
    <>
      <Head>
        <title>Donate | LiloPikir</title>
        <meta name="description" content="Dukung LiloPikir dengan donasi" />
        <meta property="og:title" content="Donate | LiloPikir" />
        <meta property="og:description" content="Dukung LiloPikir dengan donasi" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lilopikir.com/donate" />
      </Head>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-narrow py-16"
      >
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-8 font-serif"
        >
          Dukung Kami
        </motion.h1>
        
        <div className="prose dark:prose-dark lg:prose-lg max-w-none">
          <p className="text-xl">
            Hi Partisan!! Kalau merasa artikel ini bermanfaat, kalian bisa dukung situs ini loh. 
            Kontribusi para Partisan membantu kami menciptakan konten berkualitas dan tanpa iklan.
          </p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="my-12"
          >
            {/* Donation Box */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
              <div className="w-20 h-20 relative mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mt-0">Donasi untuk LiloPikir</h2>
              <p className="mb-6">
                Donasi Anda akan digunakan untuk pengembangan konten, pemeliharaan situs, dan mendukung penulisan dari rakyat untuk rakyat
              </p>
              <a
                href="https://saweria.co/lilopikir"
                target="_blank"
                rel="noreferrer"
                className="btn-primary bg-red-600 hover:bg-red-700 w-full mb-4"
              >
                Donasi Sekarang
              </a>
              <a
                href="https://docs.google.com/spreadsheets/d/1rmOik-YNzAfxuGl5r4spPtqiDtgCp3lpRgDBzkB9hD8/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Audit Transparansi Dana
              </a>
            </div>
          </motion.div>
          
          <h2>Cara Lain untuk Mendukung Kami</h2>
          <ul>
            <li>Bagikan artikel yang kalian rasa bermanfaat untuk orang lain</li>
            <li>Ikuti kami di media sosial dan bantu besarkan komunitas kami</li>
            <li>Kirimkan artikel-mu untuk kontribusi di bagian Partisan</li>
          </ul>
          
          <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg mt-10 border border-red-100 dark:border-red-900/20">
            <h3 className="!mt-0">Terima Kasih!</h3>
            <p className="mb-0">
              Dukungan kalian, dalam bentuk apapun, sangat berarti dan
              memotivasi kami untuk terus menciptakan dan meningkatkan kualitas konten di LiloPikir.
            </p>
          </div>
        </div>
      </motion.main>
    </>
  );
}