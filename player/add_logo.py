# -*- coding: utf-8 -*-

# Читаем файл
with open('diagnostic.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Ищем строку 207 и вставляем после неё
for i, line in enumerate(lines):
    if i == 206 and '<div class="yt-duration">' in line:
        # Вставляем строку с логотипом перед duration
        logo_line = "                        ${movie.logo ? `<img src=\"${movie.logo}\" style=\"position:absolute;top:6px;left:6px;max-width:80px;max-height:50px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.6));z-index:2;\" onerror=\"this.style.display='none'\" alt=\"\">` : ''}\n"
        lines.insert(i, logo_line)
        break

# Сохраняем
with open('diagnostic.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("✅ Логотип добавлен на карточки!")
