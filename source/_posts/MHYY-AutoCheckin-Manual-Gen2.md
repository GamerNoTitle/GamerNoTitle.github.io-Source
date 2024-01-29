---
title: MHYY-AutoCheckin - 米哈云游（云原神）自动签到脚本食用指南（第二代）
date: 2024-01-29 23:38:18
tags: [Tech, Tutorial, Python, Script]
categories: Tech
cover: https://cdn.bili33.top/gh/Vikutorika/newassets/img/MHYY-AutoCheckin-Manual-Gen2/114423788_p1.jpg
---

## MHYY-AutoCheckin - 米哈云游（云原神）自动签到脚本食用指南（第二代）

**在指南开始之前，请确保你有一颗聪明的头脑和可以折腾的时间，否则请等时机合适再进行配置！**

**在使用过程中如果遇到什么问题，请前往[Issues · GamerNoTitle/MHYY (github.com)](https://github.com/GamerNoTitle/MHYY/issues)发起新的issue来提出，不要在本页面的评论区提出问题（因为追踪性太差了）**

### 文章封面：[#フォカロルス 芙卡洛斯 - 喵咕君QAQ(KH3)的插画 - pixiv](https://www.pixiv.net/artworks/114423788)

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/MHYY-AutoCheckin-Manual-Gen2/114423788_p1.jpg)

### 用前必读

**⚠️请不要进行宣传，谢谢！一旦发现宣传就删库跑路！使用过程中如果出现bug可能会使用您的日志进行错误追踪，详情请见[隐私政策](https://github.com/GamerNoTitle/MHYY/blob/master/private-policy.md)**

### 快速开始

> 先点个STAR，我们马上开始我们的教程:D

#### 使用青龙面板运行

如果你选择使用青龙面板，那么你需要执行以下操作

首先点开订阅管理，把这个命令粘贴进去

```
ql repo http://git.bili33.top/GamerNoTitle/MHYY.git "master" "" ""
```

然后他会自动识别，并填入相应的内容，你只需要修改定时规则即可，名称按照自己需要修改

你可以改成下面这个（Github链接，国内可能访问不了）

```
ql repo https://github.com/GamerNoTitle/MHYY.git "master" "" ""
```

保存以后点击运行按钮更新一下订阅

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/MHYY-AutoCheckin-Manual/msedge-20230303-172154.png)

在定时任务中你就能找到刚刚更新的内容，但是还不能够使用，我们还需要配置依赖和环境变量

我们需要两个python3依赖，分别是`requests`和`sentry-sdk`，如图填写并安装

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/MHYY-AutoCheckin-Manual/msedge-20230303-172601.png)

然后点到环境变量，新建名为`MHYY_CONFIG`的变量，把我们的配置填进去，点击保存

> [如何填写配置？手把手教你获取登录凭据！](#配置获取)

#### 使用Github Action运行

{% note danger %}

**原仓库在2023/02/03收到Github通知封禁，镜像仓库在[GamerNoTitle/MHYY: Disabled Action, if you need it, enable it by yourself (github.com)](https://github.com/GamerNoTitle/MHYY)，本项目仓库的Github Action已经被我手动禁用，如果需要使用Action版本，请将`~/.github/workflows`文件夹内的两个文件后面的`.disabled`删掉！**

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/MHYY-AutoCheckin-Manual/ApplicationFrameHost-20230203-084848.png)

{% endnote %}

首先你需要先打开本脚本的仓库[GamerNoTitle/MHYY: 米哈云游（云原神）自动签到脚本，让你每天都拿到15分钟~ (github.com)](https://github.com/GamerNoTitle/MHYY)，点击右上角的fork按钮，接着点击下面绿色的`Create fork`来创建一个分支

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/Github/MHYY-AutoCheckin/msedge-20220419-190358.png?download=true)

然后点击上面的`Settings`，导航到`Secrets`->`Actions`页面下，点击`New repository secret`（如图）

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/Github/MHYY-AutoCheckin/msedge-20220419-190537.png?download=true)

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/Github/MHYY-AutoCheckin/msedge-20220419-190618.png?download=true)

将配置填充入名字为`MHYY_SECERT`的Secret中（内容获取请参照[配置内容获取](#配置获取)一节）

> [如何填写配置？手把手教你获取登录凭据！](#配置获取)

### 自动保活（在Github Action上运行的才需要）

{% note warning %}

事实上，对于现版本的Github Action，只需要把`KeepActionAlive`打开即可，下面的这些操作是旧版本的Action所需要的

{% endnote %}

因为Github在仓库没有push三个月后会停用仓库的一切Action，所以说我们需要进行保活。

在启用`KeepActionAlive`之前，你需要创建一个用来push更改的`GITHUB_TOKEN`

右上角点击自己的头像，然后点击`Settings`，然后在左侧的导航栏找到`Developer Settings`

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/Github/MHYY-AutoCheckin/msedge-20220822-204614.png)

然后在左边找到`Personal Access Tokens`，点击`Generate new token`生成一个token，名字填写为`GITHUB_TOKEN`

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/Github/MHYY-AutoCheckin/msedge-20220822-204757.png)

把过期时间设置为`No expiration`，然后依次勾选下面内容

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/Github/MHYY-AutoCheckin/msedge-20220822-205002.png)

然后点最下面的绿色按钮`Generate token`即可

在Action页面启用`KeppActionAlive`即可！脚本会在每个月的1号自动推送更新从而达到保活的目的。

### 配置内容解释

你填入环境变量的配置应该具有下面这样的格式（解释请看注释）

```yaml
# 使用前请阅读文档：https://bili33.top/posts/MHYY-AutoCheckin-Manual-Gen2
# 有问题请前往Github开启issue：https://github.com/GamerNoTitle/MHYY/issues

######## 以下为账号配置项，可以多账号，详情请参考文档 ########
accounts:
  # 第一个账号
  - token: 
    # 关于type：如果你在安卓版的云·原神里面抓的话type应该是2
    # 如果你是网页版抓的，那type应该是16
    # 此处仅供参考，具体以你抓的为准 
    type: 
    # sysver：如果你是安卓版抓的，这个应该会显示你的安卓版本（鸿蒙不清楚，手上没设备）
    # 如果你是网页版抓的，这个应该是你的系统版本（注：Windows 10和Windows 11都是写的Windows 10）
    sysver: 
    # deviceid：手机抓的会有这个，抓到什么填什么
    # 如果是网页版抓的，那也是抓到什么填什么
    deviceid: 
    # devicename: 手机抓的话就是手机的入网型号，如红米K40为M2012K11AC，红米K50为22021211RC
    # 如果是网页版抓的，填Unknown
    devicename: 
    # devicemodel: 手机抓的填抓出来的手机型号，大概为手机厂商+上面的deviceid，如红米K40为Xiaomi M2012K11AC
    # 如果是网页版抓的，填Unknown
    devicemodel: 
    # appid: 手机抓的固定填1953439974，网页版抓的留空
    appid: 
  # 第二个账号，不需要的话把下面删掉，如果需要更多就在下面再加
  - token:
    # 关于type：如果你在安卓版的云·原神里面抓的话type应该是2
    # 如果你是网页版抓的，那type应该是16
    # 此处仅供参考，具体以你抓的为准 
    type: 
    # sysver：如果你是安卓版抓的，这个应该会显示你的安卓版本（鸿蒙不清楚，手上没设备）
    # 如果你是网页版抓的，这个应该是你的系统版本（注：Windows 10和Windows 11都是写的Windows 10）
    sysver: 
    # deviceid：手机抓的会有这个，抓到什么填什么
    # 如果是网页版抓的，那也是抓到什么填什么
    deviceid: 
    # devicename: 手机抓的话就是手机的入网型号，如红米K40为M2012K11AC，红米K50为22021211RC
    # 如果是网页版抓的，填Unknown
    devicename: 
    # devicemodel: 手机抓的填抓出来的手机型号，大概为手机厂商+上面的deviceid，如红米K40为Xiaomi M2012K11AC
    # 如果是网页版抓的，填Unknown
    devicemodel: 
    # appid: 手机抓的固定填1953439974，网页版抓的留空
    appid: 
```

如果你只需要一个账号，那就直接把标着**第二个账号**那一行及以下全删掉就行了，例如（下面的例子删除了注释）

```yaml
# 使用前请阅读文档：https://bili33.top/posts/MHYY-AutoCheckin-Manual-Gen2
# 有问题请前往Github开启issue：https://github.com/GamerNoTitle/MHYY/issues

######## 以下为账号配置项，可以多账号，详情请参考文档 ########
accounts:
  # 第一个账号
  - token: 
    type: 
    sysver: 
    deviceid: 
    devicename: 
    devicemodel: 
    appid: 
```

但如果你需要多个账号（例如我需要三个账号），那就需要把重复的部分复制粘贴（有几个账号就有几个相同的配置项），例如（下面的例子删除了注释）

```yaml
# 使用前请阅读文档：https://bili33.top/posts/MHYY-AutoCheckin-Manual/
# 有问题请前往Github开启issue：https://github.com/GamerNoTitle/MHYY/issues

######## 以下为账号配置项，可以多账号，详情请参考文档 ########
accounts:
  # 第一个账号
  - token: 
    type: 
    sysver: 
    deviceid: 
    devicename: 
    devicemodel: 
    appid: 
  # 第二个账号
  - token:
    type: 
    sysver: 
    deviceid: 
    devicename: 
    devicemodel: 
    appid: 
  # 第三个账号
  - token:
    type: 
    sysver: 
    deviceid: 
    devicename: 
    devicemodel: 
    appid: 
```



### 配置获取

#### 从网页版云原神获取

打开云原神网页版的链接[云·原神 (mihoyo.com)](https://ys.mihoyo.com/cloud/#/)，完成登录，完成后应该会是下图的样子

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/MHYY-AutoCheckin-Manual-Gen2/msedge-20240130-000325.jpg)

这时候按一下键盘上的<kbd>F12</kbd>把开发者工具打开，然后点击顶上的网络（`Network`），按下键盘上的<kbd>F5</kbd>进行刷新页面操作

开发者控制台会弹出很多的请求，在左上角的搜索框里面搜索`login`，点击最下面的一个条目

在右侧会显示很多的信息，拉到最底下，就可以看到我们所需要的信息了

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/MHYY-AutoCheckin-Manual-Gen2/msedge-20240130-001316.png)

里面的内容具有以下对应关系

>- `token` 是里面的 `x-rpc-combo_token`
>- `type` 是里面的 `x-rpc-client_type`
>- `sysver` 是里面的 `x-rpc-sys_version`，一般为电脑的系统（Windows 11会写作Windows 10，不用管，写什么填什么）
>- `deviceid` 是里面的 `x-rpc-device_id`，一般为UUID
>- `devicename` 是里面的 `x-rpc-device_name`，应该固定为`Unknown`
>- `devicemodel` 是里面的 `x-rpc-device_model`，应该固定为`Unknown`
>- `appid` 是里面的 `x-rpc-app_id`，留空

#### 从安卓版云原神获取（图片有点旧，但是逻辑是一样的）

你需要安装一个手机上的抓包软件（例如HttpCanary，或者如果你能够用fiddler电脑运行去抓也行）

**一定要记得装抓包软件提供的证书，要不然解不了SSL连接，一定要先登录并成功进去了再启动抓包软件！！！**

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/Github/MHYY-AutoCheckin/HTTPCANARY-Result.jpg?download=true)

这里面只要是个HTTP链接，随便一个里面都有我们所需要的东西，这里我就点开了一个链接，在请求里面有所有我们需要的东西，而解释我都写在图片里面了

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/Github/MHYY-AutoCheckin/HTTPS-REQUEST-RESULT.png?download=true)

其中，这里面的东西与变量有如下的对应关系

>- `token` 是里面的 `x-rpc-combo_token`
>- `type` 是里面的 `x-rpc-client_type`
>- `sysver` 是里面的 `x-rpc-sys_version`，一般为安卓的版本
>- `deviceid` 是里面的 `x-rpc-device_id`，一般为UUID
>- `devicename` 是里面的 `x-rpc-device_name`，一般为 `手机厂商名（如Xiaomi）` + `设备入网型号`
>- `devicemodel` 是里面的 `x-rpc-device_model`，一般为`设备入网型号`
>- `appid` 是里面的 `x-rpc-app_id`，固定为`1953439974`

### Q&A

#### KeepActionAlive运行失败（权限不足）

具体如图所示，这个要得益于昨天Github的一个更新[GitHub Actions - Updating the default GITHUB_TOKEN permissions to read-only | GitHub Changelog](https://github.blog/changelog/2023-02-02-github-actions-updating-the-default-github_token-permissions-to-read-only/)

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/MHYY-AutoCheckin-Manual/ERRchrome-20230204-003058.png)

在仓库里面点击`Settings` => `Actions` => `General`，往下拉找到`Workflow permissions`，把原来的`Read repository contents and packages permissions`改为上面的`Read and write permissions`，然后点击下面的`Save`键就可以了

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/MHYY-AutoCheckin-Manual/chrome-20230204-003338.png)

#### 发现了bug/无法使用

请前往[Issues · GamerNoTitle/MHYY (github.com)](https://github.com/GamerNoTitle/MHYY/issues)发起新的issue来提出，不要在本页面的评论区提出问题（因为追踪性太差了）
