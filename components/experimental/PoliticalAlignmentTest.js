import { useState, useEffect } from 'react';

// Political alignment test component in Bahasa Indonesia
export default function PoliticalAlignmentTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);

  // Define the questions for the test in Bahasa Indonesia
  const questions = [
    {
      id: 'q1',
      text: "Ketimpangan ekonomi adalah masalah besar yang harus ditangani secara aktif oleh pemerintah.",
      dimension: "economic",
      direction: "left"
    },
    {
      id: 'q2',
      text: "Kapitalisme pasar bebas dengan regulasi minimal umumnya menghasilkan kemakmuran terbesar bagi masyarakat.",
      dimension: "economic",
      direction: "right"
    },
    {
      id: 'q3',
      text: "Pemerintah harus menyediakan layanan kesehatan universal untuk semua warga negara.",
      dimension: "economic",
      direction: "left"
    },
    {
      id: 'q4',
      text: "Hak kepemilikan pribadi harus dilindungi dengan kuat, meskipun berarti ada ketimpangan.",
      dimension: "economic",
      direction: "right"
    },
    {
      id: 'q5',
      text: "Perusahaan-perusahaan besar memiliki terlalu banyak kekuasaan dalam masyarakat saat ini dan harus lebih diregulasi.",
      dimension: "economic",
      direction: "left"
    },
    {
      id: 'q6',
      text: "Kebebasan individu lebih penting daripada kesejahteraan kolektif.",
      dimension: "social",
      direction: "libertarian"
    },
    {
      id: 'q7',
      text: "Nilai-nilai tradisional dan norma budaya penting untuk dilestarikan.",
      dimension: "social",
      direction: "conservative"
    },
    {
      id: 'q8',
      text: "Orang harus bebas hidup sesuai dengan keyakinan moral mereka sendiri, meskipun berbeda dari nilai-nilai arus utama.",
      dimension: "social",
      direction: "libertarian"
    },
    {
      id: 'q9',
      text: "Masyarakat mendapat manfaat dari kepemimpinan yang kuat dan hierarki yang jelas.",
      dimension: "social",
      direction: "authoritarian"
    },
    {
      id: 'q10',
      text: "Perlindungan lingkungan harus diprioritaskan meskipun berarti perlambatan ekonomi.",
      dimension: "environmental",
      direction: "green"
    },
    {
      id: 'q11',
      text: "Prinsip-prinsip agama harus membimbing kebijakan pemerintah.",
      dimension: "social",
      direction: "conservative"
    },
    {
      id: 'q12',
      text: "Imigrasi memperkuat negara dan harus didorong.",
      dimension: "social",
      direction: "progressive"
    },
    {
      id: 'q13',
      text: "Pengawasan pemerintah dapat diterima jika membantu mencegah terorisme dan kejahatan.",
      dimension: "social",
      direction: "authoritarian"
    },
    {
      id: 'q14',
      text: "Kepentingan negara harus lebih diutamakan daripada kerja sama internasional.",
      dimension: "international",
      direction: "nationalist"
    },
    {
      id: 'q15',
      text: "Masalah global membutuhkan solusi global dan institusi internasional yang kuat.",
      dimension: "international",
      direction: "globalist"
    },
    {
      id: 'q16',
      text: "Militer harus didanai dan didukung dengan kuat.",
      dimension: "international",
      direction: "nationalist"
    },
    {
      id: 'q17',
      text: "Kemajuan sosial dan kesetaraan lebih penting daripada mematuhi tradisi.",
      dimension: "social",
      direction: "progressive"
    },
    {
      id: 'q18',
      text: "Demokrasi terkadang perlu dibatasi untuk mencapai tujuan penting.",
      dimension: "governance",
      direction: "authoritarian"
    },
    {
      id: 'q19',
      text: "Protes publik dan pembangkangan sipil adalah cara yang sah untuk membawa perubahan politik.",
      dimension: "governance",
      direction: "libertarian"
    },
    {
      id: 'q20',
      text: "Pemerintah boleh menjalankan defisit anggaran untuk mendanai program sosial.",
      dimension: "economic",
      direction: "left"
    }
  ];

  // Define the political alignments and their descriptions in Bahasa Indonesia
  const politicalAlignments = {
    "progressive-left": {
      title: "Kiri Progresif",
      description: "Anda cenderung mendukung kesetaraan ekonomi dan intervensi pemerintah dalam ekonomi, sambil mendukung kebijakan sosial progresif. Anda mungkin percaya pada perluasan hak bagi kelompok-kelompok marjinal dan menekankan kesejahteraan kolektif di atas kesuksesan individu.",
      values: "Keadilan sosial, kesetaraan, tanggung jawab kolektif, intervensi pemerintah",
      figures: [
        { name: "Bernie Sanders", country: "AS" },
        { name: "Alexandria Ocasio-Cortez", country: "AS" },
        { name: "Gita Wirjawan", country: "Indonesia" },
        { name: "Grace Natalie", country: "Indonesia" }
      ]
    },
    "social-democrat": {
      title: "Sosial Demokrat",
      description: "Anda percaya pada ekonomi campuran dengan jaring pengaman sosial yang kuat sambil mempertahankan ekonomi pasar. Anda menghargai kebebasan pribadi dan tanggung jawab sosial, mencari keseimbangan pragmatis antara kapitalisme dan program kesejahteraan sosial.",
      values: "Pasar terregulasi, negara kesejahteraan, kesetaraan kesempatan, pragmatisme",
      figures: [
        { name: "Elizabeth Warren", country: "AS" },
        { name: "Jacinda Ardern", country: "Selandia Baru" },
        { name: "Anies Baswedan", country: "Indonesia" },
        { name: "Ganjar Pranowo", country: "Indonesia" }
      ]
    },
    "centrist": {
      title: "Sentris",
      description: "Anda memiliki campuran nilai-nilai tradisional dan progresif, menghindari posisi ideologis yang kuat. Anda mungkin percaya pada pendekatan moderat untuk masalah ekonomi dan sosial, lebih menyukai perubahan bertahap daripada transformasi radikal.",
      values: "Moderasi, kompromi, kepraktisan, kebijakan berbasis bukti",
      figures: [
        { name: "Emmanuel Macron", country: "Prancis" },
        { name: "Justin Trudeau", country: "Kanada" },
        { name: "Joko Widodo", country: "Indonesia" },
        { name: "Airlangga Hartarto", country: "Indonesia" }
      ]
    },
    "libertarian": {
      title: "Libertarian",
      description: "Anda sangat menghargai kebebasan individu dalam urusan pribadi dan ekonomi. Anda skeptis terhadap intervensi pemerintah dan lebih menyukai pasar bebas dengan regulasi minimal. Anda percaya orang harus bebas hidup sesuai keinginan mereka dengan campur tangan minimal.",
      values: "Kebebasan individu, pasar bebas, pemerintah terbatas, tanggung jawab pribadi",
      figures: [
        { name: "Rand Paul", country: "AS" },
        { name: "Ron Paul", country: "AS" },
        { name: "Rocky Gerung", country: "Indonesia" },
        { name: "Rizal Ramli", country: "Indonesia" }
      ]
    },
    "conservative": {
      title: "Konservatif Tradisional",
      description: "Anda menghargai tradisi, ketertiban, dan institusi yang mapan. Anda cenderung mendukung ekonomi pasar bebas tetapi juga mengakui pentingnya kohesi sosial dan nilai-nilai tradisional dalam mempertahankan masyarakat yang stabil.",
      values: "Tradisi, stabilitas, tanggung jawab pribadi, perubahan bertahap",
      figures: [
        { name: "Mitt Romney", country: "AS" },
        { name: "Angela Merkel", country: "Jerman" },
        { name: "Susilo Bambang Yudhoyono", country: "Indonesia" },
        { name: "Prabowo Subianto", country: "Indonesia" }
      ]
    },
    "nationalist": {
      title: "Konservatif Nasionalis",
      description: "Anda menekankan identitas nasional, kedaulatan, dan nilai-nilai tradisional. Anda cenderung mendukung perbatasan yang kuat, imigrasi yang dibatasi, dan kebijakan yang mengutamakan kepentingan nasional dalam urusan internasional.",
      values: "Identitas nasional, kedaulatan, pelestarian budaya, perbatasan yang kuat",
      figures: [
        { name: "Donald Trump", country: "AS" },
        { name: "Viktor Orbán", country: "Hongaria" },
        { name: "Gatot Nurmantyo", country: "Indonesia" },
        { name: "Fahri Hamzah", country: "Indonesia" }
      ]
    },
    "green": {
      title: "Hijau",
      description: "Anda memprioritaskan perlindungan lingkungan dan keberlanjutan. Anda mungkin khawatir tentang perubahan iklim dan mendukung perubahan kebijakan yang signifikan untuk mengatasi tantangan lingkungan, bahkan jika memerlukan penyesuaian ekonomi.",
      values: "Keberlanjutan lingkungan, generasi masa depan, kebijaksanaan ekologis",
      figures: [
        { name: "Greta Thunberg", country: "Swedia" },
        { name: "Al Gore", country: "AS" },
        { name: "Siti Nurbaya Bakar", country: "Indonesia" },
        { name: "Emil Salim", country: "Indonesia" }
      ]
    }
  };

  const answerOptions = [
    { value: -2, label: "Sangat Tidak Setuju" },
    { value: -1, label: "Tidak Setuju" },
    { value: 0, label: "Netral" },
    { value: 1, label: "Setuju" },
    { value: 2, label: "Sangat Setuju" }
  ];

  // Handle selecting an answer
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Move to the next question or show results if all questions are answered
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
      setShowResults(true);
    }
  };

  // Move to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate the political alignment based on answers
  const calculateResults = () => {
    let economicScore = 0, socialScore = 0, environmentalScore = 0, internationalScore = 0, governanceScore = 0;
    let economicCount = 0, socialCount = 0, environmentalCount = 0, internationalCount = 0, governanceCount = 0;
  
    questions.forEach(question => {
      const answer = answers[question.id] || 0;
      const adjustedScore = question.direction === "left" || 
                            question.direction === "progressive" || 
                            question.direction === "libertarian" || 
                            question.direction === "green" ||
                            question.direction === "globalist" ? answer : -answer;
  
      if (question.dimension === "economic") {
        economicScore += adjustedScore;
        economicCount++;
      } else if (question.dimension === "social") {
        socialScore += adjustedScore;
        socialCount++;
      } else if (question.dimension === "environmental") {
        environmentalScore += adjustedScore;
        environmentalCount++;
      } else if (question.dimension === "international") {
        internationalScore += adjustedScore;
        internationalCount++;
      } else if (question.dimension === "governance") {
        governanceScore += adjustedScore;
        governanceCount++;
      }
    });
  
    economicScore = economicCount > 0 ? (economicScore / economicCount) * 5 : 0;
    socialScore = socialCount > 0 ? (socialScore / socialCount) * 5 : 0;
    environmentalScore = environmentalCount > 0 ? (environmentalScore / environmentalCount) * 5 : 0;
    internationalScore = internationalCount > 0 ? (internationalScore / internationalCount) * 5 : 0;
    governanceScore = governanceCount > 0 ? (governanceScore / governanceCount) * 5 : 0;
  
    let alignment = "centrist";
    if (economicScore > 2.5 && socialScore > 2.5) {
      alignment = governanceScore < -2.5 ? "progressive-left" : "progressive-left"; // Could add authoritarian variant if defined
    } else if (economicScore > 2.5 && socialScore >= -2.5 && socialScore <= 2.5) {
      alignment = "social-democrat";
    } else if (economicScore < -2.5 && socialScore < -2.5) {
      alignment = governanceScore > 2.5 ? "conservative" : "nationalist"; // Governance adjusts here
    } else if (economicScore < -2.5 && socialScore > 2.5) {
      alignment = "libertarian";
    } else if (internationalScore < -2.5 && environmentalScore <= 2.5) {
      alignment = "nationalist";
    } else if (environmentalScore > 3.5) {
      alignment = "green";
    }
  
    setResults({
      alignment,
      scores: {
        economic: economicScore,
        social: socialScore,
        environmental: environmentalScore,
        international: internationalScore,
        governance: governanceScore
      }
    });
  };

  // Reset the test
  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  // Update progress bar
  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex, questions.length]);

  // Determine if the current question has been answered
  const isCurrentQuestionAnswered = answers[questions[currentQuestionIndex]?.id] !== undefined;

  return (
    <div className="political-alignment-test">
      <h2 className="text-2xl font-bold mb-4 font-serif">Tes Orientasi Politik</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Temukan orientasi politik Anda dengan tes komprehensif kami. Jawab pertanyaan tentang pandangan Anda mengenai isu ekonomi, sosial, dan internasional untuk melihat di mana Anda berada pada spektrum politik.
      </p>

      {!showResults ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</span>
              <span>{Math.round(progress)}% Selesai</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Current question */}
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-4">{questions[currentQuestionIndex].text}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4">
              {answerOptions.map((option) => (
                <button
                  key={option.value}
                  className={`py-2 px-4 rounded-lg border transition-all ${
                    answers[questions[currentQuestionIndex].id] === option.value
                      ? 'bg-red-600 text-white border-red-600 dark:bg-red-600 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleAnswer(questions[currentQuestionIndex].id, option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered}
              className={`px-4 py-2 rounded-lg ${
                isCurrentQuestionAnswered
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-2xl font-bold mb-2 text-center">Orientasi Politik Anda</h3>
          
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 my-4">
              {politicalAlignments[results.alignment].title}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {politicalAlignments[results.alignment].description}
            </p>
          </div>
          
          <div className="mb-8">
            <h4 className="font-medium text-lg mb-2">Nilai-Nilai Utama:</h4>
            <p className="text-gray-600 dark:text-gray-300">
              {politicalAlignments[results.alignment].values}
            </p>
            
            <h4 className="font-medium text-lg mt-4 mb-2">Tokoh Politik Serupa:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              {politicalAlignments[results.alignment].figures.map((figure, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <div className="font-medium">{figure.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{figure.country}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="font-medium text-lg mb-4">Dimensi Politik Anda:</h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Ekonomi: Kiri</span>
                  <span>Kanan</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                  <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${results.scores.economic > 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                    style={{ 
                      width: `${Math.abs(results.scores.economic) * 5}%`, 
                      marginLeft: results.scores.economic > 0 ? '50%' : `${50 - Math.abs(results.scores.economic) * 5}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Sosial: Progresif</span>
                  <span>Konservatif</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                  <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${results.scores.social > 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                    style={{ 
                      width: `${Math.abs(results.scores.social) * 5}%`, 
                      marginLeft: results.scores.social > 0 ? '50%' : `${50 - Math.abs(results.scores.social) * 5}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Internasional: Globalis</span>
                  <span>Nasionalis</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                  <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${results.scores.international > 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                    style={{ 
                      width: `${Math.abs(results.scores.international) * 5}%`, 
                      marginLeft: results.scores.international > 0 ? '50%' : `${50 - Math.abs(results.scores.international) * 5}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pemerintahan: Libertarian</span>
                  <span>Otoritarian</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                  <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${results.scores.governance > 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                    style={{ 
                      width: `${Math.abs(results.scores.governance) * 5}%`, 
                      marginLeft: results.scores.governance > 0 ? '50%' : `${50 - Math.abs(results.scores.governance) * 5}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lingkungan: Hijau</span>
                  <span>Fokus Pertumbuhan</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                  <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${results.scores.environmental > 0 ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ 
                      width: `${Math.abs(results.scores.environmental) * 5}%`, 
                      marginLeft: results.scores.environmental > 0 ? '50%' : `${50 - Math.abs(results.scores.environmental) * 5}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              onClick={resetTest}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Ambil Tes Kembali
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>
          <strong>Catatan:</strong> Tes ini memberikan pandangan yang disederhanakan dari orientasi politik yang kompleks. Keyakinan politik berada pada berbagai spektrum dan dipengaruhi oleh banyak faktor. Hasil harus dianggap sebagai titik awal untuk refleksi pribadi daripada label yang definitif.
        </p>
      </div>
    </div>
  );
}