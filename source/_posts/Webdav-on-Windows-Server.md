---
title: 在Windows Server上启用Webdav
date: 2024-06-17 11:22:34
tags: [Tech, Windows Server, Webdav]
categories: Tech
cover: https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/c6f3e7df-99de-4cba-ae36-b6d1b1672a0a.png
---

## 为什么要用Webdav

首先，你得知道我们平常用的SMB文件共享服务用的445端口，一般是不对外开放的。云服务器也是如此。而webdav可以通过http服务来访问你的文件，甚至我在家里用Cloudflare Tunnel都可以穿出去访问，非常地方便。

所以对于我家里的小霸王服务器，自我换成Windows Server后，需要在外访问的话就需要打开Webdav

## 安装Webdav服务

本次使用的是Windows Server 2022

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/f3103043-9796-4b4f-aa68-90e77ec38729.png)

首先先打开Windows Server自带的服务器管理器，选择添加角色和功能，在`服务器角色`选项卡添加`web 服务器(IIS)`

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/9e302075-cfdf-41e1-beb9-b6c1d2778c1c.png)

然后跳到`功能`选项卡，勾选`Webdav重定向服务`

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/be7fdea1-c3d0-437a-be96-3a28ca6ed804.png)



再在下面`Web 服务器角色(IIS)`选项卡下的`角色服务`添加`Windows 身份验证`和`WebDAV 发布`

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/7011660c-bf58-40c7-9a36-f04be8aede80.png)

然后点下一步，把这些功能装上，这个过程可能有点长，装好了记得重启一下，记得先保存一下工作（把虚拟机啥的挂起一下）

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/4696d7ca-fbbf-4d26-a88b-0b1b9b153f21.png)

## 添加WebDAV服务器

重启完了以后，我们还是打开服务器管理器，在右上角的工具里面找到IIS工具

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/abddc062-06a7-4c72-a8d4-ccb4dcb709f3.png)

然后添加一个网站，物理路径就是你想要共享的文件夹位置，记得改下端口（当然你不介意用`80`的话可以不改）

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/af2a3004-1419-4aa6-ab63-85ca22ec9aea.png)

设置好了点确定，然后双击我们刚刚添加的网站，找到WebDav创作规则

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/16d3fea4-4dd0-4a2b-8f0d-cac2899cc05d.png)

然后在右侧添加一个`创作规则`，具体配置按需配置，你也可以按照我这么选，然后点确定

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/d6c3175c-3b2e-48b3-833e-60a6556c3ac4.png)

## 设置身份验证

既然是WebDAV，那肯定得加上身份验证

我们双击左边树状图里我们的网站，然后选择身份验证

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/e8220113-d348-4ebb-8768-c43b569db17d.png)

如果你需要匿名登录你就保持匿名为启用（注意做好目录限制），然后把第二个`Windows 身份验证`给打开

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/9d752f21-f2dd-4083-8759-acbed5a5e347.png)

## 开启目录浏览

再次双击左边的树状图里的网站，找到目录浏览，点击右边的启用

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/6102bdd1-9039-41ad-9e2d-a70f18e7130e.png)

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/936e71a9-4667-41df-8c33-0094701bd0f3.png)

搞定了以后，我们双击树状图里我们的网站，在右边重启一下我们的网站

## 测试网站

重启了以后，我们在浏览器里访问我们的网址（`IP地址:端口`），如果弹出像我这样的身份验证页面（或者直接不弹，直接看到了目录，取决于你是否开了匿名访问），登陆完进去看到目录树，就是成功了

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/947a6bc9-fc7d-474b-b30d-332dfd2a6766.png)

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/c6f3e7df-99de-4cba-ae36-b6d1b1672a0a.png)

**如果出现了500错误，然后详细信息里面写`由于权限不足而无法读取配置文件`的话，你就需要右键你网站的目录，选择安全，把你的用户加进去**

## 设置MINE类型

如果你不设置MINE类型的话，会导致你点一个非主流后缀名的文件，出现404（注：`web.config`文件本身请求就会404，不是MINE问题）

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/a9599f6e-45ab-422d-a803-d6ad453cb63f.png)

我们还是去到IIS，在自己的网站配置下找到`MINE类型`这个选项

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/e984fbd1-a495-4511-aad7-31c396a2f21f.png)

在右边点`添加`，然后按我这么填（一劳永逸）

上面填`.*`，下面填`application/octet-stream`

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/422b568e-282a-4d66-b5e1-c19bf1dd1fe4.png)

然后重启一下网站就可以了

## 使用Cloudflare Tunnel映射

首先你电脑得装Cloudflared，关于这东西的用法在这里不多讲，这里假设你已经装好了

我们去到`Zero Trust`，然后去到`Tunnel`

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/a4a84e3a-2a52-401e-ba6c-7e8257bb70fb.png)

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/f0bc5298-9fd5-4c0b-b2a0-a290b01e7746.png)

找到自己的服务器，进去后在`Public Hostname`添加一个网站，可以按我这么填（上面域名啥的就填自己的了）

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/204330fb-56ce-4f17-ae4c-ee1acbbc1579.png)

然后我们再测试从Cloudflare的Tunnel那边访问一下，确认正常

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Webdav-on-Windows-Server/045d5e4b-3846-42ab-9e61-8418a7ffd068.png)
