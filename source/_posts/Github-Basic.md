---
title: Github的基本用法 —— 给小白的新手教程
date: 2020-04-14 15:21:39
tags: Software
categories: Software
cover: https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/cover.jpg
---

{% note info %}

本文是写给初到Github的新手们的，其中大量为基础内容，如果你不是Github新手玩家你可以关闭本页面！

{% endnote %}

### 开头语

初来乍到的萌新们，刚到Github，你们是不是一脸懵逼？我是谁？我在哪？我要干哈？
Github是全球最大的 ~~同性交友平台~~ 代码托管平台，在这里你可以看到各种大佬，例如国内最大的MC红石服务器[TIS](https://tis.world/)的[插件开发组@TISUnion](https://github.com/TISUnion)，或者是我们再熟悉不过了的[微软Microsoft](https://github.com/microsoft)；当然不只是代码，Github里面也有各种文化仓库，这里举个很好玩的仓库作为例子——表情包仓库[ChineseBQB](https://github.com/zhaoolee/ChineseBQB)，可谓是表情包的聚集地；Github上甚至还有你想不到的项目（[是什么项目我就不说了，自己点我查看](https://github.com/komeiji-satori/Dress)）
<img src='https://gamernotitle.coding.net/p/BQB/d/BQB/git/raw/master/023Emoji_%E8%A1%A8%E6%83%85%E7%AC%A6%E5%8F%B7BQB/Emoji00087.JPG' height=100 width=100></img>

接下来，我就来跟你讲讲Github怎么使用。话不多说，让我们开始吧

---

### 主页管理

当你注册完Github并登录后，Github会将你带到首页，这里有点类似很多服务器的仪表盘吧（如图）

![Github主页](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-Home.png)

其中，左边一块是跟个人有关的，包括活动仓库和所在团队，活动仓库是你发过issue、PR(pull request)，点过Watch、Star、Fork的仓库，触发以上操作（上面的操作后面会说）都会将你操作的仓库添加到左边的活动仓库列表，便于你进行寻找；所在团队则是当你创建/加入一个团队并被分配到Team（队，有点类似于部门）后显示

中间那一栏是与你有关的Github的活动，Github会在上面优先列出你近期的活动（近期具体是多少天以内就不知道了，没算过），下面则会列出所有与你有关的活动，顺序为从新到旧。你可以看到你Follow的人的动态，也可以看到与你有关的动态（如别人Follow你，Star/Fork你的仓库等等）

右边一栏则是被称为Github Explore（Github探索）的东西，Github会根据你在Github的仓库访问情况推荐你可能感兴趣的仓库，右边一栏会列出3个，点击右边那一栏的`Explore More→`则会打开一个新的页面，里面罗列出Github今日给你推荐的项目仓库

最上面一行是导航栏，导航栏在Github的任何页面都会展示。点击Pull Requests就会列出你与你有关的所有PR，同理，点击issue也是一样。Marketplace会打开Github的插件库，里面有各种插件供你选择，有免费的当然也有付费的；Explore则是会打开跟右边Explore More一样的界面；点击右上角的个人头像可以有更多的选项，点击会出来各种管理，这个我们到个人管理再讲。

（什么？你问我的导航栏为什么是彩色的？看来你是没用过Stylus呢，装完Stylus后[安装这个样式](http://userstyles.org/styles/138989)就可以让Github变成彩色的了）

---

### 个人管理

当你点击导航栏里面的头像，Github会给你弹出下面这个列表

![Github个人菜单](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-Nav-List.png)

①表示你登录的用户，这里我是用自己的用户登录的，所以写的是GamerNoTitle

②是你的个人信息，点击后会进入个人信息页面

③是你的仓库，点击后会进入自己的仓库列表

④是项目列表，不过我自己没怎么用，而且本篇教程我也不打算讲Project

⑤是你Star过的项目，点击后会对你Star的项目进行列出的操作

⑥是用来发布代码片段的Gist，没啥用（因为你在GFW的保护下）

⑦、⑧是与Github有关的，能够帮助你使用Github并且获取Github的新功能

⑨是设置，设置我们晚点讲

⑩是登出，当然就是退出啦

我们进入Profile查看一下，这里会列出你的各种信息，包括你自己设定的Slogan、你的学校、你的地理位置、你的邮箱（可以设置多个，但只有一个对外展示，未登陆者不会显示）、你的网站

![Github Profile](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-Profile.png)

右边上面是你PIN（钉\~）的仓库，如果你想让别人一到你的个人页面就能看到你的Breaking Repositories的话你可以把你的仓库PIN到上面来；下面的小方格则是一年内你的Contribution（贡献），Commit数量越多，绿色越深；再往下就是你的活动了

在PINNED的上面，从左到右的按钮依次是：仪表盘、仓库、项目、包、Star、追随者、你追随的人。Star可以在个人菜单（上面那张标了序号的图）里面点Your Star进入，同样，仓库和项目也可以

更详细的个人资料设置，可以在设置里面进行更改，其中可更改的包括你的用户名、邮箱等

![Github Settings - Profile](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-Settings-Profile.png)

---

### 仓库管理

#### 仓库创建

当你决定在Github托管你自己的代码的时候，你就可以开始创建仓库了。不过在此之前，请确保你会使用Git，Git的简单用法下面会略微涉及，但本篇绝对不会教你《Git从入门到精通》，Git的用法请自行百度。

![Github新建仓库](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-New-Repo.png)

我们点击导航栏里面的`+`号，选择`New repository`，Github会带我们到新建仓库的页面。在Repository name中填入你想要的仓库名字，仓库名可以用英文和任意符号，甚至是中文（不推荐），但是在网址中无法被识别的字符会统一被替换成-，不管你有多少个连在一起（包括中文），例如我这里有个仓库名字是`!@#$%^&*()`，那么Github会让你创建你的仓库名为`!@#$%^&*()`，但是网址中只会变成`https://github.com/:user/-`，没错，Github直接用一个`-`代替了你的`!@#$%^&*()`，所以仓库命名我这里提出以下几点建议：

- 仓库名字尽量为英文
- 仓库名中尽量不要含有特殊字符，如果需要空格的话将空格替换为`-`
- 仓库名能够让别人一眼看出这个仓库是用来做什么的

遵循上面的这些建议，我相信你的仓库命名应该不会乱的

在下面有Description，填写了以后会在别人搜索或者是访问你的仓库的时候展示（如图）

![Description搜索展示](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-Descr-in-Search.png)

![Description仓库展示](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-Descr-in-Repo.png)

再往下就是仓库的公开性，Public是公开，任何人都能访问你的仓库（只读）；Private是私人仓库只有你和被你邀请的人才能够访问

再下去就是用一个README初始化你的仓库，如果勾选了Github会新建一个README来初始化你的仓库，但是README一般都是按下面的格式写的

```markdown
# :Title
```

没错，就只有这一行，所以我一般不勾选

#### 仓库初始化

这里我先新建一个名为`Tutorial`的仓库，公开仓库并且不勾选README初始化

![Github仓库新仓库](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-Repo-Tutorial.png)

如上图，我已经新建了一个船新的仓库我们现在要手动初始化一次

我这里新建一个文件夹，在这里打开命令行，先用Git初始化这个文件夹，并在里面放入一个README.md文件

使用Git命令来推送我们的更改

```bash
$ git init    # 初始化文件夹（在文件夹内创建一个.git文件夹用于存储git信息）
$ git add .    # 添加所有更改，当然你也可以添加特定的更改，把.换成文件路径即可
$ git commit -m "init"    # 提交更改，并留下信息为"init"
$ git remote add origin git@github.com:GamerNoTitle/Tutorial.git    # 添加仓库地址到名为origin的git目标
$ git push -u origin master    # Git推送到仓库，仅第一次加入git远程目标时需要，后续直接git push
```



我这里使用的是SSH推送方式，你也可以使用HTTPS的方式，不过缺点就在于每次都要输入Github的账号信息。

##### 添加SSH秘钥

那么如何使用SSH方式呢？我们先打开命令行，使用`ssh-keygen`来创建我们的SSH秘钥，如果要求你输入的话可以直接留空回车（高级用户请自便）

```bash 
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/bili33/.ssh/id_rsa):
Created directory '/home/bili33/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/bili33/.ssh/id_rsa.
Your public key has been saved in /home/bili33/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:jdynahazKmHSKBGge2KnSDNlUFM7+AVADYeW4NY7CjY GamerNoTitle@ADMIN-PC
The key's randomart image is:
+---[RSA 2048]----+
|oo+*B+           |
|+ o++.o          |
|.+.= o .         |
|o.o o o. +       |
|+E.* .  S o .    |
|BoX =   o  o     |
|.+ o .   +.      |
|    .   +.       |
|     ..+.        |
+----[SHA256]-----+
```

然后Windows会在`C:\Users\:user\.ssh`下创建两个文件，linux则会在`/.ssh`创建两个文件，两个系统创建的文件是一样的，都是`id_rsa`和`id_rsa.pub`。

![Github SSH KEY页面](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-Key.png)

我们需要用记事本或者任意文本编辑器打开`id_rsa.pub`，将里面的内容复制，然后点开Github设置，点击左边的`SSH and GPG Keys`，点击右上角的`NEW SSH KEY`

![Github添加KEY](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-Add-Key.png)

将你的`id_rsa.pub`的内容粘贴到下面的大框框里面，上面填上一个便于你自己辨识的名字，然后保存

这样一来，你当前的设备就有对Github仓库的访问权限。除非你重新生成了SSH秘钥，否则无需对秘钥进行更改。

#### 仓库初始化完成

看下面，我已经将我的README.md推送到Github仓库了

![Github推送完成](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-repo-Pushed.png)

#### 仓库设置

![Github仓库设置](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-Repo-Settings.png)

我们点击上面的Settings，Github会把我们带到仓库的设置界面

在Options里面，有仓库的基本设定：仓库名、仓库封面图、仓库功能、Github Pages服务，还有Github所谓的危险区（对仓库的所有权或者状态进行管理的分区

左边则还有各种设置项，可以用Manage access来授予别人访问权限，当然也可以为仓库添加特定的SSH key等等

#### 仓库发行

当我们编译完自己的程序，想要发布可执行程序的时候，就需要Release功能（当然不止于这种情况，也有想要薅一把Github的羊毛把Github当做图床加上Jsdelivr作为CDN的用法）

![Github仓库导航栏](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-repo-nav.png)

![Github仓库无发行版](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-no-Release.png)

我们点击顶端的Release按钮，如果你之前没有Release的话界面应该是像上面这样的，我们就要点create a release来创建我们的发行

![Github Release有发行版](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-have-Release.png)

如果你有发布过release，那你的界面应该是这样的，我们就要点右上角`Draft a New Release`来发布

![Github新建Release](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@Github-Basic/img/Github-Basic/Github-Draft-a-New-Release.png)

在这个界面，在左边最小的那个框里面填写版本号，版本号应该像是`v1.0.0`、`a1.0`这样的，取得复杂了就很麻烦（当然只是自己用的话请随便），在长条框里面填写自己的标题，下面的大框框填写自己这个版本的详细内容，填写完后点击最下面的publish release即可。

{% note info %}

等到我想到还有什么是要跟小白说的我会再发的，现在暂时想到这么多，当然你也可以留言

{% endnote %}

---

### 题外话

我还真的没想到有人玩Hexo不会用Github，然后就写了这一篇文章……

最近做了使用MCDR的服务器能够使用的两个插件[SimpleOP](https://github.com/GamerNoTitle/SimpleOP)和[MCDR-WikiSearcher](https://github.com/GamerNoTitle/MCDR-WikiSearcher)，前者是根据佛冷的修改的，后者是因为TIS发布的那个用不了，然后就自己整了一个，也就整了3小时，其实不难