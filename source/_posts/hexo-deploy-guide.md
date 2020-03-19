---
title: 最全面的Hexo部署方法，交给你了~
date: 2019-09-07 20:00:00
tags: Software
categories: Software
cover: https://qcloud.coding.net/u/vincentqin/p/blogResource/git/raw/master/build-a-website-using-hexo/hexo-cover.png
keywords: 'hexo,github,Github Pages,coding Pages,hexo deploy'
---

**温馨提示：推荐点击左下角箭头打开目录，方便你更好地找到内容！**

### 开始

#### 什么是Hexo？

（我不多BB了，去看[官网]([https://hexo.io/zh-cn/docs/index.html#%E4%BB%80%E4%B9%88%E6%98%AF-Hexo%EF%BC%9F](https://hexo.io/zh-cn/docs/index.html#什么是-Hexo？))吧，介绍什么的真的不适合我……）

#### 如何安装？

##### 准备工作

你需要的东西有：

一个带有Page服务的仓库（推荐Github，Coding）

一台电脑（Windows或Linux均可，差别不大）

最后就是耐心（这个过程可能会很枯燥的说~）

##### 前期准备

###### 安装Node.js

<p>安装 Node.js 的最佳方式是使用 <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noopener">nvm</a>。nvm 的开发者提供了一个自动安装 nvm 的简单脚本：</p>
Curl:
<figure class="highlight bash"><table><tbody><tr><td class="code"><pre><span class="line">$ curl -o- https://cdn.bili33.top/nvm-sh/nvm/v0.34.0/install.sh | sh</span><br></pre></td></tr></tbody></table></figure>
wget:

<figure class="highlight bash"><table><tbody><tr><td class="code"><pre><span class="line">$ wget -qO- https://cdn.bili33.top/nvm-sh/nvm/v0.34.0/install.sh | sh</span><br></pre></td></tr></tbody></table></figure>
安装完成后，重启终端并执行下列命令即可安装 Node.js。

<figure class="highlight bash"><table><tbody><tr><td class="code"><pre><span class="line">$ nvm install stable</span><br></pre></td></tr></tbody></table></figure>
<blockquote class="note info"><strong class="note-title">Windows 用户</strong><p>对于windows用户来说，建议使用安装程序进行安装。安装时，请勾选<strong>Add to PATH</strong>选项。<br>另外，您也可以使用<strong>Git Bash</strong>，这是git for windows自带的一组程序，提供了Linux风格的shell，在该环境下，您可以直接用上面提到的命令来安装Node.js。打开它的方法很简单，在任意位置单击右键，选择“Git Bash Here”即可。由于Hexo的很多操作都涉及到命令行，您可以考虑始终使用<strong>Git Bash</strong>来进行操作。</p>
</blockquote>

<blockquote class="note info"><strong class="note-title">Linux 用户</strong><p>大部分 Linux 发行版都会在它们的默认软件包仓库中分发 Node.js。第三方仓库 <a href="https://github.com/nodesource/distributions" target="_blank" rel="noopener">NodeSource</a> 通常能分发最新版本的 Node.js。</p>
</blockquote>

<blockquote class="note warn"><strong class="note-title">可选操作：</strong><p>由于众所周知的原因，使用npm进行安装速度十分缓慢。也可以参考<a href="https://npm.taobao.org/" target="_blank" rel="noopener">这个页面</a>，利用国内镜像安装npm模块。</p>
</blockquote>


###### 安装Git

Windows：下载并安装 git.
Mac：使用 Homebrew, MacPorts ：brew install git;或下载 安装程序 安装。
Linux (Ubuntu, Debian)：sudo apt-get install git-core
Linux (Fedora, Red Hat, CentOS)：sudo yum install git-core

<blockquote class="note warn"><strong class="note-title">Windows 用户</strong><p>由于众所周知的原因，从上面的链接下载git for windows最好挂上一个代理，否则下载速度十分缓慢。也可以参考<a href="https://github.com/waylau/git-for-win" target="_blank" rel="noopener">这个页面</a>，收录了存储于百度云的下载地址。</p>
</blockquote>


###### 安装Hexo

当你确定你已经安装完了Node.js和Git，就可以使用npm安装hexo了，使用

<figure class="highlight bash"><table><tbody><tr><td class="code"><pre><span class="line">$ npm install -g hexo-cli
</span></figure>

或（**安装了cnpm国内镜像的情况下，下面所有的npm命令均可换为cnpm命令，下面不再说明**）

<figure class="highlight bash"><table><tbody><tr><td class="code"><pre><span class="line">$ cnpm install -g hexo-cli
</span></figure>

##### 初始化Hexo文件夹

在你认为合适的地方新建一个文件夹，文件夹名字自拟，然后使用

<figure class="highlight bash"><table><tbody><tr><td class="code"><pre><span class="line">$ hexo init
</span></figure>

来初始化你的文件夹（文件夹必须是空的），并且使用

<figure class="highlight bash"><table><tbody><tr><td class="code"><pre><span class="line">$ npm install
</span></figure>

来安装相关的依赖库！

![初始化库和安装依赖](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/hexo-deploy-guide/Powershell-runtime-install.png)

#### 配置网站

当你安装完所有的依赖以后，你就可以配置你的网站。

你也可以使用

```bash
$ hexo s
```

来进行本地调试，在浏览器中输入[localhost:4000](localhost:4000)进入自己的网站。

关于hexo目录下的_config.yml文件

```bash
# Site
title: <title>	#自己的网页名字，将在标签页标题中显示为<title> - <subtitle>
subtitle: <subtitle> #副标题，在标签页标题显示
description: <descr> #网页描述（讲真我不知道有啥用）
keywords: <keywords> #网页搜索关键词
author: <author>	 #网页作者
language: en		 #网页语言，若主题支持中文可以不用改
timezone:			 #时区，可以不改

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://yoursite.com	#网页网址，一般填写主页的地址，例如我的网页就填http://bili33.top
root: /						#网站根目录，可以不改
permalink: :year/:month/:day/:title/	#网页永久链接格式，可以自己修改
permalink_defaults:
```

关于主题：

主题可以去[https://hexo.io/themes/](https://hexo.io/themes/)找，也可以在github逛一逛，说不定就找到好主题了呢？

```bash
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: landscape	# 主题名字，landscape是默认主题，改成你的主题文件夹的名字即可！
```

在clone的时候建议用git clone \<address> theme/\<theme name> 这样方便管理~

关于主题的配置，详情请见各主题说明文档！



#### 部署网站

在准备东西的时候，我们准备了一个github（或coding）账号，下面以github为例子

在Github中新建一个仓库，仓库名自拟，也可以采用官方格式\<username>.github.io，一定要设为公开仓库（有Github Pro的当我没说）

然后回到你的hexo文件夹，打开命令窗口，输入

```bash
$ npm install hexo-deployer-git --save
```

来安装git的部署器，其他部署器[请看这里](https://hexo.io/zh-cn/docs/deployment)

打开_config.yml，拉到最底下，会发现有个Deployment，你可以按照我下面这么填写

```bash
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: <repo address> # 请替换为你的仓库地址！
  branch: master
```

填写完成后，保存即可，然后打开命令窗口，使用

```bash
$ hexo clean #不是必要的
$ hexo generate
$ hexo deploy
```

来部署你的网站，其中generate可以简写为g，deploy可以简写为d，如果觉得打两行命令太麻烦，可以使用

```bash
$ hexo d -g
```

一条命令来直接部署，省去不必要的麻烦。

你也可以同时部署多个仓库，例如

```bash
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: <repo1 address>,master # 请替换为你的仓库地址！
  repo: <repo2 address>,master # 请替换为你的仓库地址！
```

这样编写的话一次部署，两边的仓库都会上传~

部署完成后，请到你的Github仓库的设置中，找到Github Pages，将source选到master branch来打开Pages服务！

#### 撰写文章

你可以使用

```bash
$ hexo new "<article name>"
```

来创建一篇文章，它会出现在source/_posts中，是一个.md文件，使用md编辑器打开（推荐[Typora](https://www.typora.io/)）编辑即可，支持[markdown](https://www.runoob.com/markdown/md-tutorial.html)和[html](https://www.runoob.com/html/html-tutorial.html)语法

### 小技巧

#### 添加自定义域名

每次部署hexo都会清除你的库并且重新部署，这意味着如果你在Github的设置中添加自定义域名（会生成CNAME文件）每次都会被清除，为了避免这种麻烦，我们可以使用在source文件夹里新建CNAME文件

![CNAME文件](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/hexo-deploy-guide/CNAME-Create.png)

并且在CNAME文件中填写你的域名

![CNAME](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/hexo-deploy-guide/CNAME.png)

这样就可以避免每次部署都清除掉自定义域名，导致网站404了~

#### 自定义404页面

你可以在/themes/\<themes name>/source中放置你的404页面，当你的网站页面不存在的时候，就会显示404页面，可以引用css文件和js文件，只要跟404页面放在同一目录即可！

![404](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/hexo-deploy-guide/404.png)

如何直接看到404呢？你可以直接在网站后面加上[/404](/404)就可以进入[404页面](/404)了~

#### 添加看板娘（live2d）

你是否也想像我一样领养一只猫呢？或者领养一只~

回归正题，我们要怎么领养一只萌萌哒看板娘呢？当然还是要用到插件的说~

先安装插件hexo-helper-live2d

```bash
$ npm install hexo-helper-live2d --save
```

等待安装完后，在你的网站根目录的_config.yml中加入（可以直接复制粘贴）

```bash
#hexo-helper-live2d
live2d:
  enable: true	#是否开启显示
  pluginModelPath: assets/
  model:
    use: live2d-widget-model-tororo  #模板目录，在node_modules里
  display:
    position: right
    width: 150 
    height: 300
  mobile:
    show: false  #是否在手机进行显示
```

然后，找到你喜欢的模型进行安装，并把model的use属性的文本改成你安装的看板娘的文件夹名字（在node_modules里面）即可！

这样你就可以像我一样领养一只萌萌哒看板娘了~

#### 搜索引擎站点认证

当你提交站点到搜索引擎的时候，免不了的就是认证你的站点。当然，认证方式有很多种，例如什么把标记放在\<head>\</head>之间啦，什么文件认证啊之类的，太多了

当然最方便的就是文件认证了，下载一个文件到本地，然后传到你的网站上面。

有的人就会问了，文件要放在哪里呢？

其实有两个地方都可以放，一个是根目录的source文件夹，另一个就是主题里面的source文件夹，都可以放，放在这两个文件夹的根目录即可！

#### 添加站点地图

当你想让你的网站被Google或者Baidu什么的收录的时候，你就需要用到站点地图。

使用以下命令安装站点地图插件

```bash
$ npm install hexo-generator-baidu-sitemap --save #安装Baidu的站点地图，为Baidu优化过的
$ npm install hexo-generator-sitemap --save
```

然后打开网站根目录的_config.yml文件，加入以下条目：

```bash
Plugins:
- hexo-generator-baidu-sitemap
- hexo-generator-sitemap

baidusitemap:
    path: baidusitemap.xml
sitemap:
    path: sitemap.xml
```

这样每次部署就会生成一个baidusitemap.xml和一个sitemap.xml文件，用于提交站点地图

这里以google为例子描述怎么添加站点地图

当你的网站提交到Google后，为了点击量高，我们会提交站点地图，在左边的栏目中选择站点地图，然后在上面"添加新的站点地图”中填写\<Your Link>/sitemap.xml即可，Google会定期收集你的站点，并且展示在搜索结果上

![Google Webmaster](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/hexo-deploy-guide/sitemap-google.png)

![Google Search Result](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo@1.0/hexo-deploy-guide/sitemap-google-search.png)

#### 添加RSS订阅

虽然我不知道这年头谁还用RSS，但是有好过没有嘛

先打开命令窗口，然后输入命令安装插件

```bash
$ npm install hexo-generator-feed --save
```

安装完成后，在网站的根目录中的_config.yml中，加入以下内容

```bash
#RSS订阅
plugin:
- hexo-generator-feed
#Feed Atom
feed:
type: atom
path: atom.xml	#RSS文件名字，可自定义
limit: 20
```

当你加入RSS订阅按钮的时候，就可以设置链接到你的/atom.xml文件（RSS文件名字改过的当我没说），这样当别人点击你的RSS按钮时，就会弹出订阅提醒，让别人订阅你的网站。

#### 按钮调用邮件应用

如果你想让别人联系你，那么最方便的方式就是通过电子邮件了。如何才能让别人点击链接或者按钮直接调用邮件应用发邮件给你呢？[实例](mailto:admin@bili33.top)

在文章中，可以使用这样的编写格式

```markdown
[<Text>](mailto:<Email Address>)
```

这样当别人点击\<Text>的时候，就会调用电子邮件应用，同样如果是按钮的话，只需要将按钮的链接设为

```html
mailto:<Email Address>
```

即可调用电子邮件程序！



### 结尾

Hexo的教程我就写了这么多，可能有些没写到的或者我没想到的，有可能在将来会偶尔更新一下这篇文章，当然，如果你有什么问题，欢迎发邮件到[admin@bili33.top](mailto:admin@bili33.top)来与我探讨，我非常欢迎！如果你想与我交换友链，请到[友情链接网页](/link)的评论区留言，我有时间会看评论的\~商业网站勿扰哦~

