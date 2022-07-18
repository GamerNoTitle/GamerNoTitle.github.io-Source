---
title: vercel搭建反向代理
date: 2022-07-18 22:04:45
tags: Tech
categories: Tech
cover: https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/vercel-reverse-proxy/chrome-20220718-221703.png
---

首先你需要安装一下vercel的命令行工具，使用npm进行安装（需要安装nodejs，没安装的自己去下一个）

```shell
npm i -g vercel
```

当然你也可以用cnpm安装

```shell
cnpm i -g vercel
```

安装完后可以使用`vercel -v`来看看是否安装成功了

```shell
vercel -v
>> Vercel CLI 24.2.4
>> 24.2.4
```

接着把下面这些内容复制到一个json文件里面

```json
{
    "version": 2,
    "routes": [
        {"src": "/(.*)","dest": "https://bili33.top/$1"}
    ]
}
```

其中，我的域名那里可以改成你想要反代的网站的域名，例如填写`cdn.jsdelivr.net`，就可以按照jsdelivr的格式去使用它的CDN，例如

```json
{
  "version": 2,
  "routes": [
    {"src": "/(.*)","dest": "https://cdn.jsdelivr.net/$1"},
    {"src": "/","dest": "https://bili33.top"}
    ],
  "redirects": [
    {"src": "/npm/(.*)", "destination": "http://127.0.0.1"}
  ]
}
```

这里`redirects`是访问特定的route的时候进行重定向，可以达到禁止访问的目的（但是实测好像并不太行）

更多关于json文件的适用方法，可以参照https://vercel.com/docs/project-configuration

写完json文件以后，就开始对vercel的cli进行验证，使用`vercel login`进行登录

```shell
vercel login
Vercel CLI 24.2.4
> Log in to Vercel (Use arrow keys)
> Continue with GitHub
  Continue with GitLab
  Continue with Bitbucket
  Continue with Email
  Continue with SAML Single Sign-On
  ─────────────────────────────────
  Abort
```

按上下键可以选择登录方式，我就直接用Github登录了，会返回一个登录地址，可以直接在浏览器打开

登录完成后会像我下面这个这么提示

```shell
vercel login
Vercel CLI 24.2.4
> Log in to Vercel github
> Success! GitHub authentication complete for gamerpesy@outlook.com
Congratulations! You are now logged in. In order to deploy something, run `vercel`.
💡  Connect your Git Repositories to deploy every branch push automatically (https://vercel.link/git).
```

接着我们对刚刚的json文件进行部署，使用下面的命令即可

```shell
vercel -A <name>.json --prod
```

这里的json的文件名要指定为你刚刚设置的文件，`--prod`是推入生产环境，按照提示输入就行了

```shell
vercel -A <name>.json --prod
Vercel CLI 24.2.4
❗️  Your Project was either deleted, transferred to a new Team, or you don’t have access to it anymore.
? Set up and deploy “<your folder>”? [Y/n] y
? Which scope do you want to deploy to? <your username or team>
? Link to existing project? [y/N] n
? What’s your project’s name? vercel-json
? In which directory is your code located? ./
No framework detected. Default Project Settings:
- Build Command: `npm run vercel-build` or `npm run build`
- Output Directory: `public` if it exists, or `.`
- Development Command: None
? Want to override the settings? [y/N] n
🔗  Linked to <user/project> (created .vercel)
🔍  Inspect: <Your inspect link> [961ms]
✅  Production: https://vercel-json.vercel.app [copied to clipboard] [10s]
```

部署完后你就可以在Vercel中找到，并进行配置了
