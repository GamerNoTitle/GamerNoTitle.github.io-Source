---
title: PIXIV网页版及客户端访问恢复指南（Linux版）
date: 2019-10-04 19:16:38
tags: Software
categories: Software
cover: https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.6/img/other/th%20(3).jpg
keywords: 'pixiv,pixiv恢复访问,pixiv linux,pixiv ubuntu,nginx反代,樱花庄的白猫'
---

[Windows版点这里，本文只介绍linux](https://2heng.xin/2017/09/19/pixiv/)

国庆快乐鸭~

本周在想，既然Mashirozx的Nginx反代上P站的方案能在Windows上用，那Linux上肯定也是可以的，而且如果是一台linux服务器搭建好了，只需要把host指向到linux服务器上，就可以直接上P站，不用再开Mashirozx的Windows反代工具包了

废话不多说，直接上教程（封面图是从樱花庄的白猫引用过来的）

#### 安装Nginx

在这里，我们安装Nginx（既然都是Nginx的反代了，不装怎么可以呢），Ubuntu上使用

```bash
$ apt-get install nginx
```

就可以安装了，安装完后输入

```bash
$ nginx -t
```

如果提示

```bash
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

就证明你安装成功了，当然，你也可以试着访问一下nginx的默认网站

访问[localhost](http://localhost)即可~！

#### 克隆工具包

```bash
$ git clone git@github.com:mashirozx/Pixiv-Nginx.git
```

使用上面这个命令来克隆[@Mashirozx/Pixiv-Nginx](https://github.com/mashirozx/Pixiv-Nginx)的反代工具包，然后打开文件夹中的“配置文件（非Windows用户使用）”文件夹

#### 安装反代配置

进入~/etc/nginx/这个位置，把上面打开的那个文件夹的东西全部都丢进去（此处需要root权限），提示覆盖就覆盖即可！

![移动文件到~/etc/nginx/](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/Pixiv-Nginx/Move-Files.png)

然后在~/etc/nginx目录下打开终端，输入以下命令

```bash
$ cd ca
$ cp pixiv.net.crt /usr/local/share/ca-certificates/pixiv.net.crt
```

将证书复制到根证书安装目录下，然后使用该命令

```bash
$ update-ca-certificates
```

更新证书，这样子你的根证书就成功安装了！

#### 重载Nginx

使用命令

```bash
$ nginx -t reload
```

重启nginx，然后新配置就会应用到nginx中，这样，反向代理就建好了

#### 修改host

接下来，你需要修改ubuntu的host

在~/etc/目录中找到host文件``host文件没有后缀名``，然后打开它，在里面加入以下内容（摘自[PIXIV网页版及客户端访问恢复指南](https://2heng.xin/2017/09/19/pixiv/)）

```bash
#www.google.com域名仅用于登陆验证
#如果你不需要这个功能，请把下一行删掉
127.0.0.1       www.google.com

#Pixiv Start
127.0.0.1       pixiv.net 
127.0.0.1       www.pixiv.net 
127.0.0.1       ssl.pixiv.net
127.0.0.1       accounts.pixiv.net 
127.0.0.1       touch.pixiv.net
127.0.0.1       oauth.secure.pixiv.net
127.0.0.1       dic.pixiv.net
127.0.0.1       en-dic.pixiv.net 
127.0.0.1       sketch.pixiv.net
127.0.0.1       payment.pixiv.net
127.0.0.1       factory.pixiv.net 
127.0.0.1       comic.pixiv.net  
127.0.0.1       novel.pixiv.net 
127.0.0.1       imgaz.pixiv.net 
127.0.0.1       sensei.pixiv.net
127.0.0.1       fanbox.pixiv.net
127.0.0.1       i.pximg.net
127.0.0.1       source.pixiv.net
127.0.0.1       i1.pixiv.net 
127.0.0.1       i2.pixiv.net 
127.0.0.1       i3.pixiv.net 
127.0.0.1       i4.pixiv.net 
210.129.120.50  app-api.pixiv.net  
74.120.148.207  g-client-proxy.pixiv.net 
210.140.131.159 d.pixiv.org 
210.140.92.135  pixiv.pximg.net  
210.140.92.134  s.pximg.net
#Pixiv End

# 顺手修一下维基百科
# Wikipedia Start
127.0.0.1 en.wikipedia.org
127.0.0.1 zh.wikipedia.org #中文维基百科桌面版
127.0.0.1 en.m.wikipedia.org
127.0.0.1 zh.m.wikipedia.org
127.0.0.1 zh-yue.wikipedia.org #粤文维基百科桌面版
127.0.0.1 wuu.wikipedia.org #吴语维基百科桌面版
127.0.0.1 ug.wikipedia.org #维吾尔文维基百科桌面版
127.0.0.1 ja.wikipedia.org #日文维基百科桌面版
127.0.0.1 zh.wikinews.org #中文维基新闻桌面版
# Wikipedia End

# 顺手修一下Steam
# Steam
127.0.0.1 store.steampowered.com
127.0.0.1 steamcommunity.com
# Steam end
```

接下来有两种方式让host生效

##### 重启电脑

这个不多说了，右上角电源键走起

##### 重启服务

使用一下命令来重启networking服务（请用root用户运行）

```bash
$ cd ~
$ cd etc/init.d
$ ./networking restart
```

这样就可以立即加载HOST文件，打开你的浏览器，打开P站就可以愉快地浏览图片啦~

#### 小技巧

当你在你的linux服务器上安装了反代服务后，你可以在你的windows计算机上利用host指向到你的linux服务器来达到上P站的目的**（当然，你需要安装Mashirozx提供的ca证书）**

在host文件中输入以下内容

```bash
#www.google.com域名仅用于登陆验证
#如果你不需要这个功能，请把下一行删掉
172.52.5.100       www.google.com

#Pixiv Start
172.52.5.100       pixiv.net 
172.52.5.100       www.pixiv.net 
172.52.5.100       ssl.pixiv.net
172.52.5.100       accounts.pixiv.net 
172.52.5.100       touch.pixiv.net
172.52.5.100       oauth.secure.pixiv.net
172.52.5.100       dic.pixiv.net
172.52.5.100       en-dic.pixiv.net 
172.52.5.100       sketch.pixiv.net
172.52.5.100       payment.pixiv.net
172.52.5.100       factory.pixiv.net 
172.52.5.100       comic.pixiv.net  
172.52.5.100       novel.pixiv.net 
172.52.5.100       imgaz.pixiv.net 
172.52.5.100       sensei.pixiv.net
172.52.5.100       fanbox.pixiv.net
172.52.5.100       i.pximg.net
172.52.5.100       source.pixiv.net
172.52.5.100       i1.pixiv.net 
172.52.5.100       i2.pixiv.net 
172.52.5.100       i3.pixiv.net 
172.52.5.100       i4.pixiv.net 
210.129.120.50  app-api.pixiv.net  
74.120.148.207  g-client-proxy.pixiv.net 
210.140.131.159 d.pixiv.org 
210.140.92.135  pixiv.pximg.net  
210.140.92.134  s.pximg.net
#Pixiv End

# 顺手修一下维基百科
# Wikipedia Start
172.52.5.100 en.wikipedia.org
172.52.5.100 zh.wikipedia.org #中文维基百科桌面版
172.52.5.100 en.m.wikipedia.org
172.52.5.100 zh.m.wikipedia.org
172.52.5.100 zh-yue.wikipedia.org #粤文维基百科桌面版
172.52.5.100 wuu.wikipedia.org #吴语维基百科桌面版
172.52.5.100 ug.wikipedia.org #维吾尔文维基百科桌面版
172.52.5.100 ja.wikipedia.org #日文维基百科桌面版
172.52.5.100 zh.wikinews.org #中文维基新闻桌面版
# Wikipedia End

# 顺手修一下Steam
# Steam
172.52.5.100 store.steampowered.com
172.52.5.100 steamcommunity.com
# Steam end
```

**其中的ip地址172.52.5.100请更换为你的linux服务器地址！！！**

当你确认已经安装完了证书，linux服务器的nginx服务运行正常后，你就可以打开pixiv愉快地浏览图片了！

#### 题外话

上个月没有写3篇文章，我的问题（给自己的定位是3篇/mo）

国庆我没有咕咕咕，是不是应该夸奖我~