---
title: Ticwatch Pro 3 使用体验报告
date: 2022-08-23 12:00:54
tags: [Diary, Ticwatch, adb]
categories: Diary
cover: https://assets.bili33.top/img/Ticwatch-pro-3-experience/IMG_20220823_120136.jpg
---

最近因为游泳，带着我的小米手环6，结果第二天游泳下来发现，它的屏幕不好使了，有鬼触的现象，于是就想换一块表

因为身边用OPPO Watch 2的人比较多，我又不想跟他们用一样的东西，于是我另辟蹊径，找其他的表

一开始看到米表，但是据说配置拉胯，就不考虑了，然后看到了出门问问家的Ticwatch pro 3，这是一个搭载着Google WearOS的智能手表，不过当然有着中国化的成分（指删除大量谷歌服务）

跟鱼子市场的卖家进行大量沟通后，我以合适的价格拿下了这块表

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/QQ图片20220823120334.jpg)

接着就开始折腾了，拿到手是一块啥东西都没设置的新表，会进入“新手引导”模式，我也是花费了一定的时间才弄好

---

## 折腾环节

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/about.png)

按下右上方的按键就可以打开启动器，从启动器打开软件

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/launcher.png)

### 从应用商店安装软件

官方的应用商店就跟App Store一样，一键下载安装就行，其实没啥难度，这里就附几张图吧

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/screen(4).png.png)

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/screen(5).png.png)

### 使用adb安装软件

#### 使用计算机从adb安装软件

这个要求打开adb，跟手机的开启方法一样，连续点击版本号开启开发者选项，然后在开发者选项里面找到`adb调试`，把它和`通过WLAN调试`都打开

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/screen(3).png.png)

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/screen(6).png.png)

让手表和电脑连到同一个WIFI，查看手表的IP地址，接着电脑输入`adb connect <ip>`就可以连接到手表了，然后使用`adb install <apk>`就能安装软件了

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/WindowsTerminal-20220823-121709.png)

#### 使用第三方应用商店安装软件

这里我用了一个叫做唯趣应用商店的东西（官网：[唯趣应用商店 - 下载 (etralab.top)](http://etralab.top/etralab_appstore/html/select_install_method_android.html)），本质也是用adb的，因为手表的`软件包管理`被阉割了，所以我们只能通过adb来装东西

这是一个手表上的应用商店，找到自己想要的软件直接下载安装就行了

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/screen(7).png.png)

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/screen(8).png.png)

### 使用微信儿童手表版

为什么我要单开一个标题给这个内容，因为自带的绿色微信需要连接手机同步使用，这就违背了我用它的理念，我就是要脱离手机使用

隔壁OPPO Watch可以使用微信手表版，但是TWP3不支持，因为微信没有给LICENSE给TWP3，那就只能借用LICENSE了

我借了块OPPO Watch来提取它的LICENSE，首先打开OW的adb调试，连接到电脑

然后输入以下命令来获取LICENSE

```bash
adb shell settings list global
```

（图为TWP3的配置，因为忘记截图了，然后我已经放进去了，就直接拿来顶替了）

我们找到以下内容，把这些内容先保存起来

| 字段类型 | 名字                   | 相关作用                             |
| -------- | ---------------------- | ------------------------------------ |
| int      | ilink_product_id       | 产品id                               |
| int      | ilink_key_version      | 版本                                 |
| int      | ilink_support          | ilink_support =1表示手表支持运行微信 |
| string   | ilink_device_id        | 设备id                               |
| String   | ilink_device_signature | 验证签名                             |

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/WindowsTerminal-20220823-120021.png)

然后连接到TWP3，使用命令来写入配置

```bash
adb shell settings put global ilink_device_id "device_id"
adb shell settings put global ilink_device_signature "device_signature"
adb shell settings put global ilink_key_version "1"
adb shell settings put global ilink_product_id "xxxx"
adb shell settings put global ilink_support "1"
```

写入后，再次打开微信儿童版就可以扫码登录使用了

![](https://assets.bili33.top/img/Ticwatch-pro-3-experience/Wechatkid.png)

### 使用体验

#### 优点

带有ESIM确实可以脱离手机使用，还可以刷一刷B站（用腕上哔哩），看看新闻啥的，特别符合我现在的状态。有的时候跟群友用QQ吹水或者用微信跟我妈聊会天，完全OK

#### 缺点

圆屏毕竟不是OW的方屏，很多手机的APP装上TWP3后会因为屏幕的限制而变得无法使用（如Outlook），而且TWP3阉割了Android Webview组件，导致很多东西用不了（直接闪退，例如在QQ邮箱阅读邮件）

另外，没有闪充，充电很慢，而且配的线是2PIN的，手表有4个金属触点，换言之就是没有数据传输功能（晚点自造线去）

### 总结

总的来说，使用体验跟价格是匹配的，能够满足我的日常需求，但你要问我推不推荐购买，我只能说现阶段OW3可能更好一些
