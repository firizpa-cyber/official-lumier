# -*- coding: utf-8 -*-

# Исправляем пути к логотипам, постерам и баннерам в sync-movies.php

with open('sync-movies.php', 'r', encoding='utf-8') as f:
    content = f.read()

# Заменяем пути
content = content.replace(
    '"/uploads/films/{$id}/logo.jpg"',
    '"/img/logos/{$id}.jpg"'
)
content = content.replace(
    '"/uploads/films/{$id}/poster.jpg"',
    '"/img/posters/{$id}.jpg"'
)
content = content.replace(
    '"/uploads/films/{$id}/banner.jpg"',
    '"/img/banners/{$id}.jpg"'
)

# Сохраняем
with open('sync-movies.php', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Пути исправлены в sync-movies.php!")
