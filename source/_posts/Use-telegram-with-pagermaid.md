---
title: 防止你的Telegram被垃圾私信轰炸 - PagerMaid-Pyro 部署使用
date: 2023-02-02 10:45:52
tags: Tech
categories: Tech
cover: https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Use-telegram-with-pagermaid/Telegram-20230202-110529.png
---

> [TeamPGM/PagerMaid-Pyro: Advanced Multi-Featured Telegram UserBot by pyrogram. (github.com)](https://github.com/TeamPGM/PagerMaid-Pyro)
>
> Replit使用教程 [白嫖Repl.it的服务，让你的服务不间断运行 | GamerNoTitle](/posts/Full-use-of-replit/)
>
> YouTube参考 [橙子知道｜教你开启Telegram私聊验证功能，告别垃圾广告信息 - YouTube](https://www.youtube.com/watch?v=AfS3upbxsMk&ab_channel=耳东橙视频志EDCVlog)

{% note info %}

先去看Replit的使用教程再来看这个会好一点哦

{% endnote %}

## 安装

我们先打开一个Replit实例，创建就好了，类型选到Bash

然后把PagerMaid克隆下来

```bash
$ git clone https://github.com/TeamPGM/PagerMaid-Pyro.git
$ mv PagerMaid-Pyro/* .
$ rm -rf PagerMaid-Pyro
```

然后安装轮子（如果不是在replit运行可以不加`--target=.`

```bash
$ pip install -r requirements.txt --target=.
```

装好了以后，我们还需要修改配置文件

## 配置

我们先把原来程序给我们的配置文件复制一份

```bash
$ cp config.gen.yml config.yml
```

然后打开`config.yml`文件，改下里面的配置

我们先去[Authorization (telegram.org)](https://my.telegram.org/auth)登录我们的Telegram账号，注册一个应用，这个登录界面的验证码是发到你的**Telegram应用**里面的，不是短信！

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Use-telegram-with-pagermaid/msedge-20230202-112457.png)

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Use-telegram-with-pagermaid/Telegram-20230202-112431.png)

登录进去以后，点`API development tools`，根据提示注册一个应用

注册完了应该会出现像我这样的页面

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Use-telegram-with-pagermaid/msedge-20230202-112951.png)

我们把`App api_id`和`App api_hash`复制下来，填入配置文件中

```yaml
api_id: "ID_HERE"
api_hash: "HASH_HERE"
qrcode_login: "False"
```

`qrcode_login`强烈建议打开，因为你很有可能会收不到验证码，还不如扫个码，打开就填写`True`

然后找到`web_interface`配置项，把它打开，可以不用，但是要开，要不然不好保活，`host`要改成`0.0.0.0`，密码记得改一下

```yaml
web_interface:
  enable: "True"
  secret_key: "RANDOM_STRING_HERE"
  host: "0.0.0.0"
  port: "3333"
  origins: ["*"]
```



往下的配置根据自己需要修改，一般来说可以不改

接着我们改下main.sh里面的内容，改成下面的内容

```bash
python -m pagermaid
```

以便我们一键启动

## 使用

准备好你的手机（要登陆了Telegram）和一个二维码生成器，我用的[草料二维码](https://cli.im/text)（没收广告费，确实好用）

Telegram在设置 => 设备 => 登录新客户端，进入扫码模式

然后在控制台打上

```bash
$ python -m pagermaid
```

把我们的PagerMaid打开，然后会弹出二维码或者登录链接，你会发现这个二维码显示不全

所以我们需要把登录链接丢进草料二维码生成器里面，生成一个二维码，拿手机扫一下，这个链接的有效时间是20秒，所以需要快一点

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Use-telegram-with-pagermaid/msedge-20230202-113343.png)

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Use-telegram-with-pagermaid/msedge-20230202-113406.png)



登录后如果配置了二步验证密码的话，还需要输入一下密码，出现像我这样的提示就是成功了

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Use-telegram-with-pagermaid/msedge-20230202-113603.png)

我们随便打开一个聊天窗口（建议找个收藏夹或者私聊，因为你发送的内容和PagerMaid给你返回的内容对方是能看到的），输入`,help`（命令前缀是一个逗号）

会弹出PagerMaid的帮助信息，可以在里面找到命令

## 插件

回归正题，本来用这个东西就是为了用私聊垃圾信息屏蔽的，现在只是装好了后端，还没有安装屏蔽功能

我们在聊天框输入`,apt install pmcaptcha`来安装它

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Use-telegram-with-pagermaid/Telegram-20230202-113758.png)

然后输入`,pmcaptcha show_settings`来查看相关的设置，安装好的同时这个功能就已经打开了

当验证失败的时候就会被封禁（使用的是Telegram的Block功能，我这里选的是Sticker验证方式，使用`,pmcaptcha change_type sticker`就可以换过去了，需要对方发一个Sticker才能通过验证）

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Use-telegram-with-pagermaid/Telegram-20230202-114139.png)

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Use-telegram-with-pagermaid/Telegram-20230202-114216.png)

还有其他的插件，可以自己去探索。这东西有个web控制台的，可以去看看
