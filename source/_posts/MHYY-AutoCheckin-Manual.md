---
title: MHYY-AutoCheckin - 米哈云游（云原神）自动签到脚本食用指南
date: 2022-04-19 18:57:44
tags: Tech
categories: Tech
cover: https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/GenshinImpact/90149781_p0_small.png?download=true
---

## 米哈云游（云原神）自动签到脚本食用指南

**在指南开始之前，请确保你有一颗聪明的头脑和可以折腾的时间，否则请等时机合适再进行配置！**

**在使用过程中如果遇到什么问题，请前往[Issues · ElainaMoe/MHYY-AutoCheckin (github.com)](https://github.com/ElainaMoe/MHYY-AutoCheckin/issues)发起新的issue来提出，不要在本页面的评论区提出问题（因为追踪性太差了）**

### 快速开始

> 先点个STAR，我们马上开始我们的教程:D

#### Github Action 版本

首先你需要先打开本脚本的仓库[ElainaMoe/MHYY-AutoCheckin: 米哈云游（云原神）自动签到脚本，让你每天都拿到15分钟~ (github.com)](https://github.com/ElainaMoe/MHYY-AutoCheckin)，点击右上角的fork按钮，接着点击下面绿色的`Create fork`来创建一个分支

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220419-190358.png?download=true)

然后点击上面的`Settings`，导航到`Secrets`->`Actions`页面下，点击`New repository secret`（如图）

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220419-190537.png?download=true)

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220419-190618.png?download=true)

将以下内容进行填充后加入名字为`config`的Secret中（内容获取请参照[配置内容获取](#配置内容获取)一节）

```json
{
    "token": "",
    "type": 0,
    "version": "2.2.0",
    "android": 0,
    "deviceid": "",
    "devicename": "",
    "devicemodel": "",
    "appid": 0,
    "analytics": true
}
```

#### [腾讯云函数版本](https://cloud.tencent.com/act/cps/redirect?redirect=10232&cps_key=e6bd1a9d73067a5a66bb5c8e2a9e288c)

首先你得先下载本仓库的代码文件，点击右上角绿色的`Code`，然后点击`Download ZIP`，把压缩包下载后解压到一个你知道的地方，我们一会会用到

先打开[腾讯云函数](https://cloud.tencent.com/act/cps/redirect?redirect=10232&cps_key=e6bd1a9d73067a5a66bb5c8e2a9e288c)，点左边的函数服务，然后顶上选择地区，随便选（但是最好是国内）

点击新建来建立一个新的函数

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220421-170743.png)

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220421-170829.png)

函数的名称可以随便填，但是你也得符合腾讯云指定的规则；但是运行环境**一定一定**要选择**Python 3.6**（因为Python 3.7不带我们需要的环境，还需要自己装非常麻烦）

接着往下，提交方法选择`本地上传文件夹`，然后选择你刚刚解压的文件夹里面的`SCF`文件夹，接着重点来啦：执行方法里面填写为`index.handler`（一定要改）

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220421-170913.png)

接着点击下面的触发器配置，选择`自定义创建`，触发方式选择`定时触发`，触发周期选择`每1天`，下面的`启用`要打勾，点击完成

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220421-170929.png)

创建完成后进入配置界面，先点击顶上的`函数配置`，点击`编辑`，往下面拉找到`初始化超时时间`和`执行超时时间`，把这两个数字往高了调

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220421-171310.png)

然后点击顶上的`函数代码`，等底下加载完后点击`config.json`，把你的信息填进去

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220421-171008.png)

往下拉，先点击`部署`，然后点`测试`，只要测试成功了就是部署完成了

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220421-171039.png)

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220421-171404.png)


### 配置解释（[配置内容获取](#配置内容获取)）

- `token` 是在云原神登录后用于验证的token
- `type` （应该）是设备类型，安卓好像是`2`，iOS不清楚（手上没有iOS设备）
- `version` 是云原神的版本
- `android` 安卓版本，例如我的红米K40的安卓版本是Android 12，就填入`12`，应该是只有Android有，因为手上只有Android设备，如果你愿意用iOS设备进行测试的话，请将相关内容发邮件到[GamerNoTitle@outlook.com](mailto:GamerNoTitle@outlook.com)
- `deviceid` 设备在米哈游注册的id（格式为UUID）
- `devicename` 设备的名称
- `devicemodel` 设备的型号
- `appid` **暂时不清楚**，从我目前手上各用户提交的统计信息来看（其实也就5条），好像是`云原神`这个应用在米哈游的应用id
- `analytics` 因为关于这个东西的信息太少，所以会把除了`token`以外的东西发送到我的云端服务器以便于分析，如果你不想分享你的信息（包括设备id、设备名称、设备型号等），请将这个设置为`false`

配置完成后，我们点开顶上的Actions，然后点绿色的那个按钮

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220419-194540.png)

然后点击左侧列表中的两个脚本，点`Enable workflow`来启用

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220419-194659.png)

然后我们点开左侧的`AutoCheckin`，然后点`Run workflow`来运行，只要运行结果打了绿色的勾勾就一般就没啥问题

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/msedge-20220419-194812.png)

### 自动保活

因为Github在仓库没有push三个月后会停用仓库的一切Action，所以说我们需要进行保活。在Action页面启用`KeppActionAlive`即可！脚本会在每个月的1号自动推送更新从而达到保活的目的。

### 配置内容获取

因为云原神是在手机上运行的，所以你需要安装一个手机上的抓包软件（例如HttpCanary，或者如果你能够用fiddler电脑运行去抓也行）

**一定要记得装抓包软件提供的证书，要不然解不了SSL连接，一定要先登录并成功进去了再启动抓包软件！！！**

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/HTTPCANARY-Result.jpg?download=true)

这里面只要是个HTTP链接，随便一个里面都有我们所需要的东西，这里我就点开了一个链接，在请求里面有所有我们需要的东西，而解释我都写在图片里面了

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Github/MHYY-AutoCheckin/HTTPS-REQUEST-RESULT.png?download=true)

其中，这里面的东西与变量有如下的对应关系

```json
{
    "token": x-rpc-client_token,
    "type": x-rpc-client_type,
    "version": x-rpc-app_version,
    "android": x-rpc-sys_version,
    "deviceid": x-rpc-device_id,
    "devicename": x-rpc-device_name,
    "devicemodel": x-rpc-device_model,
    "appid": x-rpc-app_id,
    "analytics": true
}
```

对于`token`（应该说写作`token`念作`cookie`）由以下几部分组成：

- `ai` 一个数值，具体含义未知
- `ci` 一个数值，具体含义未知
- `oi` 一个数值，推测是米游社ID
- `ct` 一串字符，具体作用未知，推测为认证使用
- `si` 一串字符，具体作用未知，推测为认证使用
- `bi` 一串字符，具体作用未知，推测为服务器通道

只要把对应的内容填到配置中即可！**对于字符串类型的内容请使用双引号而不是单引号，json不认单引号（在错误收集中发现有此类现象，故特别提出）**

### Q&A

#### 为什么要把信息作为统计数据发到统计服务器？

因为我手头上的信息实在太少了，而且按照米忽悠的习惯，他们的数据如果没有庞大的数据量的话很难分析出一个所以然来，所以我这里需要大量的数据。如果你不想共享你的数据，请将配置中的`analytics`设置为`false`。

#### 发现了bug/无法使用

请前往[Issues · ElainaMoe/MHYY-AutoCheckin (github.com)](https://github.com/ElainaMoe/MHYY-AutoCheckin/issues)发起新的issue来提出，不要在本页面的评论区提出问题（因为追踪性太差了）
