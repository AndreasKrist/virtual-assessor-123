import { useState, useEffect, useCallback, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export default function EnhancedPoliticalAlignmentTest() {
  const [currentStep, setCurrentStep] = useState('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionExplanation, setQuestionExplanation] = useState('');
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  // No demographic data collection
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [testVersion, setTestVersion] = useState('standard'); // standard/comprehensive
  const testsCompletedRef = useRef(0);
  const answersHistoryRef = useRef([]);
  
  // Define all the questions in our bank - expanded with more nuanced questions
  const questionBank = {
    economic: [
      {
        id: 'econ1',
        text: "Negara seharusnya memainkan peran aktif dalam mengatur ekonomi.",
        explanation: "Pertanyaan ini mengukur pendapat Anda tentang tingkat intervensi pemerintah yang ideal dalam ekonomi. Pendukung ekonomi pasar bebas cenderung tidak setuju, sementara pendukung ekonomi yang diatur pemerintah cenderung setuju.",
        weight: 1.2,
        direction: "left"
      },
      {
        id: 'econ2',
        text: "Pelayanan publik seperti kesehatan dan pendidikan sebaiknya disediakan negara, bukan sektor swasta.",
        explanation: "Pertanyaan ini tentang preferensi Anda terhadap penyediaan layanan dasar oleh negara versus privatisasi. Pandangan progresif/kiri cenderung mendukung layanan publik yang dikelola negara.",
        weight: 1.3,
        direction: "left"
      },
      {
        id: 'econ3',
        text: "Pajak progresif (tarif yang lebih tinggi untuk yang berpenghasilan lebih besar) merupakan cara yang adil untuk mendistribusikan kekayaan.",
        explanation: "Pertanyaan ini mengukur pendapat Anda tentang keadilan pajak progresif. Pandangan ekonomi kiri biasanya mendukung pajak progresif, sementara pandangan ekonomi kanan cenderung lebih menyukai tarif pajak yang seragam atau lebih rendah.",
        weight: 1.0,
        direction: "left"
      },
      {
        id: 'econ4',
        text: "Keuntungan ekonomi akan lebih baik jika didistribusikan berdasarkan kebutuhan daripada berdasarkan kontribusi atau usaha individu.",
        explanation: "Pertanyaan ini membedakan antara prinsip sosialis 'dari masing-masing sesuai kemampuan, untuk masing-masing sesuai kebutuhan' versus pandangan meritokratis yang menekankan imbalan berdasarkan usaha/kontribusi.",
        weight: 1.4,
        direction: "left"
      },
      {
        id: 'econ5',
        text: "Perusahaan-perusahaan besar harus dipecah untuk mendorong persaingan yang lebih sehat dan mencegah monopoli.",
        explanation: "Pertanyaan ini mengukur sikap terhadap konsentrasi kekuatan ekonomi dan monopoli. Pandangan kiri dan beberapa pandangan libertarian mendukung pengaturan anti-monopoli.",
        weight: 0.9,
        direction: "left"
      },
      {
        id: 'econ6',
        text: "Pasar bebas dengan sedikit regulasi pemerintah menciptakan hasil ekonomi terbaik dan kesejahteraan maksimal.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap ekonomi pasar bebas klasik. Pandangan ekonomi liberal/kanan cenderung menyetujui pernyataan ini.",
        weight: 1.2,
        direction: "right"
      },
      {
        id: 'econ7',
        text: "Serikat pekerja terlalu banyak mengganggu dinamika pasar yang efisien.",
        explanation: "Pertanyaan ini mengukur sikap terhadap serikat pekerja dan keseimbangan kekuatan antara pekerja dan pemberi kerja. Pandangan ekonomi kanan cenderung melihat serikat pekerja secara negatif.",
        weight: 1.1,
        direction: "right"
      },
      {
        id: 'econ8',
        text: "Kesejahteraan sosial dan program bantuan pemerintah cenderung menciptakan ketergantungan dan mengurangi inisiatif bekerja.",
        explanation: "Pertanyaan ini mengukur persepsi tentang dampak jaring pengaman sosial. Pandangan konservatif/kanan sering menekankan efek negatif potensial dari program kesejahteraan yang terlalu luas.",
        weight: 1.0,
        direction: "right"
      },
      {
        id: 'econ9',
        text: "Pengendalian harga pada kebutuhan pokok seperti pangan adalah cara yang efektif untuk menjamin kebutuhan dasar masyarakat.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap intervensi langsung pemerintah dalam mekanisme pasar. Pandangan ekonomi kiri cenderung mendukung pengendalian harga untuk kebutuhan dasar.",
        weight: 1.3,
        direction: "left"
      },
      {
        id: 'econ10',
        text: "Perusahaan swasta hampir selalu lebih efisien daripada badan usaha milik negara.",
        explanation: "Pertanyaan ini mengukur pandangan tentang efisiensi sektor swasta versus sektor publik. Pandangan ekonomi kanan/liberal cenderung lebih percaya pada efisiensi pasar dan sektor swasta.",
        weight: 1.2,
        direction: "right"
      },
      {
        id: 'econ11',
        text: "Kepemilikan kolektif atas alat-alat produksi utama lebih adil daripada kepemilikan pribadi.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap prinsip sosialis tentang kepemilikan sarana produksi. Pandangan sosialis mendukung kepemilikan kolektif, sementara pandangan kapitalis mendukung kepemilikan pribadi.",
        weight: 1.5,
        direction: "left"
      },
      {
        id: 'econ12',
        text: "Ketimpangan ekonomi adalah hasil alami dari perbedaan kemampuan dan kemauan bekerja individual.",
        explanation: "Pertanyaan ini mengukur pandangan tentang sumber ketimpangan ekonomi. Pandangan konservatif/kanan cenderung melihat ketimpangan sebagai hasil alami dari perbedaan individu.",
        weight: 1.1,
        direction: "right"
      }
    ],
    social: [
      {
        id: 'social1',
        text: "Kebijakan imigrasi sebaiknya lebih ketat dan pengawasan perbatasan lebih diperketat.",
        explanation: "Pertanyaan ini mengukur sikap terhadap imigrasi dan kontrol perbatasan. Pandangan sosial konservatif cenderung mendukung pembatasan imigrasi yang lebih ketat.",
        weight: 1.2,
        direction: "conservative"
      },
      {
        id: 'social2',
        text: "Nilai-nilai tradisional dan keluarga harus menjadi landasan utama dalam kebijakan sosial.",
        explanation: "Pertanyaan ini mengukur pentingnya nilai-nilai tradisional dalam pandangan sosial Anda. Konservatisme sosial menekankan pada pelestarian nilai-nilai tradisional.",
        weight: 1.3,
        direction: "conservative"
      },
      {
        id: 'social3',
        text: "Kepentingan kolektif masyarakat harus diutamakan di atas kebebasan individu jika terjadi konflik antara keduanya.",
        explanation: "Pertanyaan ini mengukur preferensi Anda antara hak-hak individu versus kepentingan kolektif. Pandangan otoritarian/konservatif cenderung memprioritaskan kepentingan kolektif.",
        weight: 1.0,
        direction: "authoritarian"
      },
      {
        id: 'social4',
        text: "Masyarakat terlalu toleran terhadap perilaku dan gaya hidup yang tidak konvensional atau berbeda.",
        explanation: "Pertanyaan ini mengukur sikap terhadap keberagaman dan non-konformitas sosial. Pandangan konservatif sosial cenderung lebih prihatin tentang erosi norma-norma tradisional.",
        weight: 1.1,
        direction: "conservative"
      },
      {
        id: 'social5',
        text: "Kebebasan berekspresi penting dan harus dijaga bahkan untuk pandangan yang kontroversial atau menyinggung.",
        explanation: "Pertanyaan ini mengukur komitmen terhadap kebebasan berekspresi. Pandangan libertarian sangat memprioritaskan kebebasan berekspresi, sedangkan pandangan progresif dan konservatif mungkin melihat batasan yang berbeda.",
        weight: 1.2,
        direction: "libertarian"
      },
      {
        id: 'social6',
        text: "Keberagaman budaya dan pluralisme memperkaya masyarakat dan harus secara aktif didorong.",
        explanation: "Pertanyaan ini mengukur sikap terhadap multikulturalisme dan keberagaman. Pandangan progresif cenderung melihat keberagaman sebagai kekuatan, sedangkan beberapa pandangan konservatif mungkin lebih menekankan pada asimilasi.",
        weight: 1.3,
        direction: "progressive"
      },
      {
        id: 'social7',
        text: "Individu harus bebas menentukan dan mengekspresikan identitas mereka tanpa tekanan untuk menyesuaikan diri dengan norma sosial.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap kebebasan individu dalam hal identitas. Baik pandangan libertarian maupun progresif cenderung mendukung kebebasan identitas.",
        weight: 1.1,
        direction: "progressive"
      },
      {
        id: 'social8',
        text: "Ketidaksetaraan sosial adalah masalah sistemik yang memerlukan solusi struktural, bukan hanya usaha individual.",
        explanation: "Pertanyaan ini mengukur pandangan tentang sumber ketidaksetaraan. Pandangan progresif menekankan faktor-faktor sistemik, sedangkan pandangan konservatif sering menekankan tanggung jawab individual.",
        weight: 1.0,
        direction: "progressive"
      },
      {
        id: 'social9',
        text: "Pemerintah tidak seharusnya mempromosikan nilai-nilai tertentu melalui sistem pendidikan.",
        explanation: "Pertanyaan ini mengukur pandangan tentang netralitas pendidikan. Pandangan libertarian cenderung tidak ingin pemerintah mempromosikan nilai tertentu, sementara baik konservatif maupun progresif mungkin mendukung penanaman nilai tertentu.",
        weight: 1.2,
        direction: "libertarian"
      },
      {
        id: 'social10',
        text: "Agama harus memainkan peran penting dalam kebijakan publik dan kehidupan masyarakat.",
        explanation: "Pertanyaan ini mengukur pandangan tentang peran agama dalam masyarakat dan politik. Pandangan konservatif tradisional sering mendukung peran agama yang lebih besar dalam kebijakan publik.",
        weight: 1.4,
        direction: "conservative"
      },
      {
        id: 'social11',
        text: "Hak komunal dan kelompok sama pentingnya dengan hak individu.",
        explanation: "Pertanyaan ini mengukur bagaimana Anda menyeimbangkan hak individu dengan hak kelompok. Pandangan progresif dan komunitarian lebih menekankan pentingnya hak kelompok.",
        weight: 1.1,
        direction: "progressive"
      }
    ],
    governance: [
      {
        id: 'gov1',
        text: "Kepemimpinan yang kuat dan tegas lebih efektif daripada kepemimpinan yang terlalu demokratis dan konsultatif.",
        explanation: "Pertanyaan ini mengukur preferensi untuk gaya kepemimpinan otoritatif versus partisipatif. Pandangan otoritarian lebih mendukung pemimpin yang kuat dan tegas.",
        weight: 1.2,
        direction: "authoritarian"
      },
      {
        id: 'gov2',
        text: "Dalam keadaan krisis, pemerintah boleh membatasi kebebasan sipil demi keamanan dan stabilitas.",
        explanation: "Pertanyaan ini mengukur sejauh mana Anda bersedia mengorbankan kebebasan demi keamanan. Pandangan otoritarian cenderung lebih mengutamakan keamanan.",
        weight: 1.3,
        direction: "authoritarian"
      },
      {
        id: 'gov3',
        text: "Pemerintah yang kuat dan terpusat diperlukan untuk mengatasi masalah-masalah besar seperti krisis iklim atau pandemi.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap pemerintahan terpusat yang kuat versus desentralisasi kekuasaan. Pandangan otoritarian mendukung pemerintahan terpusat yang kuat.",
        weight: 1.1,
        direction: "authoritarian"
      },
      {
        id: 'gov4',
        text: "Partisipasi warga dalam pengambilan keputusan pemerintah sebaiknya diperluas, bahkan jika membuat proses menjadi lebih lambat.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap demokrasi partisipatif. Pandangan libertarian dan progresif cenderung mendukung partisipasi warga yang lebih luas.",
        weight: 1.2,
        direction: "libertarian"
      },
      {
        id: 'gov5',
        text: "Kekuasaan pemerintah pusat harus dibatasi dan lebih banyak otoritas harus diberikan kepada pemerintah daerah.",
        explanation: "Pertanyaan ini mengukur preferensi untuk federalisme/desentralisasi versus sentralisasi kekuasaan. Pandangan libertarian dan beberapa pandangan konservatif mendukung pemerintahan yang terdesentralisasi.",
        weight: 1.0,
        direction: "libertarian"
      },
      {
        id: 'gov6',
        text: "Undang-undang dan peraturan sering kali terlalu membatasi dan menghalangi kemajuan.",
        explanation: "Pertanyaan ini mengukur sikap terhadap regulasi secara umum. Pandangan libertarian cenderung melihat regulasi secara negatif.",
        weight: 1.1,
        direction: "libertarian"
      },
      {
        id: 'gov7',
        text: "Dalam demokrasi, keputusan mayoritas harus dapat mengesampingkan hak minoritas dalam beberapa kasus.",
        explanation: "Pertanyaan ini mengukur pandangan tentang kekuatan mayoritas versus perlindungan minoritas. Pandangan otoritarian populis mungkin mendukung kekuatan mayoritas yang lebih besar.",
        weight: 1.3,
        direction: "authoritarian"
      },
      {
        id: 'gov8',
        text: "Sistem hukum seharusnya lebih fokus pada rehabilitasi daripada hukuman.",
        explanation: "Pertanyaan ini mengukur pendekatan terhadap keadilan. Pandangan progresif cenderung menekankan rehabilitasi, sementara pandangan konservatif sering menekankan hukuman dan retribusi.",
        weight: 1.2,
        direction: "libertarian"
      },
      {
        id: 'gov9',
        text: "Peran utama negara adalah melindungi kebebasan individu, bukan mengejar kesetaraan sosial.",
        explanation: "Pertanyaan ini mengukur pandangan tentang tujuan utama negara. Pandangan libertarian dan liberal klasik menekankan perlindungan kebebasan individu.",
        weight: 1.4,
        direction: "libertarian"
      }
    ],
    international: [
      {
        id: 'intl1',
        text: "Kebijakan luar negeri harus mengutamakan kepentingan nasional di atas komitmen internasional.",
        explanation: "Pertanyaan ini mengukur preferensi untuk kebijakan luar negeri yang berfokus pada kepentingan nasional versus internasionalisme. Pandangan nasionalis mengutamakan kepentingan dalam negeri.",
        weight: 1.2,
        direction: "nationalist"
      },
      {
        id: 'intl2',
        text: "Globalisasi ekonomi pada umumnya bermanfaat bagi Indonesia dan dunia.",
        explanation: "Pertanyaan ini mengukur sikap terhadap globalisasi ekonomi. Pandangan internasionalis/globalis cenderung melihat globalisasi secara positif.",
        weight: 1.1,
        direction: "globalist"
      },
      {
        id: 'intl3',
        text: "Organisasi internasional seperti PBB seharusnya memiliki lebih banyak wewenang untuk mengatasi masalah global.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap institusi global dan governance global. Pandangan internasionalis mendukung organisasi internasional yang lebih kuat.",
        weight: 1.3,
        direction: "globalist"
      },
      {
        id: 'intl4',
        text: "Ketahanan dan kemandirian nasional lebih penting daripada integrasi global.",
        explanation: "Pertanyaan ini mengukur preferensi untuk kemandirian dan kedaulatan versus interdependensi global. Pandangan nasionalis mengutamakan ketahanan dan kemandirian.",
        weight: 1.2,
        direction: "nationalist"
      },
      {
        id: 'intl5',
        text: "Indonesia harus lebih fokus pada masalah dalam negeri daripada keterlibatan dalam urusan internasional.",
        explanation: "Pertanyaan ini mengukur kecenderungan isolasionis versus intervensionis dalam kebijakan luar negeri. Pandangan nasionalis cenderung lebih fokus pada urusan dalam negeri.",
        weight: 1.0,
        direction: "nationalist"
      },
      {
        id: 'intl6',
        text: "Identitas nasional kita terancam oleh globalisasi dan pengaruh budaya asing.",
        explanation: "Pertanyaan ini mengukur sikap terhadap dampak globalisasi pada identitas budaya. Pandangan nasionalis cenderung melihat globalisasi sebagai ancaman terhadap identitas nasional.",
        weight: 1.3,
        direction: "nationalist"
      },
      {
        id: 'intl7',
        text: "Bertukar aspek kedaulatan nasional demi kerja sama regional adalah kompromi yang bermanfaat.",
        explanation: "Pertanyaan ini mengukur kesediaan untuk berkompromi pada kedaulatan demi integrasi regional. Pandangan globalis lebih mendukung kompromi semacam ini.",
        weight: 1.2,
        direction: "globalist"
      },
      {
        id: 'intl8',
        text: "Bantuan luar negeri seharusnya dikurangi dan dana tersebut dialihkan untuk kebutuhan dalam negeri.",
        explanation: "Pertanyaan ini mengukur sikap terhadap bantuan luar negeri. Pandangan nasionalis sering mendukung pengurangan bantuan luar negeri demi fokus pada kebutuhan dalam negeri.",
        weight: 1.1,
        direction: "nationalist"
      }
    ],
    environmental: [
      {
        id: 'env1',
        text: "Perubahan iklim adalah krisis mendesak yang memerlukan tindakan segera bahkan jika mengakibatkan biaya ekonomi jangka pendek.",
        explanation: "Pertanyaan ini mengukur prioritas Anda antara mengatasi krisis iklim versus pertimbangan ekonomi jangka pendek. Pandangan 'hijau' memprioritaskan tindakan iklim.",
        weight: 1.3,
        direction: "green"
      },
      {
        id: 'env2',
        text: "Pertumbuhan ekonomi dan penciptaan lapangan kerja harus diprioritaskan di atas perlindungan lingkungan jika keduanya bertentangan.",
        explanation: "Pertanyaan ini mengukur bagaimana Anda menyeimbangkan kepentingan ekonomi dan lingkungan. Pandangan 'pertumbuhan' memprioritaskan ekonomi, sedangkan pandangan 'hijau' memprioritaskan lingkungan.",
        weight: 1.2,
        direction: "growth"
      },
      {
        id: 'env3',
        text: "Regulasi lingkungan sering kali terlalu memberatkan bisnis dan menghambat perkembangan ekonomi.",
        explanation: "Pertanyaan ini mengukur sikap terhadap regulasi lingkungan. Pandangan 'pertumbuhan' cenderung melihat regulasi lingkungan sebagai beban.",
        weight: 1.1,
        direction: "growth"
      },
      {
        id: 'env4',
        text: "Indonesia harus berinvestasi lebih banyak dalam energi terbarukan meskipun biayanya lebih tinggi dalam jangka pendek.",
        explanation: "Pertanyaan ini mengukur dukungan untuk transisi energi terbarukan. Pandangan 'hijau' mendukung investasi dalam energi terbarukan.",
        weight: 1.0,
        direction: "green"
      },
      {
        id: 'env5',
        text: "Standar hidup dan pola konsumsi saat ini tidak berkelanjutan dan perlu diubah secara fundamental.",
        explanation: "Pertanyaan ini mengukur dukungan untuk perubahan gaya hidup demi keberlanjutan. Pandangan 'hijau' yang lebih radikal mendukung transformasi pola konsumsi.",
        weight: 1.2,
        direction: "green"
      },
      {
        id: 'env6',
        text: "Teknologi dan inovasi akan menyelesaikan masalah lingkungan tanpa perlu membatasi pertumbuhan ekonomi.",
        explanation: "Pertanyaan ini mengukur optimisme teknologi versus pesimisme ekologis. Pandangan 'pertumbuhan' cenderung lebih optimis tentang solusi teknologi.",
        weight: 1.1,
        direction: "growth"
      },
      {
        id: 'env7',
        text: "Hak kepemilikan pribadi atas sumber daya alam seperti tanah dan air sebaiknya dibatasi untuk kepentingan umum.",
        explanation: "Pertanyaan ini mengukur pandangan tentang sumber daya alam sebagai barang publik versus barang pribadi. Pandangan 'hijau' cenderung mendukung pembatasan kepemilikan pribadi atas sumber daya alam.",
        weight: 1.2,
        direction: "green"
      },
      {
        id: 'env8',
        text: "Kebijakan lingkungan sebaiknya difokuskan pada insentif pasar daripada regulasi langsung.",
        explanation: "Pertanyaan ini mengukur preferensi untuk solusi berbasis pasar versus regulasi terhadap masalah lingkungan. Pandangan 'pertumbuhan' moderat cenderung lebih menyukai solusi berbasis pasar.",
        weight: 1.0,
        direction: "growth"
      }
    ],
    populism: [
      {
        id: 'pop1',
        text: "Elite politik dan ekonomi pada dasarnya memiliki kepentingan yang bertentangan dengan rakyat biasa.",
        explanation: "Pertanyaan ini mengukur kecenderungan populis yang membagi masyarakat menjadi 'rakyat murni' versus 'elite korup'. Pandangan populis cenderung melihat pertentangan tajam antara elite dan rakyat.",
        weight: 1.3,
        direction: "populist"
      },
      {
        id: 'pop2',
        text: "Ahli dan pakar terlalu banyak berpengaruh dalam pengambilan keputusan politik.",
        explanation: "Pertanyaan ini mengukur sikap anti-elitisme intelektual. Pandangan populis sering menunjukkan skeptisisme terhadap para ahli dan pengetahuan spesialis.",
        weight: 1.2,
        direction: "populist"
      },
      {
        id: 'pop3',
        text: "Sistem politik saat ini gagal mewakili kepentingan rakyat biasa.",
        explanation: "Pertanyaan ini mengukur tingkat ketidakpercayaan terhadap institusi politik. Pandangan populis cenderung tidak percaya pada kemampuan sistem yang ada untuk mewakili kepentingan rakyat.",
        weight: 1.1,
        direction: "populist"
      },
      {
        id: 'pop4',
        text: "Politisi dan birokrat profesional seharusnya digantikan oleh pemimpin yang lebih mencerminkan rakyat biasa.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap representasi langsung versus representasi oleh elit terpelajar. Pandangan populis mendukung pemimpin yang 'seperti rakyat'.",
        weight: 1.2,
        direction: "populist"
      },
      {
        id: 'pop5',
        text: "Keahlian teknis dan pengalaman pemerintahan penting dalam kepemimpinan politik.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap kepemimpinan teknokratis. Pandangan teknokratis menghargai keahlian dan pengalaman pemerintahan, sementara pandangan populis sering mencurigainya.",
        weight: 1.0,
        direction: "technocratic"
      },
      {
        id: 'pop6',
        text: "Kompromi politik biasanya lebih mencerminkan kelemahan daripada kebijaksanaan.",
        explanation: "Pertanyaan ini mengukur dukungan terhadap politik berorientasi konsensus versus politik konfrontasi. Pandangan populis sering melihat kompromi sebagai 'pengkhianatan' terhadap prinsip.",
        weight: 1.1,
        direction: "populist"
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
      },
      readingRecommendations: [
        { title: "Capital in the Twenty-First Century", author: "Thomas Piketty" },
        { title: "The Socialist Manifesto", author: "Bhaskar Sunkara" },
        { title: "Utopia for Realists", author: "Rutger Bregman" }
      ]
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
      },
      readingRecommendations: [
        { title: "We Should All Be Feminists", author: "Chimamanda Ngozi Adichie" },
        { title: "The New Jim Crow", author: "Michelle Alexander" },
        { title: "How to Be an Antiracist", author: "Ibram X. Kendi" }
      ]
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
      },
      readingRecommendations: [
        { title: "The Third Way", author: "Anthony Giddens" },
        { title: "The Nordic Theory of Everything", author: "Anu Partanen" },
        { title: "Creating Freedom", author: "Raoul Martinez" }
      ]
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
      },
      readingRecommendations: [
        { title: "This Changes Everything", author: "Naomi Klein" },
        { title: "Doughnut Economics", author: "Kate Raworth" },
        { title: "The Future We Choose", author: "Christiana Figueres & Tom Rivett-Carnac" }
      ]
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
      },
      readingRecommendations: [
        { title: "The Radical Center", author: "Ted Halstead & Michael Lind" },
        { title: "Why We're Polarized", author: "Ezra Klein" },
        { title: "Nudge", author: "Richard Thaler & Cass Sunstein" }
      ]
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
      },
      readingRecommendations: [
        { title: "On Liberty", author: "John Stuart Mill" },
        { title: "Justice", author: "Michael Sandel" },
        { title: "The Open Society and Its Enemies", author: "Karl Popper" }
      ]
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
      },
      readingRecommendations: [
        { title: "Free to Choose", author: "Milton & Rose Friedman" },
        { title: "Anarchy, State, and Utopia", author: "Robert Nozick" },
        { title: "The Problem of Political Authority", author: "Michael Huemer" }
      ]
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
      },
      readingRecommendations: [
        { title: "The Road to Character", author: "David Brooks" },
        { title: "The Conservative Mind", author: "Russell Kirk" },
        { title: "The Righteous Mind", author: "Jonathan Haidt" }
      ]
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
      },
      readingRecommendations: [
        { title: "The Meaning of Conservatism", author: "Roger Scruton" },
        { title: "After Virtue", author: "Alasdair MacIntyre" },
        { title: "The Benedict Option", author: "Rod Dreher" }
      ]
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
      },
      readingRecommendations: [
        { title: "The Virtue of Nationalism", author: "Yoram Hazony" },
        { title: "The Case for Nationalism", author: "Rich Lowry" },
        { title: "Why Nationalism", author: "Yael Tamir" }
      ]
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
      },
      readingRecommendations: [
        { title: "The Leviathan", author: "Thomas Hobbes" },
        { title: "On Power", author: "Bertrand de Jouvenel" },
        { title: "The End of History and the Last Man", author: "Francis Fukuyama" }
      ]
    },
    "populist": {
      title: "Populis",
      description: "Anda melihat politik sebagai perjuangan antara 'rakyat biasa' dan 'elite korup'. Anda skeptis terhadap institusi yang mapan dan pengetahuan ahli, lebih menekankan 'kehendak rakyat' dan solusi langsung untuk masalah sosial-ekonomi. Pandangan populis dapat berada di spektrum kiri atau kanan.",
      values: "Anti-elitisme, kedaulatan rakyat, anti-institusi, nasionalisme kultural, pragmatisme ekonomi",
      figures: [
        { name: "Donald Trump", country: "AS" },
        { name: "Jair Bolsonaro", country: "Brasil" },
        { name: "Prabowo Subianto", country: "Indonesia" }
      ],
      compatibility: {
        "nationalist": "Tinggi - Kesamaan dalam penekanan pada identitas nasional",
        "socialist": "Sedang - Tumpang tindih dalam kritik terhadap elite ekonomi",
        "liberal": "Rendah - Perbedaan dalam kepercayaan terhadap institusi dan ahli"
      },
      readingRecommendations: [
        { title: "What Is Populism?", author: "Jan-Werner Müller" },
        { title: "The Populist Explosion", author: "John B. Judis" },
        { title: "The People vs. Democracy", author: "Yascha Mounk" }
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

  // Helper function to select questions
  const selectQuestionsFromBank = useCallback(() => {
    // Questions per category based on test version
    const questionsPerCategory = testVersion === 'comprehensive' 
      ? {
          economic: 8,
          social: 7,
          governance: 6,
          international: 5,
          environmental: 5,
          populism: 4
        }
      : {
          economic: 6,
          social: 6,
          governance: 4,
          international: 3,
          environmental: 3,
          populism: 0
        };
    
    const selected = [];
    
    // Select from each category, balanced between different directions
    Object.keys(questionsPerCategory).forEach(category => {
      if (questionsPerCategory[category] === 0) return;
      
      const count = questionsPerCategory[category];
      const categoryQuestions = [...questionBank[category]];
      
      // Group questions by direction
      const directions = {};
      categoryQuestions.forEach(q => {
        if (!directions[q.direction]) directions[q.direction] = [];
        directions[q.direction].push(q);
      });
      
      // Ensure balanced selection from each direction
      const balancedSelection = [];
      const directionKeys = Object.keys(directions);
      
      // Calculate how many to select from each direction
      const questionsPerDirection = Math.ceil(count / directionKeys.length);
      
      directionKeys.forEach(direction => {
        // Shuffle questions within this direction
        const directionQuestions = [...directions[direction]];
        for (let i = directionQuestions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [directionQuestions[i], directionQuestions[j]] = [directionQuestions[j], directionQuestions[i]];
        }
        
        // Select up to questionsPerDirection from this direction
        balancedSelection.push(
          ...directionQuestions.slice(0, Math.min(questionsPerDirection, directionQuestions.length))
        );
      });
      
      // If we have more than needed, trim the selection randomly
      if (balancedSelection.length > count) {
        for (let i = balancedSelection.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [balancedSelection[i], balancedSelection[j]] = [balancedSelection[j], balancedSelection[i]];
        }
        balancedSelection.splice(count);
      }
      
      // Add category info to each question and add to selected
      balancedSelection.forEach(q => {
        selected.push({...q, category});
      });
    });
    
    // Shuffle the combined selections
    for (let i = selected.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selected[i], selected[j]] = [selected[j], selected[i]];
    }
    
    return selected;
  }, [testVersion]);
  
  // Start the test
  const startTest = () => {
    const selectedQuestions = selectQuestionsFromBank();
    setDisplayedQuestions(selectedQuestions);
    setCurrentStep('questionnaire');
    setCurrentQuestionIndex(0);
  };

  // Handle selecting an answer
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
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
      if (reviewMode) {
        setReviewMode(false);
        calculateResults();
        setCurrentStep('results');
      } else {
        setReviewMode(true);
      }
    }
  };

  // Move to the previous question
  const handlePrevious = () => {
    if (reviewMode) {
      setReviewMode(false);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };
  
  // Jump to a specific question during review
  const jumpToQuestion = (index) => {
    setReviewMode(false);
    setCurrentQuestionIndex(index);
  };

  // Enhanced calculation methodology for political alignment
  const calculateResults = () => {
    // Track completion
    testsCompletedRef.current += 1;
    
    // Store answers for potential analysis
    answersHistoryRef.current.push({...answers});
    
    // Initialize dimension scores with improved methodology
    let scores = {
      economic: { left: 0, right: 0, total: 0, count: 0 },
      social: { progressive: 0, conservative: 0, total: 0, count: 0 },
      authoritarian: { libertarian: 0, authoritarian: 0, total: 0, count: 0 },
      international: { globalist: 0, nationalist: 0, total: 0, count: 0 },
      environmental: { green: 0, growth: 0, total: 0, count: 0 },
      populism: { populist: 0, technocratic: 0, total: 0, count: 0 }
    };
    
    // Calculate weighted scores for each dimension with more nuanced approach
    displayedQuestions.forEach(question => {
      const answer = answers[question.id] || 0;
      const weight = question.weight || 1.0;
      
      if (question.category === 'economic') {
        if (question.direction === 'left') {
          scores.economic.left += answer * weight;
        } else {
          scores.economic.right += (answer * -1) * weight;
        }
        scores.economic.count += weight;
      }
      else if (question.category === 'social') {
        if (question.direction === 'progressive') {
          scores.social.progressive += answer * weight;
        } else if (question.direction === 'conservative') {
          scores.social.conservative += (answer * -1) * weight;
        } else if (question.direction === 'libertarian') {
          scores.authoritarian.libertarian += answer * weight;
        } else if (question.direction === 'authoritarian') {
          scores.authoritarian.authoritarian += (answer * -1) * weight;
        }
        
        if (question.direction === 'progressive' || question.direction === 'conservative') {
          scores.social.count += weight;
        }
        if (question.direction === 'libertarian' || question.direction === 'authoritarian') {
          scores.authoritarian.count += weight;
        }
      }
      else if (question.category === 'governance') {
        if (question.direction === 'libertarian') {
          scores.authoritarian.libertarian += answer * weight;
        } else if (question.direction === 'authoritarian') {
          scores.authoritarian.authoritarian += (answer * -1) * weight;
        }
        scores.authoritarian.count += weight;
      }
      else if (question.category === 'international') {
        if (question.direction === 'globalist') {
          scores.international.globalist += answer * weight;
        } else if (question.direction === 'nationalist') {
          scores.international.nationalist += (answer * -1) * weight;
        }
        scores.international.count += weight;
      }
      else if (question.category === 'environmental') {
        if (question.direction === 'green') {
          scores.environmental.green += answer * weight;
        } else if (question.direction === 'growth') {
          scores.environmental.growth += (answer * -1) * weight;
        }
        scores.environmental.count += weight;
      }
      else if (question.category === 'populism') {
        if (question.direction === 'populist') {
          scores.populism.populist += answer * weight;
        } else if (question.direction === 'technocratic') {
          scores.populism.technocratic += (answer * -1) * weight;
        }
        scores.populism.count += weight;
      }
    });
    
    // Normalize scores to -10 to +10 scale with improved calculation
    const normalizeScore = (score, count) => {
      if (count <= 0) return 0;
      // Scale to -10 to +10, with non-linear transformation to better differentiate extremes
      let normalizedScore = (score / count) * 5;
      // Apply slight non-linear transformation to better differentiate moderate vs extreme positions
      return Math.sign(normalizedScore) * Math.pow(Math.abs(normalizedScore), 1.1);
    };
    
    scores.economic.total = normalizeScore(scores.economic.left + scores.economic.right, scores.economic.count);
    scores.social.total = normalizeScore(scores.social.progressive + scores.social.conservative, scores.social.count);
    scores.authoritarian.total = normalizeScore(scores.authoritarian.libertarian + scores.authoritarian.authoritarian, scores.authoritarian.count);
    scores.international.total = normalizeScore(scores.international.globalist + scores.international.nationalist, scores.international.count);
    scores.environmental.total = normalizeScore(scores.environmental.green + scores.environmental.growth, scores.environmental.count);
    scores.populism.total = normalizeScore(scores.populism.populist + scores.populism.technocratic, scores.populism.count);
    
    // Enhanced determination of primary and secondary alignments
    let primaryAlignment = "centrist";
    let secondaryAlignment = null;
    let alignmentScore = 0;
    let confidenceScore = 0;
    
    // Define thresholds with more nuance
    const thresholds = {
      strong: 6.5,   // Strong indicator
      moderate: 4.0, // Moderate indicator
      weak: 2.0      // Weak indicator
    };
    
    // Calculate alignment based on multi-dimensional pattern matching
    // Economic-Social grid is primary, with other dimensions providing nuance
    
    // First, check for strong singular ideological patterns
    if (scores.economic.total >= thresholds.strong && scores.social.total >= thresholds.moderate) {
      // Strong left-progressive pattern
      if (scores.populism.total >= thresholds.moderate) {
        primaryAlignment = "progressive-left";
        confidenceScore = 0.8;
      } else {
        primaryAlignment = "socialist";
        confidenceScore = 0.85;
      }
      alignmentScore = (scores.economic.total * 0.6 + scores.social.total * 0.4);
    } 
    else if (scores.economic.total >= thresholds.moderate && scores.social.total >= thresholds.moderate) {
      // Moderate left-progressive pattern
      primaryAlignment = "progressive-left";
      confidenceScore = 0.75;
      alignmentScore = (scores.economic.total + scores.social.total) / 2;
    }
    else if (scores.economic.total >= thresholds.moderate && 
             Math.abs(scores.social.total) < thresholds.moderate) {
      // Left-leaning centrist pattern
      primaryAlignment = "social-democrat";
      confidenceScore = 0.7;
      alignmentScore = scores.economic.total;
    }
    else if (scores.economic.total <= -thresholds.strong && 
             scores.social.total <= -thresholds.moderate) {
      // Strong right-conservative pattern
      primaryAlignment = "conservative";
      confidenceScore = 0.8;
      alignmentScore = Math.abs((scores.economic.total + scores.social.total) / 2);
      
      // Check for nationalist tendencies
      if (scores.international.total <= -thresholds.moderate) {
        secondaryAlignment = "nationalist";
      }
      // Check for authoritarian tendencies
      else if (scores.authoritarian.total <= -thresholds.moderate) {
        secondaryAlignment = "authoritarian";
      }
    }
    else if (scores.economic.total <= -thresholds.moderate && 
             scores.social.total >= thresholds.moderate) {
      // Right economics + progressive social = libertarian
      primaryAlignment = "libertarian";
      confidenceScore = 0.75;
      alignmentScore = (Math.abs(scores.economic.total) + scores.social.total) / 2;
    }
    else if (scores.economic.total <= -thresholds.moderate && 
             Math.abs(scores.social.total) < thresholds.moderate) {
      // Right-leaning centrist pattern
      primaryAlignment = "conservative-moderate";
      confidenceScore = 0.7;
      alignmentScore = Math.abs(scores.economic.total);
    }
    else if (Math.abs(scores.economic.total) < thresholds.moderate && 
             Math.abs(scores.social.total) < thresholds.moderate) {
      // Centrist pattern
      primaryAlignment = "centrist";
      confidenceScore = 0.65;
      alignmentScore = 5 - (Math.abs(scores.economic.total) + Math.abs(scores.social.total)) / 2;
      
      // Liberal leaning centrist
      if (scores.economic.total < 0 && scores.social.total > 0) {
        if (scores.authoritarian.total > thresholds.weak) {
          primaryAlignment = "liberal";
          confidenceScore = 0.6;
          alignmentScore = (Math.abs(scores.economic.total) + scores.social.total) / 2;
        }
      }
    }
    
    // Secondary dimension checks - can override primary alignment in strong cases
    
    // Strong populist tendencies
    if (scores.populism.total >= thresholds.strong) {
      if (secondaryAlignment === null) {
        secondaryAlignment = "populist";
      }
      
      // If populism is very strong, consider it as primary
      if (scores.populism.total >= thresholds.strong * 1.3 && 
          Math.abs(scores.economic.total) < thresholds.strong) {
        secondaryAlignment = primaryAlignment;
        primaryAlignment = "populist";
        confidenceScore = 0.7;
        alignmentScore = scores.populism.total;
      }
    }
    
    // Strong nationalist tendencies
    if (scores.international.total <= -thresholds.strong) {
      if (secondaryAlignment === null) {
        secondaryAlignment = "nationalist";
      }
      
      // If nationalism is very strong, consider it as primary
      if (scores.international.total <= -thresholds.strong * 1.3 &&
          primaryAlignment !== "conservative") {
        secondaryAlignment = primaryAlignment;
        primaryAlignment = "nationalist";
        confidenceScore = 0.75;
        alignmentScore = Math.abs(scores.international.total);
      }
    }
    
    // Strong authoritarian tendencies
    if (scores.authoritarian.total <= -thresholds.strong) {
      if (secondaryAlignment === null) {
        secondaryAlignment = "authoritarian";
      }
      
      // If authoritarianism is very strong, consider it as primary
      if (scores.authoritarian.total <= -thresholds.strong * 1.3 &&
          primaryAlignment !== "conservative" && 
          primaryAlignment !== "nationalist") {
        secondaryAlignment = primaryAlignment;
        primaryAlignment = "authoritarian";
        confidenceScore = 0.7;
        alignmentScore = Math.abs(scores.authoritarian.total);
      }
    }
    
    // Strong environmental focus
    if (scores.environmental.total >= thresholds.strong) {
      // If green tendencies are very strong, consider it as primary
      if (scores.environmental.total >= thresholds.strong * 1.2 &&
          (primaryAlignment === "progressive-left" || 
           primaryAlignment === "social-democrat" ||
           primaryAlignment === "centrist")) {
        secondaryAlignment = primaryAlignment;
        primaryAlignment = "green";
        confidenceScore = 0.75;
        alignmentScore = scores.environmental.total;
      } else if (secondaryAlignment === null) {
        secondaryAlignment = "green";
      }
    }
    
    // Set the results
    setResults({
      primaryAlignment,
      secondaryAlignment,
      alignmentScore: Math.min(10, alignmentScore), // Cap at 10
      confidenceScore,
      scores: {
        economic: scores.economic.total,
        social: scores.social.total,
        authoritarian: scores.authoritarian.total,
        international: scores.international.total,
        environmental: scores.environmental.total,
        populism: scores.populism.count > 0 ? scores.populism.total : null
      }
    });
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
    setReviewMode(false);
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
  
  // No demographic data needed
  
  // Count answered questions for review mode
  const countAnsweredQuestions = () => {
    return displayedQuestions.filter(q => answers[q.id] !== undefined).length;
  };
  
  // Check if all questions are answered
  const allQuestionsAnswered = displayedQuestions.length > 0 && 
    countAnsweredQuestions() === displayedQuestions.length;

  // Calculate secondary match scores with enhanced methodology
  const calculateSecondaryMatches = () => {
    if (!results) return [];
    
    const { scores } = results;
    const matches = [];
    
    Object.keys(politicalAlignments).forEach(alignment => {
      if (alignment === results.primaryAlignment || alignment === results.secondaryAlignment) {
        return; // Skip primary and secondary alignments
      }
      
      // Enhanced alignment profiles with more dimensions and nuanced values
      const alignment_profile = {
        "socialist": { 
          economic: 8.5, social: 6.5, authoritarian: 0, international: 6, environmental: 7, populism: 4
        },
        "progressive-left": { 
          economic: 6.5, social: 7.5, authoritarian: 3, international: 6.5, environmental: 7.5, populism: 3
        },
        "social-democrat": { 
          economic: 4.5, social: 5, authoritarian: 2, international: 4.5, environmental: 5.5, populism: 0
        },
        "green": { 
          economic: 3.5, social: 6, authoritarian: 3, international: 7, environmental: 9, populism: 2
        },
        "centrist": { 
          economic: 0, social: 0, authoritarian: 0, international: 0, environmental: 0, populism: -2
        },
        "liberal": { 
          economic: -3.5, social: 5, authoritarian: 5, international: 3, environmental: 2, populism: -3
        },
        "libertarian": { 
          economic: -7.5, social: 6, authoritarian: 8, international: -2, environmental: -2, populism: 0
        },
        "conservative-moderate": { 
          economic: -4.5, social: -4, authoritarian: -2, international: -3, environmental: -2, populism: -1
        },
        "conservative": { 
          economic: -7, social: -7, authoritarian: -5, international: -5, environmental: -4, populism: 3
        },
        "nationalist": { 
          economic: -5, social: -6, authoritarian: -7, international: -8.5, environmental: -3, populism: 6
        },
        "authoritarian": { 
          economic: -3, social: -6, authoritarian: -9, international: -6, environmental: -2, populism: 4
        },
        "populist": { 
          economic: 0, social: -2, authoritarian: -4, international: -5, environmental: 0, populism: 8.5
        }
      };
      
      // Calculate distance between user's scores and each alignment profile
      const profile = alignment_profile[alignment];
      let totalDistance = 0;
      let maxPossibleDistance = 0;
      let dimensionCount = 0;
      
      // Enhanced distance calculation with weighted dimensions
      Object.keys(profile).forEach(dimension => {
        if (dimension === 'populism' && scores[dimension] === null) {
          return; // Skip populism if not measured
        }
        
        const profileScore = profile[dimension];
        const userScore = scores[dimension] || 0;
        
        // Weight each dimension differently based on importance
        const dimensionWeights = {
          economic: 2.0,
          social: 2.0,
          authoritarian: 1.5,
          international: 1.0,
          environmental: 1.0,
          populism: 1.0
        };
        
        const weight = dimensionWeights[dimension];
        
        // Calculate weighted distance
        const distance = Math.abs(profileScore - userScore);
        totalDistance += distance * weight;
        maxPossibleDistance += 20 * weight; // Maximum possible distance on -10 to +10 scale
        dimensionCount++;
      });
      
      // Convert distance to similarity (0-100%) with non-linear scaling to better differentiate top matches
      let matchScore = Math.round(100 * (1 - totalDistance / maxPossibleDistance));
      
      // Apply non-linear transformation to emphasize differences between close matches
      matchScore = Math.pow(matchScore/100, 0.8) * 100;
      
      if (matchScore > 30) { // Only include reasonable matches
        matches.push({
          alignment,
          score: Math.round(matchScore)
        });
      }
    });
    
    // Sort by match score
    return matches.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  // Generate radar chart data for results visualization
  const generateRadarChartData = () => {
    if (!results) return [];
    
    const { scores } = results;
    
    // Transform scores to 0-100 scale for radar chart
    return [
      {
        dimension: "Ekonomi (Kiri)",
        value: scores.economic > 0 ? Math.min(100, scores.economic * 10) : 0,
      },
      {
        dimension: "Ekonomi (Kanan)",
        value: scores.economic < 0 ? Math.min(100, Math.abs(scores.economic) * 10) : 0,
      },
      {
        dimension: "Sosial (Progresif)",
        value: scores.social > 0 ? Math.min(100, scores.social * 10) : 0,
      },
      {
        dimension: "Sosial (Konservatif)",
        value: scores.social < 0 ? Math.min(100, Math.abs(scores.social) * 10) : 0,
      },
      {
        dimension: "Kebebasan",
        value: scores.authoritarian > 0 ? Math.min(100, scores.authoritarian * 10) : 0,
      },
      {
        dimension: "Otoritas",
        value: scores.authoritarian < 0 ? Math.min(100, Math.abs(scores.authoritarian) * 10) : 0,
      },
      {
        dimension: "Globalisme",
        value: scores.international > 0 ? Math.min(100, scores.international * 10) : 0,
      },
      {
        dimension: "Nasionalisme",
        value: scores.international < 0 ? Math.min(100, Math.abs(scores.international) * 10) : 0,
      },
      {
        dimension: "Lingkungan",
        value: scores.environmental > 0 ? Math.min(100, scores.environmental * 10) : 0,
      },
      {
        dimension: "Pertumbuhan",
        value: scores.environmental < 0 ? Math.min(100, Math.abs(scores.environmental) * 10) : 0,
      }
    ].filter(item => item.value > 0); // Only show non-zero dimensions
  };

  return (
    <div className="political-test-container">
      {/* Intro step */}
      {currentStep === 'intro' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 font-serif">Tes Orientasi Politik Komprehensif</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Selamat datang di tes orientasi politik yang lebih mendalam. Tes ini dirancang dengan metodologi yang lebih komprehensif untuk memberikan pemahaman yang lebih akurat tentang posisi politik Anda.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/20">
              <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-400">Pilih Versi Tes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => setTestVersion('standard')}
                  className={`p-4 rounded-lg border transition ${
                    testVersion === 'standard' 
                      ? 'bg-blue-100 dark:bg-blue-800/30 border-blue-300 dark:border-blue-700'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium mb-1">Standar</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    22 pertanyaan • 5-7 menit
                  </div>
                </button>
                <button
                  onClick={() => setTestVersion('comprehensive')}
                  className={`p-4 rounded-lg border transition ${
                    testVersion === 'comprehensive' 
                      ? 'bg-blue-100 dark:bg-blue-800/30 border-blue-300 dark:border-blue-700'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium mb-1">Komprehensif</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    35 pertanyaan • 10-12 menit
                  </div>
                </button>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/20">
              <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-400">Tentang Tes Ini</h3>
              <ul className="list-disc list-inside text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <li>Mengukur 5-6 dimensi politik: Ekonomi, Sosial, Tata Kelola, Internasional, Lingkungan, dan Populisme</li>
                <li>Menggunakan sistem pembobotan soal untuk meningkatkan akurasi</li>
                <li>Memberikan hasil dengan analisis komprehensif, termasuk orientasi sekunder</li>
                <li>Menyediakan penjelasan untuk setiap pertanyaan</li>
                <li>Menampilkan visualisasi hasil yang lebih informatif</li>
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
          {/* Review mode */}
          {reviewMode ? (
            <div>
              <h3 className="text-xl font-bold mb-4">Tinjau Jawaban Anda</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Periksa jawaban Anda sebelum melihat hasil. Anda dapat mengklik pertanyaan untuk mengubah jawaban.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg mb-4 flex justify-between items-center">
                <div>
                  <span className="font-medium text-blue-800 dark:text-blue-400">
                    Pertanyaan dijawab: {countAnsweredQuestions()} dari {displayedQuestions.length}
                  </span>
                </div>
                {countAnsweredQuestions() < displayedQuestions.length && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    Ada pertanyaan yang belum dijawab
                  </div>
                )}
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto mb-6 p-2">
                {displayedQuestions.map((question, index) => {
                  const isAnswered = answers[question.id] !== undefined;
                  const answerValue = answers[question.id];
                  let answerLabel = "Belum dijawab";
                  
                  if (isAnswered) {
                    answerLabel = answerOptions.find(opt => opt.value === answerValue)?.label || "Unknown";
                  }
                  
                  return (
                    <div 
                      key={question.id}
                      onClick={() => jumpToQuestion(index)}
                      className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                        isAnswered 
                          ? 'border-gray-200 dark:border-gray-700' 
                          : 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="text-sm font-medium mb-1">Pertanyaan {index + 1}</div>
                          <div>{question.text}</div>
                        </div>
                        <div className={`text-sm font-medium ml-4 ${
                          isAnswered 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {answerLabel}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Kembali
                </button>
                
                <button
                  onClick={handleNext}
                  className={`px-4 py-2 rounded-lg ${
                    allQuestionsAnswered
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  Lihat Hasil
                </button>
              </div>
            </div>
          ) : (
            <>
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
                  {currentQuestionIndex === displayedQuestions.length - 1 ? 'Tinjau Jawaban' : 'Selanjutnya'}
                </button>
              </div>
            </>
          )}
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
                {politicalAlignments[results.primaryAlignment].title}
              </h3>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Kesesuaian: {Math.min(95, Math.round(results.alignmentScore * 10))}%
                {results.confidenceScore && 
                  <span className="ml-2">(Keyakinan: {Math.round(results.confidenceScore * 100)}%)</span>
                }
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {politicalAlignments[results.primaryAlignment].description}
            </p>
            
            {results.secondaryAlignment && (
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg mb-4 text-sm border border-blue-100 dark:border-blue-900/20">
                <p className="font-medium">Orientasi Sekunder: {politicalAlignments[results.secondaryAlignment].title}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Pandangan politik Anda juga menunjukkan kesamaan dengan orientasi {politicalAlignments[results.secondaryAlignment].title.toLowerCase()}.
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
          
          {/* Radar chart visualization of political dimensions */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-8">
            <h3 className="font-medium mb-4">Visualisasi Dimensi Politik</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={generateRadarChartData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: 'gray', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Dimensi Politik"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.5}
                  />
                  <Tooltip formatter={(value) => [value, 'Intensitas']} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Dimension scores */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Profil Dimensi Politik Anda</h3>
            
            <div className="space-y-4">
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
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {results.scores.economic > 7 ? "Sangat mendukung ekonomi yang dikendalikan negara dan redistribusi kekayaan" :
                   results.scores.economic > 3 ? "Mendukung intervensi pemerintah yang signifikan dalam ekonomi" :
                   results.scores.economic > 0 ? "Cenderung mendukung campuran regulasi pasar dan jaring pengaman sosial" :
                   results.scores.economic > -3 ? "Cenderung mendukung ekonomi pasar dengan beberapa regulasi" :
                   results.scores.economic > -7 ? "Mendukung kebijakan ekonomi pasar bebas dengan minimal intervensi pemerintah" :
                   "Sangat mendukung laissez-faire, pasar bebas tanpa hambatan"}
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
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {results.scores.social > 7 ? "Sangat mendukung perubahan sosial dan kesetaraan" :
                   results.scores.social > 3 ? "Secara umum progresif pada isu-isu sosial dan budaya" :
                   results.scores.social > 0 ? "Cenderung progresif pada beberapa isu sosial" :
                   results.scores.social > -3 ? "Cenderung mendukung beberapa nilai-nilai tradisional" :
                   results.scores.social > -7 ? "Mendukung pelestarian nilai-nilai dan institusi tradisional" :
                   "Sangat mendukung konservatisme sosial dan tradisional"}
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
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {results.scores.authoritarian > 7 ? "Sangat menekankan kebebasan individu di atas kontrol pemerintah" :
                   results.scores.authoritarian > 3 ? "Mendukung pembatasan kekuasaan pemerintah" :
                   results.scores.authoritarian > 0 ? "Cenderung mendukung kebebasan sipil dan batasan pemerintah" :
                   results.scores.authoritarian > -3 ? "Cenderung mendukung pemerintahan yang kuat untuk ketertiban" :
                   results.scores.authoritarian > -7 ? "Mendukung pemerintahan terpusat yang kuat dan ketertiban sosial" :
                   "Sangat menekankan kepatuhan dan otoritas negara"}
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
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {results.scores.international > 7 ? "Sangat mendukung internasionalisme dan institusi global" :
                   results.scores.international > 3 ? "Mendukung kerja sama global dan interdependensi" :
                   results.scores.international > 0 ? "Cenderung mendukung perspektif internasionalis" :
                   results.scores.international > -3 ? "Cenderung mengutamakan kepentingan nasional" :
                   results.scores.international > -7 ? "Mendukung kebijakan yang memprioritaskan kedaulatan nasional" :
                   "Sangat menekankan kemandirian nasional dan kedaulatan"}
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
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {results.scores.environmental > 7 ? "Sangat menekankan perlindungan lingkungan di atas pertimbangan ekonomi" :
                   results.scores.environmental > 3 ? "Mendukung kebijakan lingkungan yang kuat dan pembangunan berkelanjutan" :
                   results.scores.environmental > 0 ? "Cenderung mendukung perlindungan lingkungan dalam kerangka ekonomi" :
                   results.scores.environmental > -3 ? "Cenderung memprioritaskan pertumbuhan ekonomi dengan beberapa perhatian lingkungan" :
                   results.scores.environmental > -7 ? "Mendukung pertumbuhan ekonomi di atas regulasi lingkungan yang ketat" :
                   "Sangat menekankan pertumbuhan ekonomi dan menolak pembatasan lingkungan"}
                </div>
              </div>
              
              {results.scores.populism !== null && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Populisme: <span className="font-medium">Populis</span></span>
                    <span><span className="font-medium">Teknokratis</span></span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 relative">
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400 dark:bg-gray-500"></div>
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${results.scores.populism > 0 ? 'bg-orange-500' : 'bg-teal-500'}`}
                      style={{ 
                        width: `${Math.min(100, Math.abs(results.scores.populism) * 5)}%`, 
                        marginLeft: results.scores.populism >= 0 ? '50%' : `${Math.max(0, 50 - Math.abs(results.scores.populism) * 5)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {results.scores.populism > 7 ? "Sangat populis, skeptis terhadap elite dan institusi yang mapan" :
                     results.scores.populism > 3 ? "Cenderung mendukung pendekatan politik yang berfokus pada 'kehendak rakyat'" :
                     results.scores.populism > 0 ? "Memiliki beberapa kecenderungan populis dalam isu-isu tertentu" :
                     results.scores.populism > -3 ? "Cenderung mempercayai keahlian dan institusi yang mapan" :
                     results.scores.populism > -7 ? "Mendukung pendekatan teknokratis dan berbasis bukti dalam politik" :
                     "Sangat memprioritaskan kepemimpinan berdasarkan keahlian dan pengalaman"}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Reading Recommendations */}
          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg mb-8 border border-blue-100 dark:border-blue-900/20">
            <h3 className="font-medium mb-3 text-blue-800 dark:text-blue-400">Bacaan yang Direkomendasikan</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Berdasarkan orientasi politik Anda, berikut beberapa buku yang mungkin menarik bagi Anda:
            </p>
            <div className="grid grid-cols-1 gap-3">
              {politicalAlignments[results.primaryAlignment].readingRecommendations.map((book, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="font-medium">{book.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Oleh: {book.author}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Methodology and limitations */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-8">
            <h3 className="font-medium mb-2">Tentang Metodologi</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Tes ini menggunakan pendekatan multidimensional yang memperhitungkan berbagai aspek orientasi politik. Setiap pertanyaan diberi bobot berdasarkan korelasi dengan posisi politik tertentu.
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
      
      {/* Explanation modal */}
      {showExplanationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg mx-4 shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-xl mb-4">Tentang Tes Politik</h3>
            <div className="text-gray-700 dark:text-gray-300 max-h-80 overflow-y-auto mb-4">
              <p className="mb-3">
                Tes ini menggunakan pendekatan multidimensional untuk mengukur orientasi politik Anda 
                pada beberapa dimensi utama:
              </p>
              <ul className="list-disc list-inside mb-3 space-y-1">
                <li><strong>Ekonomi</strong>: Dari kiri (intervensi negara) hingga kanan (pasar bebas)</li>
                <li><strong>Sosial</strong>: Dari progresif (perubahan) hingga konservatif (tradisi)</li>
                <li><strong>Pemerintahan</strong>: Dari libertarian (kebebasan) hingga otoritarian (ketertiban)</li>
                <li><strong>Internasional</strong>: Dari globalis (kerja sama global) hingga nasionalis (kepentingan nasional)</li>
                <li><strong>Lingkungan</strong>: Dari environmentalis (prioritas lingkungan) hingga pro-pertumbuhan (prioritas ekonomi)</li>
                <li><strong>Populisme</strong>: Dari populis (anti-elite) hingga teknokratis (berbasis keahlian)</li>
              </ul>
              <p className="mb-3">
                Setiap pertanyaan diberi bobot khusus untuk mengukur aspek-aspek tertentu dari orientasi politik Anda.
                Hasil akhir menunjukkan kecenderungan Anda pada 12 orientasi politik berbeda, dengan memperhitungkan
                orientasi yang dominan dan sekunder.
              </p>
              <p>
                Harap diingat bahwa tes politik semacam ini adalah penyederhanaan dari pandangan politik yang kompleks.
                Hasilnya sebaiknya digunakan sebagai titik awal untuk refleksi, bukan sebagai label definitif.
              </p>
            </div>
            <div className="flex justify-end">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setShowExplanationModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}