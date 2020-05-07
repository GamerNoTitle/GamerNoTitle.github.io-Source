---
title: Valine-Magic魔改版Valine评论系统
date: 2020-04-19 19:01:30
tags: Tech
cover: https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-Magic/Cover.png
categories: Tech
---

{% note warning %}

Valine在2020/4/21更新了v1.4.5，支持了自定义表情包，故[Valine-Magic](https://github.com/GamerNoTitle/Valine-Magic)将不再提供修改的js，改为提供Valine的表情列表，在使用列表之前，请将你的ValineCDN修改为`https://valinecdn.bili33.top/`

{% endnote %}

**因本人是一名准高三学生，在2020/5/11开学后将专注于学习，所以可能我就不会有太多的时间去收集更多的表情，你当然可以提交issue给我，issue我会尽量一周之内回复并实装，回复慢请大家见谅！望大家多多包涵，Thanks♪(･ω･)ﾉ**

点击对应的表情名可以直接到达表情列表，请注意：你在使用本仓库内的表情时请将Valine的CDN设置为`https://valinecdn.bili33.top/`	[#2](https://github.com/GamerNoTitle/Valine-Magic/issues/2)

复制的列表可以直接复制到例如[butterfly](https://github.com/jerryc127/hexo-theme-butterfly)主题的`valine.json`内，或者是各种用于放Valine表情配置的地方

请注意：如果你想添加多个分类，请记得在每个分类的最后一个表情后面加个`,`否则Valine无法识别。假设下面这个表情为该系列最后一个表情：

```json
"hotkey1": "bilibiliHotKey/1.jpg"
```

你想在这个表情下面添加其他表情的时候，那么请在这个表情的后面加个`,`就像下面这样

```json
"hotkey1": "bilibiliHotKey/1.jpg",
```

如果你有新的表情包想要加入，你可以提出issue，或者直接发到[admin@bili33.top](mailto:admin@bili33.top)，并注上你的ID和表情包名字（中文英文都需要）

仓库内的那个PY脚本是我提前编写好用来写表情列表的脚本，如果你有需要可以随意取用

### 表情分类


|    ![](https://valinecdn.bili33.top/bilibiliHotKey/7.jpg)    |  ![](https://valinecdn.bili33.top/bilibilitv/[tv_doge].png)  | ![](https://valinecdn.bili33.top/bilibili2233/[2233娘_第一].png) |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| [哔哩哔哩热词系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/bilibili/hotkey热词系列) | [哔哩哔哩小电视系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/bilibili/tv小电视系列) | [哔哩哔哩2233娘系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/bilibili/2233娘系列) |
|        ![](https://valinecdn.bili33.top/alu/中枪.png)        | <img src='https://valinecdn.bili33.top/Menhera-chan/5.jpg' width=120 height=102></img> |    ![](https://valinecdn.bili33.top/HONKAI3-Daily/14.gif)    |
| [阿鲁alu系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/alu) | [メンヘラちゃん(Menhera-chan)系列表情包](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Menhera-chan) | [HONKAI崩坏3 日常篇](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Daily) |
|     ![](https://valinecdn.bili33.top/HONKAI3-Star/3.gif)     |   ![](https://valinecdn.bili33.top/HONKAI3-Crayon/16.gif)    |    ![](https://valinecdn.bili33.top/HONKAI3-Pure/13.gif)     |
| [HONKAI崩坏3 观星篇](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Star) | [HONKAI崩坏3 蜡笔日常篇](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Crayon) | [HONKAI崩坏3 纯色日常篇](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Pure) |
| <img src='https://valinecdn.bili33.top/HONKAI3-Stan/4f921b8ad8c16f3d2c73e3c04c5735ca9b41187b.gif' width=104 height=74.4> | <img src='https://valinecdn.bili33.top/HONKAI3-AIChan/d65b36ccae610bc4479209cd6e62bb91b0f76188.jpg' width=125 height=111></img> | <img src='https://valinecdn.bili33.top/HONKAI3-Durandal-Search/f1b9a456587638e488d93ccaa95dde59aef3af01.gif' height=100 width=100></img> |
| [HONKAI崩坏3 史丹](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Stan) | [HONKAI崩坏3 爱酱](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-AIChan) | [HONKAI崩坏3 目标！幽兰黛尔](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Durandal-Search) |
| <img src='https://valinecdn.bili33.top/HONKAI3-MEI/bf68423446465d396d3cbd8856882b5e9fb1c0c7.gif' width=120 height=120> | <img src='https://valinecdn.bili33.top/HONKAI3-NEWYEAR-2019/dc1a2b2032fad29373fe8460d4ad89ca848355a9.jpg' width=120 height=120> | ![](https://valinecdn.bili33.top/Tsuri-me-ju_mimi/10753793_key@2x.png) |
| [HONKAI崩坏3 芽衣的剑道修行](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-MEI) | [HONKAI崩坏3 2019新年](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-NEWYEAR-2019) | [つり目獣耳スタンプ(Sticker of the slant eyes & cat girl)](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Tsuri-me-ju-mimi) |
|    ![](https://valinecdn.bili33.top/Arcaea/184064198.png)    |   ![](https://valinecdn.bili33.top/Mafumafu/199749477.png)   |     ![](https://valinecdn.bili33.top/weibo/d_jiyan.png)      |
| [Arcaea](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Arcaea) | [動く！まふまふスタンプ（ねこ）Mafumafu Animation sticker (cat)](https://github.com/GamerNoTitle/Valine-Magic/tree/master/MafuMafu) | [微博原生表情包](https://github.com/GamerNoTitle/Valine-Magic/tree/master/weibo) |
|      ![](https://valinecdn.bili33.top/Tieba/i_f02.png)       |  ![](https://valinecdn.bili33.top/Snow-Miku/3583066@2x.png)  | ![](https://valinecdn.bili33.top/Sweetie-Bunny/12311679.png) |
| [百度贴吧原生表情包](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Tieba) | [Snow Miku雪初音表情包（LINE）](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Snow-Miku) | [うさみみ少女（SWEETIE BUNNY）](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Sweetie-Bunny) |

### 免责声明
本仓库内所有图片均来源于网络，仅供学习交流使用。若用户违反相关法律法规造成损失，将由用户自行承担，本仓库所有者和PR提交者不承担一切责任！

---

## 更新日志

### 2020/5/7 V2.1.0

**回校前最后一更，以后可能会比较少自己去收集表情包了，当然你可以提交issue**

加入两套LINE的表情包

[Snow Miku雪初音表情包（LINE）](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Snow-Miku) | [うさみみ少女（SWEETIE BUNNY）](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Sweetie-Bunny)

### 2020/5/3 V2.0.9

加入[百度贴吧原生表情包](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Tieba)（[#4](https://github.com/GamerNoTitle/Valine-Magic/issues/4)）

### 2020/5/1 V2.0.8

加入[微博原生表情包](https://github.com/GamerNoTitle/Valine-Magic/tree/master/weibo) （[#3](https://github.com/GamerNoTitle/Valine-Magic/issues/3)）

### 2020/4/28 V2.0.7	

**旧版本（用我修改的JS的版本）将在2020/4/30停止进行301转发，请使用js版本的用户升级到最新版的Valine，使用emojiCDN和emojiMaps的方式使用Valine-Magic项目**

### 2020/4/27 V2.0.6

加入来自まふまふ(Mafumafu)的[動く！まふまふスタンプ（ねこ）Mafumafu Animation sticker (cat)](https://github.com/GamerNoTitle/Valine-Magic/tree/master/MafuMafu)和来自lowiro的[Arcaea](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Arcaea)表情包

### 2020/4/26 V2.0.5

现在在每个分类的列表获取页面下面有表情包所含的所有表情的预览了！

### 2020/4/24 V2.0.4

加入来自甘城なつき(Amashiro Natsuki)的[つり目獣耳スタンプ(Sticker of the slant eyes & cat girl)](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Tsuri-me-ju-mimi)表情包

### 2020/4/24 V2.0.3

加入崩坏3系列5组表情包（官方表情）

[HONKAI崩坏3 史丹](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Stan) | [HONKAI崩坏3 爱酱](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-AIChan) | [HONKAI崩坏3 目标！幽兰黛尔](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Durandal-Search) | [HONKAI崩坏3 芽衣的剑道修行](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-MEI) | [HONKAI崩坏3 2019新年](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-NEWYEAR-2019)

### 2020/4/24 V2.0.2

加入崩坏3系列4组表情包（QQ内提取）

[HONKAI崩坏3 日常篇](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Daily) | [HONKAI崩坏3 观星篇](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Star) | [HONKAI崩坏3 蜡笔日常篇](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Crayon) | [HONKAI崩坏3 纯色日常篇](https://github.com/GamerNoTitle/Valine-Magic/tree/master/HONKAI3/HONKAI3-Pure)

### 2020/4/23 V2.0.1

加入[メンヘラちゃん(Menhera-chan)](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Menhera-chan)系列表情包（中文版）

### 2020/4/21 V2.0.0

修改本仓库发布方式，因为Valine在今日下午进行了更新，支持了自定义表情，那么本项目最初的目标就不需要使用修改JS的方式来实现了，所以我改变了发布方式，将来在这个仓库会发布各表情包的List，是按照Valine所需要的格式写好的List，加入到Valine的表情列表就可以立即使用的那种

表情更新：[哔哩哔哩热词系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/bilibili/hotkey热词系列) | [哔哩哔哩小电视系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/bilibili/tv小电视系列) | [哔哩哔哩2233娘系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/bilibili/2233娘系列) | [阿鲁alu系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/alu)

### 2020/4/21 V1.0.1

**基于Valine 1.4.4**

版本js地址：https://cdn.jsdelivr.net/gh/GamerNoTitle/Valine-Magic@master/js/1.0.1/valine.min.js

更新了alu系列表情包（[#1](https://github.com/GamerNoTitle/Valine-Magic/issues/1)），删除了使用频率较低的系列表情，被删除的表情显示不受影响，仍可继续使用

表情包会丢在coding的[仓库](https://gamernotitle.coding.net/p/Valine-BQB1/)里面，本仓库只用于发布新版本

修改了python脚本，使得更易使用，加入下载用的python脚本

### 2020/4/19 V1.0.0

**基于Valine 1.4.4**

版本js地址：https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Valine-Magic-V1.0/js/valine.min.js

启动Valine-Magic项目，将原本Valine的表情替换为B站现有的表情包，加入判断为QQ邮箱则显示QQ头像的功能（参考[https://blog.csdn.net/cungudafa/article/details/104638730](https://blog.csdn.net/cungudafa/article/details/104638730)）

第一批表情包[在此仓库](https://github.com/GamerNoTitle/Picture-repo-v1/tree/master/img/BQB)

---

~~这是一个魔改版的Valine，加入了B站的表情包，并且会根据QQ邮箱将头像替换为用户的QQ头像（使用了腾讯官方的接口，参考[https://blog.csdn.net/cungudafa/article/details/104638730~~](https://blog.csdn.net/cungudafa/article/details/104638730)）

{% note info %}

~~预览图~~

![预览图——QQ头像](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-Magic/Result.png)

![预览图——B站表情](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-Magic/Result-Stickers.png)

{% endnote %}

~~仓库地址：https://github.com/GamerNoTitle/Valine-Magic~~

~~第一版的表情包不包含在里面，第一版的表情包在[这里](https://github.com/GamerNoTitle/Picture-repo-v1/tree/master/img/BQB)~~

~~使用方式：将Valine的CDN改为仓库里面提供的地址即可~~

~~如果要提出issue请遵循issue模板，欢迎通过Issue或者PR提交新的表情包！~~

~~如果你有能力修改Valine的UI请与我联系，我的联系方式在About页面，建议QQ联系~~