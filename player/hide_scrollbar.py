# -*- coding: utf-8 -*-

'''
Скрытие скроллбара и удаление отступов в сайдбаре
'''

css_path = 'assets/css/youtube-theme.css'

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Новый стиль для .yt-secondary: без скроллбара и отступов справа
new_secondary_style = """.yt-secondary {
    width: 400px;
    flex-shrink: 0;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 40px;
    padding-right: 0; /* Убираем отступ справа */
    scrollbar-width: none; /* Firefox */
}

/* Скрываем скроллбар для Webkit (Chrome, Safari, Edge) */
.yt-secondary::-webkit-scrollbar {
    display: none;
}"""

# Заменяем старый блок .yt-secondary
import re
# Ищем блок .yt-secondary { ... } и заменяем его
css = re.sub(r'\.yt-secondary\s*\{[^}]+\}', new_secondary_style, css)

# Также почистим дубликаты в media query, если они есть (просто удалим лишнее внутри media)
# Но проще просто перезаписать файл корректно, если там мусор.
# В данном случае, просто добавим стиль скрытия скролла.

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("✅ CSS обновлен: скроллбар скрыт, список до края!")
