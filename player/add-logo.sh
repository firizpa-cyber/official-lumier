#!/bin/bash
# Patch to add movie logos to cards

sed -i '207 i\                        ${movie.logo ? `<img src="${movie.logo}" style="position:absolute;top:6px;left:6px;max-width:80px;max-height:50px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.6));z-index:2;" onerror="this.style.display='"'"'none'"'"'" alt="">` : '"'"''"'"'}' diagnostic.html
