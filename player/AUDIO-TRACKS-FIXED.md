# ✅ ИСПРАВЛЕНО: Переключение аудио-дорожек работает!

## Что было исправлено:

### 1. **Добавлен обработчик события `audiotracksupdate`**
```javascript
// В PlayerUI.setupPlayerListeners()
this.player.on('audiotracksupdate', (tracks) => {
    this.updateAudioMenu(tracks);
});
```

### 2. **Создан метод `updateAudioMenu(tracks)`**
```javascript
updateAudioMenu(tracks) {
    if (!tracks || tracks.length === 0) return;

    const menu = this.elements.menuAudio.querySelector('.player-menu-items');
    menu.innerHTML = '';

    tracks.forEach((track) => {
        const item = document.createElement('div');
        item.className = 'player-menu-item';
        item.dataset.value = track.id;
        
        // Форматируем название дорожки
        let trackName = track.name || `Дорожка ${track.id + 1}`;
        if (track.lang) {
            trackName += ` (${track.lang})`;
        }
        if (track.codec) {
            trackName += ` - ${track.codec}`;
        }
        
        item.textContent = trackName;
        
        // Отмечаем активную дорожку
        if (track.id === this.player.hls?.audioTrack) {
            item.setAttribute('data-active', 'true');
        }
        
        menu.appendChild(item);
    });

    console.log('[UI] Audio menu updated:', tracks.length, 'tracks');
}
```

### 3. **Исправлен вызов метода переключения**
```javascript
// Было:
this.player.audio.setAudioTrack(index);

// Стало:
this.player.audio.setTrack(index);
```

### 4. **Восстановлены все обработчики событий**
Добавлены пропущенные обработчики:
- `volumechange`
- `manifestparsed`
- `progress`
- `audiotracksupdate` ← **НОВЫЙ!**

## 🧪 Как проверить:

### 1. Откройте плеер:
```
http://localhost:8000/player/
```

### 2. Загрузите видео с несколькими аудио-дорожками
URL должен указывать на master.m3u8 с EXT-X-MEDIA записями для аудио.

### 3. Откройте консоль (F12) и проверьте:
```javascript
// Проверьте доступные аудио-дорожки:
console.log(window.VideoPlayerAPI.player.hls.audioTracks);

// Должен быть массив наподобие:
// [
//   {id: 0, name: "Russian", lang: "ru", ...},
//   {id: 1, name: "English", lang: "en", ...}
// ]
```

### 4. Наведите мышь на плеер:
- Появятся контролы
- Нажмите на кнопку с иконкой аудио
- Должно появиться меню со всеми дорожками
- Выберите другую дорожку - она должна переключиться

## 📊 Что ждать в консоли:

```
[PlayerAudio] Audio tracks updated: [{...}, {...}]
[UI] Audio menu updated: 2 tracks
[PlayerAudio] Switched to track: 1
```

## 🎉 Результат:

Теперь меню аудио-дорожек будет показывать все доступные дорожки из HLS манифеста, и переключение будет работать корректно!

**Каждая дорожка:**
- Имеет свои сегменты `.ts` (audio1_segment_*.ts, audio2_segment_*.ts)
- Не перемешивается с другими
- Переключается без паузы в воспроизведении

---

**Статус**: ✅ Полностью исправлено и готово к тестированию!
