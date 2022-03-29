---
title: 日常吐槽07 - 记录一次成功的举报经历
date: 2020-07-27 10:13:32
tags: diary
categories: diary
cover: https://cdnjsdelivr.bili33.workers.dev/gh/GamerNoTitle/Picture-repo-v1@master/img/Diary7/cover.png
---

{% note danger %}

在这里仅记录我成功举报的一次经历，希望大家引以为戒，同时，我不玩PUBG，也不用约我打PUBG

另外，我在发邮件的过程中忘记用其他邮箱了，也就是我用了我的域名邮箱[admin@bili33.top](mailto:admin@bili33.top)，如果现在在看本文的是那位办网站的老兄，请你记住：不管有多少这样的网站，只要我遇到了，通通举报！我不会改变我的做法，我希望弄这些钓鱼网站的人更少，同时给PUBG一个良好的游戏环境！

{% endnote %}

前几天我在浏览Steam商城，因为当时没啥好玩的了，想去看看有啥游戏，结果发现了下面这样的信息（我看到的是评测中的信息，忘记截图了，而且那个用户也被我举报并屏蔽且被V社处理了，这里是一张**网上的图**，我遇到的给的链接是<font color=#FF0000>pubgjosn.fun</font>（危险别点））

![网图](https://cdnjsdelivr.bili33.workers.dev/gh/GamerNoTitle/Picture-repo-v1@master/img/Diary7/Phishing-Message.png)

点进去用户界面，看到是个把个人信息设置为隐私的账户（**此处仍然为网上的图**）

![还是网图](https://cdnjsdelivr.bili33.workers.dev/gh/GamerNoTitle/Picture-repo-v1@master/img/Diary7/userinfo.png)

我点进去一看，哟，这不是钓鱼网站嘛，长得还挺像PUBG的官网，不过开篇就是给枪皮，这价值我也不知道有多少，反正看这域名就不是官方网站

![非官方网站](https://cdnjsdelivr.bili33.workers.dev/gh/GamerNoTitle/Picture-repo-v1@master/img/Diary7/Unofficial-website.png)

我试着在这个页面点击除了领取以外的按钮，发现就连阅读个新闻也要登录，这不符合逻辑，看来这个网站没啥，也就UI像了点，其他没啥

弹出来给我的Steam登录界面，地址栏写的是about:blank，也就是所谓的空白页，但是按照Steam的登录页面的逻辑，他应该是会写[https://steamcommunity.com/?XXXXX](about:blank)之类的，这肯定也是个钓鱼的登录界面，随便输入个账号，就要手机验证码，骗谁呢~

接着，我去查了一下whois，发现他的DNS解析在CloudFlare，因为听说CloudFlare有停止解析服务这一说，所以我就去CloudFlare投诉了一波（投诉界面忘记截图了）

第二天早上起来，发现CloudFlare给我发了封邮件

![CF的邮件](https://cdnjsdelivr.bili33.workers.dev/gh/GamerNoTitle/Picture-repo-v1@master/img/Diary7/Response-of-Cloudflare.png)

接着，我访问该网站，发现已经被挂上了红色警告

![CF小红信](https://cdnjsdelivr.bili33.workers.dev/gh/GamerNoTitle/Picture-repo-v1@master/img/Diary7/Unofficial-website-warning.png)

CloudFlare这波干的不错，返回来看CF给我发的邮件，里面还说到了以下几种方法（黄色部分，这里是在mail.ru，也就是我的域名邮箱托管的平台）

![CF的提示](https://cdnjsdelivr.bili33.workers.dev/gh/GamerNoTitle/Picture-repo-v1@master/img/Diary7/tips-of-Cloudflare.png)

然后我又去查了一次whois，发现他是在reg.ru这个网站上注册的域名，接着我又去查这个网站的举报方式，发现了[abuse@reg.ru](mailto:abuse@reg.ru)这个举报邮箱

接着再发一封邮件，提出这种情况

![发邮件给reg.ru](https://cdnjsdelivr.bili33.workers.dev/gh/GamerNoTitle/Picture-repo-v1@master/img/Diary7/mailto-reg-dot-ru.png)

不久后便收到了来自该域名注册平台的邮件

![REG.RU的回复](https://cdnjsdelivr.bili33.workers.dev/gh/GamerNoTitle/Picture-repo-v1@master/img/Diary7/replyfrom-reg-dot-ru.png)

举报完成，收工！

在我即将开始写文的时候，发现我的Steam弹了一条V社的信息

![V社的信息](https://cdnjsdelivr.bili33.workers.dev/gh/GamerNoTitle/Picture-repo-v1@master/img/Diary7/message-from-valve.png)

这次举报真的大快人心！

下次继续！