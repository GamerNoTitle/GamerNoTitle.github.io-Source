---
title: Linux踩坑记录：为什么我的sudo反应这么慢
date: 2022-06-09 22:22:27
tags: Tech
categories: Tech
cover: https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Why-my-sudo-is-so-slow/vmware-20220609-222840.png?download=true
---

在用Kali的时候，用的最多的东西就是`sudo`了，但是在使用的过程中我发现一个问题：我在使用`sudo`的时候要等个半分钟到两分钟的时间才会让我输入密码，但是刚刚安装好kali的时候就不存在这个问题

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/Why-my-sudo-is-so-slow/vmware-20220609-222706.png?download=true)

当我在百度搜索的时候，我发现了有一种情况非常贴合我的kali：修改过hosts（`/etc/hosts`）文件

按照百度出来的结果描述，当使用`sudo`的时候，会先去寻找主机地址，而hosts文件中有几行就是写了主机地址的

```
127.0.0.1	localhost
127.0.1.1	kali-vmware		# 这个是主机名，我这里在VMware上面装的而且命名为kali-vmware

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```

我打开我的`hosts`文件，因为之前修改过，后来被我删掉后重新`touch`了一次，所以是空的，我把这几行加回去后，诶，正常了

**经验教训：不要随便删掉`hosts`文件**

