---
title: Cmd的互替软件，让Cmder来帮助你更好地使用控制台！
date: 2019-07-05 12:00:00
tags: Software
cover: https://cmder.net/img/main.png
keywords: 'cmd,cmder'
---

![Cmder](https://cmder.net/img/main.png)

#### 问题：什么是Cmd？

命令提示符是在操作系统中，提示进行命令输入的一种工作提示符。在不同的操作系统环境下，命令提示符各不相同。在windows环境下，命令行程序为cmd.exe，是一个32位的命令行程序，微软Windows系统基于Windows上的命令解释程序，类似于微软的[DOS操作系统](https://baike.baidu.com/item/DOS操作系统)。  ——来自 [百度百科](https://baike.baidu.com/item/命令提示符)

#### 为什么要用Cmder来替换Cmd呢？

1、**Cmd**有的时候复制粘贴很麻烦，**Cmder**则不会

2、**Cmder**可以分屏多开窗口，**Cmd**不行

3、**Cmder**可以设置窗口颜色,字体大小（更加美观）

4、**Cmder**有很多快捷键和谷歌浏览器操作类似（反正就是很多功能）

#### 下载地址（官网）：

[Cmder官网](http://cmder.net/)

官网下载有mini版和完整版，我建议完整版（虽然我也不知道两个之间有什么区别，或许是少了点命令？）

#### 一点小技巧：

你可以在系统属性里面配置环境变量，把cmder的路径加入到``path``里面去

然后以管理员身份打开cmd，输入

```javascript
// 设置任意地方鼠标右键启动Cmder
Cmder.exe /REGISTER ALL
```

然后你就可以像我一样在任意地方打开cmder了

![cmder-here](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/cmder/cmder-here.png)

#### 快捷键大全：

```
Tab       自动路径补全
Ctrl+T    建立新页签
Ctrl+W    关闭页签
Ctrl+Tab  切换页签
Alt+F4    关闭所有页签
Alt+Shift+1 开启cmd.exe
Alt+Shift+2 开启powershell.exe
Alt+Shift+3 开启powershell.exe (系统管理员权限)
Ctrl+1      快速切换到第1个页签
Ctrl+n      快速切换到第n个页签(n无上限)
Alt + enter 切换到全屏状态
Ctrl+r       历史命令搜索
Win+Alt+P   开启工具选项视窗
```

###### TIPS：如果中文不能正常显示，可以在设置的环境选项(Settings-->Startup-->Eniviroment)内加入以下语句

```basic
set LANG=zh_CN.UTF8 
```

![cmder-cn](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/cmder/cmder-cn.png)



###### 题外话

1、我没有收广告费，单纯是因为它很好用

2、Win10还是比较推荐Powershell的，但是win10以下powershell（即使内置）是没有在环境变量中的，所以win10以下我还是会用cmder

---

###### 后期更新：

Powershell真香！