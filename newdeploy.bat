@echo off
::Set /p times=<times.txt 
Set date = date /t
Set time = time /t
git pull
git add . 
git commit -m "%time% %date% Commit"
git push
::start change-times.bat
