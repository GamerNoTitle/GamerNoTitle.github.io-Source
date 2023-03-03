---
title: 网站优化：网站目录缩短及重定向
date: 2021-06-14 16:26:04
tags: [Tech, SEO, Optimize, Webmaster]
categories: Tech
cover: https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/301Redirect/Cover.png
---

考完高考啦，闲的没事干，想着之前各种SEO优化服务给我发的邮件，我想说：我自己也知道我的链接太长了呀！！！

所以这波是自己来优化（其实就是把链接缩短了而已）

本来是想着每个都加个301跳转，这样我就可以跳转到网页了，然后新建了两个干了起来

![本来的想法](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/301Redirect/Thought1.png)

然后看到我的一堆文章，啥呀，整整三十六篇？？？！我这得搞到什么时候

说句实话，我才弄好俩了，就已经感觉太麻烦了，这条路行不通

然后我就想用我三脚猫功夫的JavaScript来弄，于是就有了下面这种问题

**想法：**

- 使用window函数获取当前链接
- 使用正则表达式匹配链接
- 将连接中的日期统一替换为`posts`
- 控制301访问新的链接

想好了，开工！

---

我的第一版JavaScript是这么写的

```javascript
url = window.location.href
result = String(url).replace(/20[0-2][0-9]\/[0-1][1-9]\/[0-3][1-9]/i,'posts')
window.location = result
```

解读一下：

- 获取当前链接地址并赋值为url
- 将替换url中匹配正则表达式的部分，并替换为`posts`
- 通过window函数将网页定位到新的链接

写好，上传到Github并用jsdelivr引入，渲染访问

然后问题就来了：所有的网页（因为我是全局引入）会进入无尽的刷新状态，原因是访问时不管是匹配还是不匹配都会进行301重定向，重定向完后访问的目标网页也有这个JavaScript，再次进行重定向，然后就进入了循环

（事实上，我到了第三版才发现这个问题，所以我们先放着这个问题）

---

下面是第二版√

```javascript
url = window.location.href
whether = String(url).search(/20[0-2][0-9]\/[0-1][1-9]\/[0-3][1-9]/i)
if(whether == True){
    result = String(url).replace(/20[0-2][0-9]\/[0-1][1-9]\/[0-3][1-9]/i,'posts')
    window.location = result
}
else{
    window.location = url
}
```

这个说句实在话，我在404.html引入的，然后将`posts`重定向的地方对了，但是，一旦不符合这个表达式，还是会陷入死循环，死在404界面上，然后这时候我才发现了这个问题，再次进行修改

---

第三版开始啦！

```javascript
url = window.location.href
whether = String(url).search(/20[0-2][0-9]\/[0-1][1-9]\/[0-3][1-9]/i)
if(whether == true){
    result = String(url).replace(/20[0-2][0-9]\/[0-1][1-9]\/[0-3][1-9]/i,'posts')
    window.location = result
}
```

仍旧是在404页面引入的，这版是好的，直接放在网站的`/js/301Redirect.js`里面，404页面引入即可

另：在做这个的过程中，jsdelivr好像有点问题，就是本来可以通过访问`purge.jsdelivr.net`来刷新文件缓存，但是实际上自从jsd上次Down了以后，访问就刷不了了，所以最后采用的是放在网站的目录中而不是放在jsd引入

总之这一次的网站优化就这么搞定了，新链接还行，就等搜索引擎自己帮我改过去了√

---

**2021.6.24更新**

发现访问的链接并不一定是上面那样`/YYYY/MM/DD/:post`的形式，甚至有`/YYYY/MM/DD/:post/`和`/YYYY/MM/DD/:post/index.html`的访问方式，所以我又来修改了

```javascript
url = window.location.href
whether = String(url).search(/20[0-2][0-9]\/[0-1][1-9]\/[0-3][1-9]/i)
whethersplash = String(url).search(/20[0-2][0-9]\/[0-1][1-9]\/[0-3][1-9]\//i)
whetherindex = String(url).search(/20[0-2][0-9]\/[0-1][1-9]\/[0-3][1-9]\/index.html/i)
if(whether == true | whethersplash == true | whetherindex == true){
    result = String(url).replace(/20[0-2][0-9]\/[0-1][1-9]\/[0-3][1-9]/i,'posts')
    window.location = result
}

```

加多了两个判断，然后用或运算符在if中判断是否需要跳转，完事！

不知道这样可不可以，用一段时间再说吧√