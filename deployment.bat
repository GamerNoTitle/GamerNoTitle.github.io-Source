@echo off
Set /p times=<times.txt 
hexo cl && hexo b -u && hexo st -u && hexo d -g && hexo cl && git add . && git commit -m "No.%times% Commit in Second Week Backup" && git push
