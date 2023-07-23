---
title: 白嫖Repl.it的服务，让你的服务不间断运行
date: 2023-02-01 21:39:23
tags: Tech
categories: Tech
cover: https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Full-use-of-replit/msedge-20230201-214059.png
---

之前我用过很多的云平台，什么Azure啦，heroku啦，railway啦之类的，问题是这些平台有些太贵（Azure），有些改了免费策略已经不适合我们这些白嫖党使用（Heroku、Railway），我现在还在用的也就是Glitch（开多个账号，反正一个账号1000H/mo，就是配额太小了）

昨天突然想起telegram有个可以屏蔽垃圾私信的项目（[具体可以看另一篇文章](/posts/Use-telegram-with-pagermaid)），然后又想起之前开发TGbot用过的replit，这不又开始了我的白嫖之旅

---

> Repl.it官网：https://repl.it 或者 https://replit.com
>
> BetterUptime官网：https://betteruptime.com/?ref=88fj （后面是AFF码，不想帮我AFF可以删掉）

## 基础使用

打开replit，使用你喜欢的方式登录（我用的是Github），然后就会进入主界面

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Full-use-of-replit/msedge-20230201-214059.png)

在这里，我们可以点击左边的Create来创建一个实例，里面也有一些模板，可以根据自己的需要创建，我这里就选一个空项目（直接选到bash就行）了

进入到项目的编辑界面，在左边有个`Repl Resources`可以看到配额，这个配额确实不能说很多

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Full-use-of-replit/msedge-20230202-095400.png)

我们点击左边`Files`右边的三个点，然后点击`Show hidden files`，把隐藏文件显示打开，肯定会用到的

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Full-use-of-replit/msedge-20230202-095535.png)

下面会多出两个东西，一个是`.replit`，一个是`replit.nix`，其中，`.replit`里面存放的是项目的配置，包括启动命令啥的；而`replit.nix`里面存放的是nix包的信息，你可以在里面增添你想要的包

因为replit是不能使用`sudo`命令的（特殊手段另说），所以说想要安装新的软件只能通过nix包管理器来加

以pip的安装为例，首先我们在shell里面输入pip的时候会提示未安装，让我们选择需要的pip版本，按需要选择就行

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Full-use-of-replit/msedge-20230202-100341.png)

然后nix包就会帮我们自动安装，在`replit.nix`里面也可以看到加入了一行

```properties
{ pkgs }: {
    deps = [
        pkgs.python39Packages.pip	# 新加的一行
        pkgs.unzip
        pkgs.wget
        pkgs.bashInteractive
        pkgs.man
    ];
}
```

我这里上传一个[biliCDN的主页](https://bilicdn.tk)作为演示，需要注意的是，可能是因为replit的nix路径配置问题，直接用pip安装的时候会出现权限不够的问题，所以我们要加入`--target=`这一个参数来指定安装的目录，我这里直接安装到了当前目录

虽然右边还是报了错，但是左边的目录里面可以看到轮子已经安装完了

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Full-use-of-replit/ERRmsedge-20230202-101440.png)

这时候，修改一下`main.sh`里面的内容，改成能启动我们的服务（不建议改`.replit`里面的内容，容易因为`$PATH`里面没有加入环境变量而无法启动）

```bash
$ python app.py
```

启动完了以后，如果你的是HTTP服务的应用的话，会有一个webview窗口（如图），也会分配一个域名给你，不过可以绑定自定义域名，倒不如说建议绑定自定义域名，分配的`repl.co`实在是太慢了

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Full-use-of-replit/msedge-20230202-104053.png)

## 应用保活

按照replit的规则，应用如果5分钟闲置就会被休眠（所以推荐在这上面部署HTTP服务，如果是TCP啥的容易活不了）

这里我用了网站监控平台[BetterUptime](https://betteruptime.com/?ref=88fj)，用法其实跟很多监控平台一样，就是加入自己的网站，然后定时监控

主要是监控的间隔时间要选择3分钟，要不然容易断掉

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Full-use-of-replit/msedge-20230202-105227.png)

改完然后保存就行了，然后可以在Panel里面看到刚刚加进去的网站，然后放着不管就行了，只要没有报错的话就不会断掉的撒

## 费用

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Full-use-of-replit/msedge-20230202-110026.png)
