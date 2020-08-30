@echo off
Set /p times=<times.txt 
del times.txt
echo No.%times% deploy process has been completed!
set /a times+= 1
echo %times% >> times.txt
pause