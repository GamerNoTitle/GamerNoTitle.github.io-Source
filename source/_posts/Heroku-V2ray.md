---
title: 用Heroku自建V2ray作为紧急连接
date: 2020-11-01 09:46:44
tags: Tech
categories: Tech
cover: https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Heroku-V2ray/cover.png
---

{% note warning %}

### 免责声明

**请遵循当地法律使用，如有违反当地法律造成的责任，拒不承担**

**Heroku 为我们提供了免费的容器服务，我们不应该滥用它，所以本项目不宜做为长期翻墙使用。**

**可以部署两个以上的应用，实现 [负载均衡](https://toutyrater.github.io/app/balance.html)，避免长时间大流量连接某一应用而被 Heroku 判定为滥用。**

**Heroku 的网络并不稳定，部署前请三思。**

{% endnote %}

在开始之前，你需要准备：

- 一个Heroku账号
- 一个CloudFlare账号

准备完这两个东西，你就可以开始下面的操作了

---

### 部署应用

点击右边的这个[链接](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fbclswl0827%2Fv2ray-heroku)，会看到如下的页面，其中`APP name`这里随便填，但是不能跟别人重复（重复或不可用会标红）

如果你这里加载出来了一个变量的框，写着`UUID`，下面有一串字母和数字组成的字符串，你可以修改它，到[这里](https://www.uuidgenerator.net/version4)生成一个，也可以直接保留（推荐修改，这是连接凭证）

![部署应用](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Heroku-V2ray/deploy.png)

### 修改UUID

（如果你在部署的时候已经修改过了UUID，或者认为没必要修改UUID，那就直接往下看CloudFlare部分）

点击`Deploy APP`后就会开始部署，等部署完后下面会出现两个按钮，一个是`Manage APP`，另一个是`View`，我们点`Manage APP`

接着我们点`Settings`，然后点`Reveal Config Vars`，来修改我们的UUID

![修改uuid](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Heroku-V2ray/change-uuid.png)

### Cloudflare加速

我们先到[这个仓库下载它的Release](https://github.com/olixu/cloudflare-ip-ping/releases)来使用其程序找到最适合我们的节点

解压下载的压缩包，用管理员权限运行它的`pingip.exe`，输入线程，等待程序跑完

在`ping_host.log`里面找到延迟最低的IP地址（一般在第一行），把它复制下来，等会会用到

在跑程序的期间，你可以登录你的cloudflare，找到workers，新建一个workers，并把一下代码复制进去

```javascript
addEventListener(
  "fetch",event => {
     let url=new URL(event.request.url);
     url.hostname="change-this-to-your-app-name.herokuapp.com";
     let request=new Request(url,event.request);
     event. respondWith(
       fetch(request)
     )
  }
)
```

把其中的hostname的地址改成你的herokuapp的地址，然后保存

复制直接访问cloudflare提供的域名，如果提示`Bad Request`就可以了，把域名复制下来，等下会用到

### 配置V2Ray

打开你的v2ray，添加vme$$服务器，按照下面的图填写

![配置v2](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Heroku-V2ray/v2conf.png)

然后保存，愉快地使用v2ray就可以了

（不会用v2的自己找教程，这里不教）

### 注意事项

这只是一个临时用的方法，不适宜长期使用

heroku每个月有运行时长限制，只适合轻度使用用户

heroku的实例半小时没有访问就会自动休眠，你可以使用[此项目](https://github.com/GamerNoTitle/WakeHeroku)来避免这个问题

---

### Reference

[Heroku+Cloudflare+V2搭建详细图文教程](https://www.shopee6.com/web/web-tutorial/heroku-cloudflare-v2.html)