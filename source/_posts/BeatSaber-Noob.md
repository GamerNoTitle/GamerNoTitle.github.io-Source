---
title: Beat Saber 萌新踩坑记录
date: 2023-06-25 18:19:33
tags: [Beat Saber, Games, Mod, VR, Pico Neo 3, PicoVR]
categories: Software
cover: https://assets.bili33.top/img/BeatSaber-Noob/steamwebhelper-20230624-150552.png
---

> 本文只是通过我的各种经验，去讲述我玩Beat Saber的时候踩过的坑。如果你需要更完整的Beat Saber萌新教程，请访问[Beat Saber新手教程、问题解答、曲包网盘 - Steam / Oculus / Quest (wgzeyu.com)](https://bs.wgzeyu.com/)
>
> 转载：[VR设备参数对比表（BS中文站）](https://docs.qq.com/sheet/DQmxMZHNPQ1ljWVBE)

我端午的时候，去了一趟SMU，然后从别人那里捞了一台Pico Neo 3回来玩，VR这个东西我一直是很粉的，自从高一那一年第一次玩就戒不掉了。既然捞到了一台PICO，那肯定要玩起来的嘛

**游玩VR游戏之前，请把手柄的手绳戴好，要是手柄甩出去了那就尴尬了撒**

串流相关请阅读 -> [串流方法](#串流相关)

## Beat Saber 踩坑记录

### 买游戏、安装游戏

这个用过Steam的应该都懂吧，直接访问Beat Saber的产品页面，然后花90大洋（阿根廷人和土耳其人可能会便宜点）购买游戏就是了

{% steamgame 620980 %}

安装的话，如果你不需要安装Mod就直接安装就是了，如果你需要装mod，那么请往下看

### MOD相关

#### 安装特定版本的Beat Saber

因为最新版的BS还没有Mod适配，所以我们要装回旧版本

这里有两种方法，第一种是来自于知乎某大佬的方法，稍微繁琐一点，但是通用，请去他的帖子看 -> [【游戏教程】Beat Saber 安装mod并实现换角色模型与设置相机位置 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/102431602)

这里我讲一下第二种方法，也是近期出现的方法

Oculus工作室这边因为升级了Unity的版本，所以他们把旧版本Unity打造的BS归档成了一个测试版，这个测试版的版本号是`1.29.1`，这个版本的mod是有适配的，所以我们可以直接安装这个版本

![](https://assets.bili33.top/img/BeatSaber-Noob/steamwebhelper-20230624-150552.png)

![](https://assets.bili33.top/img/BeatSaber-Noob/steamwebhelper-20230626-122331.png)

右键你的Beat Saber，选择`属性` -> `测试版`，在`参与测试`里面选到`legacy1.29.1_unity_ver2019.4.28f1 - pre unity upgrade build`这一项，然后直接关闭这个窗口就行了

接着按照正常的流程安装Beat Saber，你会看到你的库存里Beat Saber的后面有个中括号`[]`写着当前参与的测试

![](https://assets.bili33.top/img/BeatSaber-Noob/steamwebhelper-20230626-122453.png)

装好了以后，先打开一次游戏，让BS初始化一下，然后再进入安装MOD的阶段

#### 安装MOD

首先，你得去BS中文站下一个`ModAssistant`，当然你要是喜欢用国外源或者是肉身出国了，你也可以去Github下载

BS中文站的`ModAssistant`是经过了修改的，增加了两个国内源 [一键直达](https://bs.wgzeyu.com/pc-guide/#modinstall)

我就直接用BS中文站的那个了，下载后打开是像下面这样的

![](https://assets.bili33.top/img/BeatSaber-Noob/ModAssistant（增强版）-20230626-122843.png)

在左下角那里先切换一下自己的下载源，换好了以后先阅读一下首页的内容，阅读后点`同意`（不同意的可以我的网页了，不同意咋装mod）

下面提示`可以安装mod`后，就可以点击左边的`mod`标签卡了，在里面选择自己喜欢的mod装上（注意左下角的游戏版本是否正确识别了）

#### 额外配置项

点击`ModAssistant`左边的选项，设置一下`OneClick`安装，如果你想手动安装也可以，请阅读BS中文站的指引

![](https://assets.bili33.top/img/BeatSaber-Noob/ModAssistant-20230626-123138.png)

#### 安装光剑/人物模型

你需要去`ModelSaber`网站去找到自己喜欢的东西，然后直接点一键安装就行了，也可以下载了手动安装 [ModelSaber](https://modelsaber.com/)

#### 添加歌曲谱面

你需要去[BeatSaver.com](https://beatsaver.com/)这个地方去找到自己喜欢的谱面，然后安装

##### 有没有更方便的方式？

有，就像我们使用网易云的过程中，网易云有歌单的概念，BS里面也有这个概念，在[BeatSaver.com](https://beatsaver.com/)有别人整理好的歌单，当然，BS中文站也有，你可以在这里找到[Beat Saber曲包资源同步 - ResilioSync (wgzeyu.com)](https://bs.wgzeyu.com/songs/)

## 在VR里面看桌面窗口

这个功能应该是直播用的比较多，这里会用到一个Steam上的软件叫做`OVR Toolkit`（国区售价41RMB，不想买就去三大妈下一个）

{% steamgame 1068820 %}

安装好了后在SteamVR启动之前启动这个东西，就能在SteamVR里面看到它的设置了，在你的左手手腕上（相当于一个手表）

按下扳机键就相当于点一下，建议按照里面的指引进行设置，设置的效果是这样的

![](https://assets.bili33.top/img/BeatSaber-Noob/Screenshot_com.picovr.picostreamassistant_2023.06.26-09.05.01.406_803.jpeg)

当然因为我直播的时候是捕获的Beat Saber窗口，所以观众是看不到我这三个窗口的

OVR的优先级高于VR游戏，也就是说在窗口叠加的时候，它会叠在最高层

![](https://assets.bili33.top/img/BeatSaber-Noob/Screenshot_com.picovr.picostreamassistant_2023.06.26-11.29.04.510_868.jpeg)

## 串流相关

因为Pico不像Valve Index和Meta Quest那样可以直接用SteamVR，所以我们要先下载Pico官方的串流助手

[PICO Link Windows 软件 | PICO中国 (picoxr.com)](https://www.picoxr.com/cn/software/pico-link)

我是直接下载了跟Pico 4一起的那个版本（事实证明如果Neo 3下错了版本的话会爆音，虽然到最后我都没有解决音频问题）

![](https://assets.bili33.top/img/BeatSaber-Noob/msedge-20230626-120624.png)

下载好了安装就是了，然后打开就是像我这样的东西

![](https://assets.bili33.top/img/BeatSaber-Noob/Streaming_Assistant-20230626-120739.png)

根据自己的需要选择串流的方式就行了（个人观点：优先有线连接），在头显里面要打开串流助手去连接（注：PICO内置截图出来的图片不清晰，凑合着看吧）

![](https://assets.bili33.top/img/BeatSaber-Noob/Screenshot_com.picovr.picostreamassistant_2023.06.25-18.29.03.186_425.jpeg)

连接好了会自动打开SteamVR，然后就会看到经典的SteamVR空间（性能面板是PICO的）

![](https://assets.bili33.top/img/BeatSaber-Noob/Screenshot_com.picovr.picostreamassistant_2023.06.25-18.32.21.634_42.jpeg)

到这里，你已经完成串流的连接啦！

---

## 题外话

Pico Neo 3确实像网上说的有手柄漂移，有的时候打着打着手柄飘了就很难受。另外，平时不运动的人最好一开始别玩太猛，要不然你可能会受到腰酸背痛连续要几天的侵蚀，着实很难受。

