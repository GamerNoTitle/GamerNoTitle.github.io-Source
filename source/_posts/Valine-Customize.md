---
title: Valine-Customize魔改教程
date: 2020-04-19 19:50:19
tags: Tech
categories: Tech
cover: https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-customize/cover.png
---

{% note warning %}

本篇为我的修改思路，如果你想直接使用我修改过后的版本，可以直接将[https://github.com/GamerNoTitle/Valine-Magic](https://github.com/GamerNoTitle/Valine-Magic)更新日志中的最新版js链接引入

在看本篇之前，请确保：

- 你有一定的代码基础
- 你能够看懂Python代码和JavaScript
- 你精通Valine的使用

Valine在2020/4/21更新了v1.4.5，支持了自定义表情包，故[Valine-Magic](https://github.com/GamerNoTitle/Valine-Magic)将不再提供修改的js，改为提供Valine的表情列表


{% endnote %}

我们本篇要做的事情有两个

①加入自定义表情

②判断邮箱为QQ邮箱则显示QQ头像

③为修改UI文字提供思路

话不多说 让我们开始吧

---

### 加入自定义表情

首先，我们需要获得valine的js文件，这里直接访问Valine的CDN获取https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js

![Valine官方JS](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-customize/Valine-js-Official.png)

打开后是一个页面，我们直接全选复制，粘贴到一个新的js文件中

{% note warning %}

温馨提示：因为js中的字符数**稍微**（手动着重）有点多，所以说如果没有较为强劲的电脑可能无法很快做到文本格式化

{% endnote %}

首先我们需要修改的是Valine的表情CDN，如果不修改的话，你的表情链接前面会自动加上``https://img.t.sinajs.cn/t4/appstyle/expression/ext/normal``字段导致表情无法被读取

我们直接以`//img.t.sinajs.cn`作为关键词检索CDN，很快就得到了CDN的位置

![CDN搜索](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-customize/Valine-Original-CDN-Search.png)

我们将这里的CDN的内容直接删掉，留空

接着我们搜索valine自带的表情标签，而第一个的表情标签是smile，我这里就直接搜索smile，这样可以直接定位到表情列表的头部

![表情列表搜索](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-customize/Valine-Stickers-List.png)

接下来，我们需要上传自己的表情，并且按照这个格式制作一个表情列表

我个人的做法是：将表情包上传到Github仓库，通过jsdelivr来使用；通过Python脚本遍历当前目录下的所有文件，自动生成表情列表

上传就不必说了，直接用Git上传即可

生成列表生成脚本我是自己弄了一小段

```python
import os
path = 'D:\xxx\BQB'	# 路径已屏蔽QAQ
def findAllFile(base):
    for root, ds, fs in os.walk(base):
        for f in fs:
            yield f

def main():
    base = './'
    linklist=[]
    num=1
    for i in findAllFile(base):
        linklist.append('custom{}: "https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/BQB/{}",'.format(num,i))
        num=num+1
    print(str(linklist).replace(',\', \'',', '))
if __name__ == '__main__':
    main()
```

这里通过os.walk遍历当前目录下的文件，并且将获取到的文件名通过字符串拼接的方式拼在一起，然后存入列表`linklist`，接着打印的时候将固定的字符串格式`,', '`给删除掉（因为是list对象，所以打印出来的时候有固定格式），接着就会给我生成表情列表啦！

![生成表情列表](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-customize/Sticker-List-Generate.png)

接着将获取到的列表覆盖入Valine的表情列表，保存

在自己的网站引入Valine的CDN的时候引入自己的js文件即可

接着我们就会看到表情列表里面的自定义表情啦！

### 判断为QQ邮箱将头像设定为QQ头像

{% note info %}

参考：https://blog.csdn.net/cungudafa/article/details/104638730

{% endnote %}

这里我们还是打开刚刚的js文件，直接搜索`E.cdn+(0,s.default)(t.get("mail"))+E.params`，会给我们定位到一个位置

![搜索有关字段](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-customize/Valine-Mail-Search.png)

我们找到下图中我鼠标所在的位置，回车换行

![换行位置](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-customize/Valine-Mail-Enter.png)

换行以后，加入以下内容

```javascript
var qq_img = E.cdn+(0,s.default)(t.get("mail"))+E.params;
if (t.get("mail").indexOf("@qq.com") >= 0) {
	var prefix = t.get("mail").replace(/@.*/, "");//前缀
	var pattern = /^\d+$/g;  //正则表达式
	var result = prefix.match(pattern);//match 是匹配的意思
	if (result !== null) {
		qq_img = "//q1.qlogo.cn/g?b=qq&nk=" + prefix + "&s=100";
	}
}
```

然后回到我们刚刚搜索的地方，从`'<img`处开始，到后面的第一个`>'`修改为以下内容

```javascript
'<img class="vimg" src="'+(qq_img)+'">'
```

保存即可，然后引入刚刚我们修改的JS，在评论时邮箱填入QQ邮箱，看看是不是有QQ头像了？

### 修改UI文字

我们修改UI文字其实非常简单，要修改的东西也是在这个js文件里面

我们随便搜索一个按钮显示的文字，我们就会发现，附近都是我们要修改的文字

![搜索有关字段](https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@master/img/Valine-customize/Valine-UI-Text.png)

我们只需要对这些文字进行修改即可，修改成啥样嘛？就看你自己啦！

---

### 题外话

啦啦啦！终于引入B站表情包啦！

新建了一个Github项目在这https://github.com/GamerNoTitle/Valine-Magic

~~以后新的表情包就丢在这里啦！更新日志也写在这里，你可以通过Issue或者PR提交新的表情包~~

~~有会修改ValineUI的大佬请联系我！我想做分类标签！！！~~

**Valine在2020/4/21更新了v1.4.5，支持了自定义表情包，故[Valine-Magic](https://github.com/GamerNoTitle/Valine-Magic)将不再提供修改的js，改为提供Valine的表情列表**