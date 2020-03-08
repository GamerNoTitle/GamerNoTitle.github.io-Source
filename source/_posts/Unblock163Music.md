---
title: 网易云音乐去除版权限制（Nodejs）
date: 2020-01-18 12:03:32
tags: Software
cover: https://media.licdn.com/dms/image/C511BAQEqj9j0uGy1CQ/company-background_10000/0?e=2159024400&v=beta&t=pcMFMvgFKed2EXmWHax_cuLfhFYJIrhqH0_eIgFg9nQ
sage: false
---

**今天拿网易云开刀~**

网易云音乐一直是我们使用得比较频繁的音乐平台，可是他的版权问题实在是令人发寒，每次搜索音乐就看着灰色的歌名失望。。。而隔壁的扣扣音乐就什么都有
![灰色的网易云音乐](https://f002.backblazeb2.com/file/GamerNoTitle-img/home/UnblockNeteaseMusic/CloudMusic-Gray.png)

这种情况真的很烦，点开一首歌直接告诉你因版权无法播放，这时候我们就需要脚本登场了
脚本由@nondanee编写，原理是将其他音乐网站的链接替换到网易云，所以并不存在破解网易云音乐的软件，与法律并不矛盾。
源代码可以点[@nondanee/UnblockNeteaseMusic](https://github.com/nondanee/UnblockNeteaseMusic)，但是考虑到很多人并没有安装nodejs环境，所以我把环境集成了，然后把程序启动方式稍微简化了一下（装了环境的当我没说，可以自己使用上面那个），上传到了我的仓库：https://github.com/GamerNoTitle/UnblockNeteaseMusic-env

直接使用clone功能下载文件即可！

```bash
$ git clone git@github.com:GamerNoTitle/UnblockNeteaseMusic-env.git
```

下载完代码以后，点开Start.bat（看不懂英文的用Start-Zh_CN.bat），按照提示操作即可！

附上启动程序代码：

```basic
@echo off
title UnblockNeteaseMusic (Environment Inside) - GamerNoTitle, Script By @nondanee
:list
@echo -----------------------------------------------------------------------------------------------------
@echo Command List:
@echo 1.Start UnblockNeteaseMusic Script (Default Port 8080)
@echo 2.Start UnblockNeteaseMusic Script (Custom Port)
@echo 3.Update Script (You Can Try This When It's Unable to Unblock)
::@echo 4.Start at Windows Boot (Default Port 8080)
@echo 4.Unblock Your Netease Cloud Music UWP (Need to Run As Administrator)
@echo e.Exit
set /p command=Please Enter the Number ahead to Use the Command: 
cls
if %command% == 1 goto default
if %command% == 2 goto port
if %command% == 3 goto update
::if %command% == 4 goto startup
if %command% == 4 goto UWP
::if %command% == "e" exit
exit

:default
cd script
..\env\npx.cmd @nondanee/unblockneteasemusic -p 8080
cd ..
goto list

:port
cd script
set /p ports=Please Input Custom Port: 
..\env\npx.cmd @nondanee/unblockneteasemusic -p %ports%
cd ..
goto list

:update
reg query HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\|find /i "Git_is1">nul 2>nul
if %errorlevel% == 0 goto pull else goto error

:pull
cd script && git pull origin master
cd ..
goto list

:error
@echo Please Go to https://git-scm.com/ And Install Git before You Update the Script!
goto list

:startup
.\startup\shortcut-maker.vbs /target:"%~dp0\startup\start.bat" /shortcut:"C:\Users\%username%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\neteasecloudmusic-unblocker.lnk"
@echo The Script Has Been Successfully Added to Your Windows Startup List!
goto list

:UWP
checknetisolation loopbackexempt -a -n="1F8B0F94.122165AE053F_j2p0p5q0044a6"
goto list
```

启动了以后，在你的网易云音乐里面修改代理，按照你的配置填写即可！

![代理修改](https://f002.backblazeb2.com/file/GamerNoTitle-img/home/UnblockNeteaseMusic/Proxy.png)



原使用文档在[https://github.com/nondanee/UnblockNeteaseMusic](https://github.com/nondanee/UnblockNeteaseMusic)内！



---

题外话：

最近Github的地址raw.githubusercontent.com好像被墙了？不能直接在Github网站中下载RAW文件，很烦

CloudFlare的Workers最近也是BUG一大堆，总是给我抛出1101错误，先不搭建新的反代了……

本网站的邮件提醒已经搭建好了，以后留言就有邮件了~