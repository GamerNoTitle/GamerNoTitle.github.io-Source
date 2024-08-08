---
title: 逃离订阅！在Surface Pro 5上安装FydeOS for PC (NOT YOU)
date: 2024-08-08 13:43:05
tags: [FydeOS, Surface, System, ChromeOS]
categories: Tech
cover: https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.29.14.png
---

FydeOS这个系统我以前用过v17，用的也是FydeOS for You，但当时系统说实话，不太完善，所以我后面就没用了

前两天心血来潮，想在Surface上装个双系统，使用了BlissOS以后发现BlissOS的调教问题很大，触屏不灵敏（估计是驱动问题），然后我又想起了FydeOS这个系统，一看现在已经更新到v18.1了，决定再给它一个机会

## FydeOS for YOU

### 双模式

之前我在使用`v17`的时候，忘了是哪一次更新，直接把平板模式给我砍了，本来可以全屏应用列表然后点击应用的（类似于安卓那样），但是后面改成了左下角启动菜单，真的让我很不爽，但是`v18`里面多了一个按钮，可以自行切换（虽然要自己打开开关的显示，而且Surface插拔键盘会自动触发切换）

个人更偏向于用平板模式，平板就该有平板的样子

![电脑模式](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.10.04.png)

![平板模式](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.10.14.png)

### 使用体验

应该是经过了一定的调教，现在的FydeOS `v18.1`比之前的`v17`更好用了一些，安卓没有莫名其妙的卡顿，但是还是不能够调用显卡

我尝试了明日方舟、崩坏：星穹铁道、FGO这三款二游，其中崩铁因为显卡无法调用，会出现奇怪的粉色块块

音游方面，我装了Phigros和Cytus Ⅱ（Google Play版），就凭这Surface Pro 5的60Hz屏幕，跟现在的手机完全没法比，而Phigros又是那种下落式音游，重影超级严重，容易一个键看作两个（GiveUp.jpg）

![](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.21.12.png)

而Cytus Ⅱ动的是线，这个倒没啥问题（~~你有一个Bad.png~~ 爬！大屏没习惯，手挡住键了）

![](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.28.28.png)

而应用方面，我装了酷安、ApkPure、Surfboard、网易云音乐、哔哩哔哩HD（B站手机版因为无法调用显卡装不了）

B站HD看1080P60会卡顿，估计最高就1080P30了

网易云音乐有明显卡顿，不知道是不是网易方面的问题，但是其他的应用没啥问题，特别是Material You做的Surfboard丝滑如德芙，两个应用商店能够正常使用

讲真，网易云音乐的平板适配不太行……

![](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.11.28.png)

![](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.11.45.png)

不知道是ArcWelder的特性还是ChromeOS+ArcWelder的组合技，在Android开的VPN服务能够在ChromeOS中正常使用，也就是说，我打开了Surfboard后，我的FydeOS本体是可以正常搭梯子的

![](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.12.29.png)

![IP检测](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.45.51.png)

> 注：Surfboard加了GEO判断，国内网站直连

### Bug

就算是FydeOS for YOU，专门为了Surface Pro 5做的系统，从我知道这个系统开始，已经进行了3年的迭代，但是你的蓝牙和摄像头还是不能用啊！！！你是真的要[linux-surface](https://github.com/linux-surface/linux-surface)项目给你适配了你才能加进去是吧

![蓝牙不适配，无法搜索到设备](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.10.40.png)

![摄像头不适配，没有画面](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.10.49.png)

### 收费

是的你没听错，这个系统是订阅制，一年120RMB，新机自安装后第一次联网进入试用期90天（大版本更新会重置试用期，例如 `v17 -> v18` 会记`v18`的试用期为90天）

但它的适配就是把linux-surface项目搬过来替换掉内核，实在是不值得付费，但凡你把linux-surface的蓝牙和摄像头驱动问题修了我都觉得你有干活，而且你这个订阅信息页面真的做好了吗？关系到你自己赚钱的东西你UI都没有做好（下面这个图），底下留那么大一块黑色给我停飞机嘛？综上，我选择拒绝它的订阅

![](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2014.10.28.png)

## FydeOS for PC

这个版本的系统是没有付费的，FydeOS的付费只针对于它的YOU服务，那么就很简单了

> 我只要装个FydeOS for PC，然后把内核一换不就行了？

当我为这个想法寻找出路的时候，我发现了这个帖子 => [\[教程\]如何在fydeos/openfyde上替换6.6内核 - 求助答疑 - Community](https://community.fydeos.com/t/topic/39713/83)

### 安装FydeOS for PC

这个很简单了，用个能刷写img文件的软件都可以，把镜像刷写到U盘就行，我用的Rufus

**不要用balenaEtcher！！！这东西在刷写FydeOS的镜像时会不通过，请使用其他工具！！！**

![](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/rufus-4.5p_QM7Kx24Ay3.png)

接着到Surface的启动菜单，从U盘启动FydeOS，根据提示安装FydeOS（傻瓜式操作，下面略）

第一次开机的时候，Surface的WIFI是不可用的，请接上有线连接，可以使用拓展坞；另外，请接上你的Surface Cover键盘

### 更换内核

{% note warning %}

如果你还没有安装FydeOS，我推荐你先选择使用FydeOS并使用本地账户登录后，先进行这一节的操作，确定这一节的操作对你的电脑有效再安装，能有效降低数据暴毙的概率

请先初始化你的FydeOS后再看这一节，因为这一节不好截图，所以就基本上只有文字了

{% endnote %}

初始化完成后，我们就要对内核进行更换了，不然我们的触屏什么的都用不了

#### 打开开发者模式

这个简单，我们来到设置，选择左边的`FydeOS设置`，在里面找到开发者选项，然后打开就可以了，打开了以后需要重启电脑

如果你找不到，你可以在官方的文档中找到相应的指导 => [如何切换到「开发者模式」？ - FydeOS](https://fydeos.com/question/enable-developer-mode/)

#### 禁用根系统文件验证

FydeOS的根系统`/`默认是有写入保护的，如果我们不关掉它的话，后面我们替换内核的操作会被阻止，所以我们得先关掉它

我们按<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd>（就是Linux中的打开终端的快捷键，在ChromeOS中同样适用），然后输入shell进入终端模式

接着我们需要获取root权限，运行下面的命令来获取root权限

```bash
sudo -i
```

然后再通过官方的脚本来禁用根系统文件验证

```bash
/usr/sbin/crossystem_mode-switch.sh disable-rootfs-verification
```

命令运行后，会提示我们重启设备，我们输入一个`y`然后回车重启

#### 内核替换

我们需要来到这个仓库[Releases · Damenly/brunch-unstable (github.com)](https://github.com/Damenly/brunch-unstable/releases)，下载最新的Release，因为我们用的是Surface，所以我们需要下载Surface开头的那个文件，同时，我们还需要下载`firmware.tar.gz`

我们把它们放在一个自己能够找到的目录（我放在了`下载内容`文件夹下面）

接着我们需要逐行运行下面的命令，进行替换

{% note warning %}

一定要逐行运行，这个系统的终端并不能运行多行命令，此外最后的`vmlinuz.A`和`vmlinux.B`是FydeOS的两个启动项，你可以只更换一个，然后开机的时候就逮着你换的那个启动就行了

{% endnote %}

```bash
sudo -i
mount -o remount,rw /
[ -d /efi ] || mkdir /efi
rm -rf /lib/modules/* 
rm -rf /lib/firmware

# 下面这行请替换为你实际存放两个tar.gz位置的目录！！
cd /home/chronos/user/Downloads

tar -xvf surface-6.6.tar.gz -C /
tar -xvf firmware.tar.gz -C /

cp /vmlinux /efi/syslinux/vmlinuz.A
cp /vmlinux /efi/syslinux/vmlinuz.B
cp /vmlinux /boot/vmlinuz
```

换完以后我们重启电脑，再次进行测试，这个时候我的触屏和WIFI就已经恢复正常了，同时也没有了烦人的FydeOS订阅

![](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2015.37.01.png)

### 缺点

- 没有平板模式
- Surface Pen无法使用
- 蓝牙、摄像头仍然无法使用
- VPN不互通，需要使用SwitchyOmega来打通
- 还没发现……

### 温馨提醒

没事不要更新系统，更新过程中可能会把我们替换好的内核换掉！！

如果再更换完内核后再安装OpenGapps，需要重新替换内核！

## Google 设备认证

如果你登录Google的时候，提示设备未通过Play认证，我们就需要自己给我们的设备注册

先在设备上安装[deviceID（Apkpure）](https://apkpure.net/cn/device-id/com.evozi.deviceid)这个软件，然后打开能看到我们的GSF ID

![](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2016.32.56.png)

我们再访问谷歌设备注册页面 https://www.google.com/android/uncertified/

![](https://assets.bili33.top/img/FydeOS-for-PC-on-Surface/Screenshot%202024-08-08%2016.33.27.png)

将我们的GSF ID贴进去，框框闪红色不用管，直接打一个验证码然后注册就可以了
