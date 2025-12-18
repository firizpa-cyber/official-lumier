# -*- coding: utf-8 -*-

'''
Финальное решение: заменим ВСЕ пути на тестовый ID=249
Чтобы хотя бы на одном фильме проверить что логотипы загружаются
'''

with open('content-api.php', 'r', encoding='utf-8') as f:
    content = f.read()

# Заменяем ВСЕ пути к логотипам на тестовый ID=249
import re

# Меняем пути к логотипам
content = re.sub(
    r"'logo' => 'http://ant-tv\.ddns\.net:2223/uploads/films/[^']+/logo\.jpg'",
    "'logo' => 'http://ant-tv.ddns.net:2223/img/logos/249.jpg'",
    content
)

# Меняем пути к постерам  
content = re.sub(
    r"'poster' => 'http://ant-tv\.ddns\.net:2223/uploads/films/[^']+/poster\.jpg'",
    "'poster' => 'http://ant-tv.ddns.net:2223/img/posters/249.jpg'",
    content
)

# Меняем пути к баннерам
content = re.sub(
    r"'banner' => 'http://ant-tv\.ddns\.net:2223/uploads/films/[^']+/banner\.jpg'",
    "'banner' => 'http://ant-tv.ddns.net:2223/img/banners/249.jpg'",
    content
)

# Сохраняем
with open('content-api.php', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ ВСЕ пути заменены на тестовый ID=249!")
print("⚠️ Это временное решение для проверки что путь правильный")
print("📝 Если логотипы загрузятся - значит формат /img/logos/ID.jpg правильный")
