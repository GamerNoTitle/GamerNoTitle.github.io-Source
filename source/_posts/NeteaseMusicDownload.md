---
title: NeteaseMusicDownload —— 网易云音乐自助下载网站
date: 2022-02-10 19:47:09
tags: Tech
categories: Tech
cover: https://user-images.githubusercontent.com/28426291/153402900-8a18d94d-b975-4b1f-81d0-83e97c82e64c.png
---

![下载站主页](https://user-images.githubusercontent.com/28426291/153402900-8a18d94d-b975-4b1f-81d0-83e97c82e64c.png)



---

这个项目起源于一个生活小例子。昨天(2022.2.9)我在剪视频，然后需要[某一首歌](https://music.163.com/song?id=1472480890&userid=252340012)，结果网易云直接不给我下（会员限定）

![](https://user-images.githubusercontent.com/28426291/153404219-8b7d9939-290c-4eaa-9874-a0f668ccb148.png)

那没办法，我只能看看找点别的办法，最开始想到的是[@nondanee/unblocknetease](https://github.com/nondanee/UnblockNeteaseMusic)这个项目，但是这个项目年久失修，我打开了代理通道后，网易云接入就发现，网易云提示未连接到网络，说白了就是用不了

后来我想到我手头上有网易云音乐的对外链接的api，想想应该可以拿这个东西搞定这个事情，这个项目便诞生了~

---

## 找模板

做一个网站，首先颜值必须得高，这里我去html5up找了一个模板来用（因为懒QAQ）

因为这个网站所需要的元素很简单，就是一个输入框、一个按钮而已

![](https://user-images.githubusercontent.com/28426291/153545338-7c99eea0-2077-42b4-8b49-3f6bafb7114c.png)

最终找了Eventually这个模板，下载下来进行修改

## 写按钮事件

这里就是要用户把链接帖进去，然后把输入的内容的网易云域名改为我的api域名，所以就在JavaScript里面做了一下字符串替换

```javascript
function openNew(){
    var link = document.getElementById("link").value;
    const NeteaseReg = new RegExp('music.163.com')
    const schemeReg = new RegExp('^https?://')
    if(NeteaseReg.test(link) && schemeReg.test(link)) {
        var ToOpen = link.replace("music.163.com", "api.ninym.top").replace("/#/","/");  //防止解析暴毙
        window.open(ToOpen);
    }
    else{
        alert('请输入正确的网易云链接！\n例如 https://music.163.com/song?id=467787951&userid=252340012')
    }
}

```

在这里用了两个正则表达式来判断是否含有网易云域名和是否为http(s)链接，如果不是就弹出提示，如果是就跳转到下一个页面

在`/song`页面下，再写一个JavaScript，直接获取网易云的外链

```javascript
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
    context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
if (GetQueryString("id") == ''){
    undefined
}
else{
    window.open('https://music.163.com/song/media/outer/url?id='+GetQueryString("id")+'.mp3','_self');
}

```

`GetQueryString`是将连接中的query参数解析出来，因为这里只需要用到id这个参数，所以判断一下如果id为空，就不采取任何操作，如果id不为空，就跳转到网易云链接进行下载

## 打包上传

接着将用户页打包上传到Github仓库[GamerNoTitle/NeteaseMusicDownload: 一个可以下载网易云歌曲的网站](https://github.com/GamerNoTitle/NeteaseMusicDownload)，将api上传到另一个Github仓库并绑定不同的域名，就完成啦！
