---
title: 从外网访问Windows服务器上WSL的服务
date: 2023-07-08 14:46:40
tags: [Tech, WSL, Windows, Server]
categories: Tech
cover: https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Access-WSL-through-Windows/cover.png
---

之前因为[Valora](https://github.com/GamerNoTitle/Valora)这个东西部署在Zeabur上面，然后Zeabur被我用超了，给我发邮件了，让我升级我的套餐，那既然这样我肯定得寻找更好的服务器去搭建Valora了；前些阵子我问了[@CyanFalse](https://github.com/ChenYFan)想问问有没有什么好的服务器，结果人家很大气啊，直接给了一台12H48G的**Windows**服务器（没错是Windows不是Linux），虽然说Windows做服务器没啥问题，又不是不会用，天天用着这个视窗11怎么可能不会用，不过Windows还是有点不方便，然后我就装了WSL来跑我的服务

但是但是，Windows的WSL是有防火墙加持的，这个防火墙是Windows自己的防火墙，会阻挡Windows访问WSL的服务，也会阻挡WSL访问Windows的服务，这很不方便，所以就有了这个文章

## 找到目标IP

首先得搞清楚我们要访问的IP，要不然关了防火墙访问错IP也是没用的，不过这一部分很简单，甚至可以跳过

### 找到WindowsIP

直接在设置里面找到自己当前使用的网络驱动器，里面就有（这里用我自己电脑截个图，我自己电脑是设置了静态IP的，一般来说上面IP分配那里会写自动，要看下面那个IPv4地址的IP）

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Access-WSL-through-Windows/ApplicationFrameHost-20230708-150548.png)

当然如果你更习惯用命令行（例如我），那可以使用以下命令获取

```powershell
ipconfig
```

然后会有一堆的输出（取决于你有多少个网卡）

```
PS C:\Users\GamerNoTitle> ipconfig

Windows IP 配置


未知适配器 Tailscale:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::d8ff:5060:f230:9168%67
   自动配置 IPv4 地址  . . . . . . . : 169.254.83.107
   子网掩码  . . . . . . . . . . . . : 255.255.0.0
   默认网关. . . . . . . . . . . . . :

无线局域网适配器 WLAN:

   媒体状态  . . . . . . . . . . . . : 媒体已断开连接
   连接特定的 DNS 后缀 . . . . . . . : DHCP HOST

以太网适配器 以太网:

   连接特定的 DNS 后缀 . . . . . . . :
   IPv4 地址 . . . . . . . . . . . . : 192.168.0.233
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . : 192.168.0.1

以太网适配器 VMware Network Adapter VMnet1:

   连接特定的 DNS 后缀 . . . . . . . :
   IPv4 地址 . . . . . . . . . . . . : 192.168.10.1
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :

以太网适配器 VMware Network Adapter VMnet8:

   连接特定的 DNS 后缀 . . . . . . . :
   IPv4 地址 . . . . . . . . . . . . : 192.168.43.1
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :

以太网适配器 vEthernet (Default Switch):

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::369c:b5be:230:32bb%79
   IPv4 地址 . . . . . . . . . . . . : 172.21.96.1
   子网掩码  . . . . . . . . . . . . : 255.255.240.0
   默认网关. . . . . . . . . . . . . :
```

我这里网卡是用的`以太网适配器 以太网`，所以我的IP就是`192.168.0.233`

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Access-WSL-through-Windows/mstsc-20230708-144616.png)

### 找到WSL的IP

首先你得安装`net-tools`（一般来说正常的Linux都会有，但指不定你用的WSL它没有呢？）

```shell
$ sudo apt install net-tools -y
```

安装完以后输入Linux的经典命令

```shell
$ ifconfig
```

然后就会有你所有网卡的输出

```
gamernotitle@DESKTOP-HRHFRVI:~$ ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet xxx.xx.xx.123  netmask 255.255.240.0  broadcast xxx.xx.xx.xxx
        inet6 fe80::215:5dff:fee6:d2ab  prefixlen 64  scopeid 0x20<link>
        ether 00:15:5d:e6:d2:ab  txqueuelen 1000  (Ethernet)
        RX packets 151123  bytes 210055048 (210.0 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 22062  bytes 12461359 (12.4 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

这里要看的是`eth0`，看里面的`inet`写的啥，这里可以得到IP地址为`xxx.xx.xx.123`（因为用的是公网服务器，所以码一下）

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Access-WSL-through-Windows/mstsc-20230708-144549.png)

## 让访问流量通过防火墙

这里就得打开一个管理员终端了，按下<kbd>Win</kbd> + <kbd>X</kbd>，选择`终端（管理员）`

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Access-WSL-through-Windows/explorer-20230708-151300.png)

然后输入以下命令，添加防火墙规则，放行两端访问的流量

```powershell
New-NetFirewallRule -DisplayName "WSL" -Direction Inbound -InterfaceAlias "vEthernet (WSL)"  -Action Allow
```

会弹出这样子的提示

```
Name                          : {规则的UUID}
DisplayName                   : WSL
Description                   :
DisplayGroup                  :
Group                         :
Enabled                       : True
Profile                       : Any
Platform                      : {}
Direction                     : Inbound
Action                        : Allow
EdgeTraversalPolicy           : Block
LooseSourceMapping            : False
LocalOnlyMapping              : False
Owner                         :
PrimaryStatus                 : OK
Status                        : 已从存储区成功分析规则。 (65536)
EnforcementStatus             : NotApplicable
PolicyStoreSource             : PersistentStore
PolicyStoreSourceType         : Local
RemoteDynamicKeywordAddresses : {}
PolicyAppId                   :
```

就说明已经打通了，现在你试试访问WSL的服务，是不是已经可以访问通了呢

## Windows转发WSL流量

因为我是使用公网服务器，但是服务跑在WSL里面，所以得让Windows来转发一下，幸好Powershell可以直接做到

```powershell
netsh interface portproxy add v4tov4 listenport=<"Windows监听的端口"> connectaddress="<WSL的IP地址，前面获取过的>" connectport=<"WSL中的服务端口"> listenaddress=* protocol=tcp
```

协议这个地方，如果你是UDP服务的话，记得把`tcp`改为`udp`

打完后按回车，添加转发不会有任何的提示；然后在公网访问服务器，就可以发现已经访问到WSL中的服务了
