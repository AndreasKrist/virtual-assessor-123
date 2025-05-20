import { useState, useEffect } from 'react';

// Improved Political Alignment Test component in Bahasa Indonesia
export default function PoliticalAlignmentTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);

  // Improved questions for more accurate political assessment
  // Added more nuanced questions and balanced coverage across dimensions
  const questions = [
    // Economic Dimension - Left vs Right
    {
      id: 'q1',
      text: "Pemerintah harus mengambil peran aktif dalam mengurangi ketimpangan ekonomi melalui pajak progresif dan program kesejahteraan.",
      dimension: "economic",
      direction: "left"
    },
    {
      id: 'q2',
      text: "Pertumbuhan ekonomi umumnya lebih baik dicapai melalui pasar bebas dengan campur tangan pemerintah yang minimal.",
      dimension: "economic",
      direction: "right"
    },
    {
      id: 'q3',
      text: "Semua warga negara berhak mendapatkan layanan kesehatan dan pendidikan yang dibiayai negara.",
      dimension: "economic",
      direction: "left"
    },
    {
      id: 'q4',
      text: "Privatisasi dan persaingan pasar biasanya membuat layanan publik menjadi lebih efisien.",
      dimension: "economic",
      direction: "right"
    },
    {
      id: 'q5',
      text: "Sistem kesejahteraan yang terlalu murah hati dapat mengurangi insentif untuk bekerja.",
      dimension: "economic",
      direction: "right"
    },
    
    // Social Dimension - Progressive vs Conservative
    {
      id: 'q6',
      text: "Nilai-nilai tradisional dan norma keluarga sangat penting untuk dipertahankan dalam masyarakat.",
      dimension: "social",
      direction: "conservative"
    },
    {
      id: 'q7',
      text: "Masyarakat harus terus berkembang dan meninggalkan praktik yang sudah ketinggalan zaman, meskipun tradisional.",
      dimension: "social",
      direction: "progressive"
    },
    {
      id: 'q8',
      text: "Agama seharusnya memiliki pengaruh yang lebih besar dalam pembuatan kebijakan publik.",
      dimension: "social",
      direction: "conservative"
    },
    {
      id: 'q9',
      text: "Pemerintah seharusnya tidak mengatur pilihan pribadi terkait gaya hidup selama tidak merugikan orang lain.",
      dimension: "social",
      direction: "progressive"
    },
    
    // Liberty Dimension - Libertarian vs Authoritarian
    {
      id: 'q10',
      text: "Keamanan nasional terkadang lebih penting daripada kebebasan individu.",
      dimension: "liberty",
      direction: "authoritarian"
    },
    {
      id: 'q11',
      text: "Masyarakat yang kuat membutuhkan otoritas yang jelas dan kepemimpinan yang tegas.",
      dimension: "liberty",
      direction: "authoritarian"
    },
    {
      id: 'q12',
      text: "Kebebasan berbicara harus dilindungi bahkan untuk pandangan yang kontroversial atau menyinggung.",
      dimension: "liberty",
      direction: "libertarian"
    },
    {
      id: 'q13',
      text: "Pemerintah yang kuat dan terpusat diperlukan untuk mengatasi masalah besar dalam masyarakat.",
      dimension: "liberty",
      direction: "authoritarian"
    },
    
    // Environmental Dimension - Green vs Growth
    {
      id: 'q14',
      text: "Perlindungan lingkungan seharusnya menjadi prioritas meskipun terkadang menghambat pertumbuhan ekonomi.",
      dimension: "environmental",
      direction: "green"
    },
    {
      id: 'q15',
      text: "Solusi berbasis pasar dan teknologi baru lebih efektif untuk masalah lingkungan daripada regulasi pemerintah.",
      dimension: "environmental",
      direction: "growth"
    },
    {
      id: 'q16',
      text: "Kita perlu mengurangi konsumsi secara signifikan untuk mencegah kerusakan lingkungan lebih lanjut.",
      dimension: "environmental",
      direction: "green"
    },
    
    // Nationalism Dimension - Globalist vs Nationalist
    {
      id: 'q17',
      text: "Masalah global seperti perubahan iklim dan pandemi membutuhkan kerja sama internasional yang kuat.",
      dimension: "nationalism",
      direction: "globalist"
    },
    {
      id: 'q18',
      text: "Kebijakan luar negeri harus selalu memprioritaskan kepentingan nasional di atas pertimbangan global.",
      dimension: "nationalism",
      direction: "nationalist"
    },
    {
      id: 'q19',
      text: "Imigrasi harus dibatasi untuk melindungi budaya dan ekonomi nasional.",
      dimension: "nationalism",
      direction: "nationalist"
    },
    {
      id: 'q20',
      text: "Organisasi internasional seperti PBB terlalu ikut campur dalam urusan negara berdaulat.",
      dimension: "nationalism",
      direction: "nationalist"
    },
    
    // State vs Markets - Role of Government
    {
      id: 'q21',
      text: "Pemerintah harus memiliki peran dalam mengarahkan ekonomi untuk mencapai tujuan sosial.",
      dimension: "state_role",
      direction: "state"
    },
    {
      id: 'q22',
      text: "Swasta biasanya lebih efisien daripada pemerintah dalam mengelola layanan publik seperti transportasi dan pendidikan.",
      dimension: "state_role",
      direction: "market"
    },
    {
      id: 'q23',
      text: "Aset-aset strategis nasional (seperti air, listrik, migas) seharusnya dimiliki publik, bukan swasta.",
      dimension: "state_role",
      direction: "state"
    },
    
    // Security vs Freedom
    {
      id: 'q24',
      text: "Lebih baik memiliki beberapa pembatasan kebebasan daripada risiko menghadapi ancaman keamanan.",
      dimension: "security",
      direction: "security"
    },
    {
      id: 'q25',
      text: "Hak privasi individu tidak boleh dikompromikan, bahkan untuk alasan keamanan nasional.",
      dimension: "security",
      direction: "freedom"
    }
  ];

  // Enhanced political alignments with more detailed descriptions
  const politicalAlignments = {
    "progressive-left": {
      title: "Kiri Progresif",
      description: "Anda cenderung mendukung kesetaraan ekonomi, intervensi pemerintah dalam ekonomi, dan kebijakan sosial progresif. Anda mungkin percaya pada redistribusi kekayaan, perluasan hak bagi kelompok-kelompok marjinal, dan menekankan kesejahteraan kolektif di atas kesuksesan individu.",
      values: "Keadilan sosial, kesetaraan, tanggung jawab kolektif, intervensi pemerintah",
      figures: [
        { name: "Bernie Sanders", country: "AS" },
        { name: "Alexandria Ocasio-Cortez", country: "AS" },
        { name: "Sukarno", country: "Indonesia" },
        { name: "Tjokroaminoto", country: "Indonesia" }
      ]
    },
    "democratic-socialist": {
      title: "Sosialis Demokratik",
      description: "Anda percaya pada transformasi ekonomi yang signifikan menuju kepemilikan publik dan demokratis, sambil tetap berkomitmen pada proses demokratis. Anda mendukung hak-hak pekerja, jaring pengaman sosial yang kuat, dan kebijakan sosial progresif.",
      values: "Solidaritas, kesetaraan substantif, demokrasi ekonomi, kontrol demokratis terhadap ekonomi",
      figures: [
        { name: "Jeremy Corbyn", country: "Inggris" },
        { name: "Jean-Luc Mélenchon", country: "Prancis" },
        { name: "Tan Malaka", country: "Indonesia" },
        { name: "D.N. Aidit", country: "Indonesia" }
      ]
    },
    "social-democrat": {
      title: "Sosial Demokrat",
      description: "Anda percaya pada ekonomi campuran dengan jaring pengaman sosial yang kuat sambil mempertahankan ekonomi pasar. Anda menghargai kebebasan pribadi dan tanggung jawab sosial, mencari keseimbangan pragmatis antara kapitalisme dan program kesejahteraan sosial.",
      values: "Pasar terregulasi, negara kesejahteraan, kesetaraan kesempatan, pragmatisme",
      figures: [
        { name: "Elizabeth Warren", country: "AS" },
        { name: "Jacinda Ardern", country: "Selandia Baru" },
        { name: "Mohammad Hatta", country: "Indonesia" },
        { name: "Sutan Sjahrir", country: "Indonesia" }
      ]
    },
    "green": {
      title: "Hijau",
      description: "Anda memberikan prioritas tinggi pada perlindungan lingkungan dan keberlanjutan, sering kali dikombinasikan dengan kebijakan sosial progresif. Anda mungkin skeptis terhadap pertumbuhan ekonomi tanpa batas dan mendukung transisi menuju ekonomi yang lebih berkelanjutan dan berkeadilan.",
      values: "Keberlanjutan lingkungan, keadilan sosial, demokrasi akar rumput, perspektif jangka panjang",
      figures: [
        { name: "Greta Thunberg", country: "Swedia" },
        { name: "Robert Habeck", country: "Jerman" },
        { name: "Emil Salim", country: "Indonesia" },
        { name: "Erna Witoelar", country: "Indonesia" }
      ]
    },
    "centrist": {
      title: "Sentris",
      description: "Anda memiliki campuran nilai-nilai tradisional dan progresif, menghindari posisi ideologis yang kuat. Anda mungkin percaya pada pendekatan moderat untuk masalah ekonomi dan sosial, lebih menyukai perubahan bertahap daripada transformasi radikal. Anda menghargai pragmatisme dan solusi berbasis bukti.",
      values: "Moderasi, kompromi, kepraktisan, kebijakan berbasis bukti",
      figures: [
        { name: "Emmanuel Macron", country: "Prancis" },
        { name: "Justin Trudeau", country: "Kanada" },
        { name: "Joko Widodo", country: "Indonesia" },
        { name: "B.J. Habibie", country: "Indonesia" }
      ]
    },
    "liberal": {
      title: "Liberal",
      description: "Anda mendukung ekonomi pasar dengan tingkat regulasi tertentu, sambil menekankan kebebasan individu dalam masalah sosial. Anda mungkin menghargai hak-hak sipil, sikap terbuka terhadap perubahan sosial, dan keseimbangan antara kebebasan individu dan tanggung jawab pemerintah.",
      values: "Kebebasan individu, kesempatan yang sama, inovasi, pluralisme",
      figures: [
        { name: "Barack Obama", country: "AS" },
        { name: "Kamala Harris", country: "AS" },
        { name: "Megawati Soekarnoputri", country: "Indonesia" },
        { name: "Gus Dur", country: "Indonesia" }
      ]
    },
    "libertarian": {
      title: "Libertarian",
      description: "Anda sangat menghargai kebebasan individu dalam urusan pribadi dan ekonomi. Anda skeptis terhadap intervensi pemerintah dan lebih menyukai pasar bebas dengan regulasi minimal. Anda percaya orang harus bebas hidup sesuai keinginan mereka dengan campur tangan minimal dari otoritas eksternal.",
      values: "Kebebasan individu, pasar bebas, pemerintah terbatas, tanggung jawab pribadi",
      figures: [
        { name: "Rand Paul", country: "AS" },
        { name: "Robert Nozick", country: "AS" },
        { name: "Sri Mulyani", country: "Indonesia" },
        { name: "Amien Rais", country: "Indonesia" }
      ]
    },
    "conservative": {
      title: "Konservatif Tradisional",
      description: "Anda menghargai tradisi, ketertiban, dan institusi yang mapan. Anda cenderung mendukung ekonomi pasar bebas tetapi juga mengakui pentingnya kohesi sosial dan nilai-nilai tradisional dalam mempertahankan masyarakat yang stabil. Perubahan sosial menurut Anda sebaiknya terjadi secara bertahap.",
      values: "Tradisi, stabilitas, tanggung jawab pribadi, perubahan bertahap",
      figures: [
        { name: "Angela Merkel", country: "Jerman" },
        { name: "David Cameron", country: "Inggris" },
        { name: "Susilo Bambang Yudhoyono", country: "Indonesia" },
        { name: "Mohammad Natsir", country: "Indonesia" }
      ]
    },
    "nationalist": {
      title: "Konservatif Nasionalis",
      description: "Anda menekankan identitas nasional, kedaulatan, dan nilai-nilai tradisional. Anda cenderung mendukung perbatasan yang kuat, imigrasi yang terkontrol, dan kebijakan yang mengutamakan kepentingan nasional dalam urusan internasional. Anda skeptis terhadap globalisasi dan lembaga supranasional.",
      values: "Identitas nasional, kedaulatan, pelestarian budaya, keamanan nasional",
      figures: [
        { name: "Viktor Orbán", country: "Hongaria" },
        { name: "Narendra Modi", country: "India" },
        { name: "Prabowo Subianto", country: "Indonesia" },
        { name: "Fadli Zon", country: "Indonesia" }
      ]
    },
    "auth-right": {
      title: "Kanan Otoriter",
      description: "Anda mendukung struktur sosial hierarkis, disiplin sosial, dan otoritas yang kuat. Secara ekonomi, Anda mungkin mendukung kapitalisme terkendali yang melayani kepentingan nasional. Anda menghargai ketertiban, tradisi, dan keamanan nasional di atas kebebasan individu.",
      values: "Ketertiban, hirarki, kekuatan nasional, kepemimpinan yang kuat",
      figures: [
        { name: "Jair Bolsonaro", country: "Brasil" },
        { name: "Rodrigo Duterte", country: "Filipina" },
        { name: "Gatot Nurmantyo", country: "Indonesia" },
        { name: "Ryamizard Ryacudu", country: "Indonesia" }
      ]
    },
    "auth-left": {
      title: "Kiri Otoriter",
      description: "Anda percaya pada transformasi ekonomi radikal menuju kesetaraan, dengan mekanisme kontrol sosial dan politik yang kuat. Anda mungkin skeptis terhadap demokrasi liberal dan yakin bahwa perubahan yang diperlukan membutuhkan struktur terpusat yang kuat untuk mengkoordinasikan masyarakat.",
      values: "Kesetaraan ekonomi, kolektivisme, perencanaan terpusat, disiplin revolusioner",
      figures: [
        { name: "Deng Xiaoping", country: "Tiongkok" },
        { name: "Fidel Castro", country: "Kuba" },
        { name: "D.N. Aidit", country: "Indonesia (historis)" },
        { name: "Tan Malaka", country: "Indonesia (historis)" }
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

  // Improved calculation function for more accurate results
  const calculateResults = () => {
    // Initialize score objects
    let scores = {
      economic: { total: 0, count: 0 },
      social: { total: 0, count: 0 },
      liberty: { total: 0, count: 0 },
      environmental: { total: 0, count: 0 },
      nationalism: { total: 0, count: 0 },
      state_role: { total: 0, count: 0 },
      security: { total: 0, count: 0 }
    };
    
    // Calculate raw scores for each dimension
    questions.forEach(question => {
      const answer = answers[question.id] || 0;
      
      // Adjust the score based on the direction
      const adjustedScore = question.direction === "left" || 
                           question.direction === "progressive" || 
                           question.direction === "libertarian" || 
                           question.direction === "green" ||
                           question.direction === "globalist" ||
                           question.direction === "state" ||
                           question.direction === "freedom" ? answer : -answer;
      
      scores[question.dimension].total += adjustedScore;
      scores[question.dimension].count += 1;
    });
    
    // Calculate average scores and normalize to -10 to 10 scale
    let normalizedScores = {};
    for (const dimension in scores) {
      if (scores[dimension].count > 0) {
        normalizedScores[dimension] = (scores[dimension].total / scores[dimension].count) * 5;
      } else {
        normalizedScores[dimension] = 0;
      }
    }
    
    // Determine political alignment using a more sophisticated algorithm
    let alignment = determineAlignment(normalizedScores);
    
    setResults({
      alignment,
      scores: normalizedScores
    });
  };
  
  // More sophisticated alignment determination algorithm
  const determineAlignment = (scores) => {
    // Primary axes that determine the core of political alignment
    const economic = scores.economic;
    const social = scores.social;
    const liberty = scores.liberty;
    const nationalism = scores.nationalism;
    const environmental = scores.environmental;
    const stateRole = scores.state_role;
    
    // Strong left economics + social progressivism
    if (economic > 5 && social > 3) {
      // Distinguish between democratic socialism and progressive left
      if (economic > 7 && stateRole > 5) {
        return "democratic-socialist";
      }
      return "progressive-left";
    }
    
    // Moderate left economics + social progressivism
    if (economic > 2 && economic <= 5 && social > 0) {
      return "social-democrat";
    }
    
    // Strong environmental focus
    if (environmental > 6 && (economic > 0 || social > 0)) {
      return "green";
    }
    
    // Centrist positions
    if (Math.abs(economic) <= 2.5 && Math.abs(social) <= 2.5 && Math.abs(liberty) <= 3) {
      return "centrist";
    }
    
    // Liberal - moderate market economy + social progressivism
    if (economic <= 2 && economic >= -3 && social > 2.5 && liberty > 0) {
      return "liberal";
    }
    
    // Libertarian - free market + high individual liberty
    if (economic < -2 && liberty > 5) {
      return "libertarian";
    }
    
    // Traditional conservative - free market + social conservatism
    if (economic < -2 && social < -2 && liberty > -3) {
      return "conservative";
    }
    
    // Nationalist - focus on national identity and sovereignty
    if (nationalism < -5 && social < -2) {
      return "nationalist";
    }
    
    // Authoritarian right - free market + social conservatism + low liberty
    if (economic < -2 && social < -2.5 && liberty < -5) {
      return "auth-right";
    }
    
    // Authoritarian left - state economics + low liberty
    if (economic > 2.5 && liberty < -5) {
      return "auth-left";
    }
    
    // Default fallback if no clear category matches
    return "centrist";
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
        Temukan orientasi politik dengan tes berikut ini. Jawab pertanyaan mengenai pandangan dalam isu ekonomi, sosial, dan politik untuk melihat spektrum politik kalian.
        <b><i> [Masih Dalam Tahap Pengembangan Lebih Lanjut]</i></b>
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
            
            <div className="space-y-5">
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
                      width: `${Math.min(Math.abs(results.scores.economic), 10) * 5}%`, 
                      marginLeft: results.scores.economic > 0 ? '50%' : `${50 - Math.min(Math.abs(results.scores.economic), 10) * 5}%` 
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
                      width: `${Math.min(Math.abs(results.scores.social), 10) * 5}%`, 
                      marginLeft: results.scores.social > 0 ? '50%' : `${50 - Math.min(Math.abs(results.scores.social), 10) * 5}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Kebebasan: Libertarian</span>
                  <span>Otoritarian</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                  <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${results.scores.liberty > 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                    style={{ 
                      width: `${Math.min(Math.abs(results.scores.liberty), 10) * 5}%`, 
                      marginLeft: results.scores.liberty > 0 ? '50%' : `${50 - Math.min(Math.abs(results.scores.liberty), 10) * 5}%` 
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
                    className={`h-4 rounded-full transition-all duration-500 ${results.scores.nationalism > 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                    style={{ 
                      width: `${Math.min(Math.abs(results.scores.nationalism), 10) * 5}%`, 
                      marginLeft: results.scores.nationalism > 0 ? '50%' : `${50 - Math.min(Math.abs(results.scores.nationalism), 10) * 5}%` 
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
                      width: `${Math.min(Math.abs(results.scores.environmental), 10) * 5}%`, 
                      marginLeft: results.scores.environmental > 0 ? '50%' : `${50 - Math.min(Math.abs(results.scores.environmental), 10) * 5}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Peran Negara: Interventif</span>
                  <span>Pasar Bebas</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative">
                  <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${results.scores.state_role > 0 ? 'bg-purple-500' : 'bg-teal-500'}`}
                    style={{ 
                      width: `${Math.min(Math.abs(results.scores.state_role), 10) * 5}%`, 
                      marginLeft: results.scores.state_role > 0 ? '50%' : `${50 - Math.min(Math.abs(results.scores.state_role), 10) * 5}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Political compass visualization */}
          <div className="mb-8">
            <h4 className="font-medium text-lg mb-4">Kompas Politik Anda:</h4>
            <div className="aspect-square w-full max-w-md mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg p-2 relative">
              {/* Axes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-gray-400 dark:bg-gray-500"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-0.5 bg-gray-400 dark:bg-gray-500"></div>
              </div>
              
              {/* Labels */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-300">
                Libertarian
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-300">
                Otoritarian
              </div>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-600 dark:text-gray-300">
                Kiri
              </div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-600 dark:text-gray-300">
                Kanan
              </div>
              
              {/* User position */}
              <div 
                className="absolute w-4 h-4 rounded-full bg-red-600 border-2 border-white dark:border-gray-800 shadow-md transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                style={{ 
                  left: `${50 + (results.scores.economic * 2.5)}%`, 
                  top: `${50 - (results.scores.liberty * 2.5)}%` 
                }}
              ></div>
              
              {/* Regions */}
              <div className="absolute text-xs text-gray-500 dark:text-gray-400 left-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2">
                Kiri Libertarian
              </div>
              <div className="absolute text-xs text-gray-500 dark:text-gray-400 right-1/4 top-1/4 transform translate-x-1/2 -translate-y-1/2">
                Kanan Libertarian
              </div>
              <div className="absolute text-xs text-gray-500 dark:text-gray-400 left-1/4 bottom-1/4 transform -translate-x-1/2 translate-y-1/2">
                Kiri Otoritarian
              </div>
              <div className="absolute text-xs text-gray-500 dark:text-gray-400 right-1/4 bottom-1/4 transform translate-x-1/2 translate-y-1/2">
                Kanan Otoritarian
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