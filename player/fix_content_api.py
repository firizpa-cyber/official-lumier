# -*- coding: utf-8 -*-

# Исправляем пути к изображениям в content-api.php

with open('content-api.php', 'r', encoding='utf-8') as f:
    content = f.read()

# Заменяем пути для всех изображений
content = content.replace(
    'http://ant-tv.ddns.net:2223/uploads/films/',
    'http://ant-tv.ddns.net:2223/img/'
)

# Теперь нужно заменить структуру путей
# Было: /img/007koordinati_2012/logo.jpg
# Нужно: /logos/ID.jpg (но ID у нас null, поэтому мы ничего не можем сделать)

# Так як у нас ID=null, попробуем извлечь ID из slug
import re

# Найдем все  'id' => null и заменим на реальные ID из URL логотипов в адм��нке
# Но пока просто заменим пути

#  Откатим первую замену

with open('content-api.php', 'r', encoding='utf-8') as f:
    content = f.read()

# Заменим путь к каталогам
content = content.replace('uploads/films/', 'img/')
content = content.replace('/logo.jpg', '/logos/logo.jpg')  
content = content.replace('/poster.jpg', '/posters/poster.jpg')
content = content.replace('/banner.jpg', '/banners/banner.jpg')

# Сохраняем
with open('content-api.php', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Пути исправлены в content-api.php!")
print("⚠️ Но ID фильмов все равно null, нужно их заполнить вручную")
