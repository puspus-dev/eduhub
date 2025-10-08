// EDUHub - Next.js API route for live NKP PDF content
// File: /pages/api/tankonyvek.js

import fetch from 'node-fetch';

// Előre definiált lista az NKP PDF URL-ekről és metaadatokról
const nkpResources = [
  { id: 1, title: "Magyar nyelv - 7. évfolyam", type: "tankonyv", grade: 7, url: "https://www.nkp.hu/api/media/file/b07b4817b137734aaafd720fd813c1d432af519f" },
  { id: 2, title: "Matematika: Algebra feladatok", type: "feladat", grade: 8, url: "https://www.nkp.hu/api/media/file/5613c98675d9c07ccd556dc9e0d1cd26e6ed8bcf" },
  { id: 3, title: "Történelem: Az őskor", type: "videó", grade: 6, url: "https://www.nkp.hu/api/media/file/9a2e11c3c4e6f7a1f0e1ab2cd53b7f1f" }
];

// Cache változó az egyszerű gyorsítótárhoz
let cache = {
  data: null,
  timestamp: 0
};

const CACHE_TTL = 1000 * 60 * 60; // 1 óra

export default async function handler(req, res) {
  const now = Date.now();

  // Ha van cache és friss, visszaadjuk
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return res.status(200).json(cache.data);
  }

  try {
    // Itt lehetőség van az NKP URL ellenőrzésére vagy HEAD request-re,
    // de mivel közvetlen linkek, egyszerűen visszaadjuk a JSON-t.
    const data = nkpResources;

    // Cache frissítése
    cache.data = data;
    cache.timestamp = now;

    res.status(200).json(data);
  } catch (error) {
    console.error('Hiba az NKP adatok lekérésekor:', error);
    res.status(500).json({ error: 'Hiba az NKP adatok lekérésekor' });
  }
}