# -*- coding: utf-8 -*-

# Читаем файл
with open('diagnostic.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Простая замена строки
old_text = '''                    <div class="yt-card-thumb" style="background-image: url('${movie.poster}')">
                        <div class="yt-duration">${movie.duration}</div>'''

new_text = '''                    <div class="yt-card-thumb" style="background-image: url('${movie.poster}')">
                        ${movie.logo ? `<img src="${movie.logo}" style="position:absolute;top:6px;left:6px;max-width:80px;max-height:50px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.6));z-index:2;" onerror="this.style.display='none'" alt="">` : ''}
                        <div class="yt-duration">${movie.duration}</div>'''

content = content.replace(old_text, new_text)

# Сохраняем
with open('diagnostic.html', 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(content)

print("✅ Логотип добавлен!")
