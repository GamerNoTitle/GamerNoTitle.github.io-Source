@echo off
::Set /p times=<times.txt 
title "Setting date & time"
Set date = date /t
Set time = time /t
title Pull new commits
git pull
title Cleaning cache
call hexo cl
title Pushing new changes
git add . 
git commit -m "%time% %date% Commit"
git push
::start change-times.bat
