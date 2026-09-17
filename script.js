console.log("Script.js is loaded successfully!");

async function loadNews() {
  const newsContainer = document.getElementById("news-feed");
  if (!newsContainer) return;

  try {
    const res = await fetch("/content/news.json?v=" + Date.now());
    if (!res.ok) throw new Error("Load failed");
    
    const data = await res.json();
    console.log("News Data Loaded:", data);

    const newsList = data.newsData || [];

    if (newsList.length === 0) {
      newsContainer.innerHTML = `<p class="text-gray-500">ยังไม่มีบทความข่าวในระบบ</p>`;
      return;
    }

    newsContainer.innerHTML = newsList.map(item => `
      <article class="bg-[#181818] p-6 border border-gray-800 rounded flex flex-col md:flex-row gap-6">
        ${item.image ? `<img src="${item.image}" alt="${item.title || 'News'}" class="w-full md:w-48 h-32 object-cover rounded">` : ''}
        <div>
          <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">${item.category || 'News'}</span>
          <h3 class="text-xl font-bold text-white mt-1">${item.title || 'ไม่มีหัวข้อ'}</h3>
          <p class="text-gray-400 text-sm mt-2">${item.summary || ''}</p>
          <span class="text-xs text-gray-500 mt-4 block">${item.date ? new Date(item.date).toLocaleDateString() : ''}</span>
        </div>
      </article>
    `).join("");

  } catch (err) {
    console.error("Error:", err);
    newsContainer.innerHTML = `<p class="text-gray-500">ไม่สามารถโหลดข้อมูลข่าวได้</p>`;
  }
}

loadNews();
