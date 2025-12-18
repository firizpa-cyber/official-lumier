# -*- coding: utf-8 -*-

'''
Исправление diagnostic.html:
1. Изменить URL API на live-api.php
2. Исправить позиционирование логотипа - на всю карточку
'''

with open('diagnostic.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Заменяем API endpoint
content = content.replace(
    "const response = await fetch('content-api.php?action=all');",
    "const response = await fetch('live-api.php');"
)

# 2. Заменяем комментарий
content = content.replace(
    "// 1. Загрузка фильмов из content-api.php",
    "// 1. Загрузка фильмов из live-api.php (напрямую из админ-панели)"
)

# 3. Убираем .filter для streamUrl (так как live-api может не иметь streamUrl сразу)
content = content.replace(
    "movies = data\n                        .filter(m => m.streamUrl && m.streamUrl.trim() !== '')\n                        .map(m => ({",
    "movies = data.map(m => ({"
)

# 4. Меняем позиционирование логотипа - делаем его на всю карточку
# Было: position:absolute;top:6px;left:6px;max-width:80px;max-height:50px
# Будет: position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-width:120px;max-height:80px
content = content.replace(
    'style="position:absolute;top:6px;left:6px;max-width:80px;max-height:50px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.6));z-index:2;"',
    'style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-width:120px;max-height:80px;object-fit:contain;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.8));z-index:2;opacity:0.9;"'
)

# Сохраняем
with open('diagnostic.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ diagnostic.html обновлен!")
print("  - API изменен на live-api.php")
print("  - Логотип теперь по центру всей карточки")
