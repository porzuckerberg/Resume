lucide.createIcons();

const overlay = document.getElementById('overlay');
const frame = document.getElementById('projectFrame');
const closeBtn = document.getElementById('closeBtn');
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.onclick = () => {
        const url = card.getAttribute('data-url');
        frame.src = url;
        overlay.style.display = 'flex';
    };
});

closeBtn.onclick = () => {
    overlay.style.display = 'none';
    frame.src = "";
};

const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

function navigateToPage() {
    let hash = window.location.hash.replace('#', '') || 'resume';
    const targetId = hash + '-page';
    const targetPage = document.getElementById(targetId);

    if (targetPage) {
        pages.forEach(p => p.classList.remove('active'));
        targetPage.classList.add('active');

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
            }
        });
    }
}

navItems.forEach(item => {
    item.onclick = () => {
        const target = item.getAttribute('data-target');
        window.location.hash = target.replace('-page', ''); 
    };
});

window.addEventListener('hashchange', navigateToPage);
window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) { window.location.hash = 'resume'; }
    navigateToPage();
});

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            card.style.display = (filter === 'all' || card.getAttribute('data-cat') === filter) ? 'flex' : 'none';
        });
    };
});

document.querySelectorAll('#project-page .res-item-wrapper').forEach(card => { card.onclick = () => { const url = card.getAttribute('data-url'); if(url) window.open(url, '_blank'); }; card.style.cursor = 'pointer'; });