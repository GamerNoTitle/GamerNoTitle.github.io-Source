---
title: 记一次更新服务器Python的过程
date: 2023-03-10 14:54:46
tags: [服务器运维, 更新Python, 编译]
categories: Tech
cover: https://cdn.bili33.top/gh/Vikutorika/newassets/img/Update-Python-on-my-server/MobaXterm-20230310-150219.png
---

这几天撸了一个Warframe的查询bot（[GamerNoTitle/AaTMbot: AaTMbot (Alerts & Tenno's Market Bot) 是一个与go-cqhttp一起运行的WARFRAME信息查询/推送bot (github.com)](https://github.com/GamerNoTitle/AaTMbot)），因为自己物理机子用的Python版本是`3.10.3`，所以干脆就用上了`3.10`更新的`match...case...`写法，然鹅就当我写完bot部署到服务器的时候，却发现我的服务器的py还停留在`3.8.10`，这不就用不了`match...case...`了吗……所以我决定更新一下我的服务器上面的Python

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/Update-Python-on-my-server/MobaXterm-20230310-145757.png)

---

## 下载Python

很简单，终端直接`wget`就行了，链接自己从官网获得

```shell
$ wget https://www.python.org/ftp/python/3.10.9/Python-3.10.9.tgz
```

然后我们要解压一下我们的文件，用`tar`命令

```shell
$ tar -zxvf Python-*.tgz
```

然后会得到一个文件夹，我们进入这个文件夹里面，准备编译Python

## 编译Python

Python源码是要自己编译的，编译成二进制可执行文件才能被我们的系统执行，首先我们要让它自己配置一下

```shell
$ ./configure --enable-optimizations
```

等它配置完以后开始编译（没有`make`的要先装一下，用`sudo apt install make -y`

```shell
$ make
```

这个过程会非常的漫长（主要我服务器性能太低了），等它编译完

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/Update-Python-on-my-server/MobaXterm-20230310-150219.png)

进行安装

```shell
$ sudo make install
```

完成后，我们还要把原来的Python替换掉

## 替换Python

先删除原来的Python

```shell
$ rm /usr/bin/python
```

然后建立连接

```shell
$ sudo ln -s /home/ubuntu/python310/Python-3.10.9/python /usr/bin/python3
$ sudo ln -s /home/ubuntu/python310/Python-3.10.9/python /usr/bin/python
```

这样就完成了

![](https://cdn.bili33.top/gh/Vikutorika/newassets/img/Update-Python-on-my-server/MobaXterm-20230310-151242.png)

