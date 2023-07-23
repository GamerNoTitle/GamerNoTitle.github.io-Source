---
title: 在小霸王电脑上安装黑群晖
date: 2023-04-13 18:18:35
tags: [Synology, NAS]
categories: Tech
cover: https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Install-black-synology-NAS-on-previous-PC/msedge-20230414-092910.jpg
---

因为最近想看番，然后发现嗶哩嗶哩没有买几部番（如何看嗶哩嗶哩请见[这里](/posts/biliRoaming/)），就想着能不能直接用qbitorrent那一套自动订阅，但是吧，自己的电脑又不是天天开着，而且用来下番，游戏啥的还打不打了。这不转个头看到家里闲置的ASUS X455LD笔记本，就想着在上面按个黑群晖

## 下载并刷入引导

这里用到的是Github上的一个项目：[fbelavenuto/arpl: Automated Redpill Loader (github.com)](https://github.com/fbelavenuto/arpl)

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Install-black-synology-NAS-on-previous-PC/BWEqUozwyv.png)

因为我是安装在物理机上面，所以下的是那个带 `img` tag的文件，剩下两个VM的是给虚拟机用的

下载后解压，然后掏出我们的老朋友`balenaEtcher`来把img文件写入U盘（我这个U盘也是个小霸王，金士顿的经典DT 101 G2）

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Install-black-synology-NAS-on-previous-PC/balenaEtcher-20230413-182330.png)

## 通过引导来编译WIFI固件

我们将U盘插入电脑，然后从U盘启动（记得关掉`Secure Boot`，我第一次没启动成功然后发现是忘记关Secure Boot了），在这里建议把网线插上，因为这个配置的过程中是不会配置WIFI的

启动的过程中，如果有弹出启动菜单，就直接选择`Configure Bootloader`就好了，然后会进入配置向导

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Install-black-synology-NAS-on-previous-PC/IMG_20230413_193740.jpg)

获取到了IP以后，可以在其他电脑上输入这个地址进入配置，也可以直接输入`menu.sh`开始配置（我这里因为没有网线所以是插了手机用USB网络共享的）

我这里是直接输入`menu.sh`进去了，进入menu后我们从上到下依次来

### 选择型号

这个程序会自动列出你的电脑可用的群晖型号，我这里给我列出了很多

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Install-black-synology-NAS-on-previous-PC/IMG_20230413_194405.jpg)

选适合自己的就行了，我这里选了~~`DS3615xs`~~（后面换成`DS320+`了），这里要记住后面的那个字符串，在下载系统的时候会用到

### 选择版本

在`Choose a Build Number`里面，我们需要选择一个群晖的版本号，我直接选择了最新的`42962`，这个版本号要先记住，后面要用

### 选择序列号

在这个主要是你要不要洗白的问题，要洗白的话就要用白群晖的序列号，我这里是`DS3615xs`，所以用一个`DS3615xs`的序列号就可以了，这里我就随机生成一个了

洗白参考：[黑群晖洗白介绍：可以让大家使用白群的Quickconnect - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/21941961)

### 开始编译

弄完上面这三个，除非你有更多的自定义，否则直接选择`Build the loader`进行编译就可以了，接着电脑就会自动联网进行资源下载，然后编译，这个过程要等

编译好了以后，如果你的光标停在了`Switch direct boot: false`上面，按下回车，调成`true`（没有就不管），然后选择`Boot the loader`，然后手动重启一下电脑（直接输入`reboot`就行了，如果无法输入就长按电源键，在这里开始就不推荐使用手机插上去USB网络共享的方法了，因为手机的USB网络共享跟手机的WIFI共享不是一个网域的，会访问不到）

### 启动完成

启动好了以后，我们记住屏幕显示的IP地址，进入下一节

## 安装系统

首先你要去群晖官网下载一个系统[Synology Archive Download Site - Index of /download/Os/DSM](https://archive.synology.cn/download/Os/DSM)

在这里选择你要下载的版本（系统版本号后面带`-`的是小更新，我们要选择不带`-`的）

在这里搜索在型号选择那一节让你记住的字符串，把系统下载下来

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Install-black-synology-NAS-on-previous-PC/msedge-20230413-195447.png)

然后链接我们的黑群晖（开个浏览器访问IP就行），进入设置向导，安装系统的时候把你的系统导入进去安装就行了

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Install-black-synology-NAS-on-previous-PC/msedge-20230413-221307.png)

更新后会自动重启，这个开机可能会有点慢，实测我的开机用了`2:25`

## 安装套件

在群晖里有套件中心，你可以根据需要来安装你所需要的软件，当然你也可以SSH链接进去，不过群晖是没有`apt`的，尽管他是Ubuntu衍生

在套件中心，一开始里面的东西会非常少，因为官方没有给我们提供足够的套件，我们可以加入第三方套件源（套件源在下面，安全性不保证，来源于网络）

```
1.packages：http://packages.synocommunity.com/?beta=1
2.KS7.0SPK：https://spk7.imnks.com/
3.ACMENet： http://synology.acmenet.ru
4.communitypackage hub：http://www.cphub.net
5.Cambier：https://synology.cambier.org/
6.Dierkse：http://syno.dierkse.nl/
7.FileBot：https://get.filebot.net/syno/
8.Hildinger：http://www.hildinger.us/sspks/ 
```

点开套件中心，点击设置，然后添加自己的套件源就行了

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Install-black-synology-NAS-on-previous-PC/msedge-20230414-092520.png)

添加完了以后，左边会有一个社群，在社群里面就能找到来自第三方软件源的套件了

## 结尾

黑群晖其实玩玩就好，具体的数据稳定性其实不太确定，因为这个东西毕竟不太稳定（我高一那年弄黑群晖就是数据火葬场），建议用SSH的时候不要乱捣鼓，省的系统崩了
