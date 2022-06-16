---
title: CTF学习笔记（大学篇）03 —— CobaltStrike 详解
date: 2022-05-26 22:44:46
tags: CTF
categories: CTF
---

### CobaltStrike信息

{% note info %}

官网：[Cobalt Strike | Adversary Simulation and Red Team Operations](https://www.cobaltstrike.com/)

{% endnote %}

Cobalt Strike（下面会简称为CS）是一款由java编写的全平台多方协同渗透测试框架，在3.0版本之前它基于Metasploit框架工作，在3.0后的版本以独立成一个渗透测试平台。CobaltStrike集成了端口转发、端口扫描、socket代理、提权、钓鱼、远控木马等功能。该工具几乎覆盖了APT攻击链中所需要用到的各个技术环节，且其最大的优点在于可以进行团队合作和优越的UI界面。

不过这东西好像是要钱的，在百度搜索可以找到别人打包好的程序，包括汉化包、服务器等东西（自己找去吧），但是一定要注意，teamserver和CS程序本体的版本号一定要一样！

如果是官方下载的纯净版，那目录结构应该是长这样的

```
CobaltStrike
│  agscript
│  c2lint
│  cobaltstrike
│  cobaltstrike.bat
│  CSAgent.jar
│  peclone
│  teamserver
│  tree.txt
│  
├─resources
│      bdetails.txt
│      bhelp.txt
│      translation.txt
│      
└─scripts
        default.cna
```

### 开启CS服务器

CS需要一台电脑作为监听服务器，这里我直接用物理机当服务器和攻击机，用虚拟机当目标机

在Windows下，需要把以下代码复制粘贴到一个bat文件（建议放在同目录），然后再运行监听服务器

```powershell
@echo off   
:check_java
    java -version >nul 2>&1
    if %errorLevel% == 0 (
        goto:check_permissions
    ) else (
        echo [-] is Java installed?
        goto:eof
    )
    
:check_permissions
    echo [+] Administrative permissions required. Detecting permissions...
    set TempFile_Name=%SystemRoot%\System32\BatTestUACin_SysRt%Random%.batemp
    (echo "BAT Test UAC in Temp" >%TempFile_Name% ) 1>nul 2>nul
    if exist %TempFile_Name% (
        echo [+] Success: Administrative permissions confirmed.
	del %TempFile_Name% 1>nul 2>nul
        goto:check_certificate
    ) else (
        echo [-] Failure: Current permissions inadequate.
        goto:eof
    )

:check_certificate
    set certificate=".\cobaltstrike.store"
    if exist %certificate% (
        goto:test_arguments
    ) else (
        echo [!] Please generate the cobaltstrike.store !
        echo [!] Example: keytool -keystore ./cobaltstrike.store -storepass 123456 -keypass 123456 -genkey -keyalg RSA -alias cobaltstrike -dname "CN=Major Cobalt Strike, OU=AdvancedPenTesting, O=cobaltstrike, L=Somewhere, S=Cyberspace, C=Earth"
        goto:eof
    )
    
:test_arguments
    set argC=0
    for %%x in (%*) do Set /A argC+=1
    if %argC% LSS 2 (
        echo [-] teamserver ^<host^> ^<password^> [/path/to/c2.profile] [YYYY-MM-DD]
        echo     ^<host^> is the default IP address of this Cobalt Strike team server
        echo     ^<password^> is the shared password to connect to this server
        echo     [/path/to/c2.profile] is your Malleable C2 profile
        echo     [YYYY-MM-DD] is a kill date for Beacon payloads run from this server
        goto:eof
    ) else (
        goto:run_cobal
    )
:run_cobal
    java -Dfile.encoding=UTF-8 -XX:ParallelGCThreads=4 -Xms512m -Xmx1024m -Dcobaltstrike.server_port=50050 -Djavax.net.ssl.keyStore=./cobaltstrike.store -Djavax.net.ssl.keyStorePassword=123456 -server -XX:+AggressiveHeap -XX:+UseParallelGC -classpath ./cobaltstrike.jar server.TeamServer %*
```

弄好了以后，打开Windows Terminal，运行下面的命令来打开监听服务器

```powershell
.\teamserver.bat <监听ip> <服务器密码>
```

这里监听IP**不能是**`0.0.0.0`，必须指定ip。可以通过`ipconfig`来查看本机的ip地址，然后填在对应的位置，密码就自己设置了，另外打开的时候一定要用管理员权限！

开完了应该会像下面这张图这样显示

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/WindowsTerminal-20220526-225658.png?download=true)

然后打开CS软件本体，输入ip和密码进行连接，出现主页面即为连接成功

开CS软件本体的方式就很简单了，可以简单粗暴直接`java -jar cobaltstrike.jar`，也可以把下面这些内容复制到一个bat文件然后直接双击打开（下面这里用了汉化模组`CobaltStrikeCN.jar`，你可以在Github搜索下载）

```powershell
java -Dfile.encoding=UTF-8 -javaagent:CobaltStrikeCN.jar -XX:ParallelGCThreads=4 -XX:+AggressiveHeap -XX:+UseParallelGC  -jar cobaltstrike.jar
```

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/java-20220526-230047.png?download=true)

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/java-20220526-230431.png?download=true)

### 生成木马文件

这个其实很简单（如果不做免杀的话），直接在顶上找到齿轮图标点一下，然后选择一个监听器生成就行了，不过在生成之前要记得**一定要关闭杀软**（因为没做免杀，会被杀软直接干掉）

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/java-20220526-230651.png?download=true)

这里我生成了一个名为`beacon.exe`的木马文件，把它丢到虚拟机里面双击运行（记得要把虚拟机的杀软也关了）

这里有个坑，如果你发现你的肉鸡很久都没有上线，那你应该去检查一下虚拟机的网络模式设定，我一开始设置的是NAT模式，但是NAT模式的网段跟本机的网段不太一样，就会连不上，所以要改成桥接模式才能够连接成功。

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/vmware-20220526-230905.jpg?download=true)

在虚拟机打开木马文件后，你攻击机的CS就会有上线提示了，然后会显示一些关于肉鸡的信息，如图所示

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/java-20220526-231119.png?download=true)

肉鸡上线的时候，第一件事情就是要调整延迟。如果说你想做到实时控制，那就要把延迟调整为0s，如果你想操作延迟执行，那就修改为对应的时间，默认是60s

修改也很简单，右击一下你的目标机器，在`会话`里面可以找到`Sleep`选项，点开以后修改就行了

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/java-20220526-231310.png?download=true)

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/java-20220526-231346.png?download=true)

右击选择`进入beacon`可以进入CS提供的命令行，对目标机器进行操作

一般可以使用`shell <powershell命令>`的格式来执行Windows自带的命令，例如使用`shell notepad`就可以在目标机器打开一个记事本，使用`shell calc`就可以在目标机器打开一个计算器

### 安装插件

CS自己就带了不少的功能，例如提权、VNC等功能，但是这些功能不太够，幸好整个CS的生态里面是有很多大佬开发插件的，这里可以在Github上随便搜搜就能找到了。这里我装了一个[z1un/Z1-AggressorScripts: 适用于Cobalt Strike的插件 (github.com)](https://github.com/z1un/Z1-AggressorScripts)整个插件集，所以我这里右击肉鸡的时候多了一个`Z1`选项

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/java-20220526-231744.png?download=true)

这里就有很多功能了，这里可以讲一下一些有趣的功能

#### 用户密码钓鱼

很多计算机都会设置有电脑的登录密码，有的时候我们想获取用户的密码，那用得最烂但是挺有效的手段就是钓鱼（特别对于CSGO库存价值高的Steam用户来说肯定遇到过不少），这里Z1也给我们提供了对应的功能，我们可以在`Z1`->`读取密码`->`钓鱼密码窃取`->`FakeLogonScreen`里面使用这个功能，点击后会弹出一个小窗口，点击执行后，肉鸡就会显示一个钓鱼窗口了

不过有一说一这个窗口……做的还是挺次的

![虚假的登录窗口](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/vmware-20220526-232727.jpg?download=true)

![真实的登录窗口](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/vmware-20220526-232450.jpg?download=true)

不过这个可以自动判断用户密码的正误，直到用户输入正确了才放行，控制台会实时弹用户输入密码的情况，但是但是，对于我这种用PIN登录的人来说，获取不到PIN

![输入错误](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/java-20220526-232917.png?download=true)

![输入正确](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/java-20220526-232929.png?download=true)

还有一种钓鱼窗口就是Windows自带的那种认证窗口（如图）【紫色的表框是VMware的Unity模式带的，在正常的系统中显示实际上是没有没有】

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/CTF-in-College-3/vmware-20220526-233132.png?download=true)

不过也有一个缺点就是：正常的巨硬认证窗口是不能移动的，这个可以……

打开这个窗口也不难，只是在刚刚上面那个Windows登录的那个选项那里选择下面那个，然后设定一下标题（在这里是`安全认证`这几个字）就可以了。

