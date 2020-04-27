---
title: 白嫖Office365？这种好事我当然要来！
date: 2019-08-30 19:40:19
tags: Software
categories: Software
cover: https://ausdroid.net/wp-content/uploads/2019/09/office365-1024x488.jpg
keywords: 'Office,Office 365,Office365,Office 365 Free,Microsoft Office'
---

>**<font color=#ff0000>本方法存在局限性，尝试之前请确保你有让微软讲你的账户认定为开发者的能力（如频繁调用api等），如果你只是搀着onedrive的5T空间，那么我推荐你直接拉到题外话中的网址领取</font>**

相信很多人都在用Office，用的要么是WPS Office，要么就是Microsoft Office。正版的Office365价格贵得要死↓

![家用Office价格（非商业用途）](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/Office365/office-tags.png)

所以今天，我就来教教怎么获取**免费**的Office365（而且还是管理员哦~）

## 准备工作

你需要准备：一个微软账户（个人用户，即非企业用户）



## 获取Office365账号

网址我贴在这里啦：[https://developer.microsoft.com](https://developer.microsoft.com/)

进入以后发现里面有四个按钮

![微软开发者中心](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/Office365/Get-Started.png)

稍微解释一下，第一个和最后一个想必不用说了吧，都是熟悉的东西；第二个是微软的云服务平台[Azure](https://azure.microsoft.com/en-us/)，第三个是微软的开发者软件[Visual Studio](https://visualstudio.microsoft.com/)（我还是喜欢VSCode），在这里我们点击Office，其他有需要的自己斟酌哈~



![Office开发者页面](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/Office365/office-start.png)



会看英文的小伙伴们就知道点哪个，不会看的我告诉你是先点右上角sign in

登录自己的账号后，点上面的Developer Program，进入开发者计划页面，点击中间那个最大的按钮写着JOIN NOW的~

![Office开发者页面 - 加入开发者计划](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/Office365/office-join.png)



点进去后会看见一个全英的界面，在第一个选择框里选择"China"（当然你要选其他国家我也没意见），第二个的Company填写你自己想要的名字，因为微软给的管理员账号是\<username>@\<domain>.onmicrosoft.com（自定义域名除外），所以你设定的名字需要尽量跟后面设置的一致。

设定好后，把下面两个勾给勾上，点击NEXT

![配置界面](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/Office365/office-signup.png)

然后微软就会问你一堆问题

像下面这样：

![](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/Office365/office-Q1.png)

![](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/Office365/office-Q2.png)

看得懂英语的自己选择，但是在**Products**里面最好全部勾上，这样你就能使用所有的功能。如果看不懂英语，那么第一个问题和第二个问题请选择**Personal Projects**（第四个选项），第三个**Products**和第四个**Technologies**全部勾上，最后一个问题随便选择一个即可（如果你不是真的要开发的话），全部选择完以后点击下方的JOIN即可！

![](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/Office365/office-Answer.png)

然后你就会像我一样被导到这个界面，说明你已经成功注册了！

![](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/Office365/office-subscription.png)

点击下方的**SET UP SUBSCRIPTION**会弹出来一个小窗，第一个不用说，之前选什么现在就选什么，第二个create username是设置邮箱前缀，create domain就是上面提到的在邮箱后缀的第一位的东西，自己喜欢，但是尽量跟前面一致！下面两个框都是让你输入密码，输入完以后点下面的Continue即可！

![启用office订阅](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/Office365/office-console-signup.png)

然后就会弹出提示，要你输入手机号码

![输入手机号码](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/Office365/office-console-phone.png)

输入完了点击下面的send code，就会有短信发到你的手机，后面我不用说都可以解决了吧~

{% note primary %}

### 2020/4/27更新

{% endnote %}

今天我再次开了Office的开发者订阅，现在有账户可以分配（15个），需要可以评论区留言，有以下几点注意事项

1、确定你有能够调用API的能力（保命需要，后期会出教程）

2、因微软未续费造成的数据损失我不负责



### 题外话：

这个Office365需要用户足够活跃，每次的订阅周期为92天，过了92天就会检测用户是否足够活跃，如果不活跃则会被删除所有数据（当然你再注册也是可以的），所以比较推荐多人用一个组织。

>~~1、你的姓名（可以是假名，我不在意）~~
~~2、显示名称（类似你在登录win10前的用户名）~~
~~3、邮箱前缀（就是@前面的那一串）~~
~~4、接收账号密码邮件的邮箱（如果没收到请检查垃圾箱！）~~
~~当我为你创建账户后，我会通过邮件通知你，也会把账号密码发到你的邮箱！~~
~~说明：我使用的也是这种office（92天订阅期），所以为了避免office删除组织后文件丢失，请不要把贵重文件放在onedrive中，丢失概不负责！~~
（表示微软并没有给我续费。。。）

如果不能确保自己能够被微软认定为开发者，那么我推荐你到[http://233455.xyz:3000/](http://233455.xyz:3000/)（好像已经失效了？）去领取一个临时邮箱注册edu版（注：此edu注册的账户仅提供5T的onedrive空间，若需要office授权，请在该网页下面的使用规则查看）
祝大家白嫖成功\~~~

