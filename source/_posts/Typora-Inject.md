---
title: 使用Typora-Inject激活Typora
date: 2024-07-10 12:10:47
tags: [Typora, Crack]
categories: Tech
cover: https://assets.bili33.top/img/Typora-Inject/Typora_4XWzIX68g7.png
---

{% note danger %}

## 仅供学习使用，如有条件请支持正版

{% endnote %}

高考完了以后，[因为我之前电脑给人黑了](/posts/How-I-Get-Hacked-by-Russian/)，我就重装了一下系统，这导致我很多软件都要重装

而Typora这款软件，我从它beta用到现在，见证了它从免费到收费的一路，这波用户量大了以后就开始收割的行为让我很不爽，我就一直没有掏钱

在之前我都是用dll文件来破解的，就是利用软件会加载同目录下`winmm.dll`这个文件的特性来解决，但是这东西很容易被报毒，然后我就在找有没有别的方法，然后我就找到了这个项目

> [DiamondHunters/NodeInject_Hook_example: A hooking example for NodeInject (github.com)](https://github.com/DiamondHunters/NodeInject_Hook_example)

一开始我是使用了这个仓库Action中的版本，但是一直激活不通过，直到我看到了[issue](https://github.com/DiamondHunters/NodeInject_Hook_example/issues/1#issuecomment-1784011014)

![](https://assets.bili33.top/img/Typora-Inject/msedge_saTSxmwUBp.png)

所以我就去找了这个更改的commit之前的那个版本，并成功编译出来了可以用于激活的文件

[我把这些文件丢在了notion上面，有需要可以自行下载](https://gamernotitle.notion.site/Typora-bcf779e3cc22483aa80f9eeb6d52b4f4)，或者使用下面的链接下载

> [Windows版](https://file.dohna.top/Typora-Inject/NodeInject-windows.7z.zip) | [Linux版](https://file.dohna.top/Typora-Inject/NodeInject-linux.tar.gz.zip)

解压后能得到四个文件

![](https://assets.bili33.top/img/Typora-Inject/Bandizip.x64_hpv2ndSeU.png)

把两个exe丢在Typora的安装目录下，然后在当前目录打开一个命令行（我这里拿我的Windows Server做演示）

先运行`node_inject.exe`，让它先劫持激活过程，运行的时候应该会弹出一些提示（如图）

![](https://assets.bili33.top/img/Typora-Inject/080235b6-4f7b-427e-92f6-42614257137.png)

然后我们再运行`license-gen.exe`，它会给我们生成一个激活码

```powershell
PS C:\Program Files\Typora> .\license-gen.exe
License for you: Y2TC8Y-FHPQPS-BE68XH-S6D26W
```

我们再打开Typora，进行激活过程，激活码填程序给我们生成的这个，邮箱可以随便填

![](https://assets.bili33.top/img/Typora-Inject/f4e42409-fbc0-4f33-a9bf-0c530741213e.png)

因为我的服务器在国内（家用服务器当然在国内啦），所以会弹出这个提示，我们点`确认`就行

![](https://assets.bili33.top/img/Typora-Inject/df48ad69-381d-430f-9ea3-e07f28933fff.png)

然后我们就激活成功了

![](https://assets.bili33.top/img/Typora-Inject/358ea9d0-22b9-47bf-b173-b0d77afe67ee.png)

---

更新了怎么办？这个简单，你把Typora目录下的`node`文件夹删掉，这个文件夹是asar反编译时产生的，删掉了不会对Typora产生任何影响，然后重新跑一次上面这个过程就行了

{% note danger %}

## 仅供学习使用，如有条件请支持正版

{% endnote %}
