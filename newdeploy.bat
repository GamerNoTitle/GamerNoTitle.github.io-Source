@echo off
Set /p times=<times.txt 
git add . && git commit -m "No.%times% Commit in Fourth Week Backup" && git push && start change-times.bat
