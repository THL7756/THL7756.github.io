document.addEventListener('DOMContentLoaded', () => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    initNonOverlappingBG(); // 升级版：防重叠背景
    initEasterEgg();
    initScrollEvents();
});

// 1. 防重叠背景算法 (要求4修复)
function initNonOverlappingBG() {
    const container = document.getElementById('bg-system');
    const icons = ['fa-gamepad', 'fa-ghost', 'fa-dragon', 'fa-dice-d20', 'fa-shield-halved', 'fa-gem', 'fa-crown', 'fa-sword', 'fa-headset', 'fa-bomb', 'fa-robot'];
    
    // 虚拟网格系统：将屏幕分为 7x7
    const rows = 7;
    const cols = 7;
    const cells = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // 避开中心 3x3 区域 (标题所在位置)
            if (!(r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
                cells.push({ r, c });
            }
        }
    }

    // 随机洗牌格子
    const shuffled = cells.sort(() => 0.5 - Math.random());
    
    // 在每个选中的格子中随机微调坐标并放置图标
    shuffled.slice(0, 15).forEach((cell, i) => {
        const icon = document.createElement('i');
        icon.className = `fas ${icons[i % icons.length]} decor-icon`;
        
        // 计算百分比位置并加入格内随机偏移
        const left = (cell.c * (100 / cols)) + (Math.random() * 8 + 2);
        const top = (cell.r * (100 / rows)) + (Math.random() * 8 + 2);

        icon.style.left = left + "%";
        icon.style.top = top + "%";
        icon.style.animationDelay = (Math.random() * 5) + "s";
        container.appendChild(icon);
    });
}

// 2. 彩蛋进化
function initEasterEgg() {
    let input = "";
    const hp = document.getElementById('hp-fill');
    const lv = document.getElementById('lv-num');
    const toast = document.getElementById('egg-toast');

    window.addEventListener('keydown', (e) => {
        input += e.key.toLowerCase();
        if (input.length > 10) input = input.slice(-4);

        if (input.includes("game")) {
            hp.style.width = "100%";
            hp.style.background = "#00ff00";
            hp.style.boxShadow = "0 0 20px #00ff00";
            
            let start = 1;
            const timer = setInterval(() => {
                start += 3;
                if (start >= 100) {
                    lv.innerText = "100";
                    clearInterval(timer);
                } else {
                    lv.innerText = start;
                }
            }, 30);

            toast.classList.add('active');
            setTimeout(() => toast.classList.remove('active'), 4000);
            input = "";
        }
    });
}

// 3. 页面切换
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    
    const links = document.querySelectorAll('.nav-link');
    links.forEach(l => {
        if(l.getAttribute('onclick').includes(id)) l.classList.add('active');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. 滚动监听
function initScrollEvents() {
    const btn = document.getElementById('totop');
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 500 ? "flex" : "none";
    });
}