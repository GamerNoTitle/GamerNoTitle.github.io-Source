---
title: DigitalOcean白了？我来帮你恢复！
date: 2019-08-16 18:00:00
tags: Software
cover: https://www.digitalocean.com/assets/media/logo-a721c4a7.png
keywords: 'digitalocean,digitalocean in china,digitalocean projects'
---

近期，在访问digitalocean管理服务器的时候，发现一个问题：

![](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/DigitalOcean-Project/Flash-Bang.png)

啊啊啊啊啊啊啊啊啊啊啊啊啊！！！哪个坑逼丢的FLASH BANG！！！



好啦好啦回归正题，这波digitalocean的project无法加载，我本来以为是digitalocean被墙了，但是后来打开开发者工具发现，很多的资源都是能正常加载的，除了。。。



![](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/DigitalOcean-Project/dev-tools-failed.png)

这些标红的都是个什么玩意儿啊！！！



其实是DigitalOcean换了CDN导致各种JavaScript无法加载，所以页面加载不出来，所以解决的方式就是：翻-------------------（哎呀）



嗯哼，不好意思，其实我们有其他方法的。。。我们的方法就是：HOST大法！！！

打开你的HOST文件，把下面这行HOST贴进去（不要问我怎么改HOST，问就是百度）

```powershell
151.101.1.194 cloud-cdn-digitalocean-com.global.ssl.fastly.net
```

（你也可以访问[该网址](https://ping.chinaz.com/cloud-cdn-digitalocean-com.global.ssl.fastly.net)进行检测，然后把延迟最低的贴进去就好）

然后保存关闭，打开你的cmd或者powershell（什么？你居然不会用cmd？对不起！我们莫得共同话题）

在里面输入

```powershell
ipconfig /flushdns
```

清除dns缓存就好啦！linux和macOS就自己问度娘去，不要问我哈~



###### 题外话：

其实digitalocean的服务挺不错的，特别是里面的Floating IP（浮动IP）功能，能够让你轻松躲过XX的追查，用来飞小飞机挺不错的哦~

不过我还是比较喜欢Vultr，个人原因吧

你需要服务器吗？用我的[链接](https://www.vultr.com/?ref=8224422-4F)注册可以获得50刀哦！

<a href="https://www.vultr.com/?ref=8224422-4F"><img src="https://www.vultr.com/media/banners/banner_728x90.png" width="728" height="90"></a> 

