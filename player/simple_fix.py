# -*- coding: utf-8 -*-

'''
Простая замена путей в content-api.php
Меняем /uploads/films/*/logo.jpg на /img/logos/*.jpg
Где * - это какой-то slug
'''

with open('content-api.php', 'r', encoding='utf-8') as f:
    content = f.read()

# Просто заменяем пути структурно
content = content.replace('/uploads/films/', '/img/')
content = content.replace('/logo.jpg', '/logos/logo.jpg')  
content = content.replace('/poster.jpg', '/posters/poster.jpg')
content = content.replace('/banner.jpg', '/banners/banner.jpg')

# Сохраняем
with open('content-api.php', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Пути обновлены!")
print("  /uploads/films/ -> /img/")
print("  /logo.jpg -> /logos/logo.jpg")
print("  /poster.jpg -> /posters/poster.jpg")
print("  /banner.jpg -> /banners/banner.jpg")
