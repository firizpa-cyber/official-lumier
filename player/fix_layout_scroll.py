# -*- coding: utf-8 -*-

'''
Изменение CSS для фиксированного макета:
1. body: overflow: hidden
2. .yt-container: фиксированная высота и flex
3. .yt-primary: скрытый скролл
4. .yt-secondary: независимый скролл
'''

css_path = 'assets/css/youtube-theme.css'

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Изменяем body
if 'overflow-x: hidden;' in css:
    css = css.replace('overflow-x: hidden;', 'overflow: hidden; /* Скрываем прокрутку страницы */')

# 2. Изменяем .yt-container
# Ищем блок .yt-container и добавляем высоту
container_style = """.yt-container {
    margin-top: 56px;
    display: flex;
    padding: 24px;
    gap: 24px;
    max-width: 1750px;
    margin-left: auto;
    margin-right: auto;
    /* Фиксированная высота для лэйаута */
    height: calc(100vh - 56px);
    box-sizing: border-box;
}"""

# Заменяем старый блок .yt-container (используем regex для надежности или просто замену текста если он уникален)
import re
css = re.sub(r'\.yt-container\s*\{[^}]+\}', container_style, css)

# 3. Изменяем .yt-primary
primary_style = """.yt-primary {
    flex: 1;
    min-width: 0;
    /* Левая часть: скролл если нужно, но скрытый */
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    padding-bottom: 40px;
}
.yt-primary::-webkit-scrollbar { 
    display: none; /* Chrome/Safari */
}"""
css = re.sub(r'\.yt-primary\s*\{[^}]+\}', primary_style, css)

# 4. Изменяем .yt-secondary
secondary_style = """.yt-secondary {
    width: 400px;
    flex-shrink: 0;
    /* Правая часть: независимый скролл */
    height: 100%;
    overflow-y: auto;
    padding-bottom: 40px;
    padding-right: 5px;
}"""
css = re.sub(r'\.yt-secondary\s*\{[^}]+\}', secondary_style, css)

# 5. Убираем sticky у плеера, так как теперь весь блок зафиксирован
css = css.replace('position: sticky;', 'position: relative;')
css = css.replace('top: 76px;', '')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("✅ CSS обновлен: Левая часть фиксирована, правая прокручивается!")
