@echo off
Set date = date /t
Set time = time /t
hexo cl && hexo d -g && hexo cl && git add . && git commit -m "%time% %date% Commit" && git push
