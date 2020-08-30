@Echo Off
Set /p times=<times.txt
hexo cl && hexo b -u && hexo st -u && hexo d -g && hexo cl && git add . && git commit -m "No.%times% Commit in Second Week Backup" && git push && set /a output=%times%+1 && del times.txt && echo %output% >> times.txt && echo Deploy process run successfully.
Pause