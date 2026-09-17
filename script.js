document.addEventListener("DOMContentLoaded", async () => {
  const newsContainer = document.getElementById("news-feed");
  if (!newsContainer) return;

  try {
    // ดึงรายชื่อไฟล์จาก GitHub API ของ Repository คุณโดยตรง
    const response = await fetch("https://api.github.com/repos/jeen32082/spill-z/contents/content/news");
    if (!response.ok) throw new Error("Cannot fetch news files");

    const files = await response.json();
    if (!Array.isArray(files) || files.length === 0) {
      newsContainer.innerHTML = `<p class="text-gray-500">ยังไม่มีบทความข่าวในระบบ</p>`;
      return;
    }

    // วนลูปดึงเนื้อหาแต่ละไฟล์ .md ที่ Decap CMS สร้างไว้
    let htmlContent = "";
    for (const file of files.reverse()) { // เอาข่าวล่าสุดขึ้นก่อน
      if (file.name.endsWith(".md")) {
        const fileRes = await fetch(file.download_url);
        const markdownText = await fileRes.text();

        // แยก Front Matter (ข้อมูลหัวเรื่อง วันที่ หมวดหมู่) ออกมาจากเนื้อหา Markdown
        const parts = markdownText.split("---");
        if (parts.length >= 3) {
          const frontMatter = parts[1];
          const getVal = (key) => {
            const match = frontMatter.match(new RegExp(`${key}:\\s*(.+)`));
            return match ? match[1].replace(/["']/g, "").trim() : "";
          };

          const title = getVal("title");
          const date = getVal("date");
          const category = getVal("category");
          const summary = getVal("summary");
          const image = getVal("image");

          htmlContent += `
            <article class="bg-[#181818] p-6 border border-gray-800 rounded flex flex-col md:flex-row gap-6">
              ${image ? `<img src="${image}" alt="${title}" class="w-full md:w-48 h-32 object-cover rounded">` : ''}
              <div>
                <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">${category || 'News'}</span>
                <h3 class="text-xl font-bold text-white mt-1 hover:text-amber-400 cursor-pointer transition">${title}</h3>
                <p class="text-gray-400 text-sm mt-2">${summary || ''}</p>
                <span class="text-xs text-gray-500 mt-4 block">${date ? new Date(date).toLocaleDateString() : ''}</span>
              </div>
            </article>
          `;
        }
      }
    }

    newsContainer.innerHTML = htmlContent || `<p class="text-gray-500">ยังไม่มีบทความข่าวในระบบ</p>`;

  } catch (error) {
    console.error("Error loading news:", error);
    newsContainer.innerHTML = `<p class="text-gray-500">กำลังโหลดข้อมูลข่าว...</p>`;
  }
});
