@echo off
Set /p times=<times.txt 
git pull & git add . && git commit -m "No.%times% Commit Backup" && git push && start change-times.bat
