const username = 'porzuckerberg';
const repos = ['PZ_HealthBar', 'PZ_ScoreBoard', 'Sentiment-Analysis-AI-Model', 'Resume'];
const colors = { 
"Python": "#00bbff", 
"Lua": "#00ff8c", 
"HTML": "#e34c26", 
"CSS": "#9b74ff" ,
"JavaScript": "#f1e05a",
};

async function fetchRepoData(repoName) {
try {
    const [repoRes, langRes, releaseRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${username}/${repoName}`),
        fetch(`https://api.github.com/repos/${username}/${repoName}/languages`),
        fetch(`https://api.github.com/repos/${username}/${repoName}/releases/latest`)
    ]);

    const repoData = await repoRes.json();
    const langData = await langRes.json();
    const releaseData = releaseRes.ok ? await releaseRes.json() : null;

    createCard(repoData, langData, releaseData);
} catch (e) {
    console.error(`Error loading ${repoName}:`, e);
}
}

function createCard(repo, langs, release) {
const grid = document.getElementById('portfolio-grid');

// คำนวณภาษา
const totalSize = Object.values(langs).reduce((a, b) => a + b, 0);
let langBarHtml = '';
let langListHtml = '';

Object.entries(langs).forEach(([name, size]) => {
    const pct = ((size / totalSize) * 100).toFixed(1);
    const color = colors[name] || "#8b949e";
    langBarHtml += `<div style="width: ${pct}%; background-color: ${color}"></div>`;
    langListHtml += `
        <div class="lang-tag">
            <span class="dot" style="background-color:${color}"></span>
            ${name} <span style="color:var(--gray); margin-left:3px;">${pct}%</span>
        </div>`;
});

const card = document.createElement('div');
card.className = 'dashboard';
card.innerHTML = `
    <div class="header">
        <a href="${repo.html_url}" target="_blank" class="repo-title">${repo.name}</a>
        ${release ? '<span class="release-tag">Latest</span>' : ''}
    </div>
    <div class="description">${repo.description || "No description provided."}</div>
    
    <div class="release-box">
        <span>Release</span>
        <span style="color:var(--accent)">${release ? release.tag_name : 'v0.0.0 (None)'}</span>
    </div>

    <div class="progress-bar">${langBarHtml}</div>
    <div class="lang-list">${langListHtml}</div>

    <div class="footer-info">
        <span>License: ${repo.license ? repo.license.spdx_id : 'MIT'}</span>
        <span>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
    </div>
`;
grid.appendChild(card);
}

repos.forEach(fetchRepoData);