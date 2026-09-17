// ================= ฐานข้อมูลข่าว (เพิ่ม/แก้ไขข่าวตรงนี้) =================
const newsData = [
    {
        id: 1,
        title: "Next-Gen AI Models Revolutionize Daily Tech Workflows",
        category: "Technology",
        date: "3 SEP 2026",
        image: "https://picsum.photos/1200/600?random=10",
        summary: "Recent advancements in artificial intelligence are redefining how software engineers and creators build modern digital solutions globally.",
        content: `
            <p class="mb-4">Artificial intelligence has reached another milestone in 2026. The latest generative models are now integrated directly into developer environments, handling complex software architectures and automating quality control.</p>
            <p class="mb-4">Industry leaders report productivity gains of over 40%, allowing teams to focus on design thinking and innovation rather than repetitive coding. As these systems evolve, ethical considerations and robust oversight remain at the forefront of discussion among tech policymakers.</p>
        `
    },
    {
        id: 2,
        title: "Modern Lifestyle Trends: Balancing Digital Connectivity and Mindful Living",
        category: "Social & Lifestyle",
        date: "3 SEP 2026",
        image: "https://picsum.photos/1200/600?random=20",
        summary: "As remote work becomes standard, urban professionals are finding new ways to integrate wellness routines into their fast-paced daily schedules.",
        content: `
            <p class="mb-4">With flexible working environments fully established in 2026, the boundary between professional output and personal rest has become crucial.</p>
            <p class="mb-4">Many professionals are turning to digital detoxes, structured outdoor activities, and minimalist living habits to combat burnout.</p>
        `
    },
    {
        id: 3,
        title: "Breakthrough Study Highlights the Essential Roles of Sleep Hygiene",
        category: "Health & Wellness",
        date: "2 SEP 2026",
        image: "https://picsum.photos/1200/600?random=30",
        summary: "Medical researchers publish findings showing direct correlations between structured evening habits and long-term cognitive function.",
        content: `
            <p class="mb-4">A landmark study released this week underscores the profound impact of consistent sleep schedules on long-term health.</p>
        `
    },
    {
        id: 4,
        title: "Global Box Office Hits Record Highs with Immersive Cinema Formats",
        category: "Entertainment",
        date: "2 SEP 2026",
        image: "https://picsum.photos/1200/600?random=40",
        summary: "The entertainment industry experiences unprecedented growth as audiences flock to interactive and high-definition theatrical releases.",
        content: `
            <p class="mb-4">Cinema attendance has surged to new heights this season, fueled by next-generation interactive audio and visual technologies.</p>
        `
    },
    {
        id: 5,
        title: "Higher Education Institutions Pivot Towards Flexible Micro-Credentials",
        category: "Education",
        date: "1 SEP 2026",
        image: "https://picsum.photos/1200/600?random=50",
        summary: "Universities around the world are updating curricula to offer specialized certifications tailored for rapidly evolving market needs.",
        content: `
            <p class="mb-4">Educational institutions are rapidly adapting to the needs of the modern workforce.</p>
        `
    }
];

// ================= ระบบประมวลผลเว็บไซต์ =================

// 1. ฟังก์ชันแสดงรายการข่าว
function renderNews(data) {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    if(data.length === 0) {
        container.innerHTML = `<p class="text-gray-500 italic py-8">No articles found matching your criteria.</p>`;
        return;
    }

    data.forEach(item => {
        const article = `
            <article class="flex flex-col md:flex-row gap-4 border-b border-gray-800 pb-6 group cursor-pointer" onclick="openArticlePage(${item.id})">
                <img src="${item.image}" alt="News Image" class="w-full md:w-48 h-32 object-cover rounded group-hover:opacity-80 transition">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="bg-amber-500 text-black text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm">${item.category}</span>
                        <span class="text-xs text-gray-500">${item.date}</span>
                    </div>
                    <h3 class="serif-title text-xl font-bold text-gray-100 group-hover:text-amber-400 mb-2 transition">${item.title}</h3>
                    <p class="serif-body text-sm text-gray-400 leading-relaxed mb-2">${item.summary}</p>
                    <span class="text-xs text-amber-400 font-semibold group-hover:underline">Read Full Story &rarr;</span>
                </div>
            </article>
        `;
        container.innerHTML += article;
    });
}

// 2. ฟังก์ชันเปิดอ่านข่าวเต็มจอ
function openArticlePage(newsId) {
    const news = newsData.find(item => item.id === newsId);
    if (!news) return;

    const articleContent = document.getElementById('article-content');
    articleContent.innerHTML = `
        <div class="flex items-center gap-2 mb-4">
            <span class="bg-amber-500 text-black text-xs font-bold uppercase px-2 py-1 rounded-sm">${news.category}</span>
            <span class="text-xs text-gray-400">${news.date}</span>
        </div>
        <h1 class="serif-title text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">${news.title}</h1>
        <img src="${news.image}" alt="News Banner" class="w-full h-72 md:h-96 object-cover rounded-lg mb-8 shadow-xl">
        <div class="serif-body text-gray-300 text-lg leading-relaxed space-y-6">
            ${news.content}
        </div>
    `;

    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('article-view').classList.remove('hidden');
    window.scrollTo(0, 0);
}

// 3. ฟังก์ชันปิดข่าวกลับไปหน้าหลัก
function closeArticlePage() {
    document.getElementById('article-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
    window.scrollTo(0, 0);
}

// 4. ฟังก์ชันกรองหมวดหมู่
function filterNews(category) {
    document.getElementById('current-category').innerText = category === 'ALL' ? 'Latest Stories' : category;
    if (category === 'ALL') {
        renderNews(newsData);
    } else {
        const filtered = newsData.filter(news => news.category === category);
        renderNews(filtered);
    }
}

// 5. ฟังก์ชันค้นหาข่าว
function searchNews() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = newsData.filter(news => 
        news.title.toLowerCase().includes(query) || 
        news.summary.toLowerCase().includes(query)
    );
    renderNews(filtered);
}

// โหลดข่าวครั้งแรกเมื่อเข้าเว็บ
renderNews(newsData);
