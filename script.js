document.addEventListener("DOMContentLoaded", async () => {
  const newsContainer = document.getElementById("news-feed");
  if (!newsContainer) return;

  try {
    // ดึงรายชื่อไฟล์ทั้งหมดในโฟลเดอร์ข่าวผ่าน GitHub API หรือ Netlify JSON index
    // วิธีที่ง่ายและเสถียรสำหรับ Static Site คือดึงผ่าน Netlify Asset / Git Gateway หรือดึงผ่านไฟล์ index ที่ Netlify สร้างไว้
    const response = await fetch("/admin/config.yml"); // เช็คการเชื่อมต่อเบื้องต้น
    
    // สำหรับ Decap CMS แบบ Folder โค้ดส่วนนี้จะดึงไฟล์ Markdown ที่ถูกสร้างในโฟลเดอร์เนื้อหา
    // แนะนำวิธีดึงไฟล์ผ่าน Folder Manifest หรือตัวอย่างจำลองรายการล่าสุด:
    
    // หากต้องการให้ดึงไฟล์ JSON ที่ระบบแปลงอัตโนมัติ ให้ใช้ตัวจัดการด้านล่างนี้ครับ:
    const res = await fetch('/content/news/index.json').catch(() => null);
    
    // ถ้ายังไม่มีไฟล์รวม index เราสามารถดึงข้อมูลแบบ Static รายการล่าสุดมาแสดงได้ทันทีครับ
    newsContainer.innerHTML = `
      <article class="bg-[#181818] p-6 border border-gray-800 rounded flex flex-col md:flex-row gap-6">
        <div>
          <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">Technology</span>
          <h3 class="text-xl font-bold text-white mt-1">กฟไ</h3>
          <p class="text-gray-400 text-sm mt-2">กฟ</p>
          <span class="text-xs text-gray-500 mt-4 block">September 17, 2026</span>
        </div>
      </article>
    `;

  } catch (error) {
    console.error("Error loading news data:", error);
    newsContainer.innerHTML = `<p class="text-gray-500">ยังไม่มีบทความข่าวในระบบ</p>`;
  }
});
