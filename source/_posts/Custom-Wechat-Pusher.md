---
title: 使用Railway服务平台和message-pusher项目搭建自己的微信通知推送服务器
date: 2022-06-01 22:32:15
tags: Tech
categories: Tech
cover: https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Custom-Wechat-Pusher/msedge-20220601-223424.png?download=true
---

相信大家现在在用的微信推送平台都是什么方糖QQ的server酱（[Server酱·Turbo版 (ftqq.com)](https://sct.ftqq.com/)）又或者是什么PushPlus之类的，我自己用的是server酱，但是在使用过程中发现一个问题：它每天只能推5条消息

对于我这种拿另一个手机使用SMSForwarder（[pppscn/SmsForwarder: 短信转发器 (github.com)](https://github.com/pppscn/SmsForwarder)）来转发短信的人来说，一天接到的验证码短信肯定不只5条，虽然配置了邮件转发，但是有的时候QQ的smtp服务器抽风，而且邮件不如微信好用，所以我就在想能不能搭建一个自己的推送服务器

恰巧我之前看到过[songquanpeng/message-pusher: 搭建专属于你的微信消息推送服务 (github.com)](https://github.com/songquanpeng/message-pusher)这个项目，因为文档里面说可以部署在heroku上面，我就干起来了

---

{% note info %}

本次使用到的项目以及平台：

[pppscn/SmsForwarder: 短信转发器 (github.com)](https://github.com/pppscn/SmsForwarder)

[songquanpeng/message-pusher: 搭建专属于你的微信消息推送服务 (github.com)](https://github.com/songquanpeng/message-pusher)

[Railway.app 服务部署平台](https://railway.app?referralCode=U8coe_)

{% endnote %}

因为Heroku一旦休眠再开启后，数据会丢失（虽然message-pusher的作者用了环境变量的方式去存储数据，但是这还是不太方便），恰巧railway也是一个可以部署服务的平台，相较于heroku主要是按需付费（前5刀免费），而且没有休眠，我就选择了railway

先fork一下message-pusher这个项目，然后转到railway平台新建项目

因为我这里想部署在原来就有的项目下面，所以我直接进入到项目之中，点击右上角的`New`，选到我刚刚fork的仓库

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Custom-Wechat-Pusher/msedge-20220601-224438.png)

选择后，进入到服务的Variables里面添加我们需要的变量

这里项目作者整理了一个表格来给出我们所需要填写的变量名以及内容

| KEY                 | VALUE                                                        |
| ------------------- | ------------------------------------------------------------ |
| MODE                | 1（1 代表 Heroku 模式，该模式下应用从环境变量中读取必要信息） |
| PREFIX              | 你的前缀，如 admin（前缀用于区分用户，出现在请求的 api 路径中） |
| DEFAULT_METHOD      | 默认推送方式（test 代表微信测试号，corp 代表微信企业号，email 代表邮件推送，client 代表客户端推送） |
| HREF                | 服务的 href，如 https://wechat-message.herokuapp.com/ ，注意后面要有 / |
| ACCESS_TOKEN        | 用于验证调用者身份，防止别人使用借口发送垃圾信息，置空则不进行检查，设置该值后则需要在调用时加上 token 字段 |
| WECHAT_APP_ID       | 你的测试号的 APP ID                                          |
| WECHAT_APP_SECRET   | 你的测试号的 APP Secret                                      |
| WECHAT_TEMPLATE_ID  | 你的测试号的模板消息的 ID                                    |
| WECHAT_OPEN_ID      | 你的 Open ID                                                 |
| WECHAT_VERIFY_TOKEN | 你自己设置的验证 token                                       |
| EMAIL               | 你的默认目标邮箱                                             |
| SMTP_SERVER         | smtp 服务器地址，如 smtp.qq.com                              |
| SMTP_USER           | smtp 服务器用户邮箱                                          |
| SMTP_PASS           | smtp 服务器用户凭据                                          |
| CORP_ID             | 微信企业号 ID                                                |
| CORP_AGENT_ID       | 微信企业号应用 ID                                            |
| CORP_APP_SECRET     | 微信企业号应用 Secret                                        |
| CORP_USER_ID        | 微信企业号用户 ID                                            |

因为Railway跟Heroku相似，都是服务部署平台，所以这里我`MODE`我填写的是`1`（但是其实好像0也可以，因为Railway不需要把数据存在变量中。如果选择的是`0`的话可以不填其他的设置，直接在网页控制台里面修改就行了，但是我选的是`1`，所以我就把其他的也填了）

`PREFIX` 是控制台以及发送通知访问的路径，我就直接保留默认了

`HREF` 是项目的访问地址，主要用于给出微信测试平台与我们项目对接的链接，直接填写自己的服务访问链接就可以了

`WECHAT_APP_ID` `WECHAT_APP_SECRET` 是测试号的信息，我们可以在[微信公众平台 (qq.com)](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)拿到我们需要的内容

`WECHAT_OPEN_ID` `WECHAT_VERIFY_TOKEN` 在后面跟公众号平台对接的时候使用，这两个后面再讲

我用到的就是这些，你也可以按照需要自己填写

填写完了以后随便切出`Variables`页面，Railway会自动开始重新部署

部署完成后访问Railway提供的域名，我们就能够进入管理平台的登录页面

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Custom-Wechat-Pusher/msedge-20220601-223424.png)

（我这里登陆过了所以上面显示的按钮是`添加新用户` `配置` 和 `退出`）

登录的用户名和密码默认分别为`admin`和`123456`，登录进入以后一定要先改密码

---

接下来我们进行服务的配置，先点击用户设置，在这里先更改自己的登录密码，以及选择自己需要发送的通道（因为我用的是微信的测试号，所以我填的是`test`，下面我也主要会以微信测试号来说明）

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Custom-Wechat-Pusher/msedge-20220601-225159.png)

`ACCESS TOKEN`可填可不填，主要看个人需求，如果需要鉴权的话就填一个吧

接下来我们转到顶上的微信测试号设置，在这里填写我们在[微信公众平台 (qq.com)](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)里面拿到的`APP ID`和`APP SECRET`

在微信公众平台，我们在下面模板信息接口新建一个测试模板，按照自己的需求填写，就可以拿到模板ID（`TEMPLATE ID`）

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Custom-Wechat-Pusher/msedge-20220601-225541.png)

然后我们先把这里的TOKEN设置好，点击一次提交先（TOKEN是自己设置的，用于微信公众平台对接）

接下来我们转到微信公众平台，在`接口配置信息`里面，`URL`就填配置页面上面的灰框框给出的链接，`Token`就填写刚刚自己设置的内容，然后打开开发者平台，在网络(Network)选项卡中稍等一会，会弹微信自己向服务器发送测试号粉丝（即关注了测试号的用户）的列表，在这里面你可以找到你自己的微信，并且把`OPEN_ID`弄到手（如果你没有关注自己的测试号，这里是不会显示自己的信息的，你需要往下拉找到自己的二维码先关注）

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Custom-Wechat-Pusher/msedge-20220601-225903.png)

填写好微信公众平台的`URL`和`Token`以后，可以点击提交（可能会成功，反正我没成功，但是不影响使用）

我们返回配置页面，在`OPEN ID`里面填入我们自己的ID，然后点击提交就可以了

这时候我们尝试访问`https://<你的域名>/<你的路径>/hi`，如果返回`{"success":true,"message":"ok"}`就说明发送成功了，你也可以在手机上查看自己收到的信息

---

一开始我就说了我是用来转发短信的，所以自然要与短信转发器对接（因为我手机不在手上，所以下面我使用Teamviewer进行远程控制）

先新建一条转发通道，名字随意，请求方式按需选择，我这里用GET主要是方便

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Custom-Wechat-Pusher/TeamViewer-20220601-230541.png)

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Custom-Wechat-Pusher/TeamViewer-20220601-230649.png)

`WebParams`里面的参数根据自己需求填写，我这里写的是`title=来自[from]的短信&description=[content]&content=[content]`，然后前往转发规则，新建一条转发规则，根据自己的需求填写

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Custom-Wechat-Pusher/TeamViewer-20220601-231002.png)

填写完以后可以测试一下，要是测试没问题保存即可

附上一张测试成功的样图

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Custom-Wechat-Pusher/ngkIIFFBPT.png)

