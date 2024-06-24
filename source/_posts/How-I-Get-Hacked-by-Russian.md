---
title: 复盘：我是怎么被毛子黑客给黑了的
date: 2024-06-18 21:23:07
tags: [Hack]
categories: diary
cover: https://cdn.bili33.top/gh/Vikutorika/newassets/img/How-I-Get-Hacked-by-Russian/olk_JK9UAoTfTp.png
---

## 事件回顾

### 第一天

在五月劳动节放假后的一天中午，我像日常一样，打开了OPPO Watch 2上的Outlook，看看今天有没有新的issue发过来，结果就看到了令人窒息的东西（手表重置了，用电脑端Outlook代替）

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/How-I-Get-Hacked-by-Russian/olk_JK9UAoTfTp.png)

我第一反应就是：完了，肯定是Steam给人盗号了。于是我立马飞奔找到宿管，找她拿我的手机（复读的时候我的手机除了第一个月给了班主任，后面都是给的宿管，因为有急事可以找她拿）

开机后，我打开了我的Steam手机应用，清除授权设备、修改密码一条龙后，算了一下，它只卖了我CS存储组件里面的胶囊和巴黎纪念包（我也不知道它是怎么只动仓库组件的东西的，明明我库存里面就有组合包），损失大概在800RMB左右

我当时就在Telegram频道里发了我的吐槽和我的各种猜想

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/How-I-Get-Hacked-by-Russian/Untitled.png)

不过猜想归猜想，也没时间去看是怎么一回事，我以为这就结束了

### 第二天

在这天，我打开了Outlook，首先看到的是来自facebook的消息

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/How-I-Get-Hacked-by-Russian/olk_YbzAdRmTBU.png)

我心想：不对啊，它好像不只是Session劫持，它可能连我的Edge密码库都拿走了（我用的是Edge自带的密码管理+手机的Microsoft Authenticator管理密码）

在接下来的一周，我就进入了删密码库的密码+改重要网站的密码的模式

但是但是，我还是太天真了

### 不知道几天后了（5/16）

在这天，我问了一下瓦转区的那边，我在1号放假的时候提交了转区的服务，找的是淘宝

因为我知道那边在转区，所以我是没有改瓦的密码的，同时账号关闭了二步验证

结果不问不知道，一问吓一跳，我让对方登录了我的账号查看情况后，他告诉五月几号有一笔VP消费

我心想不对啊，我五月回去没打瓦而且也没买东西啊，立马叫人帮我改密码，上我的号去看情况，心想别拿我的号去开了，但是最坏的结果还是来了

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/How-I-Get-Hacked-by-Russian/Valorant-Banned.png)

（损失+2000RMB）

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/How-I-Get-Hacked-by-Russian/msedge_LvTnlmUjRV.png)

去查了看了一下，估计是当黑号卖出去了，拿我的号打了几把排位（顶上这四把）

我当时我就在Telegram频道里面开骂了

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/How-I-Get-Hacked-by-Russian/Telegram_jiFJ0M2FuA.png)

最痛恨毛子的一集……我并不是地域黑，只是很难受，当时是两周后就进行三模，没办法啊只能调整自己的心态

瓦商家那边也是说尽量会帮我申请一下工单（实际上我知道人家也是安慰我，三方封禁几乎没发解开）

### 我是怎么知道是毛子干的？

只能说我不能百分百确定，但是我觉得大差不差，Steam语言被改成了毛子语，结合一下毛子的计算机教育水平（毛子那边从小就接受计算机教育的，不像国内比较滞后），所以我觉得应该是毛子干的活

![我改密码时的邮件都是毛子语](https://cdn.bili33.top/gh/Vikutorika/newassets/img/How-I-Get-Hacked-by-Russian/olk_wpL1G2zsHX.png)

## 攻击方式

关于我是怎么被攻击的，我的猜想是这样的

首先时间要回到五月三号，我要回学校之前，我在假期的时候做了一个崩铁和舟自动肝游的一个自动化流水线[GamerNoTitle/Temp-Auto_HSR: 临时的星穹铁道自动清每日脚本，仅供参考，因为五月实在是没什么空上游戏才做的，不会更新 (github.com)](https://github.com/GamerNoTitle/Temp-Auto_HSR)

然后我就想下Teamviewer做远程桌面连接来当保险，但是TV这个软件我之前用过，它个人用户也很容易识别为商业用途，导致5分钟断连，我就去下了一个tv的破解补丁

国内网站（包括Bing China、百度）搜到的补丁的版本都太老了，于是我去了Google搜索，并下载到了补丁

但当我打开压缩包内的exe文件时，没有任何的反应，我甚至认为是没开起来，再开了一次，还是没有起疑心

但其实这个时候，这个程序就已经在搜集我的电脑信息了，从Steam那里盗取我的Session、从Edge密码库拉走我的密码

在这个时候，我感觉我跟Linus（加拿大白嫖王）一样，犯了同样的错误（[My Channel Was Deleted Last Night - YouTube](https://www.youtube.com/watch?v=yGXaAWbzl5A&ab_channel=LinusTechTips)）—— 对于一个没有意义期望的方式运行的文件没有起疑心……

我在回校的时候，手机的Steam已授权设备没有退出登录自己的账号，这就导致了会话一直可用，黑客就得到了机会对我的库存下手

而密码库，如果不是fb给我发了邮件，我可能都不知道密码库给拿走了，但是我也没有联系转区那边，这也是我的一个疏忽，当时就应该联系那边跟他们说改了密码，但是现在说也是马后炮了

### 为什么电脑防御机制没有触发

很简单，因为我用的是纯Windows Defender，没有装过其他的，而Windows Defender对于加壳的文件来说就是个摆设

## 事后处理

其实上面说过了一部分，我改了密码，至于瓦，这个真没办法，我用原生的美国主机发工单，都能被拳头检测出来是中国大陆

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/How-I-Get-Hacked-by-Russian/olk_eT1fxGsaOJ.png)

只能说损失已定，没法挽回，后面又去螃蟹买了个瓦的号来玩

密码管理器这边，我更换为了Bitwarden，使用的是官方服务器，然后删除了我浏览器里面的所有密码（其实我以前用的lastpass，但是它收费了）

安全软件上，我装了火绒6.0，然后开启了最高级别的防护

## 结语

这次确实是一次大失败，我是这么自嘲的

> 搞过安全的被人黑了

只能说以后注意了，不能再犯同样的错误了……
