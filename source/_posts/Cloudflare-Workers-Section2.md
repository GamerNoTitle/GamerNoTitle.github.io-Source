---
title: Cloudflare Workers反代实战（下）
date: 2020-01-17 21:55:31
tags: [Software, Cloudflare, JSProxy]
categories: Software
cover: https://www.cloudflare.com/resources/images/slt3lc6tev37/2Q8pCVxYreoikOqsomGEGs/d6c70917da99084b1210fe04a241dab9/workers-illustration.png
---

[上篇](/2019/10/25/CloudFlare-Workers-Section1/)说道：
我们已经成功搭建了Workers的反代服务，但是有的时候我们需要绑定自己的域名来访问该网页，那么本篇我们将来讲一讲怎么绑定自己的域名来访问workers
我们先来到我们的域名管理界面，点开自己的任意一个域名，然后点击上面的workers
![workers-in-domain](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Cloudflare-Workers/workers-in-domain.png)
在本界面中，上面的两个按钮点击Add Route
![Workers-Panel](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Cloudflare-Workers/Workers-Panel.png)
然后在上面填写你想要的域名（当然得是你的域名），格式如``<SubDoamin>.<Domain>/*``，下面选择你创建好的Workers配置，例如我在上面填写``g.bili33.top/*``，然后下面选择我的名字叫做"g"的Workers配置文件（用于反代Google)，然后点击保存，这样就成功添加了route，当然这个时候并不是直接访问就可以访问被反代的网站，而是要进行进一步配置~

回到我们的域名DNS解析界面，添加一个CNAME记录，指向我们的Workers，在这之中，Proxy Status一定要设定为Proxied！下面照样给个例子

| Type  | Name | Target               | TTL  | Proxy                                                        |
| ----- | ---- | -------------------- | ---- | ------------------------------------------------------------ |
| CNAME | g    | g.bili33.workers.dev | Auto | ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDQgMzkuNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM5OTk7fS5jbHMtMntmaWxsOiNmNjhhMWQ7fS5jbHMtM3tmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Bc3NldCAxPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMDQgMjAuMTIgOTQgMTAuNjIgOTQgMTYuMTIgMCAxNi4xMiAwIDI0LjEyIDk0IDI0LjEyIDk0IDI5LjYyIDEwNCAyMC4xMiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTc0LjUsMzljLTIuMDgsMC0xNS40My0uMTMtMjguMzQtLjI1LTEyLjYyLS4xMi0yNS42OC0uMjUtMjcuNjYtLjI1YTgsOCwwLDAsMS0xLTE1LjkzYzAtLjE5LDAtLjM4LDAtLjU3YTkuNDksOS40OSwwLDAsMSwxNC45LTcuODEsMTkuNDgsMTkuNDgsMCwwLDEsMzguMDUsNC42M0ExMC41LDEwLjUsMCwxLDEsNzQuNSwzOVoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik01MSwxQTE5LDE5LDAsMCwxLDcwLDE5LjU5LDEwLDEwLDAsMSwxLDc0LjUsMzguNWMtNC4xMSwwLTUyLS41LTU2LS41YTcuNSw3LjUsMCwwLDEtLjQ0LTE1QTguNDcsOC40NywwLDAsMSwxOCwyMmE5LDksMCwwLDEsMTQuNjgtN0ExOSwxOSwwLDAsMSw1MSwxbTAtMUEyMCwyMCwwLDAsMCwzMi4xMywxMy40MiwxMCwxMCwwLDAsMCwxNywyMnYuMTRBOC41LDguNSwwLDAsMCwxOC41LDM5YzIsMCwxNSwuMTMsMjcuNjYuMjUsMTIuOTEuMTIsMjYuMjYuMjUsMjguMzQuMjVhMTEsMTEsMCwxLDAtMy42MS0yMS4zOUEyMC4xLDIwLjEsMCwwLDAsNTEsMFoiLz48L2c+PC9nPjwvc3ZnPg==) |

然后添加进入DNS解析，这时候我们再访问自己的域名（在这里是[g.bili33.top](http://g.bili33.top)），然后就发现我们进入了自己反代的网站

![](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Cloudflare-Workers/Result.png)

当然这也有一定的缺点：

1、因为Redirect URL与api不一致，所以反代出来的网站一般无法登陆

2、使用了Google Recaptcha之类的验证码用于网站保护的网站可能会因为Redirect URL不一致而导致无法访问（如Google自带的Recaptcha保护机制将导致无法进行搜索，这种情况下更换被反代的Google地区即可）

---
{% note primary %}
#### 2020.3.14 更新
今天给我的博客上SSL，然后临时把CloudFlare自带的SSL关掉了，代理Google旗下网站出现了重定向次数过多的问题，把SSL调回Flexible就可以了，目前只发现Google旗下产品会出现此问题，其他暂未发现
{% endnote %}

---

题外话：

网站终于又开始更新啦！小高考考得个人感觉还不错，二月份出成绩\*V*，六月份还有物理和政治的……

[@TheBaiRuo]( https://github.com/TheBaiRuo )的公网IP被墙了，需要备案，所以他的网站进不去，确实是有点惨吼，Github Pages它不香吗？

另外，在Cloudflare的workers调试界面有可能会出现500的错误码，忽略就好，实际上部署后是可以访问的（除非cloudflare分配给你的服务器炸了）

