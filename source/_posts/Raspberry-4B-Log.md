---
title: Raspberry 4B 折腾记录（持续更新）
date: 2022-10-05 15:23:46
tags: IoT
categories: IoT
cover: https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Raspberry-4B-Log/cover.jpg
---

### 烧录系统

我用的是`balenaEtcher`这个软件（别问为什么，问就是好看），比起Win32DiskImager和Rufus来说更好用一点（个人感觉）

（↓没插读卡器所以用磁盘代替一下，千万别写入磁盘！）

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Raspberry-4B-Log/balenaEtcher-20221005-225233.png)

### 对ext4格式的存储介质进行写入

我用的是DiskGenius，但是不知道为什么在我的电脑上打开会提示这个……

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Raspberry-4B-Log/ntleah-20221005-151900.png)

`Err: NTLEAS may be lost connection with hook process.`

我这个用的是`5.1.1`的中文专业版（免费版不能对ext4格式进行写入），因为打不开所以我去换了个版本。

从网上下了个`5.2.0.884`就好了，就，很奇怪，估计是这个版本的问题。

### 重装Kali Linux后在无屏幕的条件下自动连接WIFI（未解决）

这个我在网上找了很多方法，但是我发现很多他们都是用的树莓派自己的Debian衍生系统，用的不是Kali，这个方法用在Kali上等于无效……

直到我发现了这几个

[树莓派 kali Linux 开机自动连接WiFi （bash 脚本）_yayaleII的博客-CSDN博客_kali自动连接wifi](https://blog.csdn.net/yayale01/article/details/107132570)

[kali（64位）在树莓派4B的安装配置_CTQ54250的博客-CSDN博客](https://blog.csdn.net/CTQ54250/article/details/108433590)

我尝试了一下，但是说白了，还是没解决……

