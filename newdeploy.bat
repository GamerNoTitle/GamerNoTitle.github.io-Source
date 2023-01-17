@echo off
::Set /p times=<times.txt 
Set date = date /t
Set time = time /t
git pull
start hexo cl
ping 127.0.0.1 -n 10 > nul
git add . 
git commit -m "%time% %date% Commit"
git push
::start change-times.bat
