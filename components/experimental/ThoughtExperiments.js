import { useState } from 'react';

export default function ThoughtExperiments() {
  const [activeExperiment, setActiveExperiment] = useState('ship-of-theseus');
  const [stage, setStage] = useState(0);
  const [choices, setChoices] = useState({});
  const [reflection, setReflection] = useState('');
  
  // Define all thought experiments in Bahasa Indonesia
  const experiments = {
    'ship-of-theseus': {
      title: "Kapal Theseus",
      description: "Paradoks klasik tentang identitas dan persistensi selama kurun waktu.",
      stages: [
        {
          title: "Paradoks Asli",
          description: "Bayangkan sebuah kapal terkenal yang diawetkan di museum. Seiring waktu, bagian-bagian kayunya mulai membusuk dan diganti satu per satu. Setelah bertahun-tahun, semua bagian asli telah diganti. Apakah itu masih kapal yang sama?",
          options: [
            "Ya, itu masih kapal yang sama karena mempertahankan bentuk dan fungsinya",
            "Tidak, itu kapal yang berbeda karena tidak ada lagi material asli yang tersisa"
          ]
        },
        {
          title: "Kontinuitas Identitas",
          description: "Sekarang bayangkan papan-papan asli yang dilepas telah disimpan dengan hati-hati. Seseorang kemudian merakitnya menjadi kapal yang identik dengan desain aslinya. Mana yang merupakan Kapal Theseus 'sejati'?",
          options: [
            "Kapal yang direstorasi di museum adalah Kapal Theseus yang asli",
            "Kapal yang dirakit kembali dari material asli adalah Kapal Theseus yang asli",
            "Kedua kapal memiliki klaim yang sama kuat sebagai yang asli",
            "Tidak ada lagi kapal yang benar-benar asli"
          ]
        }
      ],
      analysis: {
        title: "Analisis Filosofis",
        content: [
          "Kapal Theseus menghadirkan paradoks tentang identitas yang telah membingungkan para filsuf selama berabad-abad. Ini memunculkan pertanyaan tentang apa yang membuat sesuatu 'tetap sama' dari waktu ke waktu—apakah itu kontinuitas bentuk, fungsi, material, atau sesuatu yang lain?",
          "Eksperimen pemikiran ini terhubung dengan konsep-konsep dalam metafisika, identitas personal, dan bahkan pertanyaan modern tentang kesadaran digital dan paradoks teleportasi.",
          "Filsuf kontemporer telah memperluas paradoks ini ke pertanyaan tentang identitas pribadi: Jika semua sel Anda secara bertahap diganti seiring waktu (seperti yang memang terjadi dalam tubuh manusia), apakah Anda masih orang yang sama?"
        ],
        relatedConcepts: ["Metafisika", "Identitas", "Kontinuitas", "Esensialisme"],
        philosophers: ["Plutarch", "Thomas Hobbes", "John Locke"]
      }
    },
    'trolley-problem': {
      title: "Masalah Trem",
      description: "Dilema moral tentang utilitarianisme dan etika intervensi.",
      stages: [
        {
          title: "Skenario Dasar",
          description: "Sebuah trem melaju kencang di rel di mana lima orang terikat dan tidak bisa melarikan diri. Anda berdiri di samping tuas yang dapat mengalihkan trem ke rel berbeda di mana hanya satu orang yang terikat. Apakah Anda akan menarik tuasnya?",
          options: [
            "Ya, saya akan menarik tuasnya untuk menyelamatkan lima orang dengan mengorbankan satu orang",
            "Tidak, saya tidak akan ikut campur meskipun lebih banyak orang yang akan mati"
          ]
        },
        {
          title: "Variasi Jembatan Penyeberangan",
          description: "Sekarang bayangkan Anda berada di jembatan penyeberangan di atas rel. Satu-satunya cara untuk menghentikan trem dan menyelamatkan lima orang adalah dengan mendorong orang bertubuh besar dari jembatan ke rel. Orang tersebut akan mati, tetapi tubuhnya akan menghentikan trem. Apakah Anda akan mendorongnya?",
          options: [
            "Ya, saya akan mendorong orang tersebut untuk menyelamatkan lima orang",
            "Tidak, saya tidak akan mendorong orang tersebut meskipun lima orang akan mati"
          ]
        }
      ],
      analysis: {
        title: "Analisis Etis",
        content: [
          "Masalah Trem menyoroti ketegangan antara kerangka etika berbeda: utilitarianisme (memaksimalkan kebahagiaan secara keseluruhan atau meminimalkan bahaya) versus etika deontologis (berfokus pada moralitas tindakan itu sendiri terlepas dari konsekuensinya).",
          "Menariknya, sebagian besar orang akan menarik tuas dalam skenario pertama tetapi tidak akan mendorong orang dalam skenario kedua, meskipun hasil matematikanya identik (satu orang mati alih-alih lima).",
          "Ini mengungkapkan intuisi moral kita yang kompleks: bahaya fisik langsung sering terasa berbeda dari bahaya tidak langsung, dan secara aktif menyebabkan bahaya bisa terasa berbeda dari membiarkan bahaya terjadi."
        ],
        relatedConcepts: ["Utilitarianisme", "Etika Deontologis", "Psikologi Moral", "Efek Ganda"],
        philosophers: ["Philippa Foot", "Judith Jarvis Thomson", "Peter Singer"]
      }
    },
    'chinese-room': {
      title: "Ruang Cina",
      description: "Eksperimen pemikiran tentang kecerdasan buatan dan kesadaran.",
      stages: [
        {
          title: "Skenario",
          description: "Bayangkan Anda terkunci dalam sebuah ruangan dengan buku besar berisi instruksi dalam bahasa Indonesia. Orang-orang di luar ruangan memasukkan catatan yang ditulis dalam bahasa Mandarin di bawah pintu. Dengan mengikuti instruksi dalam buku Anda, Anda merespons dengan simbol-simbol Mandarin lainnya, menciptakan tanggapan yang tepat. Bagi orang-orang di luar, tampak ruangan itu memahami bahasa Mandarin. Apakah Anda (atau sistem ruangan secara keseluruhan) benar-benar memahami bahasa Mandarin?",
          options: [
            "Ya, sistem secara keseluruhan menunjukkan pemahaman meskipun saya secara pribadi tidak memahami bahasa Mandarin",
            "Tidak, baik saya maupun sistem tidak benar-benar memahami bahasa Mandarin—itu hanya memanipulasi simbol tanpa pemahaman"
          ]
        },
        {
          title: "Pertanyaan AI",
          description: "Sekarang terapkan ini pada sistem AI modern seperti model bahasa besar. Mereka memproses simbol sesuai dengan pola statistik tanpa pemahaman sadar. Ketika sistem AI tampaknya memahami bahasa dan memberikan respons yang tepat, apakah itu memiliki pemahaman sejati?",
          options: [
            "Ya, jika sebuah AI secara konsisten lulus semua tes pemahaman, kita harus menganggapnya memiliki pemahaman sejati",
            "Tidak, bahkan sistem AI yang canggih hanya memanipulasi simbol tanpa pemahaman sejati"
          ]
        }
      ],
      analysis: {
        title: "Analisis Filsafat Pikiran",
        content: [
          "John Searle memperkenalkan argumen Ruang Cina untuk menantang gagasan bahwa program komputer bisa memiliki pikiran atau kesadaran hanya dengan memanipulasi simbol menurut aturan.",
          "Eksperimen pemikiran ini memunculkan pertanyaan mendalam tentang sifat kesadaran, pemahaman, dan apa artinya 'mengetahui' sesuatu. Dapatkah sintaksis (mengikuti aturan) menciptakan semantik (makna)?",
          "Di era AI yang semakin canggih, pertanyaan ini menjadi lebih relevan: Dapatkah sistem AI seperti GPT-4 dikatakan 'memahami' bahasa, atau apakah mereka hanya sangat pandai dalam mensimulasikan pemahaman?"
        ],
        relatedConcepts: ["Filsafat Pikiran", "Kesadaran", "Kecerdasan Buatan", "Semantik vs. Sintaksis"],
        philosophers: ["John Searle", "Daniel Dennett", "David Chalmers"]
      }
    }
  };
  
  // Get the current experiment
  const currentExperiment = experiments[activeExperiment];
  const currentStage = stage < currentExperiment.stages.length ? currentExperiment.stages[stage] : null;
  
  // Handle selecting an experiment
  const handleExperimentSelect = (experimentId) => {
    setActiveExperiment(experimentId);
    setStage(0);
    setChoices({});
    setReflection('');
  };
  
  // Handle choice for current stage
  const handleChoice = (choiceIndex) => {
    setChoices({
      ...choices,
      [stage]: choiceIndex
    });
    setStage(stage + 1);
  };
  
  // Reset current experiment
  const resetExperiment = () => {
    setStage(0);
    setChoices({});
    setReflection('');
  };
  
  return (
    <div className="thought-experiments">
      <h2 className="text-2xl font-bold mb-4 font-serif">Eksperimen Pemikiran Filosofis</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Terlibat dengan teka-teki filosofis klasik yang menantang intuisi kita tentang identitas, etika, kesadaran, dan lainnya.
        Eksperimen pemikiran ini telah diperdebatkan oleh para filsuf selama berabad-abad dan terus memengaruhi pemikiran kita hingga saat ini.
      </p>
      
      {/* Experiment selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.keys(experiments).map((experimentId) => (
          <button
            key={experimentId}
            onClick={() => handleExperimentSelect(experimentId)}
            className={`px-4 py-2 rounded-lg transition ${
              activeExperiment === experimentId
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {experiments[experimentId].title}
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        {/* Experiment title and description */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">{currentExperiment.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{currentExperiment.description}</p>
        </div>
        
        {/* Experiment content */}
        {currentStage ? (
          <div>
            <h4 className="text-lg font-medium mb-3">{currentStage.title}</h4>
            <p className="mb-6 text-gray-700 dark:text-gray-300">{currentStage.description}</p>
            
            <div className="space-y-3">
              {currentStage.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(index)}
                  className="w-full p-4 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/10 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : stage === currentExperiment.stages.length ? (
          <div>
            <h4 className="text-lg font-medium mb-3">Refleksi Anda</h4>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Eksperimen pemikiran ini menantang intuisi kita tentang {currentExperiment.analysis.relatedConcepts.join(", ").toLowerCase()}.
              Bagaimana Anda menjelaskan penalaran Anda?
            </p>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="w-full p-4 h-32 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-4"
              placeholder="Bagikan pemikiran Anda tentang teka-teki filosofis ini..."
            ></textarea>
            <button
              onClick={() => setStage(stage + 1)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              disabled={reflection.trim().length === 0}
            >
              Lanjut ke Analisis
            </button>
          </div>
        ) : (
          <div>
            <h4 className="text-xl font-medium mb-4">{currentExperiment.analysis.title}</h4>
            
            <div className="space-y-4">
              {currentExperiment.analysis.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-300">{paragraph}</p>
              ))}
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <h5 className="font-medium">Pilihan Anda:</h5>
                <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400">
                  {currentExperiment.stages.map((stage, index) => (
                    <li key={index}>
                      <span className="font-medium">{stage.title}:</span> {stage.options[choices[index]]}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium">Refleksi Anda:</h5>
                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-gray-600 dark:text-gray-400 italic">
                  {reflection || "Tidak ada refleksi yang diberikan."}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium">Konsep Terkait:</h5>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentExperiment.analysis.relatedConcepts.map((concept) => (
                    <span key={concept} className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-full text-sm">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium">Filsuf Utama:</h5>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentExperiment.analysis.philosophers.map((philosopher) => (
                    <span key={philosopher} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm">
                      {philosopher}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                onClick={resetExperiment}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Coba Variasi Lain
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}