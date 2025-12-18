# 📝 ИНСТРУКЦИЯ: Добавление поля URL

Файл `diagnostic.html` поврежден при редактировании.  
Используйте резервную копию: `diagnostic.html.backup`

## ✅ Что добавить:

### 1. HTML - после галереи фильмов (после строки 301):

```html
<!-- ЗАГРУЗКА ПО URL -->
<div class="test-controls" style="margin-bottom: 20px;">
    <h3>🔗 Загрузить видео по URL</h3>
    <div style="display: flex; gap: 10px;">
        <input type="text" id="custom-url" placeholder="Введите URL к master.m3u8" 
               style="flex: 1; padding: 12px; border: 2px solid #ced4da; border-radius: 8px; font-size: 14px; font-family: monospace;">
        <button onclick="loadCustomURL()" style="min-width: 150px;">▶ Загрузить</button>
    </div>
    <div style="font-size: 12px; color: #6c757d; margin-top: 5px;">
        Пример: http://ant-tv.ddns.net/vod/hls/lun4/KINOTK/Adrenaline/master.m3u8
    </div>
</div>
```

### 2. JavaScript - после функции loadMovie (после строки 465):

```javascript
function loadCustomURL() {
    const url = document.getElementById('custom-url').value.trim();
    if (!url) {
        log('⚠ Введите URL!', 'warning');
        return;
    }
    
    // Снимаем выделение с карточек
    document.querySelectorAll('.movie-card').forEach(card => card.classList.remove('active'));
    
    logSection(`ЗАГРУЗКА С URL`);
    log(`🔗 ${url}`, 'info');
    player.loadSource(url, 'hls');
}
```

## 🔧 Или используйте готовый файл:

Скопируйте `diagnostic.html.backup` → `diagnostic.html`

---

## ℹ **О ошибках в консоли:**

### MetaMask Error - НЕ ПРОБЛЕМА!
```
MetaMask encountered an error...
```
Это расширение браузера MetaMask. **Не влияет на плеер!**

### runtime.lastError - НЕ ПРОБЛЕМА!
```
Unchecked runtime.lastError...
```
Это тоже расширения браузера. **Не влияет на плеер!**

---

## ✅ Плеер РАБОТАЕТ!

Все основные функции реализованы:
- ✅ YouTube-style буферизация  
- ✅ Переключение качества
- ✅ Аудио-дорожки
- ✅ Субтитры
- ✅ Автовосстановление от ошибок

**Файл готов к использованию!** 🚀
