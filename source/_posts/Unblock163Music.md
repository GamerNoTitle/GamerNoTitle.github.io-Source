---
title: 网易云音乐去除版权限制（Nodejs）
date: 2020-01-18 12:03:32
tags: Software
categories: Software
cover: https://media.licdn.com/dms/image/C511BAQEqj9j0uGy1CQ/company-background_10000/0?e=2159024400&v=beta&t=pcMFMvgFKed2EXmWHax_cuLfhFYJIrhqH0_eIgFg9nQ
sage: false
---

{% note info %}

### 2020.3.23重制

{% endnote %}

**今天拿网易云开刀~**

网易云音乐一直是我们使用得比较频繁的音乐平台，可是他的版权问题实在是令人发寒，每次搜索音乐就看着灰色的歌名失望。。。而隔壁的扣扣音乐就什么都有
![灰色的网易云音乐](https://f002.backblazeb2.com/file/GamerNoTitle-img/home/UnblockNeteaseMusic/CloudMusic-Gray.png)

这种情况真的很烦，点开一首歌直接告诉你因版权无法播放，这时候我们就需要脚本登场了
脚本由@nondanee编写，原理是将其他音乐网站的链接替换到网易云，所以并不存在破解网易云音乐的软件，与法律并不矛盾。
源代码可以点[@nondanee/UnblockNeteaseMusic](https://github.com/nondanee/UnblockNeteaseMusic)，在使用之前，需要安装nodejs环境

```bash
$ git clone https://github.com/nondanee/UnblockNeteaseMusic.git
```

克隆代码后，在文件夹里启动命令窗口，输入

```bash
$ npx @nondanee/unblockneteasemusic
```

就可以打开程序了，如果提示npx未找到，请先使用

```bash
$ npm install npx -g
```

来安装npx哦~

启动了以后，在你的网易云音乐里面修改代理，按照你的配置填写即可！

![代理修改](https://f002.backblazeb2.com/file/GamerNoTitle-img/home/UnblockNeteaseMusic/Proxy.png)

---

题外话：

最近Github的地址raw.githubusercontent.com好像被墙了？不能直接在Github网站中下载RAW文件，很烦

CloudFlare的Workers最近也是BUG一大堆，总是给我抛出1101错误，先不搭建新的反代了……

本网站的邮件提醒已经搭建好了，以后留言就有邮件了~