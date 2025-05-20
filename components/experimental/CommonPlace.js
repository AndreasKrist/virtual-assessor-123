import { useState } from 'react';

const CommonPlace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Simplified categories and expanded collection with more Dostoevsky
  const commonplaceEntries = [
    // Dostoevsky - Crime and Punishment
    {
      id: 1,
      content: "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
      source: "Fyodor Dostoevsky",
      reference: "Crime and Punishment (1866)",
      category: "Literature",
      link: null
    },
    {
      id: 2,
      content: "To go wrong in one's own way is better than to go right in someone else's.",
      source: "Fyodor Dostoevsky",
      reference: "Crime and Punishment (1866)",
      category: "Literature",
      link: null
    },
    {
      id: 3,
      content: "Taking a new step, uttering a new word, is what people fear most.",
      source: "Fyodor Dostoevsky",
      reference: "Crime and Punishment (1866)",
      category: "Literature",
      link: null
    },
    
    // Dostoevsky - The Brothers Karamazov
    {
      id: 4,
      content: "Above all, don't lie to yourself. The man who lies to himself and listens to his own lie comes to a point that he cannot distinguish the truth within him, or around him, and so loses all respect for himself and for others.",
      source: "Fyodor Dostoevsky",
      reference: "The Brothers Karamazov (1880)",
      category: "Literature",
      link: null
    },
    {
      id: 5,
      content: "Love in action is a harsh and dreadful thing compared to love in dreams.",
      source: "Fyodor Dostoevsky",
      reference: "The Brothers Karamazov (1880)",
      category: "Literature",
      link: null
    },
    {
      id: 6,
      content: "What is hell? I maintain that it is the suffering of being unable to love.",
      source: "Fyodor Dostoevsky",
      reference: "The Brothers Karamazov (1880)",
      category: "Literature",
      link: null
    },
    {
      id: 7,
      content: "The mystery of human existence lies not in just staying alive, but in finding something to live for.",
      source: "Fyodor Dostoevsky",
      reference: "The Brothers Karamazov (1880)",
      category: "Literature",
      link: null
    },
    
    // Dostoevsky - The Idiot
    {
      id: 8,
      content: "Beauty will save the world.",
      source: "Fyodor Dostoevsky",
      reference: "The Idiot (1869)",
      category: "Literature",
      link: null
    },
    {
      id: 9,
      content: "It is better to be unhappy and know the worst, than to be happy in a fool's paradise.",
      source: "Fyodor Dostoevsky",
      reference: "The Idiot (1869)",
      category: "Literature",
      link: null
    },
    {
      id: 10,
      content: "Compassion is the chief law of human existence.",
      source: "Fyodor Dostoevsky",
      reference: "The Idiot (1869)",
      category: "Literature",
      link: null
    },
    
    // Dostoevsky - Demons (The Possessed)
    {
      id: 11,
      content: "If God does not exist, everything is permitted.",
      source: "Fyodor Dostoevsky",
      reference: "Demons (1872)",
      category: "Literature",
      link: null
    },
    {
      id: 12,
      content: "There are moments when people allow more freedom to one who is at the bottom of the heap than to themselves.",
      source: "Fyodor Dostoevsky",
      reference: "Demons (1872)",
      category: "Literature",
      link: null
    },
    {
      id: 13,
      content: "A man who lies to himself is often the first to take offense. It sometimes feels very good to take offense, doesn't it? And surely he knows that no one has offended him, and that he himself has invented the offense and told lies just for the beauty of it, that he has exaggerated to make it picturesque.",
      source: "Fyodor Dostoevsky",
      reference: "Demons (1872)",
      category: "Literature",
      link: null
    },
    
    // Dostoevsky - Notes from Underground
    {
      id: 14,
      content: "Man only likes to count his troubles; he doesn't calculate his happiness.",
      source: "Fyodor Dostoevsky",
      reference: "Notes from Underground (1864)",
      category: "Literature",
      link: null
    },
    {
      id: 15,
      content: "I say let the world go to hell, but I should always have my tea.",
      source: "Fyodor Dostoevsky",
      reference: "Notes from Underground (1864)",
      category: "Literature",
      link: null
    },
    {
      id: 16,
      content: "To love is to suffer and there can be no love otherwise.",
      source: "Fyodor Dostoevsky",
      reference: "Notes from Underground (1864)",
      category: "Literature",
      link: null
    },
    
    // Dostoevsky - The Gambler
    {
      id: 17,
      content: "People really want to believe that for every problem or situation, there is a clear simple remedy or a pill that can be prescribed.",
      source: "Fyodor Dostoevsky",
      reference: "The Gambler (1867)",
      category: "Literature",
      link: null
    },
    {
      id: 18,
      content: "Hesitation does not imply stupidity. It may even sometimes be the sign of a strong mind.",
      source: "Fyodor Dostoevsky",
      reference: "The Gambler (1867)",
      category: "Literature",
      link: null
    },
    
    // Dostoevsky - The House of the Dead
    {
      id: 19,
      content: "The degree of civilization in a society can be judged by entering its prisons.",
      source: "Fyodor Dostoevsky",
      reference: "The House of the Dead (1862)",
      category: "Literature",
      link: null
    },
    {
      id: 20,
      content: "Man is a creature that can get accustomed to anything, and I think that is the best definition of him.",
      source: "Fyodor Dostoevsky",
      reference: "The House of the Dead (1862)",
      category: "Literature",
      link: null
    },
    
    // Other literature - Orwell
    {
      id: 21,
      content: "Who controls the past controls the future. Who controls the present controls the past.",
      source: "George Orwell",
      reference: "1984 (1949)",
      category: "Literature",
      link: null
    },
    {
      id: 22,
      content: "All animals are equal, but some animals are more equal than others.",
      source: "George Orwell",
      reference: "Animal Farm (1945)",
      category: "Literature",
      link: null
    },
    {
      id: 23,
      content: "The best books are those that tell you what you know already.",
      source: "George Orwell",
      reference: "1984 (1949)",
      category: "Literature",
      link: null
    },
    
    // Literature - Pramoedya
    {
      id: 24,
      content: "Seorang terpelajar harus sudah berbuat adil sejak dalam pikiran, apalagi dalam perbuatan.",
      source: "Pramoedya Ananta Toer",
      reference: "Bumi Manusia (1980)",
      category: "Literature",
      link: null
    },
    {
      id: 25,
      content: "Mengerti sejarah berarti mengerti lebih dari yang tertulis, melihat yang belum terlihat, dan menafsirkan kembali yang sudah ditafsirkan.",
      source: "Pramoedya Ananta Toer",
      reference: "Bumi Manusia (1980)",
      category: "Literature",
      link: null
    },
    
    // Literature - Tolkien
    {
      id: 26,
      content: "Not all those who wander are lost.",
      source: "J.R.R. Tolkien",
      reference: "The Fellowship of the Ring (1954)",
      category: "Literature",
      link: null
    },
    
    // Philosophy - Plato
    {
      id: 27,
      content: "The price good men pay for indifference to public affairs is to be ruled by evil men.",
      source: "Plato",
      reference: "The Republic",
      category: "Philosophy",
      link: null
    },
    {
      id: 28,
      content: "No human thing is of serious importance.",
      source: "Plato",
      reference: "The Republic",
      category: "Philosophy",
      link: null
    },
    
    // Philosophy - Aristotle
    {
      id: 29,
      content: "It is the mark of an educated mind to be able to entertain a thought without accepting it.",
      source: "Aristotle",
      reference: "(Paraphrase of ideas in Nicomachean Ethics)",
      category: "Philosophy",
      link: null
    },
    {
      id: 30,
      content: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      source: "Aristotle",
      reference: "(Though actually written by Will Durant summarizing Aristotle's ideas)",
      category: "Philosophy",
      link: null
    },
    {
        id: 55,
        content: "It is desire, not reason, that gives us our goals and pushes us in any direction at all",
        source: "Aristotle",
        reference: "The Nicomachean Ethics - Penguin 2020 XViii",
        category: "Philosophy",
        link: null
      },
    
    // Philosophy - Augustine
    {
      id: 31,
      content: "Thou hast made us for thyself, O Lord, and our heart is restless until it finds its rest in thee.",
      source: "Augustine of Hippo",
      reference: "Confessions (397-400 CE)",
      category: "Philosophy",
      link: null
    },
    {
      id: 32,
      content: "Faith is to believe what you do not see; the reward of this faith is to see what you believe.",
      source: "Augustine of Hippo",
      reference: "Sermones 4.1.1",
      category: "Philosophy",
      link: null
    },
    
    // Philosophy - Nietzsche
    {
      id: 33,
      content: "He who has a why to live for can bear almost any how.",
      source: "Friedrich Nietzsche",
      reference: "Twilight of the Idols (1888)",
      category: "Philosophy",
      link: null
    },
    {
      id: 34,
      content: "That which does not kill us makes us stronger.",
      source: "Friedrich Nietzsche",
      reference: "Twilight of the Idols (1888)",
      category: "Philosophy",
      link: null
    },
    {
      id: 35,
      content: "Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you.",
      source: "Friedrich Nietzsche",
      reference: "Beyond Good and Evil (1886)",
      category: "Philosophy",
      link: null
    },
    {
      id: 36,
      content: "He who would learn to fly one day must first learn to stand and walk and run and climb and dance; one cannot fly into flying.",
      source: "Friedrich Nietzsche",
      reference: "Thus Spoke Zarathustra (1883)",
      category: "Philosophy",
      link: null
    },
    
    // Philosophy - Socrates
    {
      id: 37,
      content: "The unexamined life is not worth living.",
      source: "Socrates",
      reference: "As quoted in Plato's Apology",
      category: "Philosophy",
      link: null
    },
    {
      id: 38,
      content: "The only true wisdom is in knowing you know nothing.",
      source: "Socrates",
      reference: "As reported by Plato",
      category: "Philosophy",
      link: null
    },
    
    // Philosophy - Heraclitus
    {
      id: 39,
      content: "No man ever steps in the same river twice, for it's not the same river and he's not the same man.",
      source: "Heraclitus",
      reference: "As paraphrased in Plato's Cratylus",
      category: "Philosophy",
      link: null
    },
    
    // Philosophy - Sartre
    {
      id: 40,
      content: "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.",
      source: "Jean-Paul Sartre",
      reference: "Being and Nothingness (1943)",
      category: "Philosophy",
      link: null
    },
    
    // Politics - Soekarno
    {
      id: 41,
      content: "Give me ten young men who truly love Indonesia and I will shake the world.",
      source: "Soekarno",
      reference: "Speech (1960s)",
      category: "Politics",
      link: null
    },
    {
      id: 42,
      content: "Reach the stars with your feet on the ground.",
      source: "Soekarno",
      reference: "Common saying attributed to Soekarno",
      category: "Politics",
      link: null
    },
    {
      id: 43,
      content: "A thousand old men can only dream, one young man can change the world.",
      source: "Soekarno",
      reference: "Speech to Indonesian youth",
      category: "Politics",
      link: null
    },
    {
      id: 44,
      content: "JASMERAH: Jangan sekali-kali meninggalkan sejarah!",
      source: "Soekarno",
      reference: "Speech on Indonesian identity",
      category: "Politics",
      link: null
    },
    {
      id: 45,
      content: "Beri aku 1.000 orang tua, niscaya akan kucabut Semeru dari akarnya. Beri aku 10 pemuda, akan kuguncangkan dunia.",
      source: "Soekarno",
      reference: "Speech on youth empowerment",
      category: "Politics",
      link: null
    },
    
    // Politics - Tan Malaka
    {
      id: 46,
      content: "If colonialism grows from capitalism and imperialism, then the only way to eliminate colonialism is to eliminate capitalism and imperialism.",
      source: "Tan Malaka",
      reference: "Naar de 'Republiek Indonesia' (1925)",
      category: "Politics",
      link: null
    },
    {
      id: 47,
      content: "Knowledge without practice is like a tree without fruit.",
      source: "Tan Malaka",
      reference: "Attributed",
      category: "Politics",
      link: null
    },
    {
      id: 48,
      content: "Don't be afraid to make mistakes; be afraid not to learn from them.",
      source: "Tan Malaka",
      reference: "Attributed",
      category: "Politics",
      link: null
    },
    
    // Politics - Aidit
    {
      id: 49,
      content: "Revolution is not a dinner party, or writing an essay, or painting a picture, or doing embroidery; it cannot be so refined, so leisurely and gentle, so temperate, kind, courteous, restrained and magnanimous.",
      source: "D.N. Aidit (quoting Mao Zedong)",
      reference: "Speech during PKI meeting",
      category: "Politics",
      link: null
    },
    {
      id: 50,
      content: "We must remain vigilant against imperialism in all its forms, whether it comes with guns or with dollars.",
      source: "D.N. Aidit",
      reference: "Speech on Indonesian independence",
      category: "Politics",
      link: null
    },
    
    // Politics - Other
    {
      id: 51,
      content: "If liberty means anything at all, it means the right to tell people what they do not want to hear.",
      source: "George Orwell",
      reference: "Proposed preface to Animal Farm (1945)",
      category: "Politics",
      link: null
    },
    {
      id: 52,
      content: "To be free is not merely to cast off one's chains, but to live in a way that respects and enhances the freedom of others.",
      source: "Nelson Mandela",
      reference: "Long Walk to Freedom (1995)",
      category: "Politics",
      link: null
    },
    {
      id: 53,
      content: "Hidup yang tidak dipertaruhkan, tidak akan pernah dimenangkan.",
      source: "Sutan Sjahrir",
      reference: "Out of Exile (1949)",
      category: "Politics",
      link: null
    },
    {
      id: 54,
      content: "History is written by the victors.",
      source: "Attributed to Winston Churchill",
      reference: "(Though the concept predates him)",
      category: "Politics",
      link: null
    }
  ];
  
  // Extract unique categories for filtering (now just 3 plus "All")
  const categories = ['All', 'Literature', 'Philosophy', 'Politics'];
  
  // Filter entries based on search term and active filter
  const filteredEntries = commonplaceEntries.filter(entry => {
    const matchesSearch = 
      searchTerm === '' ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.reference && entry.reference.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeFilter === 'All' || entry.category === activeFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="common-place">
      <h2 className="text-2xl font-bold mb-2 font-serif">Common Place</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Koleksi kutipan, kebijaksanaan, dan pemikiran yang memberi inspirasi atau refleksi. Tempat yang kalian dapat kunjungi untuk berefleksi hingga memperdebatkan suatu pernyataan. Common place
        lazim digunakan dari Zaman Aristoteles, Renaisans; hingga saat ini untuk mengembangkan kebijaksanaan dan intelektual seseorang. 
      </p>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cari kutipan atau sumber..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                activeFilter === category
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Info about number of entries */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Menampilkan {filteredEntries.length} dari {commonplaceEntries.length} kutipan
      </div>
      
      {/* Entries */}
      <div className="space-y-4">
        {filteredEntries.length > 0 ? (
          filteredEntries.map(entry => (
            <div key={entry.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <blockquote className="mb-2 text-lg italic">
                "{entry.content}"
              </blockquote>
              <div className="text-right">
                <div className="font-medium">— {entry.source}</div>
                {entry.reference && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">{entry.reference}</div>
                )}
                {entry.link && (
                  <a 
                    href={entry.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-red-600 dark:text-red-400 hover:underline"
                  >
                    Sumber
                  </a>
                )}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                  {entry.category}
                </span>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">
              Tidak ada entri yang cocok dengan pencarian Anda.
            </p>
          </div>
        )}
      </div>
      
      {/* Add New Entry Section (Placeholder) */}
      <div className="mt-8 p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Ingin menambahkan kutipan atau pemikiran Anda sendiri? Fitur ini masih dalam pengembangan.
        </p>
        <button disabled className="mt-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-not-allowed">
          Tambah Entri Baru (Segera)
        </button>
      </div>
    </div>
  );
};

export default CommonPlace;