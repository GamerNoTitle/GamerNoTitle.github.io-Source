---
title: jsDelivr的正确打开方式
date: 2020-02-08 21:09:35
tags: [Software, CDN, jsdelivr]
categories: Software
cover: https://fileem.com/storage/2018/11/9bb6c0999a6bb6dfa9594aa562926dc2.png
---

{% note info %}

文章已经在2020.4.5更新

{% endnote %}

~~开始持续高产~~前几天开始，github的raw文件下载域名``raw.githubusercontent.com``被墙了，导致我的网站很多图片都是404（因为我是直接使用github的文件），我转为使用cloudflare的workers反代。但是反代有每日10W次的请求次数限制。~~万一以后我的网站访问量增大了呢？这样岂不是不够用？~~（在想Peach）

![没错，我在想もも](https://assets.bili33.top/img/jsDelivr/Chiyota-momo.jpg)

今天早上我才在[【日常吐槽04】](/2020/02/06/diary4/)的评论区里面说不会用jsDelivr，到了晚上，嗯，真香……

![jsDelivr](https://assets.bili33.top/img/jsDelivr/home.png)

jsDelivr是一个比较好的CDN平台，官方号称``jsDelivr – Open Source CDN`` ``free, fast, and reliable``，简单来说就是开源的CDN，免费、快、可靠这样的

不过确实，这玩意的口碑也挺好，那我就按照我半天的使用体验，来说说这玩意的正确打开方式吧

---

### 你需要准备：

一个github账号

### 开始操作

你需要登录你的Github，创建一个你想用来放文件的仓库，然后在这个仓库里面上传你的文件，像我这样

![上传文件后的仓库](https://assets.bili33.top/img/jsDelivr/Picture-repo.png)

然后点击Release，新建一个版本，在上面的小方框里面填写你的版本号，尽量填写数字，例如``1.0``之类的，不要用中文！！！

![新建Release](https://assets.bili33.top/img/jsDelivr/release.png)

接着直接调用jsDelivr，例如我在名为Picture-repo的仓库发布了1.0版本，那么我访问链接：

``https://assets.bili33.top/AboutMe/logo-mini.png``

就可以直接调用我的头像，按照官方的格式，就是

``https://cdn.jsdelivr.net/gh/<username>/<repo-name>@<version>/<path>``

的样子，解释一下：

\<username>就改成自己的名字，\<repo-name>改成自己的仓库名字，\<version>就是你的release版本，如果不填会自动选择最新的release\<path>改成自己的文件路径。当我上传的时候我的文件夹路径是``.\folder\example.png``的话，那么\<path>就要改成``folder/example.png``

但是请注意！当你的release包大于50MB，那么jsdelivr会给你报错并且不给你提供加速服务，例如下面这条链接:

[https://cdn.jsdelivr.net/gh/NotFoundNEKKO/Storage@1.0/表情包/真叫人质壁分离.jpg](https://cdn.jsdelivr.net/gh/NotFoundNEKKO/Storage@1.0/表情包/真叫人质壁分离.jpg)

点开就会发现提示：

``Package size exceeded the configured limit of 50 MB. Try https://github.com/NotFoundNEKKO/Storage/tree/1.0/表情包/真叫人质壁分离.jpg instead.``

所以说还是要尽量减少自己每个release的大小，如果说太大了建议分成几个仓库放哦~

{% note success %}

从群友那里学来的：当你的版本号写为master时，只需要第一次发布release即可，后面直接用master分支的文件，也没有50MB的文件包大小限制

{% endnote %}

---

{% note info %}

### 2020.4.5 更新：Github Page法

{% endnote %}

根据评论区@Anonymous的回复，发现有另外一种方式也能够访问Github中的文件（而且还是raw）

我们还是以上面那个仓库为例子，先到仓库中的设置，打开Github Pages服务

![打开Github Pages服务](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@jsdelivr-usage/img/jsdelivr-Usage/Picture-repo-Pages.png)

然后我们可以看到Github将我的这个仓库的page服务部署到了``https://bili33.top/Picture-repo/``这个链接

我们尝试访问仓库中的文件

在这里我访问的是我的网站头图↓

![网站头图（以Page方式加载）](https://bili33.top/Picture-repo/img/Top-img/NEKO-Hackers.jpg)

可以看到，的确是可以进行访问的。而如果在Github Pages服务中开启自定义域名的话，还能够配合CloudFlare的CDN进行一波加~~（jian）~~速

![](https://gamernotitle.coding.net/p/BQB/d/BQB/git/raw/master/001Funny_滑稽大佬😏BQB/Funny00008.gif)

---
