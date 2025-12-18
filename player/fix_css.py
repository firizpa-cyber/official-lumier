# -*- coding: utf-8 -*-

'''
Исправление CSS: добавление sticky для плеера
'''

with open('assets/css/youtube-theme.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Добавляем sticky к .yt-player-wrapper
# Ищем блок .yt-player-wrapper и добавляем свойства
if '.yt-player-wrapper {' in content:
    content = content.replace(
        '.yt-player-wrapper {',
        '.yt-player-wrapper {\n    position: sticky;\n    top: 76px;\n    z-index: 100;'
    )

# Сохраняем
with open('assets/css/youtube-theme.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ CSS обновлен: плеер теперь sticky!")
