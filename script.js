const tg = window.Telegram.WebApp;
tg.expand();

let currentUser = null;
let companions = [];

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    currentUser = tg.initDataUnsafe?.user || {
        id: Math.floor(Math.random() * 1000000),
        first_name: 'Тестовый',
        last_name: 'Пользователь',
        language_code: 'ru'
    };
    
    displayUserInfo();
    setCurrentDate();
    loadCompanions();
    bindEvents();
    tg.ready();
}

function displayUserInfo() {
    document.getElementById('userName').textContent = 
        `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() || 'Пользователь';
    document.getElementById('userLanguage').textContent = 
        `Язык: ${currentUser.language_code || 'ru'}`;
    document.getElementById('userId').textContent = `ID: ${currentUser.id}`;
    
    const initials = ((currentUser.first_name?.[0] || '') + (currentUser.last_name?.[0] || '')).toUpperCase() || '👤';
    document.getElementById('userAvatar').textContent = initials;
}

function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('ru-RU', options);
}

function loadCompanions() {
    companions = getDemoCompanions();
    displayCompanions();
}

function getDemoCompanions() {
    return [
        {
            userName: 'Анна',
            destination: 'Турция',
            startDate: '2026-04-10',
            endDate: '2026-04-20',
            comment: 'Ищу компанию для отдыха в Анталии'
        },
        {
            userName: 'Михаил',
            destination: 'Таиланд',
            startDate: '2026-03-25',
            endDate: '2026-04-10',
            comment: 'Пхукет, дайвинг'
        },
        {
            userName: 'Елена',
            destination: 'ОАЭ',
            startDate: '2026-04-05',
            endDate: '2026-04-12',
            comment: 'Дубай, шопинг'
        }
    ];
}

function displayCompanions() {
    const container = document.getElementById('companionsContainer');
    const countSpan = document.getElementById('companionsCount');
    
    if (companions.length === 0) {
        container.innerHTML = '<p>Попутчиков пока нет</p>';
        countSpan.textContent = '0';
        return;
    }
    
    countSpan.textContent = companions.length;
    
    container.innerHTML = companions.map(comp => `
        <div class="companion-card">
            <div style="font-weight:600">${comp.userName}</div>
            <div style="margin:8px 0">${comp.destination}</div>
            <div style="font-size:13px; opacity:0.7">📅 ${comp.startDate} - ${comp.endDate}</div>
            ${comp.comment ? `<div style="margin-top:8px">💬 ${comp.comment}</div>` : ''}
        </div>
    `).join('');
}

function bindEvents() {
    document.querySelectorAll('.destination-card').forEach(card => {
        card.addEventListener('click', function() {
            document.getElementById('destinationSelect').value = this.dataset.country;
        });
    });
    
    document.getElementById('searchBtn').addEventListener('click', function() {
        const country = document.getElementById('countrySelect').value;
        if (country) {
            const filtered = companions.filter(c => c.destination === country);
            displayFilteredCompanions(filtered);
        } else {
            displayCompanions();
        }
    });
    
    document.getElementById('buddyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const destination = document.getElementById('destinationSelect').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const comment = document.getElementById('comment').value;
        
        if (!destination || !startDate || !endDate) {
            showMessage('Заполните все поля', 'error');
            return;
        }
        
        const newRequest = {
            userName: currentUser.first_name || 'Пользователь',
            destination: destination,
            startDate: startDate,
            endDate: endDate,
            comment: comment
        };
        
        companions.unshift(newRequest);
        displayCompanions();
        showMessage('Запрос добавлен!', 'success');
        e.target.reset();
    });
}

function displayFilteredCompanions(filtered) {
    const container = document.getElementById('companionsContainer');
    document.getElementById('companionsCount').textContent = filtered.length;
    
    if (filtered.length === 0) {
        container.innerHTML = '<p>Ничего не найдено</p>';
    } else {
        container.innerHTML = filtered.map(comp => `
            <div class="companion-card">
                <div style="font-weight:600">${comp.userName}</div>
                <div style="margin:8px 0">${comp.destination}</div>
                <div style="font-size:13px; opacity:0.7">📅 ${comp.startDate} - ${comp.endDate}</div>
                ${comp.comment ? `<div style="margin-top:8px">💬 ${comp.comment}</div>` : ''}
            </div>
        `).join('');
    }
}

function showMessage(text, type) {
    const msgDiv = document.getElementById('infoMessage');
    msgDiv.textContent = text;
    msgDiv.className = `info-message show ${type}`;
    setTimeout(() => msgDiv.classList.remove('show'), 3000);
}
