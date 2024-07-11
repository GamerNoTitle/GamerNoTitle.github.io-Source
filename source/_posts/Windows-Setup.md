---
title: 别再问我怎么装系统了，再问我就把这边文章丢到你脸上！
date: 2019-07-09 23:00:00
tags: Software
categories: Software
cover: https://assets.bili33.top/img/Windows-Setup/cover1.jpg
keywords: 'Windows,Windows Setup,Windows Install,Windows Installation'
---

![](https://assets.bili33.top/img/Windows-Setup/cover1.jpg)

[封面来源地址](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=72039875)

### 为什么会写这篇文章？

昨天晚上我拉我们班某位钻石大佬打LOL，带我上分，结果他告诉我他电脑炸了，要重装系统，问我怎么重装系统。。。

我是这么回答他的（源自微信聊天记录）：

![](https://assets.bili33.top/img/Windows-Setup/WeChat-Chatting.png)

我（内心）：有句MMP不知当说不当说。。。

**今天我就要来详细讲一讲怎么新装/重装系统（win7~Win10通用，不包含Linux）**

### 序言

我会介绍两个方法，第一个我把它叫做``萌新友好法``，第二个我把它叫做``萌新不友好法``

这里用到的工具稍微列举一下：

#### 1.萌新友好法：Windows官方镜像、一个8G+的U盘、U深度或者其他乱七八糟的PE工具箱``（这里没有给U深度打广告的意思，只是我一般介绍别人方法的时候会告诉他用U深度）``

#### 2.萌新不友好法：Windows官方镜像、软碟通（Ultraiso，无需注册）、一个8G+的U盘



### 开始装机！

#### 1.1/2.1、镜像下载

你需要去微软官网或者是某些网站上面下载Windows的官方镜像，这里推荐[Windows官方下载工具](https://www.microsoft.com/zh-cn/software-download/windows10)或者推荐网站[MSDN, 我告诉你](https://msdn.itellyou.cn/)下载镜像。

需要注意的是，如果使用Windows官方下载工具，建议直接使用里面的“为另一台电脑创建介质“功能，并且直接插入U盘写入，当然你愿意选择创建ISO也可以，ISO的用法会在下面提到。

如果使用MSDN下载，那么建议使用支持ed2k协议的下载工具（例如迅雷，但不推荐）来下载，在这里介绍我平常使用的方式：将ed2k链接丢进百度网盘的离线下载，然后创建分享，在分享链接的pan.baidu.com的baidu后面加wp变成pan.baiduwp.com，进入PanDownload可以下载得快一些（文件需小于4G，否则还是得使用百度网盘）



#### 1.2、写入U深度

![](https://assets.bili33.top/img/Windows-Setup/U-Deep.jpg)

插入U盘，勾上支持UEFI启动（现在的电脑应该都支持），点击开始制作。（当然你可以选择高级设置设定自己的UI）

制作完后可以试试模拟启动，看看是否制作成功了



#### 1.3、解压Windows镜像

将Windows镜像解压，丢在U盘的根目录或建立文件夹丢在文件夹内（不要直接把镜像丢在ISO文件夹里面，等会会告诉你为什么）



#### 1.4、从U盘启动

重启你的电脑，打开启动菜单（按什么键请问百度），选择你的U盘，如果发现有两个同样名字的U盘，优先选择前面有``UEFI``字样的，如果UEFI无法启动再选择没有UEFI的。进入PE，可以在导航栏右边的彩屏图标右键调整分辨率（不是必要的），关闭弹出来的装机工具（不推荐使用它，因为使用它装系统后第一次开机会有很多奇奇怪怪的软件。这也是不推荐把ISO直接丢在U盘的ISO文件夹里的原因）

#### 1.5、用WindowsNTSetup安装系统

在桌面上找到WindowsNTSetup，或者在所有应用里面找到它，打开它。

![](https://assets.bili33.top/img/Windows-Setup/WindowsNTSetup.png)

Windows安装源请选择.\sources\install.wim或者.\sources\install.esd，引导驱动器选择你想要安装Windows的盘符（对单系统而言），安装驱动器选择你要安装Windows的盘符。

下面的版本选项选择你需要的版本，优化调整根据自己的需要调整。下面是我一般会选择的东西

![](https://assets.bili33.top/img/Windows-Setup/config.png)

调整完以后点开始安装即可！

#### 1.6、安装完成

安装完成后，电脑将自动重启，请移除你的U盘，等待系统启动，并且根据提示设置你的电脑！



#### 2.2、使用软碟通写入镜像

打开软碟通（以管理员身份运行），将你的Windows镜像拖入右边上面的框里面并双击打开（如果弹出提示请点“是”）

![](https://assets.bili33.top/img/Windows-Setup/Ultraiso1.png)

在上面的导航栏中选择启动-->写入硬盘映像，如果弹出UAC提示请点击是，就会出现写入页面（如下图）

![](https://assets.bili33.top/img/Windows-Setup/Ultraiso2.png)

点击写入，注意：``此操作会清除你U盘的所有数据，包括所有分区！！！``一旦你明白注意事项，点“是”就可以写入了

![](https://assets.bili33.top/img/Windows-Setup/Ultraiso3.png)

等待写入完成，重启电脑进入BOOT Menu，从U盘启动（UEFI优先）

#### 2.3、安装Windows

根据提示安装，如果提示说无法安装，请点击下面的详细信息，根据内容百度解决，这里我提供最常见的一种情况

提示：Windows 无法安装到这个磁盘。选中的磁盘具有MBR分区表。在 EFI 系统上，Windows 只能安装到 GPT 磁盘。

方法：利用DiskGenius或者傲梅分区助手，将硬盘转换为GUID格式即可

![](https://assets.bili33.top/img/Windows-Setup/DG1.png)

安装完后，系统会自动重启，请移除你的U盘！

#### 2.4、安装完成

系统已经安装完成，请根据系统提示配置你的电脑！



### 下次有谁再问我怎么装系统，或者有人问你怎么装系统，请把这篇文章给他/她看！

###### 如果有什么问题，可以在评论区内告诉我，推荐使用Github账号登录，这样我可以快速找到你！



###### 封面原图[出处](https://www.pixiv.net/member_illust.php?mode=medium&illust_id=72039875)

![](https://assets.bili33.top/img/Windows-Setup/Cover.jpg)