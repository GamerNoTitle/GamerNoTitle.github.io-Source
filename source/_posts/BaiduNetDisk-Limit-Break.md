---
title: 被限速的日子，该过去了！
date: 2019-08-04 17:07:20
tags: [Software, Baidu, BaiduNetdisk, Aria2]
categories: Software
cover: https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Aria2c-Break-BaiduNetDisk/Cover.jpg
keywords: 'aria2c,baidu,百度网盘,百度网盘不限速'
---

{% note danger %}

### 本教程可能已经过时

鉴于Pandownload网页端经常服务器维护，本页面教程可能已经过时！

{% endnote %}

### 辣鸡百度云，又限我速！

![百度云限速（真实）](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Aria2c-Break-BaiduNetDisk/limited-speeds.png)

百度云天天限速，8M/s的网速硬生生被拖到8kb/s，太真实了，这限速估计也烦了不少人，但是用speedpan之类的软件可能就有封号风险，所谓的封号不是封禁账号，是直接断你的线程断剩下一个，这样就可以拖慢你的网速。



那么我们要怎么样不被封号的同时又能告诉下载呢？（鉴于好多小伙伴看不懂我的在线版本教程，所以我在2019/8/13修改了教程，只剩下普通版）



### 第一步、部署本地aria2

下载[Aria2c All In One工具包](https://github.com/GamerNoTitle/Aria2c-Break-BaiduNetDisk/raw/master/Aria2c%20All%20In%20One.zip)，然后打开里面的start.bat文件，会弹出一个cmd窗口，防火墙提示请允许！你也可以打开start-vanish.vbs文件，这样就不会弹出cmd窗口，若要关闭Aria2c，直接双击stop.bat即可！

#### 1、开启aria2

直接点开文件里面的start.bat文件就可以打开aria2，但是这样做就会生成一个窗口，有些人就认为它不美观，不想要它，那就可以打开文件里面的start-vanish.vbs，就可以做到既没有窗口又可以打开aria2

#### 2、配置aria2

##### ①、第二十七行

```json
# 单个任务最大线程数, 添加时可指定, 默认:5
split=5
```

split后面的数字随便改，只要你认为你的电脑能吃那么多的线程。

##### ②、第六十一行

```json
# 设置的RPC授权令牌, v1.18.4新增功能, 取代 --rpc-user 和 --rpc-passwd 选项
#rpc-secret=secret
```

这是你的aria2密钥，不过如果你是本地用或者局域网内用就不建议设置密钥，rpc-secret前面的#去掉，然后把后面的secret改成你自己的密钥即可！

### 第二步（可选）：部署ariaNg

[下载AriaNg文件](https://github.com/GamerNoTitle/Aria2c-Break-BaiduNetDisk/raw/master/AriaNg.zip)，并解压到自定义目录

打开里面的index.html文件，进入AriaNg设置

填写以下内容：

Aria2c RPC 别名：【自己填写】

Aria2c RPC 地址：127.0.0.1或localhost 6800 jsonrpc

Aria2c RPC 协议：HTTP

Aria2c RPC HTTP 请求方法：POST

Aria2c RPC 密钥：（填写自己的密钥，默认为空）



### 第三步、打开你的分享链接，在分享链接后面加上wp进入PanDownload

[无图警告]

### 第四步、点击想下载的文件，选择Aria2下载，输入内容如下：

#### 主机：127.0.0.1 或 localhost

#### 端口：6800 （如果自己改了端口就请填写自己的）

#### 密钥：（默认留空，如果设置了密钥就填写密钥）

#### 下载路径：（填自己电脑的文件夹路径，例如C:\Users\GamerNoTitle\Download，就是我的文档里面的下载文件夹）

##### （以下是一个例子，请不要按照我这么填！！！）

![pandownload aria配置图](https://github.com/GamerNoTitle/Aria2c-Break-BaiduNetDisk/blob/master/img/pandownload.png?raw=true)

填好以后点确定会直接开始下载

这种方式是可以飞速下载的，当然这样下载的结果就是文件存放在了自己设定的目录。



忘了说了，pandownload是有每日获取次数限制的，限制是限制公网ip，也就是同网络下一个人被限制了，其他人也会被限制，不知道具体是多少次。。。



祝各位突破限速成功！



封面下载（来自Watch_Dogs 2）：[点我下载！（4K图）](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Aria2c-Break-BaiduNetDisk/Cover.jpg)

狗二图包详见育碧！

![DedSec](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Aria2c-Break-BaiduNetDisk/Cover.jpg)