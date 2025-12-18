# 🎬 Films API - Автоматическая загрузка данных о фильмах

## ✅ Создан: `films-api.php`

Автоматически загружает **всю информацию о фильмах** из системы управления контентом.

---

## 📊 **Что загружается:**

Для каждого фильма API получает:

### 1. **Основная информация**
- ✅ **ID** - ID фильма в системе
- ✅ **Название** - Название фильма
- ✅ **Год** - Год выпуска
- ✅ **Продолжительность** - В минутах
- ✅ **Рейтинг** - От 0 до 10
- ✅ **Возрастное ограничение** - 6+, 12+, 16+, 18+
- ✅ **Страна** - Страна производства

### 2. **Медиа контент**
- ✅ **Логотип** - `http://ant-tv.ddns.net:2223/img/logos/221.jpg`
- ✅ **Баннер** - `http://ant-tv.ddns.net:2223/img/banners/221.jpg`
- ✅ **Ссылка на поток** - URL к master.m3u8
- ✅ **Ссылка на трейлер** - URL к трейлеру

### 3. **Описание**
- ✅ **Описание** - Полное описание фильма

---

## 🔧 **Использование:**

### 1. Получить все фильмы:
```
http://localhost:8000/player/films-api.php?action=all
```

**Ответ:**
```json
[
  {
    "id": 221,
    "logo": "http://ant-tv.ddns.net:2223/img/logos/221.jpg",
    "banner": "http://ant-tv.ddns.net:2223/img/banners/221.jpg",
    "title": "Адреналин",
    "year": "2006",
    "duration": "88",
    "rating": "7.3",
    "age": "18+",
    "country": "США",
    "description": "Профессиональный киллер...",
    "streamUrl": "http://ant-tv.ddns.net/vod/hls/.../master.m3u8",
    "trailerUrl": "http://ant-tv.ddns.net/vod/hls/.../trailer.m3u8"
  },
  ...
]
```

### 2. Получить один фильм:
```
http://localhost:8000/player/films-api.php?action=get&id=221
```

---

## 📝 **Обновление diagnostic.html:**

Замените статический массив `movies` на динамическую загрузку:

```javascript
let movies = [];

// Загрузить фильмы из API
async function loadMovies() {
    try {
        const response = await fetch('films-api.php?action=all');
        const data = await response.json();
        
        movies = data.map(film => ({
            title: film.title,
            url: film.streamUrl,
            poster: film.logo,  // Используем логотип как постер
            emoji: getEmojiForFilm(film.title),  // Fallback эмодзи
            year: film.year,
            description: film.description,
            rating: film.rating,
            duration: film.duration
        }));
        
        renderMovies();
        log(`✅ Загружено ${movies.length} фильмов из API`, 'success');
    } catch (error) {
        log(`❌ Ошибка загрузки фильмов: ${error.message}`, 'error');
        // Fallback к статическим данным
        loadStaticMovies();
    }
}

function getEmojiForFilm(title) {
    const emojiMap = {
        'Балерина': '🩰',
        'Аргайл': '🕵️',
        'Апгрейд': '🤖',
        'Анна': '🔫',
        'Али': '🚗',
        'Адреналин': '⚡'
    };
    
    for (let key in emojiMap) {
        if (title.includes(key)) return emojiMap[key];
    }
    return '🎬';
}

// Обновить init()
async function init() {
    initPlayer();
    await loadMovies();  // Загружаем фильмы из API
    log('🎬 Плеер готов!', 'success');
}
```

---

## 🎨 **Отображение карточек с полной информацией:**

```javascript
function renderMovies() {
    const grid = document.getElementById('movies-grid');
    grid.innerHTML = '';  // Очистить
    
    movies.forEach((movie, index) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.onclick = () => loadMovie(index);
        
        // Используем реальный логотип
        const posterStyle = movie.poster ? 
            `background-image: url('${movie.poster}');` : '';
        
        card.innerHTML = `
            <div class="movie-poster" style="${posterStyle}">
                ${!movie.poster ? movie.emoji : ''}
            </div>
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-meta">
                    ${movie.year ? `<span>📅 ${movie.year}</span>` : ''}
                    ${movie.rating ? `<span>⭐ ${movie.rating}</span>` : ''}
                    ${movie.duration ? `<span>⏱ ${movie.duration} мин</span>` : ''}
                </div>
                ${movie.description ? 
                    `<div class="movie-description">${movie.description.substring(0, 100)}...</div>` 
                    : ''}
            </div>
        `;
        
        // Обработка ошибок загрузки изображения
        if (movie.poster) {
            const img = new Image();
            img.onerror = () => {
                const poster = card.querySelector('.movie-poster');
                poster.style.backgroundImage = '';
                poster.textContent = movie.emoji;
            };
            img.src = movie.poster;
        }
        
        grid.appendChild(card);
    });
}
```

---

## 🔄 **Автоматическое обновление:**

API парсит страницы из системы управления в реальном времени:

1. **Запрос** → `http://ant-tv.ddns.net:2223/content?page=edit_film&id=221`
2. **Парсинг** → Извлечение всех полей
3. **Ответ** → JSON с данными

---

## 📋 **ID фильмов по умолчанию:**

```php
$filmIds = [221, 222, 223, 224, 225, 226];
```

Отредактируйте `films-api.php` для добавления новых ID.

---

## ✅ **Преимущества:**

- ✅ Автоматическая синхронизация с системой управления
- ✅ Реальные логотипы и баннеры
- ✅ Полная информация о фильмах
- ✅ Не нужно вручную обновлять данные
- ✅ Единый источник правды

---

**API готов к использованию!** 🚀

**Протестируйте:**
```
http://localhost:8000/player/films-api.php?action=all
```
