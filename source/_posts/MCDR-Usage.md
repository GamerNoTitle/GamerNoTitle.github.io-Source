---
title: MCDR的正确食用方式 - 让你的服务器像TIS一样拥有QB！
date: 2020-05-30 18:28:32
tags: Tech
categories: Tech
cover: https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/MCDR-Usage/Cover.png
---

你是否也想有能够在游戏内快速管理的服务器？

你是否也想像TIS一样有各种扩展？

你是否也想有`!!qb`？

MCDReforged！不要998，不要888，只要……！@#￥%……&*（）

咳咳，走错片场了……

---

[MCDReforged](https://github.com/Fallen-Breath/MCDReforged/)是一个不需要修改MC服务端的情况下，使用自定义的插件系统提供服务器的管理等功能的一个工具，由[@Fallen_Breath](https://github.com/Fallen-Breath)开发，使用Python作为运行环境（拒绝PY2从我做起）

[这里有一个第三方的MCDR官网，你可以参阅一下](http://mcdr.cc/)

本篇我们来讲讲它的用法和我开发的插件的用法

### 如何使用

#### 工作环境

Python 的版本需要 Python 3.6+。已在如下环境中测试运行通过:

- `Windows10 x64` `Python 3.6`
- `Centos7 x64` `Python 3.8`
- `Ubuntu18.04.4 x64` `Python 3.6`

这是佛冷测试的数据，我自己的`Python`版本是`3.6.9`，在`Ubuntu 18.04.4 LTS`上通过

你首先需要安装Python3，怎么安装请自己搜索，这不是我们这一节要讨论的内容

#### 获取MCDR

你需要下载一个MCDR，我们转到MCDR的[Release](https://github.com/Fallen-Breath/MCDReforged/releases)页面，下载最新版的MCDReforged，解压，你能得到以下目录

```
MCDReforged
├─config
├─plugins
├─resources
│  └─lang
├─server
└─utils
    ├─parser
    └─reactor
```

这里说一下我们将要用到的文件夹：

`config`是用来存放插件的配置文件的

`plugins`就是插件存放的位置，你可以到[MCDR插件库](https://github.com/MCDReforged-Plugins/PluginCatalogue)([中文](https://github.com/MCDReforged-Plugins/PluginCatalogue/blob/master/readme_cn.md))下载插件

`server`就是存放服务器文件的位置，我们的服务器文件例如`minecraft.jar`、`world`都放在这个里面

其他的文件夹我们不会用到，就不动它

在MCDR的目录下打开命令行窗口，使用

```bash
$ pip install -r requirement.txt	# Windows用户
$ pip3 install -r requirement.txt	# Linux用户
```

安装MCDR运行所需要的Python模块

#### 配置MCDR

##### 配置项配置

打开`config.yml`文件，里面有所有我们需要调整的MCDR参数

有以下配置项

```yaml
language: en_us
working_directory: server
start_command: java -Xms1G -Xmx2G -jar minecraft_server.jar nogui
parser: vanilla_parser
encoding:
decoding:
console_command_prefix: '!!'
enable_rcon: false
rcon_address: 127.0.0.1
rcon_port: 25575
rcon_password: password
```

首先，如果你需要中文，就把`language`调成`zh_cn`；如果你不需要，可以不动它，直接保留`en_us`

`working_dictionary`是我们服务端存放的文件夹，当然你可以把`server`改成你喜欢的名字，然后在MCDR的工作目录里面新建一个与你填入的名字相同的文件夹，把服务端扔里头

`start_command`就是启动服务器用的命令，也就是你在服务器文件夹里面输入的启动命令，同样如果你写在了`start.sh`里面，可以直接填`sh ./start.sh`

`parser`是解码器，这个你可以根据你的服务端来填，具体如下

| 解析器名称        | 兼容的服务器类型                                             |
| ----------------- | ------------------------------------------------------------ |
| vanilla_parser    | 适用于原版 / Carpet / Fabric 服务端                          |
| bukkit_parser     | 适用于 1.14 以下的 Bukkit / Spiogt 服务端，和任意版本的 Paper 服务端 |
| bukkit_parser_14  | 适用于 1.14 及以上的 Bukkit / Spiogt 服务端                  |
| forge_parser      | 适用于 Forge 服务端                                          |
| cat_server_parser | 适用于 [CatServer](https://github.com/Luohuayu/CatServer) 服务端 |
| bungeecord_parser | 适用于Bungeecord 服务端。请在启动参数的 `-jar` 前添加 `-Djline.terminal=jline.UnsupportedTerminal` 以让其支持 MCDR 的控制，[来源](https://www.spigotmc.org/wiki/start-up-parameters/) |
| waterfall_parser  | 适用于 Waterfall 服务端                                      |

`decoding`和`encoding`是编码方式，一般留空即可

`console_command_prefix`是MCDR的命令前缀，一般保持`!!`即可

`enable_rcon`和下面的rcon设置是Minecraft服务器的Rcon，如果你要打开你需要到`server.properties`里修改rcon的相关参数

##### 权限配置

MCDR也有插件选项，拥有`admin`权限的玩家可以在游戏内使用MCDR服务器的指令，例如`!!MCDR reload plugin`，而且有些插件也会对权限进行检查，所以这就有必要配置权限

我们打开`permission.yml`文件，在对应的用户组输入用户名即可，例如

```yaml
default_level: user

owner:
- GamerNoTitle	# 这里就是给我owner权限
admin:
- UBIthepotato	# 这里就是给UBIthepotato上admin权限
helper:
user:
guest:
```

给完权限后，在后台使用`!!MCDR reload permission`来刷新权限

#### 启动MCDR

配置完MCDR后，我们回到MCDR的工作目录，使用命令

```bash
$ python MCDReforged.py	# Windows用户
$ python3 MCDReforged.py	# Linux用户
```

来启动我们的服务器，当你看到提示`Done (12.757s)! For help, type "help"`就是启动完了（不同服务端的提示可能不一样，我这里是`vanilla`

#### 安装插件

首先你需要到[MCDR插件库](https://github.com/MCDReforged-Plugins/PluginCatalogue)([中文](https://github.com/MCDReforged-Plugins/PluginCatalogue/blob/master/readme_cn.md))下载插件，文件应该是一个`xxx.py`文件，有的插件会带有一个`xxx.json`的配置文件

将`xxx.py`文件放入`plugins`文件夹，将`xxx.json`放入`config`文件夹即可

如果你的服务器正在运行，可以使用`!!MCDR reload plugin`来重载插件

---

### 题外话

MCDR是真的好用，我的MC服务器就用的它

现在想完善一下镜像服插件的功能，想试试在主服务器关闭镜像服，不过得慢慢做了

本月我没咕！没咕！咕~咕~咕咕咕~