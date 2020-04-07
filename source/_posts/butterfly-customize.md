---
title: hexo-theme-butterfly主题美化小笔记
date: 2020-03-19 17:51:19
tags: Tech
categories: Tech
cover: https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@butterfly-customize-cover/img/butterfly-customize/cover.png
sage: true
---

{% note info %}

在正式讲博客的美化之前，我想先感谢[@jerryc](https://jerryc.me/)能够带来这么棒的主题~如果你同样想使用butterfly主题，你可以去查看[安装文档](https://jerryc.me/posts/21cfbf15/)

{% endnote %}

话不多说，让我们开始吧！

**注：写这篇文章的时候我的主题版本是2.1.0**

---

### 友链界面加入更多的自定义文字

关于友链界面，我加入了很多内容，如``A Few Requirements``和下面的``PS``就是我加入的。

![更多的内容](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@butterfly-customize/img/butterfly-customize/Link-text.png)

之前闲着没事翻了一下主题的``layout``文件夹，里面的文件都已经命好名了，所以说一看我就知道哪个文件对应哪个部分，而我需要修改的就是``flink.pug``这个文件

原来它长这样：

```jade
.flink
  each i in site.data.link
    h1= i.class_name
    .post-cards
      ul.md-links
        each item in i.link_list
          li.md-links-item
            a(href=item.link  title=item.name target="_blank")
              if theme.lazyload.enable
                img.lazyload(data-src=item.avatar onerror=`this.onerror=null;this.src='` + url_for(theme.lodding_bg.flink) + `'` alt=item.name )
              else
                img(src=item.avatar onerror=`this.onerror=null;this.src='` + url_for(theme.lodding_bg.flink) + `'` alt=item.name )
              .md-links-title= item.name 
              .md-links-des= item.descr

  hr
  div 
    h2= theme.Flink.info_headline
    ul
      li= theme.Flink.name
      li= theme.Flink.address
      li= theme.Flink.avatar 
      li= theme.Flink.info

  hr
  .comment_int
    p.comment-word= theme.Flink.comment
```

尽管我不是很懂pug这个东西，但是我还是能看懂代码的内容，其中``hr``就是一条分割线，所以说区块就用分割线来分开就好了。

最开始使用这个主题的时候（当时版本应该是1.2.0，还没有按钮分级），在做友链界面的时候，我这边就有人对我的数字提出了疑问，然后我就加入了下面那行``PS：本文所有的数字表示方式来自Mili - world.execute(me);``

在``flink.pug``中加入：

```jade
    p(style="font-size:9px;font-weight:bold")= theme.Flink.PS
```

然后在butterfly的配置文件中加入一行

```yaml
PS: PS：本文所有的数字表示方式来自Mili - world.execute(me); # PS内容，在flink自加的
```

就可以在友链界面加入自定义的内容了

至于``A Few Requirements``区块在更新2.1.0后用同样的方式加入的

在``flink.pug``加入：

```jade
  hr
  div 
    h2= theme.Flink.require_headline
    ul
      li= theme.Flink.requirement1
      li= theme.Flink.requirement2
      li= theme.Flink.requirement3
      li= theme.Flink.requirement4
      li= theme.Flink.requirement5
      li= theme.Flink.requirement6

```

有多少的requirement就加入多少行，然后在配置文件``butterfly.yml``用同样的方式加入

```yaml
  require_headline: A Few Requirements
  requirement1: GamerNoTitle表示不接受商业性网站、下载站、视频站等
  requirement2: HTTP和HTTPS均可，不强制性要求小绿锁，但是只有一个IP或者带端口的不接受哦
  requirement3: 网站要有维护，定期或不定期均可，线下朋友请忽略这一条
  requirement4: 可以先在自己的网站加上我的友链，我处理的速度也会快一些呢~
  requirement5: 大佬可以无视上面的要求，并加入“大佬之家”行列
  requirement6: 如果你想联系我，在About页面中有我的相关联系方式
```

就可以了~

### 友链链接区块加入一行小字

效果就像图片里面的那样

![小字效果图](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@butterfly-customize/img/butterfly-customize/Link-Class-Descr.png)

其实这个也很简单，跟上面一样还是要动``flink.pug``文件，在最顶上那一块代码中加入一行，将所需的字典名字命名为``class_descr``，加入后的代码如下

```jade
.flink
  each i in site.data.link
    h1= i.class_name
    h4= i.class_descr	//- 给每个class加入class_descr参数
    .post-cards
      ul.md-links
        each item in i.link_list
          li.md-links-item
            a(href=item.link  title=item.name target="_blank")
              if theme.lazyload.enable
                img.lazyload(data-src=item.avatar onerror=`this.onerror=null;this.src='` + url_for(theme.lodding_bg.flink) + `'` alt=item.name )
              else
                img(src=item.avatar onerror=`this.onerror=null;this.src='` + url_for(theme.lodding_bg.flink) + `'` alt=item.name )
              .md-links-title= item.name 
              .md-links-des= item.descr
```

然后在link.yml的每一个class中就可以加入descr了，这里以一个区块做例子

```yaml
class2:
  class_name: DOS 私人服务
  class_descr: 我个人在使用的不同网络服务，在这里列出(＾Ｕ＾)ノ~ＹＯ	# 这里填入描述
  link_list:
    1:
      name: CloudFlare
      link: https://www.cloudflare.com/
      avatar: https://dash.cloudflare.com/favicon.ico
      descr: 免费的域名托管平台

```

在``class_name``下面加入一行参数叫``class_descr``并设定为想要的内容即可，当然你也可以加在link_list的下面，但是请注意缩进要跟``class_name``和``link_list``平齐

### 加入基于Gitalk的动态栏小部件

这个部件最开始是在[@火喵](https://diary.dorcandy.cn/)的博客看到的，然后就发了邮件问了一下是怎么实现的

![](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@butterfly-customize/img/butterfly-customize/Mail.png)

感谢[@火喵](https://dorcandy.cn/)提供的思路~！

然后我参照了Gitalk的文档，用一个非常简单的什么都没有的html文件来装我这个Gitalk，正因为只有Gitalk，所以整个html文档就很简单

```html
<head>  
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@gitalk-css/css/gitalk-dorcandy.css">	<!-- 导入自己修改过后的css文件，参照了火喵的 -->
<script src="https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@gitalk/js/gitalk.min.js"></script>	<!-- 导入自己修改后的js文件，主要修改了显示的字 -->
</head>
<body>
<div id="gitalk-container"></div>
<script>
    var gitalk = new Gitalk({
    id: 'Dynamics',
    clientID: 'xxxxxxxxxxxxxxxxxxxx',
    clientSecret: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
    repo: 'GamerNoTitle.Github.io',
    owner: 'GamerNoTitle',
    admin: ['GamerNoTitle'],
    title: 'Dynamics',
    pagerDirection: 'last',
    perPage: 5,
    })
    gitalk.render('gitalk-container')
</script>
</body>
```

其中，``pagerDirection``本来是排序的顺序，但是按照Gitalk的[issue#210](https://github.com/gitalk/gitalk/issues/210)中官方所述，不登录的话排序顺序只能是从旧到新，所以我也没办法，我采取的操作是一个issue中只容纳5条动态，历史动态就放到另外的issue中

将这个html文件命名一下为``gitalk.html``，然后放在主题目录的source文件夹下，然后进入``.\layout\includes\widget``文件夹，将``card_announcement.pug``（公告卡片）复制一份作为模板并且重命名为``card_dynamics.pug``，然后打开修改里面的内容。原来里面的内容如下

```jade
.card-widget.card-announcement
  .card-content
    .item-headline
      i.fa.fa-bullhorn.card-announcement-animation(aria-hidden="true")
      span= _p('aside.card_announcement')
    .announcement_content= theme.announcement.content
```

在这里面，span应该是显示的字（如图红框处）

![](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@butterfly-customize/img/butterfly-customize/Announcement.png)

但是我加入的字不在语言配置文件中有，所以直接修改成

```jade
span= 'Dynamics'
```

就可以了，接着是要修改图标，作为动态，一个小喇叭的图标显得不是很好看。所以我就访问了[Fontawesome@v4.7.0](https://fontawesome.com/v4.7.0/icons/)，选择了现在的这个图标

将图标的信息修改为

```jade
i.fa.fa-quote-right(aria-hidden="true")
```

图标后面的那串动画就不要了，动画多了也不是很好看

最后需要引入Gitalk.html文件，在下面加入一行

```jade
include gitalk.html
```

这样当部署完后，网站就会自动引用根目录下的``gitalk.html``文件。当然你要是直接访问我的gitalk.html文件也是能打开的

接着我们需要在网站的渲染中加入这个小部件

打开此目录下的``index.pug``，然后将这个引入加在认为合适的地方，我直接加载了公告的下面

```jade
if theme.aside.card_dynamics
  include ./card_dynamics.pug
```

最后到``butterfly.yml``文件中，加入小部件的开关

```yaml
aside:
  position: right # left or right
  card_author: true
  card_announcement: true
  card_recent_post: true
  card_categories: true
  card_tags: false
  card_archives: true
  card_webinfo: true
  card_dynamics: true	# 动态开关
```

部署自己的网页，就能够出现这种效果啦！

当然你要是在上面不要if判断，直接加入，那你就不需要在配置文件中加入开关了

![Dynamics小部件](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@butterfly-customize/img/butterfly-customize/dynamics-card.png)

{% note info %}

2020.4.4更新 主题版本[butterfly@2.2.5](https://github.com/jerryc127/hexo-theme-butterfly/releases/tag/2.2.5)

{% endnote %}

### 为网站加上全局黑白效果

为什么加这个效果呢？我一开始加是[2020.4.4](https://mp.weixin.qq.com/s/S0-s4V1Gg443a-vyMmaOKA)为了纪念为抗争新冠肺炎而牺牲的各位烈士们，所以加了全局的黑白效果。先放两张图给你们看看加入后的效果

![黑白首页](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@blackandwhite/img/butterfly-customize/blackandwhite-home.png)

![黑白友链](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@blackandwhite/img/butterfly-customize/blackandwhite-link.png)

就是像这样的全局黑白效果，加起来其实也不难，一开始[@yuleng](https://yuleng.top)给我分享了全局黑白的html代码，告诉我要加就加载header或者是body里面（下面先放html代码）

```html
<!-- 黑白色 -->
<style>
html{
filter: grayscale( 100%);
-webkit-filter: grayscale( 100%);
-moz-filter: grayscale( 100%);
-ms-filter: grayscale( 100%);
-o-filter: grayscale( 100%);
filter: url( "data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
-webkit-filter: grayscale( 1);
}
</style>
```

但是我们的butterfly后端是使用的pug文件作为网站样式的编写方式，所以我们要先把它转成pug形式的，转出来就是像下面这样

```jade
html
  body
    // 黑白色
    style.
      html{
      filter: grayscale( 100%);
      -webkit-filter: grayscale( 100%);
      -moz-filter: grayscale( 100%);
      -ms-filter: grayscale( 100%);
      -o-filter: grayscale( 100%);
      filter: url( "data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
      filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
      -webkit-filter: grayscale( 1);
      }

```

然后我把这一串代码存到一个名为``blackandwhite.pug``的文件，将它放在主题目录下的``layout/includes/addons``里面，然后就要在``layout.pug``里面引入文件。在原文件的``include ./head.pug``下面加入一行来引入我们的文件

```jade
if theme.blackandwhite
  include ./addons/blackandwhite.pug
```

加个if判断是为了下次要使用的时候还能够用，不用再次修改。

接着我们到``butterfly.yml``文件内加多一行

```yaml
blackandwhite: true
```

这样就开启了我们的黑白效果

为了方便大家，我将文件放出来[blackandwhite.pug](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@blackandwhite.pug/file/blackandwhite.pug)，大家只需要将文件放在对应的位置，加上对应的配置项即可！

{% note info %}

2020.4.7更新 主题版本[butterfly@2.2.5](https://github.com/jerryc127/hexo-theme-butterfly/releases/tag/2.2.5)

{% endnote %}

### 为文章加上投票评分功能

按照群友的要求，我又来更新啦，这次我们给文章加上投票评分功能，具体的效果像下面那样（Donate按键是主题自带的，不是我加入的）

![Rating UI](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@rating/img/butterfly-customize/rating-rated.png)

那么废话不多说，让我们直接开始！（如果你想直接使用我做好的只需要替换id的预设文件，那你可以点击[这里](#评分预设文档使用)直接跳到文档，而不必看我是如何做的）注册一个你自己的账号，注册过程相信我不用说你也会。注册完以后，会把我们导到安装界面，我们选择最右边的Rating widget，获取我们自己的引入代码，等待下一步使用，我这里获取到的引入代码如下（为保证信息准确性，我将自己的id替换成了xxxxx）

首先你得去[widgetpack](https://widgetpack.com/)注册一个你自己的账号，注册过程相信我不用说你也会。注册完以后，会把我们导到安装界面，我们选择最右边的``Rating widget``，获取我们自己的引入代码，等待下一步使用，我这里获取到的引入代码如下（为保证信息准确性，我将自己的id替换成了xxxxx）

```html
<div id="wpac-rating"></div>
<script type="text/javascript">
wpac_init = window.wpac_init || [];
wpac_init.push({widget: 'Rating', id: xxxxx});
(function() {
    if ('WIDGETPACK_LOADED' in window) return;
    WIDGETPACK_LOADED = true;
    var mc = document.createElement('script');
    mc.type = 'text/javascript';
    mc.async = true;
    mc.src = 'https://embed.widgetpack.com/widget.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mc, s.nextSibling);
})();
</script>
<a href="https://widgetpack.com" class="wpac-cr">Star Rating WIDGET PACK</a>
```

接着，我们要在对应的地方引用它，但是butterfly是使用pug和stylus的组合来进行渲染的，所以我们要先把上面的这一串代码转成pug形式的

```jade
html
  body
    #wpac-rating
    script(type="text/javascript").
      wpac_init = window.wpac_init || [];
      wpac_init.push({widget: 'Rating', id: xxxxx});
      (function() {
      if ('WIDGETPACK_LOADED' in window) return;
      WIDGETPACK_LOADED = true;
      var mc = document.createElement('script');
      mc.type = 'text/javascript';
      mc.async = true;
      mc.src = 'https://embed.widgetpack.com/widget.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mc, s.nextSibling);
      })();
    a.wpac-cr(href="https://widgetpack.com") Star Rating WIDGET PACK
```

然后将其保存成``rating.pug``，放到``./layout/includes/addons``里面去。不过在这代码里面，投票UI不是居中的就让我很不上，而且最后一行有一串a标签，然而我并不是很喜欢它，我将代码改成了下面这个样子

```jade
html
  body
    #wpac-rating(align="center")	//- 对对象进行居中处理
    script(type="text/javascript").
      wpac_init = window.wpac_init || [];
      wpac_init.push({widget: 'Rating', id: xxxxx}); 
      (function() {
      if ('WIDGETPACK_LOADED' in window) return;
      WIDGETPACK_LOADED = true;
      var mc = document.createElement('script');
      mc.type = 'text/javascript';
      mc.async = true;
      mc.src = 'https://embed.widgetpack.com/widget.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mc, s.nextSibling);
      })();
      //- 对字进行居中处理
    #copy(align="center")
      | Rating addon based on 
      a(herf="https://widgetpack.com/") widgetpack
      | , made by 
      a(href="https://bili33.top") GamerNoTitle

```

保存完成后，我们进入``./layout/post.pug``里面对我们的文件进行引入，在合适的位置添加引入代码，我这里是在打上的下面进行了添加

```jade
    if theme.reward.enable
      !=partial('includes/post/reward', {}, {cache:theme.fragment_cache})
    //- 上面是打赏功能，下面是添加的投票功能
    if theme.rating.enable
      include includes/addons/rating.pug
```

接着，我们到``butterfly.yml``里面加入新的配置项

```yaml
rating:
	enable: true
```

这样就加入了一个开关（不过是全局的），可以控制rating功能是否开启（讲真我觉得这个功能我自己用的很少，我自己应该会关掉）

接着我们就可以部署自己的应用啦，看看是不是可以开始投票了呢？

关于投票的设定，默认是需要社交账号登录的，但是看着这几个图标，又有几个是在国内能够使用的呢？

![社交账号登录方式](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@rating/img/butterfly-customize/rating-social.png)

我们需要更改这个设定，让其不需要社交账号登录也能够进行投票

点开左上角的三条横线，选择``Rating``，然后点击里面的``Setting``，在这里面就有我们需要的设置

![Rating设置](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@rating/img/butterfly-customize/rating-default-settings.png)

我们可以看到左边的框选择的是Social，我们可以选择``IP address``或者``Cookies``的任意一个，这取决于你要怎么计算你的文章投票，如果选择IP的话，那么同公网IP下的一个人进行了投票，剩下的人就不能够投票了（会怎么点都没反应）；选择Cookie的话，可能会存在刷票的问题（因为cookie是可以清理的，但是谁这么无聊呢？）

至于右边，可以选择星星的颜色，我这里选择的是淡蓝色；你还可以设置星星上限，默认是5星满分，你可以把它改成你想要的数字，而另一个输入框是设定星星的大小，取决于你自己的审美吧

![最终效果图](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@rating/img/butterfly-customize/rating-result.png)

#### 评分预设文档使用

首先你需要点击[这里](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@rating/file/rating.pug)下载预设文件

在这文档里面，你需要修改的是id。如何获取id，你可以查看下面这张图片

![获取自己的应用id](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@rating/img/butterfly-customize/rating-id.png)

```jade
      wpac_init.push({widget: 'Rating', id: xxxxx});  //- 这里将xxxxx改成自己的id
```

将自己的id填入第六行的对应位置后，把文件放入``./layout/includes/addons``（若不存在则自己建立文件夹）

打开自己的``butterfly.yml``文件，在任意一行加入以下内容：

```yaml
# 投票评分功能
rating: 
  enable: true
```

然后去到``./layout/post.pug``里面，在你想要加入投票功能的位置加入以下代码（推荐加载打赏即reward后面）

```jade
    if theme.rating.enable
      include includes/addons/rating.pug
```

然后对网站进行部署即可！

{% note info %}

### 不定期更新

{% endnote %}