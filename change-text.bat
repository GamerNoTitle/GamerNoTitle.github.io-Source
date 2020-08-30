@echo off
Set /p times=<times.txt 
del times.txt
set /a times+= 1
echo %times% >> times.txt
pause