---
title: 移动你的WSA数据盘，让你的C盘不再爆满
date: 2022-11-24 13:09:57
tags: Software
categories: Software
cover: https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Move-your-wsa-data/explorer-20220830-181707.png
---

WSA确实是个很好用的东西，毕竟能够直接跑上安卓系统，不用忍受模拟器那种广告，很方便

但是同样也带来了一些问题就是：你的C盘会爆满

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Move-your-wsa-data/explorer-20220830-181707.png)

这主要是因为WSA的数据盘都放在了`C:\Users\%username%\AppData\Local\Packages\MicrosoftCorporationII.WindowsSubsystemForAndroid_8wekyb3d8bbwe\LocalCache\`这个目录下，我的数据盘经过我的半年使用已经到了`34.3GB`了，然后就导致了我的C盘像上面那张图那样要炸了

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Move-your-wsa-data/explorer-20221124-131312.png)

我记得Linux里面有`ln`命令可以创建文件链接，然后Windows有个叫做`mklink`的（仅cmd可用，powershell没有，我踩了这个坑），之前为了让Epic和Steam的GTA5都可用还用过来着，这不用这个方法把数据移到其他硬盘里

我把文件放在了`D:\WSA-data`这个文件夹里，连着`C:\Users\%username%\AppData\Local\Packages\MicrosoftCorporationII.WindowsSubsystemForAndroid_8wekyb3d8bbwe\LocalCache\`的`LocalCache`文件夹整个放进去

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets@master/img/Move-your-wsa-data/explorer-20221124-131546.png)

然后按<kbd>Windows</kbd> + <kbd>X</kbd>，选择`Windows 终端（管理员）`（选择`powershell`或者`cmd`都行，但是一定要有管理员权限

然后打入下面这行命令（记得把后面的那个路径改成你自己的）

```powershell
mklink /J "C:\Users\GamerNoTitle\AppData\Local\Packages\MicrosoftCorporationII.WindowsSubsystemForAndroid_8wekyb3d8bbwe\LocalCache" "D:\WSA-data\LocalCache"
```

然后我们的文件链接就创建成功了，打开WSA，一切正常！
