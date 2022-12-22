---
title: CSGO服务器架设指南
date: 2020-04-05 12:48:50
tags: [Software, CSGO, Host, GameServer]
categories: Software
cover: https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@CSGO/img/CSGO-Server/cover.jpg
---

"GOGOGO"最近我身边的小伙伴们都拉我打CSGO，还想打内战……然后就让我架设一个社区服务器。讲真，架设社区服务器的坑挺多的，我会在文中尽量把我架设服务器的过程给叙述完整，帮助你们，同样也帮助我在我忘记的时候回想起来

废话不多说，让我们开始吧（干货警告）

---

### 你需要准备：

一台有公网IP的服务器

一个Steam账号（无任何的VAC记录，没有社区违规记录）

{% note info %}

我这里使用的是阿里云的轻量应用服务器（Ubuntu 18.04 LTS），如果你也想使用阿里云，但是没有阿里云账号，可以到下边的这个链接进行注册（顺带帮我填一下邀请码秋梨膏）

https://www.aliyun.com/minisite/goods?userCode=05u8nbft

然后可以到[阿里云云翼计划](https://promotion.aliyun.com/ntms/act/campus2018.html?accounttraceid=fa8188b3-66d9-4f56-b466-597502576f22)购买轻量应用服务器（下面的云服务器ECS），亲测一个服务器10个人带的动没啥问题

{% endnote %}

### Linux搭建方法

#### Steamcmd下载

首先，你需要下载Steamcmd，这是一个Steam的官方软件，关于它的详细信息，你可以在[这里](https://developer.valvesoftware.com/wiki/SteamCMD)找到（V社官方WIKI，无需梯子）

##### 自动安装

如果你的服务器是64位的Linux系统，你需要运行以下命令安装32位的运行库

```bash
 $ sudo add-apt-repository multiverse
 $ sudo dpkg --add-architecture i386
 $ sudo apt update
 $ sudo apt install lib32gcc1 steamcmd 
```

然后就可以直接使用

```bash
$ apt install steamcmd	# Ubuntu用户
```

或者

```bash
$ yum install steamcmd # CentOS用户
```

来安装Steamcmd，如果你更新了yum库或者apt库仍然提示未找到steamcmd包，那么你可以使用手动安装的方法

##### 手动安装

手动安装就是自己从V社的官方服务器中获取可执行文件，当然在这之前，你还是需要安装32位的运行环境

- Ubuntu

  ```bash
  $ sudo apt-get install lib32gcc1
  ```

- CentOS X86

  ```bash
  $ yum install glibc libstdc++
  ```


- CentOS X64

  ```bash
  $ yum install glibc.i686 libstdc++.i686
  ```

  

安装完运行库后，我们需要下载steam官方的软件包

```bash
$ curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -
```

使用上面这一条命令下载软件包，解压后应该有个``steamcmd.sh``和一个文件夹。我们直接运行steamcmd.sh

```bash
$ bash steamcmd.sh
```

然后它会进入更新状态，就像是你平常打开Steam的那个小白窗

![Steam更新小白窗](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@CSGO/img/CSGO-Server/Steam-Updating.png)

等它最后显示为``Steam>``并且是输入状态的时候，它就完成了更新。至此，你就完成了Steamcmd的安装

按照steam官方的意思，他们不推荐使用root账户来运行steamcmd（我也不知道为什么），然而我实际上用root账户开下来也没有什么不妥的地方，所以是否使用root账户取决于你们自己吧

#### CSGO服务器安装

在这之前，请确保你的服务器装得下CSGO的所有文件，服务端的大小跟客户端没差多少，请确定你的服务器有那么多的空间！！！

我们在Steamcmd里面输入``login anonymous``来进行匿名登录

```bash
$ Steam>login anonymous
```

当然你也可以使用你自己的账号登录

```bash
$ Steam>login :Steam_Account :Password :Steam_Guard
```

其中，``:Steam_Account``是你的Steam登录名，``:Password``是你的密码，``:Steam_Guard``是你的Steam令牌，如果你是使用邮箱令牌的，那你可以不加上令牌，先发出登录请求，等Steam执行了登录以后会让你输入你的邮箱验证码的

登录完成后，我们的Steamcmd就正式接入了Steam网络了。我们需要安装CSGO服务器

```bash
$ Steam>app_update 740 validate
```

用上面的命令来安装CSGO服务器，``740``是CSGO服务器这款应用在Steam的注册ID，``validate``是文件验证，初次安装需要进行文件验证，以后升级可以直接使用

```bash
$ Steam>app_update 740
```

来进行升级。如果你的服务器不够空间，会给你报错，你可以先退出Steamcmd，在linux的命令行中使用

```bash
$ df -h
```

来查看你的空间是否足够，一般来说需要查看最右边``Mounted on``的``/``这一个目录的剩余，``Avail``就是这个目录剩余的空间。

当你输入命令安装CSGO服务器后，Steamcmd会进入安装状态等到最后提示``Successfully installed``即为安装完成，你的CSGO已经被安装在了``./steamapps/common/Counter-Strike Global Offensive Beta - Dedicated Server``里面了

如果你觉得它太长了，你可以使用

```bash
$ Steam>force_install_dir :dir
```

来安装到你觉得合适的地方，请将``:dir``换成你要的目录，并且在``app_update``前执行！

#### 配置服务器

安装完了以后，我们就要进行服务器的配置。CSGO服务器默认的配置很令人头疼的：竞技模式、TK开启、TK惩罚等等等等，各种不方便的东西都有。我们需要修改服务器的配置

CSGO也给我们提供了很方便的方法修改服务器，我们可以使用一个文件进行修改。

我们在CSGO服务器目录下的``./csgo/cfg``文件夹中新建一个文件叫做``server.cfg``，然后在这里面修改我们需要的配置。我先贴出[我的配置]()

```javascript
rcon_password "" // OP 密码
// "" 表示没有
hostname "服务器"
// 服务器名称
sv_region 255 // 服务器所在区域注册参数
// 255=全球
// 0=美国东部
// 1=美国西部
// 2=南美洲
// 3=欧洲
// 4=亚洲
// 5=澳洲
// 6=中东
// 7=非洲
sv_rcon_minfailures 3
// 允许输入OP密码 错误次数下限 // 达到下限则封禁对方的IP
sv_rcon_banpenalty 5
// 封禁的时限 单位 分钟
// 0=永久
sv_maxupdaterate 100
// 服务器每秒更新最大频率
// 根据实际网络状况调节
// sv_maxrate / 300 = 要设的值 // 默认=30
// 局域网=101
sv_minupdaterate 40
// 服务器每秒更新最小频率
sv_unlag 1
// 玩家延时补偿
// 0=关闭
// 1=开启(默认)
sv_maxunlag 0.5 // 延时补偿最大值默认 0.5 // 0.5=500毫秒(默认)
sv_voiceenable 1 // 服务器是否允许麦克风语音通讯 // 0=禁止
// 1=允许(默认)
sv_unlagsamples 1 // 延时补偿数据包平均采样数量 // 默认=1
sv_unlagpush 0 // 服务器推进延时补偿
// 0=关闭(默认)
// 1=开启
mp_autokick 0 // 自动踢除不动的玩家
// 0=关闭(比赛默认)
// 1=开启
mp_autocrosshair 0 // 自动瞄准
// 0=关闭(默认)
// 1=开启
mp_autoteambalance 0
// 自动平衡双方人数
// 0=关闭(比赛默认)
// 1=开启
mp_buytime 0.25 // 每回合购买武器装备时间单位分钟 // 比赛默认=0.25
mp_consistency 1 // 防止某些模型被更改
// 0=关闭
// 1=开启(默认)
mp_c4timer 35 // C4爆炸倒计时单位秒
// 比赛默认=35
mp_decals 300 // 墙壁上的血花弹孔贴图细节数据传送(200-300)
mp_falldamage 1 // 高处落下伤害
// 0=关闭
// 1=开启(默认)
mp_fadetoblack 0 // 死后黑屏
// 0=关闭(默认)
// 1=开启
mp_flashlight 1 // 手电筒
// 0=禁止
// 1=允许(默认)
mp_forcechasecam 2 // 死后跟随
// 0=所有玩家
// 1=仅队友
// 2=仅队友，主视角(比赛默认)
mp_forcecamera 2 // 死后视角选择
// 0=全部视角
// 1=仅队友，全部视角
// 2=仅队友，主视角(比赛默认)
mp_footsteps 1 // 脚步声
// 0=关闭
// 1=开启(默认)
mp_fraglimit 0 //杀人数上限(1~n)，超过上限就换地图 // 0=关闭(默认)
mp_freezetime 8 // 每回合开始冻结时间单位秒
mp_friendlyfire 1 // 友军伤害
// 0=关闭(默认)
// 1=开启
mp_friendly_grenade_damage 1
// 友军手雷伤害
// 0=关闭
// 1=开启
mp_hostagepenalty 0 // 惩罚人质杀手
// 0=不惩罚(默认)
// 1~N=人质被杀数量，超过则踢出该玩家
mp_limitteams 0 // 两队人数差异上限
// 超过此上限，新玩家只能当观察员 // 比赛默认=10
sv_logbans 1
// 服务器日志里记录Ban掉玩家的内容 // 0=不记录
// 1=记录
mp_logecho 0 // 将服务器日志反馈到控制台 // 0=关闭
// 1=开启
mp_logdetail 3 // 服务器日志里记录攻击信息 // 0=不记录任何信息
// 1=记录敌人攻击
// 2=记录队友攻击
// 3=记录所有攻击
mp_logfile 1 // 服务器记录日志为文件 // 0=不记录
// 1=记录
mp_logmessages 1 // 服务器日志里记录谈话内容 // 0=不记录
// 1=记录
mp_maxrounds 30 // 回合上限，达到此上限，自动重新载入新地图
// 0=无回合上限(默认)
mp_playerid 0 // 当准星指向敌人或队友时，显示他们的名字
// 0=显示所有人(比赛默认)
// 1=仅显示队友
// 2=不显示
mp_roundtime 2
// 每回合时限单位分钟
mp_timelimit 0
// 地图最大时限，达此时限，自动重新载入新地图
// 0=无时限
mp_tkpunish 0
// 惩罚队友杀手
// 0=关闭(默认)
// 1=开启
mp_startmoney 800 // 第一回合开始金钱(800~16000) // 加时赛=10000
mp_winlimit 0
// 一方最大胜利回合数，达到此数量，自动重新载入新地图
// 0=无限制(默认)
sv_aim 0
// 自动瞄准
// 0=关闭(默认)
// 1=开启
sv_airaccelerate 10 // 玩家在空中移动的速度
// 默认=10
sv_airmove 1 // 在空中移动&转向
// 0=禁止
// 1=允许(默认)
sv_allowdownload 1
// 客户端下载服务器资源 // 0=禁止
// 1=允许(默认)
sv_allowupload 1
// 客户端上传自己的喷图 // 0=禁止
// 1=允许(默认)
sv_alltalk 1 // 警匪通话
// 0=禁止(默认)
// 1=允许
sv_proxies 1 // HLTV代理
// 0=禁止
// 1=允许(默认)
sv_cheats 0 // 作弊模式
// 0=关闭(默认)
// 1=开启
sv_clienttrace 1.0 // 客户端模型的范围框的尺寸
// 默认 1.0
sv_clipmode 0
// 锁定客户端快速模式
// 0=关闭(默认)
// 1=开启
sv_friction 4
// 地面摩擦力默认 4
// 数值越低，摩擦越小
sv_gravity 800 // 重力默认 800
sv_maxrate 20000 // 服务器最大传输速率<0-25000> // (服务器上传带宽 x 125) /服务器设定的最大人数 = 要设的值
// 0=无限制
// 局域网=25000
sv_maxspeed 320 // 客户端最大移动速度
sv_minrate 0
// 服务器最小传输速率<0-25000> // 0=无限制
sv_send_logos 1 // 客户端相互之间传送喷图
// 0=禁止
// 1=允许(同时确保sv_allowdownload键值为1)
sv_sendvelocity 0
// 服务器混合物理运算，适用于较好配置的服务器 // 0=关闭
// 1=开启
sv_send_resources 1
// 自动向客户端传送地图关联的*.res文件里包括的资源文件 // 0=关闭
// 1=开启(同时确保sv_allowdownload为1)
sv_stepsize 18
// 玩家的步伐距离
// 默认 18
sv_stopspeed 75
// 玩家停止移动时的速度默认 75
sv_timeout 65
// 客户端连接服务器超时的时限，达到时限则断开连接
sv_voicecodec voice_speex // 语音通话解码
// voice_miles是HL引擎长期以来用的语音解码(默认)，占用带宽较大，为32kbps
// voice_speex是Valve新加入的解码，优于voice_miles，占用带宽较少，为2.4kbps至15.2kbps
sv_voicequality 5
// 客户端语音通话质量(确保sv_voicecodec voice_speex)
// 1=非常差...........占用带宽 2.4 kbps // 2=差...............占用带宽 6.0 kbps // 3=中等.............占用带宽 8.0 kbps // 4=好...............占用带宽 11.2 kbps // 5=非常清晰.........占用带宽 15.2 kbps
allow_spectators 1
// 观察员模式
// 0=禁止
// 1=允许
decalfrequency 30
// 玩家喷图的时间间隔单位秒
edgefriction 2
// 玩家与玩家、墙壁、物体之间的摩擦
// 默认 2
host_framerate 0
// 与Demo录制有关
// 0<N<1 为慢录
// n=0 为正常(默认)
// n>1 为快录
log on
// 开始记录日志
pausable 1
// 客户端暂停游戏
// 0=禁止
// 1=允许
// Steam社区服务器验证
sv_setsteamaccount xxx
// 模式参数
game_mode 1
game_type 0
mapcyclefile mapcycle.txt
// 地图循环列表所在的.txt文件
// *.txt = cstrike\*.txt文件
// Use this file to configure your DEDICATED server. // This config file is executed on server start.
// load ban files
exec listip.cfg
exec banned.cfg
```

其中很多内容我都注释好了，其实这个配置文件也是我从网上找来然后进行修改得出的。其中有几个比较重要的参数：

``rcon_password``管理员密码，在控制台可以输入密码使用管理员权限，就不需要在后台使用指令

``hostname``服务器名称，记得一定要修改，之前翻社区服务器的时候发现很多没修改的都是写着Counter-Strike Global Offensive的

``sv_password``玩家加入需要的密码，填入了就会加密你的服务器，只有输入正确的密码才能够进入

``sv_setsteamaccount``社区服注册秘钥，这个一会会说

调整完了你的配置文件，将文件命名为``server.cfg``，然后放入上面所说的那个``./csgo/cfg``文件夹中即可

接着我们就可以着手开启服务器了

#### 开启服务器

关于服务器的开启，根据Steam的官方文档，我们需要安装一个叫做``screen``的包，使用

```bash
$ yum install screen
```

或者

```bash
$ apt-get install screen
```

来安装，然后我们就进入到CSGO服务器文件夹的根目录，也就是``./steamapps/common/Counter-Strike Global Offensive Beta - Dedicated Server``里面，使用

```bash
$ screen ./srcds_run
```

就可以开启服务器了，当然后面可以跟一些参数，例如我想关闭VAC验证（避免``VAC无法验证您的回话``出现而无法加入服务器），那我就在后面加上``-insecure``即可；或者说我想更改模式，我就可以使用``+game_mode 1 +game_type 0``来进入竞技模式。

等到最后一行提示``GC Connection established for server version xxxx, instance idx 1``的时候就是开完了（xxxx是版本号）

{% note warning %}

根据CSDN@Summer.LICY的反馈，启动时可能会出现`Failed to open dedicated.so (libstdc++.so.6: cannot open shared object file: No such file or directory)`的情况，这种情况下我们需要使用

```bash
$ apt-get install libstdc++.so.6
```

或者

```bash
$ yum install libstdc++.so.6
```

来安装这个依赖库

{% endnote %}

关于模式，这里有一份较详细的表格（来源：Steam Developers官网）

<table class="standard-table">
<tbody><tr>
<th> Game Mode
</th>
<th> game_type
</th>
<th> game_mode
</th></tr>
<tr>
<td> Casual (default)
</td>
<td> 0
</td>
<td> 0
</td></tr>
<tr>
<td> Competitive / Scrimmage
</td>
<td> 0
</td>
<td> 1
</td></tr>
<tr>
<td> Wingman
</td>
<td> 0
</td>
<td> 2
</td></tr>
<tr>
<td> Arms Race
</td>
<td> 1
</td>
<td> 0
</td></tr>
<tr>
<td> Demolition
</td>
<td> 1
</td>
<td> 1
</td></tr>
<tr>
<td> Deathmatch
</td>
<td> 1
</td>
<td> 2
</td></tr>
<tr>
<td> Custom
</td>
<td> 3
</td>
<td> any (?)
</td></tr>
<tr>
<td> Guardian
</td>
<td> 4
</td>
<td> 0
</td></tr>
<tr>
<td> Co-op Strike
</td>
<td> 4
</td>
<td> 1
</td></tr>
<tr>
<td> Danger Zone
</td>
<td> 6
</td>
<td> 0
</td></tr></tbody></table>

#### 注册服务器

当你直接开启服务器后，用``connect ip:27015``进行连接会提示：仅限局域网连接，这就是没有注册服务器到社区服务器造成的结果。这就需要用到我刚刚所说的``sv_setsteamaccount``这个配置。

我们访问[Steam 社区 :: Steam 游戏服务器帐户管理](https://steamcommunity.com/dev/managegameservers)这个链接，在这里登陆你的Steam账号（一定要没有VAC记录和社区违规记录！！！否则会无法注册）

官方Steam账号要求

- 您的 Steam 帐户目前不能处于社区封禁或锁定状态。
- 您的 Steam 帐户不能[受限](https://support.steampowered.com/kb_article.php?ref=3330-IAGK-7663)。
- 您的 Steam 帐户必须拥有一个[合格的注册手机](https://support.steampowered.com/kb_article.php?ref=8625-WRAH-9030&l=simplified chinese)。
- 您的 Steam 帐户必须拥有所创建游戏服务器对应的游戏。
- 您的 Steam 帐户可以创建 1000 个游戏服务器帐户。

然后我们在下面的APPID里面填入``730``，备忘录按照自己喜好填，主要是用来区分不同的秘钥使用

![CSGO社区服务器注册](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@CSGO/img/CSGO-Server/community-server-reg.png)

然后将获得的秘钥放入``sv_setsteamaccount``内即可，接着启动服务器，连接服务器，发现是不是可以连接了？

### Windows搭建方法

其实Windows除了Steamcmd的安装跟linux不一样，其他都是一样的。Windows版的Steamcmd可以在这里下载https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip

下载完后解压，通过命令行运行steamcmd，其余的方法都跟linux一样，可以从[CSGO服务器安装](#CSGO服务器安装)开始看

---

### 题外话

我打CSGO是真的菜，讲真……而且CSGO开箱真的开不起，我还是做一名咸鱼玩家吧

不过话说回来我CSGO有狗牌（忠诚徽章）耶，应该是我唯一能炫耀的东西惹……

辣鸡腾讯，QQ里面拦截我的网站，申诉还说我有恶意信息……一会加客服QQ问