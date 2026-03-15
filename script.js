const tg = window.Telegram.WebApp;
tg.expand();

let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    initApp();
    loadPageContent();
});

function initApp() {
    currentUser = tg.initDataUnsafe?.user || {
        id: Math.floor(Math.random() * 1000000),
        first_name: 'Гость',
        language_code: 'ru'
    };
    
    const userNameEl = document.getElementById('userName');
    if (userNameEl) {
        userNameEl.textContent = currentUser.first_name || 'Гость';
    }
    
    tg.ready();
}

function navigateTo(url) {
    window.location.href = url;
}

function loadPageContent() {
    const path = window.location.pathname.split('/').pop();
    
    if (path === 'crimea.html') {
        loadCrimeaPage();
    } else if (path === 'yalta.html') {
        loadYaltaPage();
    } else if (path === 'route-aypetri.html') {
        loadRoutePage();
    } else if (path === 'index.html' || path === '') {
        loadMainPage();
    }
}

function loadMainPage() {
    const weatherWidget = document.getElementById('weatherWidget');
    if (weatherWidget) {
        weatherWidget.innerHTML = `
            <div class="weather-item">
                <div>Ялта</div>
                <div class="weather-temp">+16°</div>
            </div>
            <div class="weather-item">
                <div>Севастополь</div>
                <div class="weather-temp">+14°</div>
            </div>
            <div class="weather-item">
                <div>Балаклава</div>
                <div class="weather-temp">+15°</div>
            </div>
        `;
    }
}

function loadYaltaPage() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function() {
            const map = new ymaps.Map('yaltaMap', {
                center: [44.4952, 34.1667],
                zoom: 13
            });
            
            // Отели
            new ymaps.Placemark([44.4965, 34.1675], {
                balloonContent: 'Ялта-Интурист ⭐⭐⭐⭐'
            }).addToMap(map);
            
            new ymaps.Placemark([44.4970, 34.1660], {
                balloonContent: 'Ореанда ⭐⭐⭐'
            }).addToMap(map);
            
            // Достопримечательности
            new ymaps.Placemark([44.4307, 34.1284], {
                balloonContent: 'Ласточкино гнездо'
            }, {
                preset: 'islands#blueStretchyIcon'
            }).addToMap(map);
        });
    }
    
    // Загружаем отели
    const hotelsList = document.getElementById('hotelsList');
    if (hotelsList) {
        hotelsList.innerHTML = `
            <div class="hotel-card">
                <img src="https://source.unsplash.com/400x300/?hotel" class="hotel-image">
                <div class="hotel-info">
                    <h3>Ялта-Интурист</h3>
                    <div>⭐⭐⭐⭐</div>
                    <div>📍 50м до моря</div>
                </div>
                <div class="hotel-price"><span>4500₽</span>/ночь</div>
            </div>
            <div class="hotel-card">
                <img src="https://source.unsplash.com/400x300/?resort" class="hotel-image">
                <div class="hotel-info">
                    <h3>Ореанда</h3>
                    <div>⭐⭐⭐</div>
                    <div>📍 100м до моря</div>
                </div>
                <div class="hotel-price"><span>3200₽</span>/ночь</div>
            </div>
        `;
    }
}

function loadRoutePage() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function() {
            const map = new ymaps.Map('routeMap', {
                center: [44.45, 34.1],
                zoom: 10
            });
            
            const points = [
                [44.4952, 34.1667],
                [44.4307, 34.1284],
                [44.4567, 34.0567],
                [44.4500, 34.0500]
            ];
            
            const routeLine = new ymaps.Polyline(points, {}, {
                strokeColor: '#FFD700',
                strokeWidth: 4
            });
            map.geoObjects.add(routeLine);
            
            points.forEach((point, i) => {
                new ymaps.Placemark(point, {}, {
                    preset: i === 0 ? 'islands#greenDotIcon' : 
                             i === 3 ? 'islands#redDotIcon' : 'islands#blueDotIcon'
                }).addToMap(map);
            });
        });
    }
}

function showOnMap(lat, lon) {
    alert(`Открываю карту: ${lat}, ${lon}`);
}

function bookRental() {
    alert('Заявка отправлена! Скоро с вами свяжутся');
}

function applyFilters() {
    alert('Фильтры применены');
}

window.navigateTo = navigateTo;
window.showOnMap = showOnMap;
window.bookRental = bookRental;
window.applyFilters = applyFilters;
