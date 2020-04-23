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

### 表情分类


|    ![](https://valinecdn.bili33.top/bilibiliHotKey/7.jpg)    |  ![](https://valinecdn.bili33.top/bilibilitv/[tv_doge].png)  | ![](https://valinecdn.bili33.top/bilibili2233/[2233娘_第一].png) |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| [哔哩哔哩热词系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/bilibili/hotkey热词系列) | [哔哩哔哩小电视系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/bilibili/tv小电视系列) | [哔哩哔哩2233娘系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/bilibili/2233娘系列) |
|        ![](https://valinecdn.bili33.top/alu/中枪.png)        | <img src='https://valinecdn.bili33.top/Menhera-chan/5.jpg' width=120 height=102></img> |                                                              |
| [阿鲁alu系列](https://github.com/GamerNoTitle/Valine-Magic/tree/master/alu) | [メンヘラちゃん(Menhera-chan)系列表情包](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Menhera-chan) |                                                              |

---

## 更新日志

### 2020/4/23 V2.0.1

加入[メンヘラちゃん(Menhera-chan)](https://github.com/GamerNoTitle/Valine-Magic/tree/master/Menhera-chan)系列表情包（中文版）

### 2020/4/21 V2.0.0

修改本仓库发布方式，因为Valine在今日下午进行了更新，支持了自定义表情，那么本项目最初的目标就不需要使用修改JS的方式来实现了，所以我改变了发布方式，将来在这个仓库会发布各表情包的List，是按照Valine所需要的格式写好的List，加入到Valine的表情列表就可以立即使用的那种

表情更新：哔哩哔哩热词系列、哔哩哔哩小电视系列、哔哩哔哩2233娘系列、阿鲁alu系列

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

这是一个魔改版的Valine，加入了B站的表情包，并且会根据QQ邮箱将头像替换为用户的QQ头像（使用了腾讯官方的接口，参考[https://blog.csdn.net/cungudafa/article/details/104638730](https://blog.csdn.net/cungudafa/article/details/104638730)）

{% note info %}

预览图

![预览图——QQ头像](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-Magic/Result.png)

![预览图——B站表情](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-Magic/Result-Stickers.png)

{% endnote %}

仓库地址：https://github.com/GamerNoTitle/Valine-Magic

第一版的表情包不包含在里面，第一版的表情包在[这里](https://github.com/GamerNoTitle/Picture-repo-v1/tree/master/img/BQB)

使用方式：将Valine的CDN改为仓库里面提供的地址即可

如果要提出issue请遵循issue模板，欢迎通过Issue或者PR提交新的表情包！

~~如果你有能力修改Valine的UI请与我联系，我的联系方式在About页面，建议QQ联系~~