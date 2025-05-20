import Head from 'next/head';
import Image from 'next/image';

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

export default function About() {
  return (
    <>
      <Head>
        <title>About | LiloPikir</title>
        <meta name="description" content="Tentang LiloPikir" />
        <meta property="og:title" content="About | LiloPikir" />
        <meta property="og:description" content="Tentang LiloPikir" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lilopikir.com/about" />
      </Head>

      <MotionMain 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-narrow py-16"
      >
        <MotionH1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-12 font-serif"
        >
          About
        </MotionH1>
        
        <div className="prose dark:prose-dark lg:prose-lg max-w-none">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            // className="w-32 h-32 md:w-40 md:h-40 relative profile-picture"
            >
            <Image 
                src="/images/authors/profile.png" 
                alt="LiloPikir logo"
                width={160}
                height={160}
                className="rounded-full object-cover w-full h-full"
                priority
            />
            </MotionDiv>

            
            <div>
              <h2 className="text-2xl font-bold !mt-0">LiloPikir</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Si Kelinci Tukang Mikir
              </p>
              <p>
                LiloPikir merupakan simbol pencerahan dan perjuangan intelektual. Kami meyakini bahwa membaca dan menulis merupakan senjata pemikiran untuk menghancurkan belenggu ketidakacuhan.
              </p>
            </div>
          </div>
          
          <h2>Tentang Situs Ini</h2>
          <p>
            LiloPikir didirikan dengan tujuan menyediakan ruang untuk informasi mendalam tentang literatur serta pemikiran kritis dan radikal. Kami tidak hanya mengulas buku, tetapi juga menggali ide-ide penting dari karya-karya tersebut untuk dihikmati dalam kehidupan sehari-hari.
          </p>
          <p>
            Kami percaya bahwa pemikiran kritis dan terbuka merupakan kunci untuk memajukan pikiran [masyarakat]. Melalui situs ini, kami berharap dapat menginspirasi pembaca untuk melihat dunia dengan cara yang lebih mendalam dan reflektif.
            Sehingga menghasilkan pribadi-pribadi yang ber-empati dan bijaksana.
          </p>
          
          <h2>Kirim Artikel</h2>
          <p>
            Kami menerima kontribusi artikel dari para pembaca. Jika Anda ingin artikelnya dipublikasikan di bagian Partisan, silakan kirim ke email :{' '}
            <a href="mailto:lilocs2004@gmail.com" className="text-red-600 dark:text-red-400 hover:underline">lilocs2004@gmail.com</a>.
          </p>
          <p>
            Artikel harus bersifat original, merangsang dan sesuai dengan tema kami yang berlandaskan pemikiran kritis, maupun imaginatif.
          </p>
          
          <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg mt-10 border border-red-100 dark:border-red-900/20">
            <h3 className="!mt-0">Hubungi Kami</h3>
            <p className="mb-4">
              Untuk pertanyaan, saran, atau kolaborasi, silakan hubungi kami melalui:
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="mailto:lilocs2004@gmail.com" className="btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500">Email</a>
              <a href="https://x.com/cs_Lilo" className="btn-secondary flex items-center gap-1">
                <svg className="h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Lilo  </span>
              </a>
              {/* <a href="https://instagram.com/lilopikir" className="btn-secondary">Instagram</a> */}
            </div>
          </div>
        </div>
      </MotionMain>
    </>
  );
}