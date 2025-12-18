# 🎬 ДОБАВЛЕНА ПОДДЕРЖКА КАЧЕСТВА И СУБТИТРОВ

## ✅ Добавлено:

### 1. Переключение качества видео (360p, 480p, 720p, 1080p+)

**Автоматическое определение:**
```javascript
// HLS.js автоматически парсит все доступные уровни качества
// Меню качества обновляется автоматически при загрузке манифеста
```

**Ручное переключение:**
- Кнопка "Auto" в плеере
- Выпадающее меню со всеми уровнями
- Адаптивный битрейт (ABR) по умолчанию

### 2. Поддержка субтитров

**Форматы:**
- ✅ WebVTT (.vtt)
- ✅ SRT (конвертируется в VTT)
- ✅ Встроенные в HLS (text tracks)

**Функции:**
- Автообнаружение субтитров из HLS
- Переключение языков
- Вкл/Выкл субтитров
- Стилизация субтитров

### 3. Аудиодорожки

**Уже работает:**
- ✅ Автообнаружение дорожек из HLS
- ✅ Переключение между дорожками
- ✅ Отображение кодека (AAC, AC3, Opus)
- ✅ Отображение языка

## 🔧 Как использовать:

### Формат HLS манифеста с субтитрами:

```m3u8
#EXTM3U
#EXT-X-VERSION:3

# Уровни качества
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
360p/playlist.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480
480p/playlist.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720
720p/playlist.m3u8

# Субтитры
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="Russian",DEFAULT=YES,AUTOSELECT=YES,FORCED=NO,LANGUAGE="ru",URI="subtitles/ru.m3u8"
#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="English",DEFAULT=NO,AUTOSELECT=NO,FORCED=NO,LANGUAGE="en",URI="subtitles/en.m3u8"

# Аудиодорожки
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="Russian",DEFAULT=YES,AUTOSELECT=YES,LANGUAGE="ru",URI="audio/ru.m3u8"
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="English",DEFAULT=NO,AUTOSELECT=NO,LANGUAGE="en",URI="audio/en.m3u8"
```

### Пример использования в API:

```javascript
// Получить доступные качества
const qualities = VideoPlayerAPI.player.state.availableQualities;
console.log(qualities); // [{index: 0, height: 360, label: "360p"}, ...]

// Установить качество
VideoPlayerAPI.setQuality(2); // 720p

// Получить аудиодорожки
const audioTracks = VideoPlayerAPI.player.audio.tracks;
console.log(audioTracks); // [{id: 0, name: "Russian", codec: "AAC"}, ...]

// Переключить аудиодорожку
VideoPlayerAPI.player.audio.setTrack(1);

// Субтитры (встроенные в HTML5)
const textTracks = VideoPlayerAPI.player.video.textTracks;
// Включить первые субтитры
if (textTracks.length > 0) {
    textTracks[0].mode = 'showing';
}
```

## 📝 Текущий статус:

### ✅ Работает из коробки:
- Автоматическое определение качества из HLS
- Переключение качества (360p/480p/720p/1080p+)
- Адаптивный битрейт (Auto)
- Аудиодорожки с HLS
- Субтитры через HTML5 текстовые треки

### 🔄 Требует настройки HLS манифеста:
- Субтитры должны быть указаны в master.m3u8
- Аудиодорожки должны быть в отдельных плейлистах
- Все пути должны быть относительными или доступными через прокси

## 🎯 Рекомендации:

### Для вашего случая (ant-tv.ddns.net):

Если у вас есть папки:
```
/profile_1_360p/
/profile_2_480p/
/profile_3_720p/
/subtitles/
```

Создайте master.m3u8:
```m3u8
#EXTM3U
#EXT-X-VERSION:3

#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
profile_1_360p/playlist.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480
profile_2_480p/playlist.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720
profile_3_720p/playlist.m3u8

#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",NAME="Russian",LANGUAGE="ru",URI="subtitles/ru.vtt"
```

Затем загрузите master.m3u8 в плеер:
```
http://ant-tv.ddns.net:2223/.../master.m3u8
```

---

**Дата обновления:** 2025-11-27  
**Версия:** 3.0 - Quality & Subtitles Support
