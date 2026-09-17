document.addEventListener("DOMContentLoaded", async () => {
  const newsContainer = document.getElementById("news-feed");
  if (!newsContainer) return;

  try {
    const response = await fetch("/content/news.json?v=" + new Date().getTime());
    if (!response.ok) throw new Error("Could not load news");
    
    const data = await response.json();
    console.log("Raw JSON Data:", data); // เช็คข้อมูลใน Console (F12)

    // รองรับทุกรูปแบบโครงสร้างที่ Decap CMS อาจจะบันทึก
    let newsList = [];
    if (Array.isArray(data)) {
      newsList = data;
    } else if (data.newsData && Array.isArray(data.newsData)) {
      newsList = data.newsData;
    } else {
      // วนหา property แรกที่เป็น Array ใน object ถ้าเจอให้ดึงมาใช้
      const foundKey = Object.keys(data).find(key => Array.isArray(data[key]));
      if (foundKey) {
        newsList = data[foundKey];
      }
    }

    if (newsList.length === 0) {
      newsContainer.innerHTML = `<p class="text-gray-500">ยังไม่มีบทความข่าวในระบบ</p>`;
      return;
    }

    newsContainer.innerHTML = newsList.map(item => `
      <article class="bg-[#181818] p-6 border border-gray-800 rounded flex flex-col md:flex-row gap-6">
        ${item.image ? `<img src="${item.image}" alt="${item.title || 'News Image'}" class="w-full md:w-48 h-32 object-cover rounded">` : ''}
        <div>
          <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">${item.category || 'News'}</span>
          <h3 class="text-xl font-bold text-white mt-1">${item.title || 'ไม่มีหัวข้อข่าว'}</h3>
          <p class="text-gray-400 text-sm mt-2">${item.summary || item.text || ''}</p>
          <span class="text-xs text-gray-500 mt-4 block">${item.date ? new Date(item.date).toLocaleDateString() : ''}</span>
        </div>
      </article>
    `).join("");

  } catch (error) {
    console.error("Error loading news:", error);
    newsContainer.innerHTML = `<p class="text-gray-500">ไม่สามารถโหลดข้อมูลข่าวได้ในขณะนี้</p>`;
  }
});
