---
title: 使用Vercel平台部署哔哩漫游服务器（HK、SEA）
date: 2023-01-04 22:41:39
tags: [Tech, flyio, biliRoaming, Host]
categories: Tech
cover: https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Deploy-biliroaming-typescript-server-with-vercel/msedge-20230104-224247.png
---

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Deploy-biliroaming-typescript-server-with-vercel/msedge-20230104-224247.png)

上次用[fly.io](https://fly.io)部署了[biliroaming-go-server](https://github.com/JasonKhew96/biliroaming-go-server)（[教程](/posts/Deploy-biliroaming-go-server-with-flyio/)），但是那个有bug，而且要求比较高（要信用卡，而且要服务器），这几天我在Github有找到了一个项目，可以将哔哩漫游服务器部署在Vercel上面

{% note info %}

Vercel：[Develop. Preview. Ship. For the best frontend teams – Vercel](https://vercel.com/)

项目：[bili-vd-bak/biliroaming-ts-server-vercel: 为BiliRoaming、哔哩UWP 等提供支持。包括支持基本功能、搜索替换、黑白名单的哔哩漫游服务端。部署在Vercel HK1。 (github.com)](https://github.com/bili-vd-bak/biliroaming-ts-server-vercel)

{% endnote %}

---

## 前置条件

- 一个Github账号
- Vercel平台

## 开始使用

我们直接访问这个项目的地址 -> [bili-vd-bak/biliroaming-ts-server-vercel: 为BiliRoaming、哔哩UWP 等提供支持。包括支持基本功能、搜索替换、黑白名单的哔哩漫游服务端。部署在Vercel HK1。 (github.com)](https://github.com/bili-vd-bak/biliroaming-ts-server-vercel)

然后fork一下这个项目，就点击顶上的`fork`键就好了，默认部署是在香港(hkg1)，如果需要修改位置（只有香港和东南亚可选），则直接点开仓库里的`vercel.json`然后把里面的regions改掉

```json
{
  "cleanUrls": true,
  "regions": [
    "hkg1"
  ]
}
```

改成下面这样

```json
{
  "cleanUrls": true,
  "regions": [
    "sin1"
  ]
}
```

## 部署项目

访问Vercel（[Develop. Preview. Ship. For the best frontend teams – Vercel](https://vercel.com/)），登陆以后，新建一个项目

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Deploy-biliroaming-typescript-server-with-vercel/msedge-20230104-225223.png)

然后import一下刚刚fork的项目

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Deploy-biliroaming-typescript-server-with-vercel/msedge-20230104-225208.png)

直接点击`Deploy`，然后等待部署完毕，点击`Visit`，顶上的链接就是你的服务器地址啦！

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Deploy-biliroaming-typescript-server-with-vercel/msedge-20230104-225818.png)

## 使用服务器

在哔哩漫游里面的对应位置填上服务器地址即可！

## Bugs

目前没发现
