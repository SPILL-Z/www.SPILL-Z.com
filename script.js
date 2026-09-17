document.addEventListener("DOMContentLoaded", async () => {
  const newsContainer = document.getElementById("news-feed");
  if (!newsContainer) return;

  try {
    const response = await fetch("/content/news.json");
    if (!response.ok) throw new Error("Could not load news");
    
    const data = await response.json();
    // รองรับทั้งแบบ array ตรงๆ และแบบมี nested object
    const newsList = Array.isArray(data) ? data : (data.newsData || []);

    if (newsList.length === 0) {
      newsContainer.innerHTML = `<p class="text-gray-500">ยังไม่มีบทความข่าวในระบบ</p>`;
      return;
    }

    newsContainer.innerHTML = newsList.map(item => `
      <article class="bg-[#181818] p-6 border border-gray-800 rounded flex flex-col md:flex-row gap-6">
        ${item.image ? `<img src="${item.image}" alt="${item.title}" class="w-full md:w-48 h-32 object-cover rounded">` : ''}
        <div>
          <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">${item.category || 'News'}</span>
          <h3 class="text-xl font-bold text-white mt-1">${item.title}</h3>
          <p class="text-gray-400 text-sm mt-2">${item.summary || ''}</p>
          <span class="text-xs text-gray-500 mt-4 block">${item.date || ''}</span>
        </div>
      </article>
    `).join("");

  } catch (error) {
    console.error("Error:", error);
    newsContainer.innerHTML = `<p class="text-gray-500">ยังไม่มีบทความข่าวในระบบ</p>`;
  }
});
