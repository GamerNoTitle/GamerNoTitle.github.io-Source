---
title: Raspberry 4B 折腾记录（持续更新）
date: 2022-10-05 15:23:46
tags: [IoT, Raspberry]
categories: IoT
cover: https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Raspberry-4B-Log/cover.jpg
---

### 烧录系统

我用的是`balenaEtcher`这个软件（别问为什么，问就是好看），比起Win32DiskImager和Rufus来说更好用一点（个人感觉）

（↓没插读卡器所以用磁盘代替一下，千万别写入磁盘！）

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Raspberry-4B-Log/balenaEtcher-20221005-225233.png)

### 对ext4格式的存储介质进行写入

我用的是DiskGenius，但是不知道为什么在我的电脑上打开会提示这个……

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Raspberry-4B-Log/ntleah-20221005-151900.png)

`Err: NTLEAS may be lost connection with hook process.`

我这个用的是`5.1.1`的中文专业版（免费版不能对ext4格式进行写入），因为打不开所以我去换了个版本。

从网上下了个`5.2.0.884`就好了，就，很奇怪，估计是这个版本的问题。

### 重装Kali Linux后在无屏幕的条件下自动连接WIFI（未解决）

这个我在网上找了很多方法，但是我发现很多他们都是用的树莓派自己的Debian衍生系统，用的不是Kali，这个方法用在Kali上等于无效……

直到我发现了这几个

[树莓派 kali Linux 开机自动连接WiFi （bash 脚本）_yayaleII的博客-CSDN博客_kali自动连接wifi](https://blog.csdn.net/yayale01/article/details/107132570)

[kali（64位）在树莓派4B的安装配置_CTQ54250的博客-CSDN博客](https://blog.csdn.net/CTQ54250/article/details/108433590)

我尝试了一下，但是说白了，还是没解决……

### 使用屏幕键盘

```shell
sudo apt install matchbox-keyboard
```

在Raspberry Pi上

```
matchbox-keyboard
```

通过SSH

```
DISPLAY=:0 matchbox-keyboard &
```

该命令将加载Raspberry Pi上的屏幕键盘软件。

### 在树莓派上安装RDP服务

使用[Har-Kuun/OneClickDesktop: A one-click script that installs a remote desktop environment on a Linux server with browser/RDP/VNC access. (github.com)](https://github.com/Har-Kuun/OneClickDesktop)

直接运行，但是在shell脚本里面需要把OS检查关掉（如果你像我一样用的是Kali）

```shell
#此脚本仅支持Ubuntu 18/20, Debian 10, 以及CentOS 7/8.
#如果您试图再其他版本的操作系统中安装，可以在下面禁用OS检查开关。
#请注意，在其他操作系统上安装此脚本可能会导致不可预料的错误。  请在安装前做好备份。

OS_CHECK_ENABLED=OFF
```

安装时可能会遇到依赖环境未安装的情况，直接用apt安装就行了

#### libpng

```shell
sudo apt install libpng-dev -y
```

#### libjpeg

```shell
sudo apt install libpng-dev -y
```

#### Cairo

```shell
sudo apt install libcairo2 libcairo2-dev -y
```

#### OSSP UUID

```shell
sudo apt install libossp-uuid-dev -y
```

#### 无法编译

因为OpenSSL升级到`3.0.0`然后不支持，所以直接降级回去就行了

默认是`OpenSSL 1.1.1m`，所以建议先编译完再升级（没事别`sudo apt upgrade -y`）

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Raspberry-4B-Log/Xshell-20221201-223944.png)
