import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

function EDUHub() {
  const [tankonyvek, setTankonyvek] = useState([]);

  useEffect(() => {
    fetch('/api/tankonyvek')
      .then(res => res.json())
      .then(data => setTankonyvek(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-indigo-50 to-white">
      <header className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-md">
          <BookOpen className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-semibold text-indigo-700">EDUHub</h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tankonyvek.map(t => (
          <motion.div 
            key={t.id} 
            whileHover={{ scale: 1.03 }} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-4 rounded-2xl shadow-md ${t.grade === 5 ? 'bg-indigo-100 border-2 border-indigo-600' : 'bg-white'}`}
          >
            <h2 className="font-semibold text-indigo-700 text-lg">{t.title}</h2>
            <p className="text-sm text-gray-500 mt-1">Évfolyam: {t.grade} · Típus: {t.type}</p>
            <a 
              href={t.url} 
              target="_blank" 
              className="mt-3 inline-block px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
            >Megnyitás</a>
          </motion.div>
        ))}
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<EDUHub />);