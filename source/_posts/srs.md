---
title: 手把手教你怎么搭建属于自己的直播服务器~
date: 2019-09-19 13:23:16
tags: Software
cover: https://cdn2.f-cdn.com/contestentries/1465340/30196593/5c4eb91aab7ff_thumb900.jpg
---

前两个月学校的旧外包跑路了（其实是合约到期了），他们的直播系统就被学校废弃了，那么问题就来了：学校要直播呀！！！没有直播系统怎么办啊！！！

所以这次就来手把手（按照我搭建的经验）来教你怎么搭建属于自个的直播系统~

``PS：可以打开侧边栏看，方便找到需要的内容``

### 准备材料

``*表示非必需``

1、一台linux电脑（windows上没试过，感兴趣的同志们可以试试）

*2、一台网页服务器（可以用上面的linux电脑，或者个人电脑）

### 搭建环境

#### GoLang环境

使用命令进入root用户

```bash
$ su
```

##### 一键安装方式

```bash
$ git clone https://github.com/letseeqiji/oneinstall.git
$ cd oneinstall/golang
$ bash goinstall.sh
```

直接运行脚本进行安装

###### Ubantu/Debian用户

你可以使用

```bash
$ sudo apt-get install golang
```

直接安装Go环境，然后设置GOPATH即可

```bash
$ vi /etc/profile
```

打开文件后，对文件修改，在文件最下面添加

export GOPATH=/goWorkPlace

然后按Esc，保存文件

最后，刷新文件，使更改生效。输入命令

```bash
$ source /etc/profile
```

##### 二进制码安装方式

64位

```bash
$ wget https://storage.googleapis.com/golang/go1.4.1.linux-amd64.tar.gz
```

32位

```bash
$ wget https://storage.googleapis.com/golang/go1.4.1.linux-386.tar.gz
```

在/usr/local下安装：

```bash
$ sudo tar -xzf <filename> -C /usr/local
```

配置环境变量：有三个变量GOPATH、PATH、GOROOT

GOROOT就是go的安装路径

GOPATH就是go的工作目录

PATH是go安装路径下的bin目录

```bash
$ vi /etc/profile
```

打开文件后，对文件修改，在文件最下面添加

export GOPATH=/goWorkPlace

export GOROOT=/usr/local/go

export PATH=$PATH:$GOROOT/bin

保存文件，刷新，使更改生效

```bash
$ source /etc/profile
```

#### srs设置

使用git克隆代码

```bash
$ git clone git@github.com:ossrs/srs.git
$ cd srs
```

进入srs目录，对目录中的文件进行修改。

打开./trunk/conf/srs.conf文件，对其进行修改

其中有几个参数需要修改：

```bash
listen	1935; #直播推流的端口
max_connections 1000; 	#最大线程数
srs_log_tank	console;	#srs日志输出位置，可以为console或file
srs_log_file ./objs/srs.log;	#srs日志输出文件，当上面为file时必须设置
```

上面的参数根据自己的需要进行修改，其中max_connections推荐设置为100，否则编译有可能会出错

在root用户中，进入./trunk，使用命令

```bash
$ ./configure && make
```

对srs进行编译，编译过程稍长，请耐心等待

当编译完成后，可以使用

```bash
$ ./objs/srs -c conf/srs.conf
```

打开srs服务器，打开客户机上的OBS Studio（vMix也可以），推流地址填写如下

``rtmp://<你的srs服务器ip>:1935/home``

推流密钥填写如下

``/live``

也可以把live换成任意的文字或路径

此时可以使用VLC Media Player来检测是否推流成功，打开VLC Media Player，选择“媒体”->“打开网络串流”，在URL里面填写你的rtmp地址（包括密钥）例如我的OBS配置如下

![OBS-Config](https://raw.githubusercontent.com/GamerNoTitle/Picture-repo/master/srs/OBS-Conf.png)

那么我就应该填写``rtmp://172.52.5.100:1935/home/live``

点击确定，可以看到我推流出来的内容

![VLC](https://raw.githubusercontent.com/GamerNoTitle/Picture-repo/master/srs/VLC-Media-Player-Success.png)

这样就证明我推流成功了！

### 网页前端设置

我们毕竟是个直播，总不可能每个班级都安装一个VLC Media Player的嘛，所以说，我们要用网页来拉流。

用网页来拉流，就要用到HLS了（具体百度哦~），但是我们要怎么打开HLS呢？

你需要在你的srs.conf中的

```json
vhost __defaultVhost__ {
}
```

中加入以下内容（可以直接复制粘贴）

```json
vhost __defaultVhost__ {
 # http-flv设置
    http_remux{
        enabled    on;
        mount      [vhost]/[app]/[stream].flv;
        hstrs      on;
    }
 
    # hls设置
    hls{
        enabled       on;
        hls_path      ./objs/nginx/html;
        hls_fragment  10;
        hls_window    60;
    }
}
```

然后重新打开srs即可

那么下面的链接应该都可以使用（按照我的填写方法为例）

| 链接类型  |                  链接                   |
| :-------: | :-------------------------------------: |
|   rtmp    |   rtmp://172.52.5.100:1935/live/home    |
| http/flv  | http://172.52.5.100:8080/live/home.flv  |
| http/m3u8 | http://172.52.5.100:8080/live/home.m3u8 |

可以利用我们的网页示例，进行调试（请不要使用本地打开文件的方式进行调试，会被拦截）

```bash
$ git clone git@github.com:5amstd/live-system.git
```

将里面的146行的视频地址更改为自己的视频地址即可

```html
video:'http://172.52.5.100:8080/home/live.flv' //视频地址
```

然后保存刷新，打开里面的视频播放器（都9102年了还用Flash？？？），就可以看到直播画面了

![Website](https://raw.githubusercontent.com/GamerNoTitle/Picture-repo/master/srs/live.png)

如果你看到了直播画面，就证明你成功了~

### 题外话

第一次用Ubantu来搭建项目，感觉Ubantu挺好用的，所以现在两台电脑吧，把我之前的那台DELL OptiPlex 3046拿来装Ubantu了

srs搞了我很长时间，其实最主要的问题是Ubantu（Linux）用的不很熟悉，然后权限问题也很烦

HLS的分发挺麻烦的，查看了很多官方文档，后来在别人的文章里面找到了解决方法

最近喜欢打方舟，有舟游玩家嘛，加波好友啊：喵呜初音#0717（B服玩家哦~）