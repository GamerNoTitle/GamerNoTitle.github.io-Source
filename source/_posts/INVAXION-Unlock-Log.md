---
title: 音灵INVAXION解锁工具制作全纪录
date: 2021-06-15 22:17:55
tags: [Tech, Regedit, Save, Game]
categories: Tech
cover: https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/INVAXION-Unlock-Log/Cover.png
---

> PS：音灵解锁补丁是我在高考前1个月左右的时候摸的，具体可以看Commit记录√

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/INVAXION-Unlock-Log/Announcement.png)

音灵在2021.2.5宣布停运，我直到五月左右上游戏的时候才发现，我卡在了加载页面，翻了一下讨论区才发现，游戏停运了

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/INVAXION-Unlock-Log/Loading.png)

但是我还在讨论区里找到了这个

[![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/INVAXION-Unlock-Log/Unlock-Level.png)](steamcommunity.com/app/921630/discussions/0/5350815203296872967/)

然后我就下了这个使用了，发现，诶，我的铺面确实全解锁了，于是我开始了我的星舰解锁工具和角色解锁工具的制作

---

星舰这个东西，我翻了一下我自己的存档（在注册表）

![注：本图是解锁完成后的注册表](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/INVAXION-Unlock-Log/Regedit-Theme.png)

发现数字都在个位数，而我数了一下星舰的数量是13，我就在想，星舰的编号是不是从1~13，然后我就开始了我的解锁之旅

一开始我先将里面的内容换成了

```
[{"themeID":1},{"themeID":2},{"themeID":3},{"themeID":4},{"themeID":5},{"themeID":6},{"themeID":7},{"themeID":8},{"themeID":9},{"themeID":10},{"themeID":11},{"themeID":12},{"themeID":13}]
```

这样一长串（拿Python生成的，毕竟我可不想一个一个打）

转成Hex就变成了

```
5b,7b,22,74,68,65,6d,65,49,44,22,3a,31,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,32,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,33,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,34,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,35,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,36,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,37,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,38,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,39,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,31,30,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,31,31,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,31,32,7d,2c,7b,22,74,68,65,6d,65,49,44,22,3a,31,33,7d,5d
```

然后导入注册表，接着发现

**爷进不了离线模式了……**

有点崩溃，一开始还以为是思路有问题，先恢复了一下（谁在操作存档的时候不备份呀）

恢复以后再次打开注册表发现：**是`themeId`不是`themeID`**

哎呀犯了一个低级错误，重新来

将所有的`ID`改成`Id`重新导入，诶成了，但是巨蟹号（最后含金量的主题）没有解锁

然后试了一下ID0和ID14，终于搞定了，ID14是巨蟹号的

人物当然也一样啦，但是人物那么多，而且ID还不是像主题这样连着的

![注：本图是解锁完成后的注册表](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/INVAXION-Unlock-Log/Regedit-Char.png)

我就去翻了一下文件，在`音灵 INVAXION\INVAXION_Data\StreamingAssets`这个目录下找到了所有的角色文件，在文件名上附有ID

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/INVAXION-Unlock-Log/File-Char.png)

再次掏出工具（Python），生成对应的列表，然后导入，果然不出所料，所有角色都已经解锁了

接着打包，发布在Steam社区，在Github配布文件，搞定√

星舰解锁：https://steamcommunity.com/app/921630/discussions/0/3150808675338262041

人物解锁：https://steamcommunity.com/app/921630/discussions/0/3150808675345244413

铺面解锁（不是我做的，但是是我参考的）：https://steamcommunity.com/app/921630/discussions/0/5350815203296872967/

存档配布（只打了全铺面，我的个人存档）：[https://steamcommunity.com/app/921630/discussions/0/3130541756147189784/](https://steamcommunity.com/app/921630/discussions/0/3130541756147189784/)（中文）

[https://steamcommunity.com/app/921630/discussions/0/3150808588793019131/](https://steamcommunity.com/app/921630/discussions/0/3150808588793019131/)（英文）

要是你有Steam点数可以稍微给我打赏一点，谢谢老板(\*^▽^\*)