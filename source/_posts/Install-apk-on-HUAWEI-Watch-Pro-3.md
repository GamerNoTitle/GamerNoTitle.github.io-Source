---
title: 在华为Watch Pro 3上面安装第三方应用
date: 2022-06-01 17:34:27
tags: [Tech, Smart Watch, HUAWEI Watch]
categories: Tech
cover: https://consumer-img.huawei.com/content/dam/huawei-cbg-site/cn/mkt/plp/launch/20220428/wearables/banner-gt3-pc.jpg
---

我身边老多人用智能手表了，OPPO Watch 2 已经见怪不怪了，这不又来了个HUAWEI Watch Pro 3手表，说请我帮他装点软件。说白了手表装软件不就adb嘛能有啥，既然结了这活，那就干吧（因为忘记拍照了，所以本文应该是全文字）

华为手表用的是鸿蒙系统，一开始我还在担心会不会没有adb调试的功能，等我按照正常操作（关于，版本号连点5下，开发者选项）后，看到开发者选项里面没有adb调试这个选项，取而代之的是什么HDC调试（我猜是华为自己的一种调试模式），实际测试这个HDC调试跟adb调试好像是一个东西？用abd都能够连接

使用`adb connect ip:port`进行连接，我一开始天真的以为直接`adb install`就可以了，当我这么操作的时候，这傻逼系统告诉我说不允许通过adb安装应用，我翻了翻开发者选项，没有平常的`通过adb安装应用`的开关，上网搜了一下说`com.android.packageinstaller`这个应用包会禁止安装应用，所以要先关掉，装完要开回来（不然会变砖头）

所以就很简单啦，在安装之前我们先关掉这个应用包，安装完后打开即可

这里有个坑：华为手表连接WIFI会在锁屏的时候自动断开连接，所以搞得我好多次快要装完了，结果一个锁屏GG

我们可以使用以下命令进行应用的安装

```powershell
adb disconnect
adb connect <手表的IP地址:端口（一般是5555）>
adb shell pm disable-user com.android.packageinstaller
adb install <apk路径>
adb shell pm enable com.android.packageinstaller
```

安装完后就应该能在手表的启动器中找到安装的应用了。

