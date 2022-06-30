---
title: Teamspeak服务器搭建指南
date: 2022-05-07 13:03:11
tags: Tech
categories: Tech
cover: https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/TeamSpeak-20220507-173159.png?download=true
---

在跟群里的水友们进行语音的时候，我用的一般都是扣扣语音，没错就是那个Bug百出而且还超级烂的扣扣语音，虽然有一段时间用过开黑啦，但是感觉不如Discord的体验好。但是水友又不是个个都会用Discord，后来经过我们的商讨，我们决定转战Teamspeak.

下面我将会以我的经验来告诉你，一个Teamspeak服务器应该怎么搭建

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/TeamSpeak-20220507-173159.png?download=true)

---

首先Teamspeak不像QQ那样有官方的服务器可以用，所有的服务器都是自己搭建的（当然也有很多别人搭建好的能用，不过为了安全性考虑还是推荐自己搭建）

**在教程中，我可能会Teamspeak5和Teamspeak3混用（因为我没有TS5的BETA KEY，有些功能还不能用，不过能用TS5的我还是会用TS5）**

## 安装Teamserver

{% note info %}

[TeamSpeak Downloads | TeamSpeak](https://teamspeak.com/en/downloads/#server)

{% endnote %}

你需要到Teamserver的官网下载服务器，根据你的服务器系统下载所需要的版本（上面这个直接指向服务器下载页面）

因为我这台服务器是`Debian GNU/Linux 10(Py3.7.9) x64`，所以我这里下载linux 64位的版本，下载完以后直接解压

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/msedge-20220507-194553.png)

解压以后会得到下面这张图所示的这一堆东西

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/msedge-20220507-194731.png)

接着我们运行下面的命令

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/msedge-20220507-195059.png)

```bash
sudo chmod +x *
sh ts3server_startscript.sh start
```

它会启动我们的teamspeak服务器，如果你是`root`用户启动，会跟我一样收到来自teamspeak的提醒

{% note warning %}

`WARNING ! For security reasons we advise: DO NOT RUN THE SERVER AS ROOT`

{% endnote %}

如果你觉得以`root`用户启动没啥问题的话也可以不用管它，我这里因为是用了别人的服务器做教学，别人的默认账户是`root`，所以就弹了这个

运行后红框里面的意思就是让我们去看LICENSE和EULA之类的东西（跟你开个MC服务器是一样的），这里我们新建一个`.ts3server_license_accepted`来代表我们已阅读并同意LICENSE和EULA（请认真阅读后再进行此操作）

```bash
touch .ts3server_license_accepted
```

接着我们再次运行teamspeak服务器，这次就会正常开启了

第一次开启会给我们一个privilege key（特权密钥），我们需要用这个密钥来认领我们的服务器（认领的同时我们会获得管理员权限）

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/msedge-20220507-195914.png)

不过在连接之前，请确保你的防火墙开放了如图所示的端口

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/msedge-20220507-195653.png)

接着我们连接我们的Teamspeak服务器，如果是TS3的话，首次连接会直接弹出认领窗口，如果是TS5就会像我这样

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/TeamSpeak-20220507-195953.png)

我们把刚刚获得的特权密钥填入，这样我们就获得了服务器的管理员权限。同时，其他用户也可以通过teamspeak连接你的服务器了

## 配置服务器

认领完成后，你的右上角应该有一个铅笔样的图案了，点击它，你就能够修改服务器的一些信息

配置项如图

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/TeamSpeak-20220507-200501.png)

配置完后点击右上角的勾勾就可以了

## 频道管理

在我上面这张图的底下，有一个Create Channel，点击这里就可以创建频道了，分别可以设置频道的名字、密码、位置、有效期

如果没有勾选永久（TS3有临时和半永久）的话，临时频道在所有人退出后会自动销毁，半永久没用过，有用过的可以评论区说说

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/TeamSpeak-20220507-200630.png)

创建完成后，点击频道，可以看到频道的相关设置项，同样点击上面的铅笔图标进行修改

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/TeamSpeak-20220507-200824.png)

{% note warning %}

关于图标需要注意的东西：图标必须是方形（否则会给你截中间），而且大小不能超过8kb

{% endnote %}

你可以设置频道的描述、话题、名字、语音质量、语音解码方式，一般来说语音质量可以拉满，5M的小水管都能跑

配置完后同样点击右上角的勾勾来应用就可以啦

## 用户管理

你可以通过右键一个用户来给他相应的服务器/频道权限，也可以单击该用户，在左边的Groups里面修改权限（TS5的功能）

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Teamspeak-Server/TeamSpeak-20220507-201113.png)

对于有管理权限的用户，可以踢出用户以及BAN人，服主可以将管理员权限给信任的用户进行管理，这样也能在自己不在线的时候维持服务的秩序
