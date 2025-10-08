
// Lista az összes NKP PDF URL-ről és metaadatokról
const nkpResources = [
  { id: 1, title: "Magyar nyelv - 5. évfolyam", type: "tankonyv", grade: 5, url: "https://www.nkp.hu/api/media/file/5oszt_mny.pdf" },
  { id: 2, title: "Matematika - 5. évfolyam", type: "tankonyv", grade: 5, url: "https://www.nkp.hu/api/media/file/5oszt_matek.pdf" },
  { id: 3, title: "Történelem - 5. évfolyam", type: "tankonyv", grade: 5, url: "https://www.nkp.hu/api/media/file/5oszt_tortenelem.pdf" },
  { id: 4, title: "Magyar nyelv - 6. évfolyam", type: "tankonyv", grade: 6, url: "https://www.nkp.hu/api/media/file/6oszt_mny.pdf" },
  { id: 5, title: "Matematika - 6. évfolyam", type: "tankonyv", grade: 6, url: "https://www.nkp.hu/api/media/file/6oszt_matek.pdf" },
  { id: 6, title: "Magyar nyelv - 7. évfolyam", type: "tankonyv", grade: 7, url: "https://www.nkp.hu/api/media/file/7oszt_mny.pdf" },
  { id: 7, title: "Matematika - 7. évfolyam", type: "tankonyv", grade: 7, url: "https://www.nkp.hu/api/media/file/7oszt_matek.pdf" }
];

let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 1000 * 60 * 60; // 1 óra

export default function handler(req, res) {
  const now = Date.now();

  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return res.status(200).json(cache.data);
  }

  // 5. osztályos tankönyvek előre
  const sortedData = nkpResources.sort((a, b) => {
    if (a.grade === 5 && b.grade !== 5) return -1;
    if (b.grade === 5 && a.grade !== 5) return 1;
    return 0;
  });

  cache.data = sortedData;
  cache.timestamp = now;

  res.status(200).json(sortedData);
}
