---
title: MCDR-Mirror-Server使用手册和例子 | The usage and example of MCDR-Mirror-Server
date: 2020-07-18 12:44:51
tags: Tech
categories: Tech
cover: https://assets.bili33.top/img/MCDR-Mirror-Server-Usage/cover.jpg
---

# 简体中文

{% note info %}

感谢你选用[MCDR-Mirror-Server](https://github.com/GamerNoTitle/MCDR-Mirror-Server)作为MCDR镜像服插件，本页面是镜像服插件的一个例子，希望你看了这个例子能够更加清楚镜像服插件的工作原理和使用方法(\*^▽^\*)

{% endnote %}

**[English users please click me!](#English)**

## 使用方法

首先，我们需要下载[MCDR-Mirror-Server](https://github.com/GamerNoTitle/MCDR-Mirror-Server)插件，你可以在[Github仓库](https://github.com/GamerNoTitle/MCDR-Mirror-Server)下载，对于中文用户，请下载`mirror.py`和`mirror.json`

接着，把`mirror.py`放入MCDR的Plugins文件夹，把`mirror.json`放入MCDR的config文件夹，这样，插件的位置就到位了

在MCDR的目录下新建一个文件夹，或者在其他地方新建一个文件夹，用于存放镜像服的文件。

{% note warning %}

**<font color=#FF0000>请注意！Windows用户请不要跨盘符建立文件夹，如果你的MCDR文件夹在C盘，那么你就把镜像服文件夹建立在C盘，请不要建立在D、E、F等盘（即禁止跨盘符建立文件夹），这是由于cmd的盘符切换方法导致你在运行MCDR的时候无法切换到其他盘符</font>**

{% endnote %}

将你的镜像服文件丢进你建立的文件夹内，可以带着MCDR进去，也可以不带，程序会自动判断是否带了MCDR

接着打开你的`mirror.json`文件，我们将要开始配置了

```json
{
    "path": "./mirror/",
    "world": ["world"],
    "command": "python3 MCDReforged.py",
    "remote":{
        "enable": false,
        "address": "127.0.0.1",
        "secret": "password",
        "port": 25575,
        "command": false
    }
}
```

首先，将`path`后面的内容改为你的文件夹路径，可以是相对路径也可以是绝对路径

将`world`后面的内容改为你的世界文件夹的名字，请注意需要按照列表的格式填写，即`["world","world1","world2"]`等，将你所有的世界文件夹填入，如果你是原版服务器的话基本上只填写world是莫得问题的

将`command`改为你的镜像服启动的命令，例如`java -Xms2G -Xmx4G -jar server.jar`或者`python3 MCDReforged.py`等，如果你的镜像服也带了MCDR，你需要注意：Windows使用python的方式不是写作`python3`而是写作`py`或者`python`，linux则特定要写`python3`

下面是rcon的相关配置，有关rcon的相关信息，你可以看[这里](https://www.zhihu.com/question/381405552/answer/1099552088)

`enable`是是否开启rcon功能，如果开启了就可以使用rcon的功能，如果不开启就不行，相当于镜像服对镜像服rcon链接的总开关吧

`address`是镜像服服务器的地址，如果你是同一台机子就填`127.0.0.1`即可，否则就要填写直连的地址

`secret`填写镜像服的rcon密码，这个在`server.properties`里面设置的

`port`填写镜像服的rcon端口，同样在`server.properties`设置

`command`即是否允许利用`!!mirror rcon <command>`来对镜像服使用命令

填写完了以后，你仍然需要在server.properties里面修改端口，避免端口冲突

然后就可以在主服务器里`!!MCDR reload plugin`然后使用`!!mirror start`来尝试开启服务器了

## 使用例子

以我自己来说，我的目录树大概长这样

```
MCDReforged
├─config
├─lang
├─mirror
│  ├─server
│  │  └─world
├─plugins
├─resources
├─server
│  └─world
└─utils
```

我的mirror文件夹就是我的镜像服文件夹，里面放了MCDR作为镜像服的管理工具，原版服务器上了Fabric，使用Linux来开服，所以我的config是下面这样的

```json
{
    "path": "./mirror/",
    "world": ["world"],
    "command": "python3 MCDReforged.py",
    "remote":{
        "enable": true,
        "address": "127.0.0.1",
        "secret": "password",
        "port": 25575,
        "command": true
    }
}
```

在mirror文件夹里面，我的文件大概如图所示（注：我开服的系统是linux，只是这里用Windows来浏览文件）

![Mirror文件夹的文件](https://assets.bili33.top/img/MCDR-Mirror-Server-Usage/Mirror-Files.png)

我的镜像服`server.properties`的内容如下

```properties
#Minecraft server properties
#Wed Jul 08 12:17:29 CST 2020
broadcast-rcon-to-ops=true
view-distance=10
max-build-height=256
server-ip=
rcon.port=25585
level-seed=
allow-nether=true
gamemode=creative
enable-command-block=true
server-port=25566
enable-rcon=true
enable-query=false
op-permission-level=4
prevent-proxy-connections=false
generator-settings=
resource-pack=
player-idle-timeout=0
level-name=world
rcon.password=password
motd=Minecraft Server by GamerNoTitle
query.port=25566
force-gamemode=false
debug=false
hardcore=false
white-list=false
broadcast-console-to-ops=true
pvp=true
spawn-npcs=true
spawn-animals=true
generate-structures=true
snooper-enabled=true
difficulty=hard
function-permission-level=2
network-compression-threshold=256
level-type=default
max-tick-time=60000
spawn-monsters=true
enforce-whitelist=false
max-players=20
use-native-transport=true
spawn-protection=0
resource-pack-sha1=
online-mode=false
allow-flight=false
max-world-size=29999984
```

其实最主要的是下面这几个

```properties
rcon.port=25585
server-port=25566
enable-rcon=true
rcon.password=password
```

保证端口不冲突即可，其他其实没啥；然后就是设置rcon的密码，然后把密码填进`mirror.json`，接着在主服务器用`!!mirror start`开服，就可以了

## 工作原理

工作原理很简单！就是通过MCDR打开了位于你镜像服文件夹的一个服务器，如果是Windows顺带还开多了一个powershell以免stop的时候把主服务器也stop了；关服务器的原理就是通过rcon对镜像服发起了`/stop`指令，仅此而已；同步就是对镜像服的世界文件夹覆盖

---

# English

{% note info %}

Thanks for choosing [MCDR-Mirror-Server](https://github.com/GamerNoTitle/MCDR-Mirror-Server) as your mirror server plugin. This page is an example of mirror plugin. Hopefully it can make you clear the working principle of the plugin and help you use the plugin more efficiently and more conveniently

Due to my lack of English (I'm still a senior high school student in China), some grammars may be wrong. If you don't mind or help me correct it, I'll appreciate it. Thanks♪(･ω･)ﾉ

{% endnote %}

## Usage

First, you need to download [MCDR-Mirror-Server](https://github.com/GamerNoTitle/MCDR-Mirror-Server) plugin, you can download it from my [Github](https://github.com/GamerNoTitle/MCDR-Mirror-Server). For English users, you need to download `mirror.py` and `mirror.json`.

Now you have downloaded the things you need, just put `mirror.py` into plugins folder and put `mirror.json` into config folder. Congratulate! You have installed the plugin successfully!

Create a new folder in MCDR's folder or other place, for the use or put the mirror's file inside it.

{% note warning %}

**<font color=#FF0000>For Windows users be careful: You can't put the folder across the drive. For example, if your main server folder is in C drive, then just create the folder in C drive, don't put it into D, E, F, etc. Since the switch method of cmd, you cannot switch to another drive while you're using MCDR</font>**

{% endnote %}

And now, but your mirror server into the folder you just created. Whether it included a MCDR is not a question, the plugin will automatically detect it.

Next, open the file `mirror.json` and edit the configuration of it

```json
{
    "path": "./mirror/",
    "world": ["world"],
    "command": "python3 MCDReforged.py",
    "remote":{
        "enable": false,
        "address": "127.0.0.1",
        "secret": "password",
        "port": 25575,
        "command": false
    }
}
```

Firstly, change `./mirror/` into the folder you just created (An absolute path or a relative path is avaliable)

Next change the list behind `world` with the format like `["world", "world1", "world2"]`, type all your world folder in. If your server is vanilla one then just keep it

Change the content behind `command` as your server's start command. For example, `java -Xms2G -Xmx4G -jar server.jar` for vanilla or `python3 MCDReforged.py` for MCDReforged.

Tips: For Windows users, the startup command of python is `py` or `python` not `python3` for linux users.

The following settings are the rcon ones, if you want to know what is rcon, you can visit [here](https://wiki.vg/RCON)

`enable` means whether the rcon feature of mirror plugin is enabled or not, `true` to enable it, or `false` to disable it. If you disabled it, you cannot use any functions of rcon like remote shutdown and so on.

`address` is the mirror server's address. For the users who put the two server into the same computer, just keep it as `127.0.0.1`

`secret` is the password of your rcon, you can change it in `server.properties` file.

`port` is the port of the rcon on mirror server, you can also change it in `server.properties` file

`command` is the switch on allowing to use `!!mirror rcon <command>` command to input command to mirror server.

when you're finished, you also need to change the port your mirror server in order to avoid the same port use between the main server and the mirror one.

## Example

For my mirror, my directory tree like this

```
MCDReforged
├─config
├─lang
├─mirror
│  ├─server
│  │  └─world
├─plugins
├─resources
├─server
│  └─world
└─utils
```

My mirror server folder inside MCDReforged is the folder called `mirror`, and I put a MCDR in it in order to manage my mirror server. After all, I use linux to hold the server, so my config grows like this

```json
{
    "path": "./mirror/",
    "world": ["world"],
    "command": "python3 MCDReforged.py",
    "remote":{
        "enable": true,
        "address": "127.0.0.1",
        "secret": "password",
        "port": 25575,
        "command": true
    }
}
```

My file in mirror folder like the picture below (PS: I use linux to hold the server, and I just use Windows to explore my files)

![All my files in mirror folder](https://assets.bili33.top/img/MCDR-Mirror-Server-Usage/Mirror-Files.png)

and my `server.properties` of my mirror like this

```properties
#Minecraft server properties
#Wed Jul 08 12:17:29 CST 2020
broadcast-rcon-to-ops=true
view-distance=10
max-build-height=256
server-ip=
rcon.port=25585
level-seed=
allow-nether=true
gamemode=creative
enable-command-block=true
server-port=25566
enable-rcon=true
enable-query=false
op-permission-level=4
prevent-proxy-connections=false
generator-settings=
resource-pack=
player-idle-timeout=0
level-name=world
rcon.password=password
motd=Minecraft Server by GamerNoTitle
query.port=25566
force-gamemode=false
debug=false
hardcore=false
white-list=false
broadcast-console-to-ops=true
pvp=true
spawn-npcs=true
spawn-animals=true
generate-structures=true
snooper-enabled=true
difficulty=hard
function-permission-level=2
network-compression-threshold=256
level-type=default
max-tick-time=60000
spawn-monsters=true
enforce-whitelist=false
max-players=20
use-native-transport=true
spawn-protection=0
resource-pack-sha1=
online-mode=false
allow-flight=false
max-world-size=29999984
```

The most important things are the following configuration

```properties
rcon.port=25585
server-port=25566
enable-rcon=true
rcon.password=password
```

just keep the port use not the same, and setup your rcon's password. Type the password and port in the `mirror.json` and use `!!mirrro start` in your main server to startup your mirror. That's it.

## Principle

It's pretty easy! Just use MCDR to call python to use command to turn on another server. For Windows users, i've also create a new powershell thread to hold the mirror one in order to prevent the main server being killed. The shutdown just use rcon feature to send a `/stop` command to the mirror folder. Sync just copy the main server's world into the mirror one.