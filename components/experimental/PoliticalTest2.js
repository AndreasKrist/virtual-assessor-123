import { useState, useEffect, useCallback, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function EnhancedPoliticalAlignmentTest() {
  const [currentStep, setCurrentStep] = useState('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionExplanation, setQuestionExplanation] = useState('');
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [answerTimes, setAnswerTimes] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [responseConsistency, setResponseConsistency] = useState({});
  const [userInfo, setUserInfo] = useState({
    age: '',
    gender: '',
    education: '',
    region: ''
  });
  const [resultExplanation, setResultExplanation] = useState([]);
  
  // Define all the questions in our bank
  const questionBank = {
    economic: [
      {
        id: 'econ1',
        text: "Negara seharusnya memainkan peran aktif dalam mengatur ekonomi.",
        explanation: "Pertanyaan ini mengukur pendapat Anda tentang tingkat intervensi pemerintah yang ideal dalam ekonomi. Pendukung ekonomi pasar bebas cenderung tidak setuju, sementara pendukung ekonomi yang diatur pemerintah cenderung setuju.",
        weight: 1.2,
        direction: "left",
        category: "economic"
      },
      {
        id: 'econ2',
        text: "Pelayanan publik seperti kesehatan dan pendidikan sebaiknya disediakan negara, bukan sektor swasta.",
        explanation: "Pertanyaan ini tentang preferensi Anda terhadap penyediaan layanan dasar oleh negara versus privatisasi. Pandangan progresif/kiri cenderung mendukung layanan publik yang dikelola negara.",
        weight: 1.3,
        direction: "left",
        category: "economic"
      },
      {
        id: 'econ3',
        text: "Pajak progresif (tarif yang lebih tinggi untuk yang berpenghasilan lebih besar) merupakan cara yang adil untuk mendistribusikan kekayaan.",
        explanation: "Pertanyaan ini mengukur pendapat Anda tentang keadilan pajak progresif. Pandangan ekonomi kiri biasanya mendukung pajak progresif, sementara pandangan ekonomi kanan cenderung lebih menyukai tarif pajak yang seragam atau lebih rendah.",
        weight: 1.0,
        direction: "left",
        category: "economic"
      },
      {
        id: 'econ4',
        text: "Keuntungan ekonomi akan lebih baik jika didistribusikan berdasarkan kebutuhan daripada berdasarkan kontribusi atau usaha individu.",
        explanation: "Pertanyaan ini membedakan antara prinsip sosialis 'dari masing-masing sesuai kemampuan, untuk masing-masing sesuai kebutuhan' versus pandangan meritokratis yang menekankan imbalan berdasarkan usaha/kontribusi.",
        weight: 1.4,
        direction: "left",
        category: "economic"
      },
      {
        id: 'econ5',
        text: "Perusahaan-perusahaan besar harus dipecah untuk mendorong persaingan yang lebih sehat dan mencegah monopoli.",
        explanation: "Pertanyaan ini mengukur sikap terhadap konsentrasi kekuatan ekonomi dan monopoli. Pandangan kiri dan beberapa pandangan libertarian mendukung pengaturan anti-monopoli.",
        weight: 0.9,
        direction: "left",
        category: "economic"
      },
      {
        id: 'econ6',
        text: "Pasar bebas dengan sedikit regulasi pemerintah menciptakan hasil ekonomi terbaik dan kesejahteraan maksimal.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap ekonomi pasar bebas klasik. Pandangan ekonomi liberal/kanan cenderung menyetujui pernyataan ini.",
        weight: 1.2,
        direction: "right",
        category: "economic"
      },
      {
        id: 'econ7',
        text: "Serikat pekerja terlalu banyak mengganggu dinamika pasar yang efisien.",
        explanation: "Pertanyaan ini mengukur sikap terhadap serikat pekerja dan keseimbangan kekuatan antara pekerja dan pemberi kerja. Pandangan ekonomi kanan cenderung melihat serikat pekerja secara negatif.",
        weight: 1.1,
        direction: "right",
        category: "economic"
      },
      {
        id: 'econ8',
        text: "Kesejahteraan sosial dan program bantuan pemerintah cenderung menciptakan ketergantungan dan mengurangi inisiatif bekerja.",
        explanation: "Pertanyaan ini mengukur persepsi tentang dampak jaring pengaman sosial. Pandangan konservatif/kanan sering menekankan efek negatif potensial dari program kesejahteraan yang terlalu luas.",
        weight: 1.0,
        direction: "right",
        category: "economic"
      },
      {
        id: 'econ9',
        text: "Pemerintah tidak seharusnya mengatur upah minimum, karena ini mengganggu dinamika pasar tenaga kerja.",
        explanation: "Pertanyaan ini mengukur sikap terhadap kebijakan upah minimum. Pandangan ekonomi liberal/kanan cenderung menolak intervensi pemerintah dalam penentuan upah.",
        weight: 1.1,
        direction: "right",
        category: "economic",
        calibrationPair: "econ1"
      },
      {
        id: 'econ10',
        text: "Sistem ekonomi harus terutama digerakkan oleh insentif pasar, bukan perencanaan pemerintah.",
        explanation: "Pertanyaan ini mengukur preferensi antara ekonomi pasar versus perencanaan ekonomi. Pandangan ekonomi kanan mendukung pendekatan berbasis pasar.",
        weight: 1.2,
        direction: "right",
        category: "economic",
        calibrationPair: "econ1"
      }
    ],
    social: [
      {
        id: 'social1',
        text: "Kebijakan imigrasi sebaiknya lebih ketat dan pengawasan perbatasan lebih diperketat.",
        explanation: "Pertanyaan ini mengukur sikap terhadap imigrasi dan kontrol perbatasan. Pandangan sosial konservatif cenderung mendukung pembatasan imigrasi yang lebih ketat.",
        weight: 1.2,
        direction: "conservative",
        category: "social"
      },
      {
        id: 'social2',
        text: "Nilai-nilai tradisional dan keluarga harus menjadi landasan utama dalam kebijakan sosial.",
        explanation: "Pertanyaan ini mengukur pentingnya nilai-nilai tradisional dalam pandangan sosial Anda. Konservatisme sosial menekankan pada pelestarian nilai-nilai tradisional.",
        weight: 1.3,
        direction: "conservative",
        category: "social"
      },
      {
        id: 'social3',
        text: "Kepentingan kolektif masyarakat harus diutamakan di atas kebebasan individu jika terjadi konflik antara keduanya.",
        explanation: "Pertanyaan ini mengukur preferensi Anda antara hak-hak individu versus kepentingan kolektif. Pandangan otoritarian/konservatif cenderung memprioritaskan kepentingan kolektif.",
        weight: 1.0,
        direction: "authoritarian",
        category: "social"
      },
      {
        id: 'social4',
        text: "Masyarakat terlalu toleran terhadap perilaku dan gaya hidup yang tidak konvensional atau berbeda.",
        explanation: "Pertanyaan ini mengukur sikap terhadap keberagaman dan non-konformitas sosial. Pandangan konservatif sosial cenderung lebih prihatin tentang erosi norma-norma tradisional.",
        weight: 1.1,
        direction: "conservative",
        category: "social"
      },
      {
        id: 'social5',
        text: "Kebebasan berekspresi penting dan harus dijaga bahkan untuk pandangan yang kontroversial atau menyinggung.",
        explanation: "Pertanyaan ini mengukur komitmen terhadap kebebasan berekspresi. Pandangan libertarian sangat memprioritaskan kebebasan berekspresi, sedangkan pandangan progresif dan konservatif mungkin melihat batasan yang berbeda.",
        weight: 1.2,
        direction: "libertarian",
        category: "social"
      },
      {
        id: 'social6',
        text: "Keberagaman budaya dan pluralisme memperkaya masyarakat dan harus secara aktif didorong.",
        explanation: "Pertanyaan ini mengukur sikap terhadap multikulturalisme dan keberagaman. Pandangan progresif cenderung melihat keberagaman sebagai kekuatan, sedangkan beberapa pandangan konservatif mungkin lebih menekankan pada asimilasi.",
        weight: 1.3,
        direction: "progressive",
        category: "social"
      },
      {
        id: 'social7',
        text: "Individu harus bebas menentukan dan mengekspresikan identitas mereka tanpa tekanan untuk menyesuaikan diri dengan norma sosial.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap kebebasan individu dalam hal identitas. Baik pandangan libertarian maupun progresif cenderung mendukung kebebasan identitas.",
        weight: 1.1,
        direction: "progressive",
        category: "social"
      },
      {
        id: 'social8',
        text: "Ketidaksetaraan sosial adalah masalah sistemik yang memerlukan solusi struktural, bukan hanya usaha individual.",
        explanation: "Pertanyaan ini mengukur pandangan tentang sumber ketidaksetaraan. Pandangan progresif menekankan faktor-faktor sistemik, sedangkan pandangan konservatif sering menekankan tanggung jawab individual.",
        weight: 1.0,
        direction: "progressive",
        category: "social"
      },
      {
        id: 'social9',
        text: "Perubahan sosial sebaiknya terjadi secara bertahap, bukan dengan reformasi radikal.",
        explanation: "Pertanyaan ini mengukur sikap terhadap kecepatan perubahan sosial. Pandangan konservatif cenderung lebih menyukai perubahan yang bertahap.",
        weight: 1.2,
        direction: "conservative",
        category: "social",
        calibrationPair: "social6"
      },
      {
        id: 'social10',
        text: "Individu sendiri harus bertanggung jawab atas keberhasilan atau kegagalan mereka dalam hidup.",
        explanation: "Pertanyaan ini mengukur pandangan tentang tanggung jawab individual versus faktor-faktor struktural. Pandangan konservatif cenderung menekankan tanggung jawab individu.",
        weight: 1.1,
        direction: "conservative",
        category: "social",
        calibrationPair: "social8"
      }
    ],
    governance: [
      {
        id: 'gov1',
        text: "Kepemimpinan yang kuat dan tegas lebih efektif daripada kepemimpinan yang terlalu demokratis dan konsultatif.",
        explanation: "Pertanyaan ini mengukur preferensi untuk gaya kepemimpinan otoritatif versus partisipatif. Pandangan otoritarian lebih mendukung pemimpin yang kuat dan tegas.",
        weight: 1.2,
        direction: "authoritarian",
        category: "governance"
      },
      {
        id: 'gov2',
        text: "Dalam keadaan krisis, pemerintah boleh membatasi kebebasan sipil demi keamanan dan stabilitas.",
        explanation: "Pertanyaan ini mengukur sejauh mana Anda bersedia mengorbankan kebebasan demi keamanan. Pandangan otoritarian cenderung lebih mengutamakan keamanan.",
        weight: 1.3,
        direction: "authoritarian",
        category: "governance"
      },
      {
        id: 'gov3',
        text: "Pemerintah yang kuat dan terpusat diperlukan untuk mengatasi masalah-masalah besar seperti krisis iklim atau pandemi.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap pemerintahan terpusat yang kuat versus desentralisasi kekuasaan. Pandangan otoritarian mendukung pemerintahan terpusat yang kuat.",
        weight: 1.1,
        direction: "authoritarian",
        category: "governance"
      },
      {
        id: 'gov4',
        text: "Partisipasi warga dalam pengambilan keputusan pemerintah sebaiknya diperluas, bahkan jika membuat proses menjadi lebih lambat.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap demokrasi partisipatif. Pandangan libertarian dan progresif cenderung mendukung partisipasi warga yang lebih luas.",
        weight: 1.2,
        direction: "libertarian",
        category: "governance"
      },
      {
        id: 'gov5',
        text: "Kekuasaan pemerintah pusat harus dibatasi dan lebih banyak otoritas harus diberikan kepada pemerintah daerah.",
        explanation: "Pertanyaan ini mengukur preferensi untuk federalisme/desentralisasi versus sentralisasi kekuasaan. Pandangan libertarian dan beberapa pandangan konservatif mendukung pemerintahan yang terdesentralisasi.",
        weight: 1.0,
        direction: "libertarian",
        category: "governance"
      },
      {
        id: 'gov6',
        text: "Undang-undang dan peraturan sering kali terlalu membatasi dan menghalangi kemajuan.",
        explanation: "Pertanyaan ini mengukur sikap terhadap regulasi secara umum. Pandangan libertarian cenderung melihat regulasi secara negatif.",
        weight: 1.1,
        direction: "libertarian",
        category: "governance"
      },
      {
        id: 'gov7',
        text: "Sistem peradilan seharusnya lebih memprioritaskan rehabilitasi daripada hukuman.",
        explanation: "Pertanyaan ini mengukur pendekatan terhadap peradilan dan sistem hukuman. Pandangan progresif cenderung lebih mendukung rehabilitasi.",
        weight: 1.0,
        direction: "progressive",
        category: "governance"
      },
      {
        id: 'gov8',
        text: "Warga negara harus selalu memprioritaskan ketaatan pada hukum dan ketertiban.",
        explanation: "Pertanyaan ini mengukur sikap terhadap kepatuhan dan ketertiban sosial. Pandangan otoritarian dan konservatif menekankan kepatuhan pada hukum.",
        weight: 1.1,
        direction: "authoritarian",
        category: "governance",
        calibrationPair: "gov6"
      }
    ],
    international: [
      {
        id: 'intl1',
        text: "Kebijakan luar negeri harus mengutamakan kepentingan nasional di atas komitmen internasional.",
        explanation: "Pertanyaan ini mengukur preferensi untuk kebijakan luar negeri yang berfokus pada kepentingan nasional versus internasionalisme. Pandangan nasionalis mengutamakan kepentingan dalam negeri.",
        weight: 1.2,
        direction: "nationalist",
        category: "international"
      },
      {
        id: 'intl2',
        text: "Globalisasi ekonomi pada umumnya bermanfaat bagi Indonesia dan dunia.",
        explanation: "Pertanyaan ini mengukur sikap terhadap globalisasi ekonomi. Pandangan internasionalis/globalis cenderung melihat globalisasi secara positif.",
        weight: 1.1,
        direction: "globalist",
        category: "international"
      },
      {
        id: 'intl3',
        text: "Organisasi internasional seperti PBB seharusnya memiliki lebih banyak wewenang untuk mengatasi masalah global.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap institusi global dan governance global. Pandangan internasionalis mendukung organisasi internasional yang lebih kuat.",
        weight: 1.3,
        direction: "globalist",
        category: "international"
      },
      {
        id: 'intl4',
        text: "Ketahanan dan kemandirian nasional lebih penting daripada integrasi global.",
        explanation: "Pertanyaan ini mengukur preferensi untuk kemandirian dan kedaulatan versus interdependensi global. Pandangan nasionalis mengutamakan ketahanan dan kemandirian.",
        weight: 1.2,
        direction: "nationalist",
        category: "international"
      },
      {
        id: 'intl5',
        text: "Indonesia harus lebih fokus pada masalah dalam negeri daripada keterlibatan dalam urusan internasional.",
        explanation: "Pertanyaan ini mengukur kecenderungan isolasionis versus intervensionis dalam kebijakan luar negeri. Pandangan nasionalis cenderung lebih fokus pada urusan dalam negeri.",
        weight: 1.0,
        direction: "nationalist",
        category: "international"
      },
      {
        id: 'intl6',
        text: "Kerja sama internasional adalah kunci untuk mengatasi tantangan global seperti perubahan iklim dan pandemik.",
        explanation: "Pertanyaan ini mengukur pandangan tentang pentingnya kerja sama global. Pandangan internasionalis menekankan pendekatan multilateral untuk masalah global.",
        weight: 1.2,
        direction: "globalist",
        category: "international",
        calibrationPair: "intl5"
      }
    ],
    environmental: [
      {
        id: 'env1',
        text: "Perubahan iklim adalah krisis mendesak yang memerlukan tindakan segera bahkan jika mengakibatkan biaya ekonomi jangka pendek.",
        explanation: "Pertanyaan ini mengukur prioritas Anda antara mengatasi krisis iklim versus pertimbangan ekonomi jangka pendek. Pandangan 'hijau' memprioritaskan tindakan iklim.",
        weight: 1.3,
        direction: "green",
        category: "environmental"
      },
      {
        id: 'env2',
        text: "Pertumbuhan ekonomi dan penciptaan lapangan kerja harus diprioritaskan di atas perlindungan lingkungan jika keduanya bertentangan.",
        explanation: "Pertanyaan ini mengukur bagaimana Anda menyeimbangkan kepentingan ekonomi dan lingkungan. Pandangan 'pertumbuhan' memprioritaskan ekonomi, sedangkan pandangan 'hijau' memprioritaskan lingkungan.",
        weight: 1.2,
        direction: "growth",
        category: "environmental"
      },
      {
        id: 'env3',
        text: "Regulasi lingkungan sering kali terlalu memberatkan bisnis dan menghambat perkembangan ekonomi.",
        explanation: "Pertanyaan ini mengukur sikap terhadap regulasi lingkungan. Pandangan 'pertumbuhan' cenderung melihat regulasi lingkungan sebagai beban.",
        weight: 1.1,
        direction: "growth",
        category: "environmental"
      },
      {
        id: 'env4',
        text: "Indonesia harus berinvestasi lebih banyak dalam energi terbarukan meskipun biayanya lebih tinggi dalam jangka pendek.",
        explanation: "Pertanyaan ini mengukur dukungan untuk transisi energi terbarukan. Pandangan 'hijau' mendukung investasi dalam energi terbarukan.",
        weight: 1.0,
        direction: "green",
        category: "environmental"
      },
      {
        id: 'env5',
        text: "Standar hidup dan pola konsumsi saat ini tidak berkelanjutan dan perlu diubah secara fundamental.",
        explanation: "Pertanyaan ini mengukur dukungan untuk perubahan gaya hidup demi keberlanjutan. Pandangan 'hijau' yang lebih radikal mendukung transformasi pola konsumsi.",
        weight: 1.2,
        direction: "green",
        category: "environmental"
      },
      {
        id: 'env6',
        text: "Kemajuan teknologi akan mampu mengatasi masalah lingkungan tanpa perlu mengurangi pertumbuhan ekonomi.",
        explanation: "Pertanyaan ini mengukur pandangan tentang solusi teknologi versus perubahan struktural. Pandangan 'growth' cenderung optimis tentang solusi teknologi.",
        weight: 1.1,
        direction: "growth",
        category: "environmental",
        calibrationPair: "env1"
      }
    ]
  };

  // Define political alignments with more detailed descriptions and nuances
  const politicalAlignments = {
    "socialist": {
      title: "Sosialis",
      description: "Anda memiliki pandangan ekonomi kiri yang kuat dan cenderung progresif secara sosial. Anda mungkin mendukung peran negara yang luas dalam perekonomian, redistribusi kekayaan yang signifikan, dan layanan publik yang kuat. Anda cenderung melihat ketidaksetaraan sebagai masalah sistemik yang memerlukan solusi struktural.",
      values: "Kesetaraan ekonomi, redistribusi kekayaan, layanan publik universal, kepemilikan publik/kolektif terhadap sektor-sektor ekonomi utama",
      figures: [
        { name: "Bernie Sanders", country: "AS" },
        { name: "Jean-Luc Mélenchon", country: "Prancis" },
        { name: "Budiman Sudjatmiko", country: "Indonesia" }
      ],
      compatibility: {
        "progressive-left": "Tinggi - Kesamaan dalam pendekatan ekonomi dan nilai-nilai sosial progresif",
        "social-democrat": "Sedang - Kesamaan dalam tujuan sosial meskipun berbeda dalam metode ekonomi",
        "green": "Sedang - Kesamaan dalam kritik terhadap kapitalisme, meskipun fokus prioritas berbeda"
      }
    },
    "progressive-left": {
      title: "Kiri Progresif",
      description: "Anda mendukung kebijakan ekonomi yang mengurangi ketimpangan sambil mengadvokasi keadilan sosial dan hak-hak kelompok minoritas. Anda percaya pada peran aktif pemerintah dalam ekonomi dan perlindungan sosial yang kuat, sambil memberikan penekanan pada isu-isu identitas dan representasi.",
      values: "Keadilan sosial, kesetaraan, intervensi ekonomi pemerintah, hak-hak minoritas, progresivisme sosial",
      figures: [
        { name: "Alexandria Ocasio-Cortez", country: "AS" },
        { name: "Jacinda Ardern", country: "Selandia Baru" },
        { name: "Gita Wirjawan", country: "Indonesia" }
      ],
      compatibility: {
        "socialist": "Tinggi - Kesamaan dalam pendekatan ekonomi meskipun mungkin berbeda dalam penekanan pada isu identitas",
        "social-democrat": "Tinggi - Kesamaan dalam visi masyarakat yang lebih setara dan adil",
        "green": "Tinggi - Kesamaan dalam keprihatinan lingkungan dan keadilan sosial"
      }
    },
    "social-democrat": {
      title: "Sosial Demokrat",
      description: "Anda mendukung ekonomi pasar dengan regulasi yang baik dan jaring pengaman sosial yang kuat. Anda percaya pada keseimbangan antara kebebasan ekonomi dan intervensi pemerintah untuk memastikan keadilan sosial, sambil menjunjung tinggi nilai-nilai demokratis dan hak-hak individu.",
      values: "Ekonomi pasar campuran, negara kesejahteraan, kesetaraan kesempatan, dialog sosial, regulasi pasar",
      figures: [
        { name: "Elizabeth Warren", country: "AS" },
        { name: "Olaf Scholz", country: "Jerman" },
        { name: "Anies Baswedan", country: "Indonesia" }
      ],
      compatibility: {
        "progressive-left": "Tinggi - Kesamaan dalam tujuan sosial meskipun lebih moderat dalam pendekatan ekonomi",
        "centrist": "Sedang - Tumpang tindih dalam pragmatisme meskipun berbeda dalam visi sosial",
        "green": "Sedang - Kesamaan dalam pendekatan lingkungan modernis"
      }
    },
    "green": {
      title: "Hijau",
      description: "Anda memprioritaskan keberlanjutan lingkungan dan keadilan ekologis dalam pengambilan keputusan politik. Anda mendukung transformasi ekonomi untuk mengatasi krisis iklim dan biasanya progresif dalam isu-isu sosial, menekankan partisipasi akar rumput dan demokrasi langsung.",
      values: "Keberlanjutan lingkungan, keadilan ekologis, ekonomi hijau, demokrasi partisipatif, perdamaian",
      figures: [
        { name: "Greta Thunberg", country: "Swedia" },
        { name: "Robert Habeck", country: "Jerman" },
        { name: "Farwiza Farhan", country: "Indonesia" }
      ],
      compatibility: {
        "progressive-left": "Tinggi - Kesamaan dalam visi progresif dan keprihatinan tentang keadilan",
        "social-democrat": "Sedang - Tumpang tindih dalam pendekatan moderat terhadap perubahan",
        "libertarian-left": "Sedang - Kesamaan dalam pendekatan desentralisasi meskipun berbeda dalam penekanan"
      }
    },
    "centrist": {
      title: "Sentris",
      description: "Anda memiliki pendekatan pragmatis yang menggabungkan elemen dari berbagai spektrum politik. Anda lebih menyukai solusi berbasis bukti daripada ideologi kaku, dan mencari kompromi serta kebijakan yang seimbang yang mempertimbangkan berbagai sudut pandang.",
      values: "Pragmatisme, moderasi, kompromi, pemerintahan teknokratis, kebijakan berbasis bukti",
      figures: [
        { name: "Emmanuel Macron", country: "Prancis" },
        { name: "Justin Trudeau", country: "Kanada" },
        { name: "Joko Widodo", country: "Indonesia" }
      ],
      compatibility: {
        "social-democrat": "Sedang - Tumpang tindih dalam pragmatisme dan pendekatan bertahap",
        "liberal": "Sedang - Kesamaan dalam dukungan terhadap ekonomi pasar dan kebebasan sosial",
        "conservative-moderate": "Sedang - Kesamaan dalam penekanan pada stabilitas dan perubahan bertahap"
      }
    },
    "liberal": {
      title: "Liberal",
      description: "Anda mendukung kebebasan individu dalam hal ekonomi dan sosial, dengan preferensi untuk pemerintahan yang minimal. Anda biasanya progresif dalam isu-isu sosial tetapi skeptis terhadap intervensi pemerintah yang berlebihan dalam ekonomi dan kehidupan pribadi.",
      values: "Kebebasan individu, ekonomi pasar, pemerintahan terbatas, hak-hak sipil, pragmatisme",
      figures: [
        { name: "Barack Obama", country: "AS" },
        { name: "Mark Rutte", country: "Belanda" },
        { name: "Ananda Sukarlan", country: "Indonesia" }
      ],
      compatibility: {
        "centrist": "Tinggi - Kesamaan dalam pendekatan pragmatis",
        "libertarian": "Sedang - Kesamaan dalam penekanan pada kebebasan meskipun berbeda dalam skopnya",
        "social-democrat": "Sedang - Tumpang tindih pada masalah sosial meskipun berbeda dalam pendekatan ekonomi"
      }
    },
    "libertarian": {
      title: "Libertarian",
      description: "Anda sangat menghargai kebebasan individu dan otonomi dalam semua aspek kehidupan. Anda skeptis terhadap otoritas pemerintah dan mendukung pengurangan peran negara baik dalam ekonomi maupun urusan pribadi, menekankan pasar bebas dan kebebasan sipil.",
      values: "Kebebasan individu, pasar bebas, pemerintahan minimal, kedaulatan individu, anti-otoritarianisme",
      figures: [
        { name: "Rand Paul", country: "AS" },
        { name: "David Friedman", country: "AS" },
        { name: "Rocky Gerung", country: "Indonesia" }
      ],
      compatibility: {
        "liberal": "Sedang - Kesamaan dalam penekanan pada kebebasan meskipun libertarian lebih radikal",
        "conservative": "Rendah - Kesamaan dalam ekonomi pasar bebas tetapi berbeda dalam nilai-nilai sosial",
        "anarchist": "Sedang - Kesamaan dalam skeptisisme terhadap otoritas negara meskipun berbeda dalam pendekatan ekonomi"
      }
    },
    "conservative-moderate": {
      title: "Konservatif Moderat",
      description: "Anda menghargai tradisi, stabilitas, dan perubahan bertahap. Anda cenderung mendukung ekonomi pasar bebas dengan beberapa perlindungan sosial, dan mengutamakan nilai-nilai keluarga dan komunitas tradisional, tetapi tetap terbuka untuk beberapa adaptasi terhadap perubahan sosial.",
      values: "Tradisi, stabilitas, perubahan bertahap, tanggung jawab pribadi, nilai keluarga, ketahanan nasional",
      figures: [
        { name: "Angela Merkel", country: "Jerman" },
        { name: "Mitt Romney", country: "AS" },
        { name: "Jusuf Kalla", country: "Indonesia" }
      ],
      compatibility: {
        "centrist": "Sedang - Kesamaan dalam penekanan pada stabilitas dan pendekatan bertahap",
        "liberal": "Rendah ke Sedang - Kesamaan dalam ekonomi meskipun berbeda dalam nilai-nilai sosial",
        "conservative": "Tinggi - Kesamaan dalam nilai-nilai inti meskipun berbeda dalam intensitas"
      }
    },
    "conservative": {
      title: "Konservatif",
      description: "Anda menekankan nilai-nilai tradisional, otoritas sosial, dan kedaulatan nasional. Anda biasanya mendukung ekonomi pasar bebas, pertahanan nasional yang kuat, dan kebijakan keamanan yang tegas, sambil menjunjung tinggi institusi tradisional dan norma-norma budaya.",
      values: "Nilai-nilai tradisional, otoritas, kedaulatan nasional, ekonomi pasar, identitas budaya, keamanan",
      figures: [
        { name: "Marine Le Pen", country: "Prancis" },
        { name: "Viktor Orbán", country: "Hungaria" },
        { name: "Prabowo Subianto", country: "Indonesia" }
      ],
      compatibility: {
        "conservative-moderate": "Tinggi - Kesamaan dalam nilai-nilai inti meskipun lebih tegas",
        "nationalist": "Tinggi - Kesamaan dalam penekanan pada identitas nasional dan kedaulatan",
        "centrist": "Rendah - Perbedaan fundamental dalam pendekatan terhadap perubahan sosial"
      }
    },
    "nationalist": {
      title: "Nasionalis",
      description: "Anda mengutamakan kepentingan nasional, identitas budaya, dan kedaulatan dalam pengambilan keputusan politik. Anda mendukung kebijakan yang memperkuat identitas nasional dan melindungi kepentingan negara, sering kali skeptis terhadap globalisasi dan imigrasi massal.",
      values: "Identitas nasional, kedaulatan, patriotisme, proteksionisme, keamanan perbatasan, kesatuan budaya",
      figures: [
        { name: "Narendra Modi", country: "India" },
        { name: "Shinzo Abe", country: "Jepang" },
        { name: "Ahmad Dhani", country: "Indonesia" }
      ],
      compatibility: {
        "conservative": "Tinggi - Kesamaan dalam penekanan pada identitas dan keamanan",
        "authoritarian": "Sedang - Kesamaan dalam prioritas pada ketertiban dan otoritas",
        "centrist": "Rendah - Perbedaan fundamental dalam pendekatan terhadap kerja sama internasional"
      }
    },
    "authoritarian": {
      title: "Otoritarian",
      description: "Anda menekankan ketertiban, stabilitas, dan otoritas yang kuat dalam masyarakat. Anda mungkin percaya bahwa pemerintahan yang kuat dan terpusat lebih efisien daripada demokrasi yang terlalu partisipatif, dan bersedia membatasi beberapa kebebasan individu demi keamanan dan kohesi sosial.",
      values: "Otoritas, ketertiban, efisiensi, keamanan, patriotisme, disiplin, stabilitas",
      figures: [
        { name: "Xi Jinping", country: "China" },
        { name: "Recep Tayyip Erdoğan", country: "Turki" },
        { name: "Soeharto", country: "Indonesia (sejarah)" }
      ],
      compatibility: {
        "nationalist": "Tinggi - Kesamaan dalam penekanan pada ketahanan nasional",
        "conservative": "Sedang - Kesamaan dalam nilai otoritas meskipun berbeda dalam sikap terhadap demokrasi",
        "centrist": "Rendah - Perbedaan fundamental dalam nilai-nilai demokrasi dan kebebasan"
      }
    }
  };
  
  const answerOptions = [
    { value: -2, label: "Sangat Tidak Setuju" },
    { value: -1, label: "Tidak Setuju" },
    { value: 0, label: "Netral" },
    { value: 1, label: "Setuju" },
    { value: 2, label: "Sangat Setuju" }
  ];

  // Improved vector profiles for alignment identification
  const alignmentVectors = useMemo(() => ({
    "socialist": { 
      economic: 8.5, 
      social: 6.5, 
      authoritarian: -0.5, 
      international: 6, 
      environmental: 7
    },
    "progressive-left": { 
      economic: 6.5, 
      social: 7.5, 
      authoritarian: 3, 
      international: 6.5, 
      environmental: 7.5
    },
    "social-democrat": { 
      economic: 4.5, 
      social: 5, 
      authoritarian: 2, 
      international: 4.5, 
      environmental: 5.5
    },
    "green": { 
      economic: 3, 
      social: 6, 
      authoritarian: 2.5, 
      international: 7.5, 
      environmental: 9
    },
    "centrist": { 
      economic: 0, 
      social: 0, 
      authoritarian: 0, 
      international: 0, 
      environmental: 0
    },
    "liberal": { 
      economic: -3.5, 
      social: 4.5, 
      authoritarian: 4.5, 
      international: 3, 
      environmental: 2.5
    },
    "libertarian": { 
      economic: -7.5, 
      social: 5.5, 
      authoritarian: 8.5, 
      international: -2.5, 
      environmental: -2.5
    },
    "conservative-moderate": { 
      economic: -4.5, 
      social: -4.5, 
      authoritarian: -2.5, 
      international: -2.5, 
      environmental: -2.5
    },
    "conservative": { 
      economic: -7.5, 
      social: -7.5, 
      authoritarian: -5.5, 
      international: -5.5, 
      environmental: -4.5
    },
    "nationalist": { 
      economic: -5.5, 
      social: -6.5, 
      authoritarian: -6.5, 
      international: -8.5, 
      environmental: -3.5
    },
    "authoritarian": { 
      economic: -3, 
      social: -6, 
      authoritarian: -9, 
      international: -6.5, 
      environmental: -2.5
    }
  }), []);

  // Helper function to select questions with better balance and calibration
  const selectQuestionsFromBank = useCallback(() => {
    // Define target number of questions per category
    const questionsPerCategory = {
      economic: 6,
      social: 6,
      governance: 4,
      international: 3,
      environmental: 3
    };
    
    const selected = [];
    const calibrationPairs = new Set();
    
    // Select from each category ensuring diverse directions
    Object.keys(questionsPerCategory).forEach(category => {
      const count = questionsPerCategory[category];
      const categoryQuestions = [...questionBank[category]];
      
      // Shuffle the questions
      for (let i = categoryQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [categoryQuestions[i], categoryQuestions[j]] = [categoryQuestions[j], categoryQuestions[i]];
      }
      
      // Categorize questions by direction
      const directionGroups = {};
      categoryQuestions.forEach(q => {
        if (!directionGroups[q.direction]) {
          directionGroups[q.direction] = [];
        }
        directionGroups[q.direction].push(q);
      });
      
      // Select balanced questions from each direction
      const selectedFromCategory = [];
      const directions = Object.keys(directionGroups);
      
      let directionIndex = 0;
      while (selectedFromCategory.length < count && directions.length > 0) {
        const direction = directions[directionIndex % directions.length];
        
        if (directionGroups[direction].length > 0) {
          const questionToAdd = directionGroups[direction].shift();
          
          // Include calibration pairs when possible, but avoid too many
          if (questionToAdd.calibrationPair && calibrationPairs.size < 3) {
            // Find the paired question
            const pairedQuestion = categoryQuestions.find(q => q.id === questionToAdd.calibrationPair);
            if (pairedQuestion && !selectedFromCategory.includes(pairedQuestion)) {
              selectedFromCategory.push(questionToAdd);
              calibrationPairs.add(questionToAdd.id);
            }
          } else {
            selectedFromCategory.push(questionToAdd);
          }
        }
        
        directionIndex++;
        
        // If we've gone through all directions and still need questions, reset and try again
        if (directionIndex % directions.length === 0 && selectedFromCategory.length < count) {
          directionGroups[directions[0]] = categoryQuestions.filter(q => q.direction === directions[0]);
        }
      }
      
      // Add selected questions from this category
      selectedFromCategory.forEach(q => {
        selected.push({...q, category});
      });
    });
    
    // Add some calibration questions
    if (calibrationPairs.size < 2) {
      // Add specific additional calibration questions
      // Implementation would depend on specific needs
    }
    
    // Shuffle the combined selections to avoid order bias
    for (let i = selected.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selected[i], selected[j]] = [selected[j], selected[i]];
    }
    
    return selected;
  }, [questionBank]);
  
  // Start the test
  const startTest = () => {
    const selectedQuestions = selectQuestionsFromBank();
    setDisplayedQuestions(selectedQuestions);
    setCurrentStep('questionnaire');
    setCurrentQuestionIndex(0);
    setStartTime(Date.now());
  };

  // Handle selecting an answer
  const handleAnswer = (questionId, value) => {
    // Record answer time
    const answerTime = Date.now() - startTime;
    setAnswerTimes(prev => ({
      ...prev,
      [questionId]: answerTime
    }));
    
    // Save answer
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Check for consistency with calibration pairs
    const currentQuestion = displayedQuestions.find(q => q.id === questionId);
    if (currentQuestion.calibrationPair) {
      const pairedQuestionId = currentQuestion.calibrationPair;
      if (answers[pairedQuestionId] !== undefined) {
        // Calculate consistency score based on whether answers are logically consistent
        // For opposing directions, the answers should be opposite
        const pairedQuestion = questionBank[currentQuestion.category].find(q => q.id === pairedQuestionId);
        
        let consistencyScore = 1; // Default perfect consistency
        if (currentQuestion.direction !== pairedQuestion.direction) {
          // For opposing views, answers should be opposites
          consistencyScore = 1 - (Math.abs(value + answers[pairedQuestionId]) / 4);
        } else {
          // For similar views, answers should align
          consistencyScore = 1 - (Math.abs(value - answers[pairedQuestionId]) / 4);
        }
        
        setResponseConsistency(prev => ({
          ...prev,
          [currentQuestion.category]: [...(prev[currentQuestion.category] || []), consistencyScore]
        }));
      }
    }
  };

  // Show explanation for the current question
  const toggleExplanation = () => {
    if (!showExplanation) {
      setQuestionExplanation(displayedQuestions[currentQuestionIndex].explanation);
    }
    setShowExplanation(!showExplanation);
  };

  // Move to the next question or show results if all questions are answered
  const handleNext = () => {
    if (currentQuestionIndex < displayedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      calculateResults();
      setCurrentStep('results');
    }
  };

  // Move to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };
  
  // Handle demographic input changes
  const handleDemographicChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculate the political alignment based on answers with enhanced methodology
  const calculateResults = () => {
    // Initialize dimension scores with confidence tracking
    let scores = {
      economic: { left: 0, right: 0, total: 0, count: 0, confidence: 0.8 },
      social: { progressive: 0, conservative: 0, total: 0, count: 0, confidence: 0.8 },
      authoritarian: { libertarian: 0, authoritarian: 0, total: 0, count: 0, confidence: 0.8 },
      international: { globalist: 0, nationalist: 0, total: 0, count: 0, confidence: 0.8 },
      environmental: { green: 0, growth: 0, total: 0, count: 0, confidence: 0.8 }
    };
    
    // Adjust confidence based on response consistency
    Object.keys(responseConsistency).forEach(category => {
      const consistencyValues = responseConsistency[category];
      if (consistencyValues && consistencyValues.length > 0) {
        const avgConsistency = consistencyValues.reduce((sum, val) => sum + val, 0) / consistencyValues.length;
        
        // Map to appropriate dimension
        if (category === 'economic') {
          scores.economic.confidence = avgConsistency;
        } else if (category === 'social') {
          scores.social.confidence = avgConsistency;
          scores.authoritarian.confidence = avgConsistency;
        } else if (category === 'governance') {
          scores.authoritarian.confidence = avgConsistency;
        } else if (category === 'international') {
          scores.international.confidence = avgConsistency;
        } else if (category === 'environmental') {
          scores.environmental.confidence = avgConsistency;
        }
      }
    });
    
    // Calculate weighted scores for each dimension
    displayedQuestions.forEach(question => {
      const answer = answers[question.id] || 0;
      
      // Factor in answer time for confidence (quick/extreme answers get slight confidence reduction)
      const answerTime = answerTimes[question.id] || 5000; // Default to 5 seconds if no time recorded
      let timeFactor = 1;
      
      // Very quick answers to complex questions might indicate less thoughtfulness
      if (answerTime < 1500 && Math.abs(answer) > 1) {
        timeFactor = 0.9; // Slightly reduce confidence for very quick extreme answers
      }
      
      // Apply scoring logic based on question category and direction
      if (question.category === 'economic') {
        if (question.direction === 'left') {
          scores.economic.left += answer * question.weight * timeFactor;
        } else {
          scores.economic.right += (answer * -1) * question.weight * timeFactor;
        }
        scores.economic.count += question.weight;
      }
      else if (question.category === 'social') {
        if (question.direction === 'progressive') {
          scores.social.progressive += answer * question.weight * timeFactor;
        } else if (question.direction === 'conservative') {
          scores.social.conservative += (answer * -1) * question.weight * timeFactor;
        } else if (question.direction === 'libertarian') {
          scores.authoritarian.libertarian += answer * question.weight * timeFactor;
        } else if (question.direction === 'authoritarian') {
          scores.authoritarian.authoritarian += (answer * -1) * question.weight * timeFactor;
        }
        
        if (question.direction === 'progressive' || question.direction === 'conservative') {
          scores.social.count += question.weight;
        }
        if (question.direction === 'libertarian' || question.direction === 'authoritarian') {
          scores.authoritarian.count += question.weight;
        }
      }
      else if (question.category === 'governance') {
        if (question.direction === 'libertarian') {
          scores.authoritarian.libertarian += answer * question.weight * timeFactor;
        } else if (question.direction === 'authoritarian') {
          scores.authoritarian.authoritarian += (answer * -1) * question.weight * timeFactor;
        } else if (question.direction === 'progressive') {
          scores.social.progressive += answer * question.weight * timeFactor;
          scores.social.count += question.weight;
        }
        
        if (question.direction === 'libertarian' || question.direction === 'authoritarian') {
          scores.authoritarian.count += question.weight;
        }
      }
      else if (question.category === 'international') {
        if (question.direction === 'globalist') {
          scores.international.globalist += answer * question.weight * timeFactor;
        } else if (question.direction === 'nationalist') {
          scores.international.nationalist += (answer * -1) * question.weight * timeFactor;
        }
        scores.international.count += question.weight;
      }
      else if (question.category === 'environmental') {
        if (question.direction === 'green') {
          scores.environmental.green += answer * question.weight * timeFactor;
        } else if (question.direction === 'growth') {
          scores.environmental.growth += (answer * -1) * question.weight * timeFactor;
        }
        scores.environmental.count += question.weight;
      }
    });
    
    // Normalize scores to -10 to +10 scale
    if (scores.economic.count > 0) {
      scores.economic.total = ((scores.economic.left + scores.economic.right) / scores.economic.count) * 5;
    }
    if (scores.social.count > 0) {
      scores.social.total = ((scores.social.progressive + scores.social.conservative) / scores.social.count) * 5;
    }
    if (scores.authoritarian.count > 0) {
      scores.authoritarian.total = ((scores.authoritarian.libertarian + scores.authoritarian.authoritarian) / scores.authoritarian.count) * 5;
    }
    if (scores.international.count > 0) {
      scores.international.total = ((scores.international.globalist + scores.international.nationalist) / scores.international.count) * 5;
    }
    if (scores.environmental.count > 0) {
      scores.environmental.total = ((scores.environmental.green + scores.environmental.growth) / scores.environmental.count) * 5;
    }
    
    // Calculate distances to alignment vectors
    const userVector = {
      economic: scores.economic.total,
      social: scores.social.total,
      authoritarian: scores.authoritarian.total,
      international: scores.international.total,
      environmental: scores.environmental.total
    };
    
    // Calculate weighted Euclidean distance to each alignment
    const distances = {};
    Object.keys(alignmentVectors).forEach(alignment => {
      const alignmentVector = alignmentVectors[alignment];
      
      // Calculate weighted distance with dimension importance factors
      let squaredDistance = 0;
      let totalWeight = 0;
      
      // Dimension weights (economic and social carry more weight)
      const dimensionWeights = {
        economic: 2.5,
        social: 2.0,
        authoritarian: 1.5,
        international: 1.0,
        environmental: 1.0
      };
      
      Object.keys(alignmentVector).forEach(dimension => {
        const weight = dimensionWeights[dimension];
        const distance = alignmentVector[dimension] - userVector[dimension];
        squaredDistance += weight * (distance * distance);
        totalWeight += weight;
      });
      
      // Normalize distance to 0-100 range, with 0 being closest match
      distances[alignment] = Math.sqrt(squaredDistance / totalWeight);
    });
    
    // Find closest alignment (primary) and second closest (secondary)
    const sortedAlignments = Object.keys(distances).sort((a, b) => distances[a] - distances[b]);
    const primaryAlignment = sortedAlignments[0];
    const secondaryAlignment = sortedAlignments[1];
    
    // Calculate alignment score (100 - normalized distance)
    const maxPossibleDistance = 20; // Maximum distance in our -10 to +10 scale
    const primaryDistance = distances[primaryAlignment];
    const alignmentScore = 10 - (primaryDistance / maxPossibleDistance) * 10;
    
    // Generate result explanation based on significant answers
    const signatureAnswers = Object.keys(answers)
      .map(id => {
        const question = displayedQuestions.find(q => q.id === id);
        return {
          id,
          question: question.text,
          answer: answers[id],
          category: question.category,
          direction: question.direction,
          weight: question.weight
        };
      })
      .filter(a => Math.abs(a.answer) >= 1) // Only include non-neutral answers
      .sort((a, b) => Math.abs(b.answer * b.weight) - Math.abs(a.answer * a.weight)) // Sort by impact
      .slice(0, 5); // Take top 5
    
    setResultExplanation(signatureAnswers);
    
    // Calculate blended alignment (mixing characteristics of primary and secondary)
    const secondaryDistance = distances[secondaryAlignment];
    const blendFactor = Math.min(0.7, 1 - (secondaryDistance / primaryDistance));
    
    // Only use blended title if secondary is significant
    let blendedTitle = politicalAlignments[primaryAlignment].title;
    if (blendFactor > 0.4) {
      // Create a blended description based on similarities
      const primaryDesc = politicalAlignments[primaryAlignment].description;
      
      // Create personalized description based on specific answer patterns
      let personalizedInsights = '';
      
      // Check for interesting patterns in answers
      const hasStrongEconomicOpinions = Math.abs(scores.economic.total) > 6;
      const hasModerateEconomicOpinions = Math.abs(scores.economic.total) < 4;
      const hasStrongSocialOpinions = Math.abs(scores.social.total) > 6;
      const hasModerateAuthOpinions = Math.abs(scores.authoritarian.total) < 4;
      
      if (hasStrongEconomicOpinions && hasModerateAuthOpinions) {
        personalizedInsights += " Anda memiliki pandangan ekonomi yang kuat, tetapi cenderung moderat dalam hal pemerintahan dan otoritas.";
      }
      
      if (hasModerateEconomicOpinions && hasStrongSocialOpinions) {
        personalizedInsights += " Meskipun memiliki pandangan ekonomi yang cukup moderat, Anda menunjukkan keyakinan kuat dalam hal nilai-nilai sosial.";
      }
      
      // Set the results
      setResults({
        primaryAlignment,
        secondaryAlignment: blendFactor > 0.3 ? secondaryAlignment : null,
        blendFactor,
        alignmentScore,
        blendedTitle,
        personalizedInsights,
        scores: {
          economic: scores.economic.total,
          social: scores.social.total,
          authoritarian: scores.authoritarian.total,
          international: scores.international.total,
          environmental: scores.environmental.total
        },
        confidence: {
          economic: scores.economic.confidence,
          social: scores.social.confidence,
          authoritarian: scores.authoritarian.confidence,
          international: scores.international.confidence,
          environmental: scores.environmental.confidence
        },
        distances
      });
    } else {
      // Set the results with primary alignment only
      setResults({
        primaryAlignment,
        secondaryAlignment: null,
        alignmentScore,
        scores: {
          economic: scores.economic.total,
          social: scores.social.total,
          authoritarian: scores.authoritarian.total,
          international: scores.international.total,
          environmental: scores.environmental.total
        },
        confidence: {
          economic: scores.economic.confidence,
          social: scores.social.confidence,
          authoritarian: scores.authoritarian.confidence,
          international: scores.international.confidence,
          environmental: scores.environmental.confidence
        },
        distances
      });
    }
  };

  // Reset the test
  const resetTest = () => {
    setCurrentStep('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowExplanation(false);
    setQuestionExplanation('');
    setResults(null);
    setProgress(0);
    setResponseConsistency({});
    setAnswerTimes({});
    setUserInfo({
      age: '',
      gender: '',
      education: '',
      region: ''
    });
  };

  // Update progress bar
  useEffect(() => {
    if (currentStep === 'questionnaire') {
      setProgress(((currentQuestionIndex + 1) / displayedQuestions.length) * 100);
    }
  }, [currentQuestionIndex, currentStep, displayedQuestions.length]);

  // Determine if the current question has been answered
  const isCurrentQuestionAnswered = currentStep === 'questionnaire' && 
    displayedQuestions.length > 0 && 
    answers[displayedQuestions[currentQuestionIndex]?.id] !== undefined;
  
  // Determine if demographic form is complete
  const isDemographicComplete = 
    userInfo.age.trim() !== '' && 
    userInfo.gender.trim() !== '' && 
    userInfo.education.trim() !== '' && 
    userInfo.region.trim() !== '';

  // Calculate secondary match scores with nuanced comparison
  const calculateSecondaryMatches = () => {
    if (!results) return [];
    
    const { scores, distances } = results;
    
    // Convert distances to match scores (100 - normalized distance)
    const maxDistance = Math.max(...Object.values(distances));
    const matches = Object.keys(distances).map(alignment => {
      if (alignment === results.primaryAlignment || alignment === results.secondaryAlignment) {
        return null; // Skip primary and secondary alignments
      }
      
      const matchScore = Math.round(Math.max(0, 100 - (distances[alignment] / maxDistance) * 100));
      
      return {
        alignment,
        score: matchScore
      };
    }).filter(Boolean); // Remove null values
    
    // Sort by match score and take top 3
    return matches.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  // Prepare radar chart data for political dimensions
  const getRadarChartData = useMemo(() => {
    if (!results) return [];
    
    return [
      { dimension: 'Ekonomi', value: Math.max(0, results.scores.economic + 10), fullMark: 20 },
      { dimension: 'Sosial', value: Math.max(0, results.scores.social + 10), fullMark: 20 },
      { dimension: 'Pemerintahan', value: Math.max(0, results.scores.authoritarian + 10), fullMark: 20 },
      { dimension: 'Internasional', value: Math.max(0, results.scores.international + 10), fullMark: 20 },
      { dimension: 'Lingkungan', value: Math.max(0, results.scores.environmental + 10), fullMark: 20 }
    ];
  }, [results]);

  // Function to translate direction to label
  const getDirectionLabel = (direction) => {
    const labels = {
      "left": "Ekonomi Kiri",
      "right": "Ekonomi Kanan",
      "progressive": "Progresif",
      "conservative": "Konservatif",
      "libertarian": "Libertarian",
      "authoritarian": "Otoritarian",
      "globalist": "Globalis",
      "nationalist": "Nasionalis",
      "green": "Environmentalis",
      "growth": "Pro-Pertumbuhan"
    };
    
    return labels[direction] || direction;
  };

  return (
    <div className="political-test-container max-w-4xl mx-auto">
      {/* Intro step */}
      {currentStep === 'intro' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 font-serif">Tes Orientasi Politik Komprehensif</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Selamat datang di tes orientasi politik yang lebih mendalam. Tes ini dirancang dengan metodologi yang lebih komprehensif untuk memberikan pemahaman yang lebih akurat tentang posisi politik Anda.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/20">
              <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-400">Tentang Tes Ini</h3>
              <ul className="list-disc list-inside text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <li>Menggunakan algoritma pemilihan pertanyaan yang dinamis untuk meningkatkan akurasi</li>
                <li>Mengukur 5 dimensi politik: Ekonomi, Sosial, Tata Kelola, Internasional, dan Lingkungan</li>
                <li>Menggunakan sistem pembobotan soal dan analisis pola jawaban untuk hasil lebih presisi</li>
                <li>Memberikan hasil dengan analisis mendalam, termasuk visualisasi dan kompatibilitas dengan berbagai orientasi</li>
                <li>Menyediakan penjelasan untuk setiap pertanyaan dan bagaimana jawaban memengaruhi hasil</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/20">
              <h3 className="font-medium mb-2 text-yellow-800 dark:text-yellow-400">Catatan</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Meskipun tes ini dirancang dengan lebih akurat, tidak ada tes yang dapat mewakili kompleksitas penuh dari pandangan politik Anda. Hasilnya sebaiknya digunakan sebagai titik awal untuk refleksi, bukan label yang definitif.
              </p>
            </div>
          </div>
          
          <button
            onClick={startTest}
            className="w-full px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Mulai Tes
          </button>
        </div>
      )}

      {/* Questionnaire step */}
      {currentStep === 'questionnaire' && displayedQuestions.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Pertanyaan {currentQuestionIndex + 1} dari {displayedQuestions.length}</span>
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
            <div className="flex justify-between items-start mb-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {displayedQuestions[currentQuestionIndex].category.charAt(0).toUpperCase() + displayedQuestions[currentQuestionIndex].category.slice(1)}
              </div>
              <button
                onClick={toggleExplanation}
                className="text-xs text-blue-600 dark:text-blue-400 flex items-center"
              >
                {showExplanation ? (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                    Tutup Penjelasan
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Lihat Penjelasan
                  </>
                )}
              </button>
            </div>
            
            <h3 className="text-xl font-medium mb-4">{displayedQuestions[currentQuestionIndex].text}</h3>
            
            {showExplanation && (
              <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg mb-4 text-sm text-gray-700 dark:text-gray-300 border border-blue-100 dark:border-blue-900/20">
                {questionExplanation}
              </div>
            )}
            
            <div className="space-y-2">
              {answerOptions.map((option) => (
                <button
                  key={option.value}
                  className={`w-full p-3 rounded-lg border text-left transition ${
                    answers[displayedQuestions[currentQuestionIndex].id] === option.value
                      ? 'bg-red-600 text-white border-red-600 dark:bg-red-600 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleAnswer(displayedQuestions[currentQuestionIndex].id, option.value)}
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
              {currentQuestionIndex === displayedQuestions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
            </button>
          </div>
        </div>
      )}

      {/* Results step */}
      {currentStep === 'results' && results && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 font-serif text-center">Hasil Orientasi Politik Anda</h2>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-full text-sm font-medium">
              Dianalisis dari {Object.keys(answers).length} jawaban pertanyaan
            </div>
          </div>
          
          {/* Primary alignment */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/20 mb-8">
            <div className="text-center mb-4">
              <h3 className="text-3xl font-bold text-blue-900 dark:text-blue-400">
                {results.blendedTitle || politicalAlignments[results.primaryAlignment].title}
              </h3>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Kesesuaian: {Math.min(95, Math.round(results.alignmentScore * 10))}%
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {politicalAlignments[results.primaryAlignment].description}
              {results.personalizedInsights}
            </p>
            
            {results.secondaryAlignment && (
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg mb-4 text-sm border border-blue-100 dark:border-blue-900/20">
                <p className="font-medium">Orientasi Sekunder: {politicalAlignments[results.secondaryAlignment].title}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Pandangan politik Anda juga menunjukkan kesamaan dengan orientasi {politicalAlignments[results.secondaryAlignment].title.toLowerCase()} (kecocokan {Math.round(results.blendFactor * 100)}%).
                </p>
              </div>
            )}
            
            <div>
              <h4 className="font-medium mb-2">Nilai-Nilai Utama:</h4>
              <p className="text-gray-700 dark:text-gray-300">
                {politicalAlignments[results.primaryAlignment].values}
              </p>
              
              <h4 className="font-medium mt-4 mb-2">Tokoh Politik Serupa:</h4>
              <div className="grid grid-cols-3 gap-2">
                {politicalAlignments[results.primaryAlignment].figures.map((figure, index) => (
                  <div key={index} className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-2 text-center border border-gray-200 dark:border-gray-700">
                    <div className="font-medium">{figure.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{figure.country}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Political Dimensions Visualization */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Profil Dimensi Politik Anda</h3>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-1/2">
                <div className="w-full h-64 flex items-center justify-center">
                  <RadarChart outerRadius={90} width={300} height={250} data={getRadarChartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="dimension" />
                    <PolarRadiusAxis angle={30} domain={[0, 20]} />
                    <Radar name="Profil Anda" dataKey="value" stroke="#F43F5E" fill="#F43F5E" fillOpacity={0.5} />
                    <Legend />
                  </RadarChart>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ekonomi: <span className="font-medium">Kiri</span></span>
                    <span><span className="font-medium">Kanan</span></span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 relative">
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${results.scores.economic > 0 ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ 
                        width: `${Math.min(100, Math.abs(results.scores.economic) * 5)}%`, 
                        marginLeft: results.scores.economic >= 0 ? '50%' : `${Math.max(0, 50 - Math.abs(results.scores.economic) * 5)}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sosial: <span className="font-medium">Progresif</span></span>
                    <span><span className="font-medium">Konservatif</span></span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 relative">
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${results.scores.social > 0 ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ 
                        width: `${Math.min(100, Math.abs(results.scores.social) * 5)}%`, 
                        marginLeft: results.scores.social >= 0 ? '50%' : `${Math.max(0, 50 - Math.abs(results.scores.social) * 5)}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pemerintahan: <span className="font-medium">Libertarian</span></span>
                    <span><span className="font-medium">Otoritarian</span></span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 relative">
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${results.scores.authoritarian > 0 ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ 
                        width: `${Math.min(100, Math.abs(results.scores.authoritarian) * 5)}%`, 
                        marginLeft: results.scores.authoritarian >= 0 ? '50%' : `${Math.max(0, 50 - Math.abs(results.scores.authoritarian) * 5)}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Internasional: <span className="font-medium">Globalis</span></span>
                    <span><span className="font-medium">Nasionalis</span></span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 relative">
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${results.scores.international > 0 ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ 
                        width: `${Math.min(100, Math.abs(results.scores.international) * 5)}%`, 
                        marginLeft: results.scores.international >= 0 ? '50%' : `${Math.max(0, 50 - Math.abs(results.scores.international) * 5)}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Lingkungan: <span className="font-medium">Environmentalis</span></span>
                    <span><span className="font-medium">Pro-Pertumbuhan</span></span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 relative">
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${results.scores.environmental > 0 ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ 
                        width: `${Math.min(100, Math.abs(results.scores.environmental) * 5)}%`, 
                        marginLeft: results.scores.environmental >= 0 ? '50%' : `${Math.max(0, 50 - Math.abs(results.scores.environmental) * 5)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Questions that shaped your results */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Pandangan Kunci yang Membentuk Hasil Anda</h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="space-y-3">
                {resultExplanation.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm text-gray-700 dark:text-gray-300">"{item.question}"</p>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Jawaban Anda: <span className="font-medium">{answerOptions.find(a => a.value === item.answer)?.label}</span>
                      </div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${
                        item.direction === 'left' || item.direction === 'progressive' || item.direction === 'libertarian' || item.direction === 'globalist' || item.direction === 'green' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {getDirectionLabel(item.direction)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Jawaban-jawaban di atas memiliki pengaruh signifikan dalam menentukan profil politik Anda.
              </p>
            </div>
          </div>
          
          {/* Compatibility with other alignments */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Kecocokan dengan Orientasi Lain</h3>
            <div className="grid grid-cols-1 gap-2">
              {calculateSecondaryMatches().map((match, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <span className="font-medium">{politicalAlignments[match.alignment].title}</span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {match.score >= 70 ? "Kecocokan tinggi" : match.score >= 50 ? "Kecocokan sedang" : "Kecocokan rendah"}
                    </div>
                  </div>
                  <div className="text-lg font-bold">{match.score}%</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Methodology and limitations */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-8">
            <h3 className="font-medium mb-2">Tentang Metodologi</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Tes ini menggunakan pendekatan multidimensional yang memperhitungkan berbagai aspek orientasi politik. Algoritma pembobotan dinamis menyesuaikan dengan pola jawaban dan konsistensi untuk memberikan hasil yang lebih akurat.
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p className="mb-1"><strong>Batasan:</strong> Tes ini merupakan penyederhanaan dari spektrum politik yang kompleks. Hasilnya sebaiknya digunakan sebagai kerangka awal untuk refleksi, bukan sebagai label yang definitif.</p>
              <p>Dikembangkan berdasarkan penelitian ilmu politik kontemporer dengan menyesuaikan konteks politik Indonesia.</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={resetTest}
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Ambil Tes Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
}