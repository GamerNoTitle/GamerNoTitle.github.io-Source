---
title: 日常吐槽09：关于我得知Github查封Action仓库的信息后我自行删除脚本的这档事
date: 2021-05-22 22:06:17
tags: [diary, Github, Action]
categories: diary
cover: https://user-images.githubusercontent.com/28426291/119224095-73777e00-bb2f-11eb-8158-0518afa53667.png
---

> 本文直接从我个人的讨论区复制过来的，图片是GithubUserContent域名下的，加载可能有点慢
>
> 原链接：[关于得知Github查封Action仓库的信息后我自行删除脚本的这档事 #2](https://github.com/GamerNoTitle/GamerNoTitle/discussions/2)

关于得知Github查封Action仓库的信息后我自行删除脚本的这档事（不要以为随便起个标题就是长标题了呀喂(#`O′)）

昨天（2021.5.19）收到别人在我的网站下留言是这么说的：
![image](https://user-images.githubusercontent.com/28426291/118961191-a2a6b780-b996-11eb-9986-1f4f8f67dedf.png)
鉴于这位之前发过mcbbs的账号给我，所以我迅速就取得了联系（邮件上），然后得到了下面的消息（[直链](https://t.me/TestFlightCN/9781)）：
![image](https://user-images.githubusercontent.com/28426291/118961440-e699bc80-b996-11eb-922e-2ff5c4c77781.png)![image](https://user-images.githubusercontent.com/28426291/118961398-de418180-b996-11eb-97ab-699981bb7d11.png)

我也是非常震惊，本来打算第二天（2021.5.20）把所有仓库删了的（因为临近高考没带智能手机），但是正巧，晚上有同学来找我拷毕业照拍摄当天的照片，所以我就借了一台手机把我的源码备份了然后全部删除了

这就是我删除了我的仓库的原因，按道理，所有的Fork会变成Origin类型的仓库（即源仓库，搜索是能检索到的），但是实际上当我检索我的两个仓库的时候就发现，220+的wyycg-autocheckin只有 个搜索结果，而另一个有120+的bilibiliJudge只有2个搜索结果
![image](https://user-images.githubusercontent.com/28426291/118962052-8d7e5880-b997-11eb-8956-8213525c2b42.png)
![image](https://user-images.githubusercontent.com/28426291/118962000-80fa0000-b997-11eb-9496-2588a021114f.png)

说明Github这波是真的行动了，可能是我行动比较早，所以目前没受到封号

有的人可能会问：如果我把仓库调成私有呢？
结果是：虽然私有仓库GItHub官方"不能"看到你的内容和Action的详细记录，但是发现了异常他们也可以提权处理
![image](https://user-images.githubusercontent.com/28426291/118962344-da622f00-b997-11eb-90a9-36f646e228ef.png)

至于那些没有提供Action的运行方式的而是云函数的那些，也遭到了不同程度的后果
![image](https://user-images.githubusercontent.com/28426291/118962473-febe0b80-b997-11eb-94f6-7218e3678df3.png)
![image](https://user-images.githubusercontent.com/28426291/118962503-08477380-b998-11eb-97ed-65cfcfcb802d.png)

那如果我配布到Gitee呢？
事实上，Gitee的功能并没有Github那么好用，而且就个人而言我比较讨厌Gitee，所以我应该是不会配布到Gitee的
![image](https://user-images.githubusercontent.com/28426291/118962651-2e6d1380-b998-11eb-9adf-1e59c09b7bb8.png)

总而言之，这一次的时间对于整个脚本界都是一次灾难，我们从来没有想过Github会清理脚本类型的仓库。对我来说，因为行动比较早所以没有受到严重的影响，但是我近期应该不会再致力于脚本的开发工作了，临近高考压力也比较大。等高考完网易云那个应该会做成云函数版在Github重新配布（会配Action文件但是如果要启用的话需要自己挪入对应的位置），B站那个嘛，看情况而论。

---

题外话：
虽然我每次都把三个Badges丢在脚本的开头，但是实际上没有任何一个人给我赞助（o(╥﹏╥)o）
<a href="https://afdian.net/@GamerNoTitle"><img src="https://img.shields.io/badge/%E7%88%B1%E5%8F%91%E7%94%B5-GamerNoTitle-%238e8cd8?style=for-the-badge" alt="前往爱发电赞助" width=auto height=auto border="0" /></a> <a href="https://assets.bili33.top/img/Donate/WeChatPay.png"><img src="https://img.shields.io/badge/%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98-GamerNoTitle-%2304BE02?style=for-the-badge" alt="使用微信赞助" width=auto height=auto border="0" /></a> <a href="https://assets.bili33.top/img/Donate/AliPay.jpg"><img src="https://img.shields.io/badge/%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%AF%E4%BB%98-GamerNoTitle-%231678FF?style=for-the-badge" alt="使用支付宝赞助" width=auto height=auto border="0" /></a>

有的时候我在想：做脚本是否是一件正确的事情，
之前我的B站仲裁脚本只是开了个坑（建了个仓库并写了个README），就有别人来支持我了，到现在我们两个还保持着联系。他经常发我一下风纪委员会的总结专栏下面的评论：
![image](https://user-images.githubusercontent.com/28426291/118963142-bc48fe80-b998-11eb-9a78-5dcc57722521.png)
![image](https://user-images.githubusercontent.com/28426291/118963206-cd920b00-b998-11eb-81e4-dc5ad0c4c3a7.png)

我们在做/使用脚本的过程中是否侵犯了其他用户的利益，我觉得这是值得我们脚本开发者和使用者深思的事情。反正我近期不会再开发脚本了（一部分是高考，一部分是现在在做Koikatu的卡牌，不懂得自己搜）

如果你有什么建议/意见，可以在这个Discussion下面留言，看到必回。就这样\(^o^)/

---

### 2021/5/22 更新

今天回家后发现本人小号有两个仓库已经中招了
![image](https://user-images.githubusercontent.com/28426291/119224057-43c87600-bb2f-11eb-8282-1deeaff06191.png)
![image](https://user-images.githubusercontent.com/28426291/119224065-4cb94780-bb2f-11eb-818a-6afe1de837a4.png)
![image](https://user-images.githubusercontent.com/28426291/119224095-73777e00-bb2f-11eb-8158-0518afa53667.png)