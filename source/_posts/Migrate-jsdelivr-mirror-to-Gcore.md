---
title: 将jsdelivr镜像源迁移到Gcore —— Gcore CDN使用
date: 2023-01-05 16:35:04
tags: ["Gcore", "CDN", "jsdelivr"]
categories: Tech
cover: https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/msedge-20230105-165402.png
---

{% note info %}

哔哩CDN官网：[哔哩CDN - 你的CDN镜像源好帮手 | GamerNoTitle (bilicdn.tk)](https://bilicdn.tk/)

{% endnote %}

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/msedge-20230105-165402.png)

这几天一直在弄点其他的东西，昨天弄了个哔哩漫游的服务器（用的vercel），然后一看我的vercel的流量使用，这才多久就已经60G了，一个月的限额可是100G

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/chrome-20230105-165635.png)

让我想起上次我的服务被打，一天就区队去掉了150G，vercel直接给我报警，我就在想有没有其他的代替方案

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/chrome-20230105-165741.png)

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/ApplicationFrameHost-20230105-170152.png)

虽然Vercel会判定为DDoS攻击，但是确实很恼人，而且流量没了以后Vercel是会闹脾气的，上次跟群友（就[ClientWorker | 一个基于规则驱动的前端路由拦截器](https://clientworker.js.org/)的维护者）讨论过这个问题，然后说建议弄个缓存，不过我对Vercel没有研究的多仔细，所以就没弄了

今天突然想到可以用Gcore，它有类似于CloudFlare的CDN服务，而且还挺快的，说干就干！

---

## 战前准备

- Gcore账号
- 自己的域名
- 脑子

## 创建CDN资源

首先我们在左侧找到CDN，然后新建一个资源

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/msedge-20230105-174403.png)

加速类型我们选择第二个（第一个要改的东西太多了而且设置很麻烦还是算了吧）

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/msedge-20230105-174752.png)

第二步是设置源站和自定义域名，源站就直接填入`cdn.jsdelivr.net`，自定义域名就填自己的域名就好了，HTTPS打开，然后选择第一个`Get free Let's Encrypt certificate`

这里有个坑：如果你要使用自己的证书，**不要用Cloudflare的SSL里面颁发的证书**，没有Cloudflare小云朵的庇护的话那个证书是无效的！（这个坑了我至少半小时）

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/msedge-20230105-175007.png)

接着我们去DNS那里加一条记录（这里CNAME是跟账户绑定的，我的我自己用`*`屏蔽了）

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/msedge-20230105-175332.png)

后面直接确认过去就好了，**要用CDN的话直接将资源文件的域名改为你的自定义域名**

## 修改设置

这里有几个要改的设置

### Origin pull protocol

这个是修改为源的协议就行了，如果你的源站，支持啥就选啥，因为jsd支持`HTTP`和`HTTPS`所以我直接选择了第三个

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/msedge-20230105-175745.png)

### Custom domain

这里可以添加自己的自定义域名，具体不讲，添加CDN资源的时候应该都加完了

### CDN caching

这里设置CDN的缓存时间，按照自己的需求设置

### Redirection from origin

这个很重要！！！如果不打开的话，访问的用户遇到重定向会直接重定向到指向的链接，打开的话CDN这边就会获取重定向后的内容然后返回给用户。因为jsd重定向到`raw.githubcontent.com`，这个国内会404，所以如果是jsd的反代的话一定要打开，下面的状态码直接全部选上就行了

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/msedge-20230105-180023.png)

### Browser caching

这个用来控制浏览器端的缓存，根据自己的需要设置

### Redirect HTTP to HTTPS

重定向到HTTPS，懂得都懂

### GZip compression

这个是启用压缩，如果开了的话经过CDN的内容会压缩，省流

### Response headers (add)

可以添加自定义headers，我这里加的东西如图

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/msedge-20230105-180211.png)

显示如下

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/msedge-20230105-180300.png)

### Response headers (hide)

可以隐藏某些headers项，但是我想不到有啥用

### Downlaod speed limit

设置下载速度，应该没啥用

### Basic WAF

这个还处于Beta测试，说白了就是添多一层WAF

## 修改规则

在RULES选项卡（左边）可以到规则页面，可以添加自己的规则。我这里是什么都没有加，到时候封仓库的时候再用

![](https://cdn1.tianli0.top/gh/Vikutorika/newassets/img/Migrate-jsdelivr-mirror-to-Gcore/msedge-20230105-180529.png)

## 总结

这是我第一次用真正意义上的CDN，Gcore还是挺好用的，速度也很快，一个月有1T的流量，应该够用了吧……
