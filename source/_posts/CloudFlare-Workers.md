---
title: 白嫖党教你白嫖Cloudflare Workers反代~
date: 2019-10-25 12:15:20
tags: Software
sage: true
categories: Software
cover: https://www.cloudflare.com/resources/images/slt3lc6tev37/2Q8pCVxYreoikOqsomGEGs/d6c70917da99084b1210fe04a241dab9/workers-illustration.png
---

[**<font color=#FF0000>注：本页面为旧版本备份，新版本请点我！</font>**](/2019/10/25/CloudFlare-Workers-Section1/)

CloudFlare一直以其域名托管服务和CDN服务闻名于各位网站管理员，当然我的域名也是托管在这个上面的，后来，有一位被我介绍入CF的同志告诉我CF有种功能。。。（[@TheBaiRuo](https://bairuo.top/)）

就是CF的Workers服务，这是一种能够访问网页时运行特定的JS脚本的服务，所以我们就可以利用它进行 ~~JSPROXY~~ Workers-Proxy（感谢@Anonymous的提醒）的搭建（某反向代理）

#### 前期准备

1、一个CloudFlare账号

2、一个域名（可以到Freenom注册一个）

#### 搭建反向代理

在这之前，你需要把你的域名托管到CF上！！！

然后进入CF的workers界面，看下图

![Workers](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Cloudflare-Workers/into-workers.png)

进入到Workers后，点击Create a Worker来创建你的第一个JS

![Create a Worker](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Cloudflare-Workers/Workers-Interface.png)

然后在workers界面的左边，填入你的JS代码，这时候就需要万能反代代码QAQ

![Worker Editor](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/Cloudflare-Workers/Workers-Edit.png)

解释一下这个界面：

①项目名称：表现为**[Project].[subdomain].workers.dev**，其中subdomain是你注册workers是输入的名字，project就是项目名称

②编辑区：就是你放下代码的地方

③效果预览区：当你按下运行按钮的时候展现出来的效果

④运行：顾名思义，运行嘛，然后在右边看得到

⑤保存并部署：部署该项目

将下面的代码放到你的编辑区中：

```javascript
// 替换成你想镜像的站点
const upstream = 'example.com'
 
// 如果那个站点有专门的移动适配站点，否则保持和上面一致
const upstream_mobile = 'example.com'
 
// 你希望禁止哪些国家访问
const blocked_region = ['KP']
 
// 禁止自访问
const blocked_ip_address = ['0.0.0.0', '127.0.0.1']
 
// 替换成你想镜像的站点
const replace_dict = {
    '$upstream': '$custom_domain',
    '//google.com': ''
}
 
//以下内容都不用动
addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request));
})
 
async function fetchAndApply(request) {
 
    const region = request.headers.get('cf-ipcountry').toUpperCase();
    const ip_address = request.headers.get('cf-connecting-ip');
    const user_agent = request.headers.get('user-agent');
 
    let response = null;
    let url = new URL(request.url);
    let url_host = url.host;
 
    if (url.protocol == 'http:') {
        url.protocol = 'https:'
        response = Response.redirect(url.href);
        return response;
    }
 
    if (await device_status(user_agent)) {
        upstream_domain = upstream
    } else {
        upstream_domain = upstream_mobile
    }
 
    url.host = upstream_domain;
 
    if (blocked_region.includes(region)) {
        response = new Response('Access denied: WorkersProxy is not available in your region yet.', {
            status: 403
        });
    } else if(blocked_ip_address.includes(ip_address)){
        response = new Response('Access denied: Your IP address is blocked by WorkersProxy.', {
            status: 403
        });
    } else{
        let method = request.method;
        let request_headers = request.headers;
        let new_request_headers = new Headers(request_headers);
 
        new_request_headers.set('Host', upstream_domain);
        new_request_headers.set('Referer', url.href);
 
        let original_response = await fetch(url.href, {
            method: method,
            headers: new_request_headers
        })
 
        let original_response_clone = original_response.clone();
        let original_text = null;
        let response_headers = original_response.headers;
        let new_response_headers = new Headers(response_headers);
        let status = original_response.status;
 
        new_response_headers.set('access-control-allow-origin', '*');
        new_response_headers.set('access-control-allow-credentials', true);
        new_response_headers.delete('content-security-policy');
        new_response_headers.delete('content-security-policy-report-only');
        new_response_headers.delete('clear-site-data');
 
        const content_type = new_response_headers.get('content-type');
        if (content_type.includes('text/html') && content_type.includes('UTF-8')) {
            original_text = await replace_response_text(original_response_clone, upstream_domain, url_host);
        } else {
            original_text = original_response_clone.body
        }
 
        response = new Response(original_text, {
            status,
            headers: new_response_headers
        })
    }
    return response;
}
 
async function replace_response_text(response, upstream_domain, host_name) {
    let text = await response.text()
 
    var i, j;
    for (i in replace_dict) {
        j = replace_dict[i]
        if (i == '$upstream') {
            i = upstream_domain
        } else if (i == '$custom_domain') {
            i = host_name
        }
 
        if (j == '$upstream') {
            j = upstream_domain
        } else if (j == '$custom_domain') {
            j = host_name
        }
 
        let re = new RegExp(i, 'g')
        text = text.replace(re, j);
    }
    return text;
}
 
async function device_status (user_agent_info) {
    var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < agents.length; v++) {
        if (user_agent_info.indexOf(agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
```

然后点击运行，就可以反代你需要的网站啦，但是注意，有些网站是无法进行反代的，例如twitter之类的，而且如果原来的网站具有登陆功能，那么这些**登陆功能是无法使用的！！！**

{% note primary %}

加密版（来自评论区@Hostloc）

```javascript
// 替换成你想镜像的站点
const upstream = 'google.com'

// 如果那个站点有专门的移动适配站点，否则保持和上面一致
const upstream_mobile = 'm.google.com'

// 密码访问

const openAuth = false
const username = 'username'
const password = 'password'

// 你希望禁止哪些国家访问
const blocked_region = ['KP']

// 禁止自访问
const blocked_ip_address = ['0.0.0.0', '127.0.0.1']

// 替换成你想镜像的站点
const replace_dict = {
    '$upstream': '$custom_domain',
    '//google.com': ''
}

function unauthorized() {
  return new Response('Unauthorized', {
    headers: {
      'WWW-Authenticate': 'Basic realm="goindex"',
      'Access-Control-Allow-Origin': '*'
    },
    status: 401
  });
}

function parseBasicAuth(auth) {
    try {
      return atob(auth.split(' ').pop()).split(':');
    } catch (e) {
      return [];
    }
}

function doBasicAuth(request) {
  const auth = request.headers.get('Authorization');

  if (!auth || !/^Basic [A-Za-z0-9._~+/-]+=*$/i.test(auth)) {
    return false;
  }

  const [user, pass] = parseBasicAuth(auth);
  return user === username && pass === password;
}


async function fetchAndApply(request) {
  if (request.method === 'OPTIONS') // allow preflight request
    return new Response('', {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, HEAD, OPTIONS'
      }
    });

  if (openAuth && !doBasicAuth(request)) {
    return unauthorized();
  }
    const region = request.headers.get('cf-ipcountry').toUpperCase();
    const ip_address = request.headers.get('cf-connecting-ip');
    const user_agent = request.headers.get('user-agent');

    let response = null;
    let url = new URL(request.url);
    let url_host = url.host;

    if (url.protocol == 'http:') {
        url.protocol = 'https:'
        response = Response.redirect(url.href);
        return response;
    }

    if (await device_status(user_agent)) {
        upstream_domain = upstream
    } else {
        upstream_domain = upstream_mobile
    }

    url.host = upstream_domain;

    if (blocked_region.includes(region)) {
        response = new Response('Access denied: WorkersProxy is not available in your region yet.', {
            status: 403
        });
    } else if(blocked_ip_address.includes(ip_address)){
        response = new Response('Access denied: Your IP address is blocked by WorkersProxy.', {
            status: 403
        });
    } else{
        let method = request.method;
        let request_headers = request.headers;
        let new_request_headers = new Headers(request_headers);

        new_request_headers.set('Host', upstream_domain);
        new_request_headers.set('Referer', url.href);

        let original_response = await fetch(url.href, {
            method: method,
            headers: new_request_headers
        })

        let original_response_clone = original_response.clone();
        let original_text = null;
        let response_headers = original_response.headers;
        let new_response_headers = new Headers(response_headers);
        let status = original_response.status;

        new_response_headers.set('access-control-allow-origin', '*');
        new_response_headers.set('access-control-allow-credentials', true);
        new_response_headers.delete('content-security-policy');
        new_response_headers.delete('content-security-policy-report-only');
        new_response_headers.delete('clear-site-data');

        const content_type = new_response_headers.get('content-type');
        if (content_type.includes('text/html') && content_type.includes('UTF-8')) {
            original_text = await replace_response_text(original_response_clone, upstream_domain, url_host);
        } else {
            original_text = original_response_clone.body
        }

        response = new Response(original_text, {
            status,
            headers: new_response_headers
        })
    }
    return response;
}

addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request).catch(err => {
      console.error(err);
      new Response(JSON.stringify(err.stack), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }));
})


async function replace_response_text(response, upstream_domain, host_name) {
    let text = await response.text()

    var i, j;
    for (i in replace_dict) {
        j = replace_dict[i]
        if (i == '$upstream') {
            i = upstream_domain
        } else if (i == '$custom_domain') {
            i = host_name
        }

        if (j == '$upstream') {
            j = upstream_domain
        } else if (j == '$custom_domain') {
            j = host_name
        }

        let re = new RegExp(i, 'g')
        text = text.replace(re, j);
    }
    return text;
}

async function device_status (user_agent_info) {
    var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < agents.length; v++) {
        if (user_agent_info.indexOf(agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
```

{% endnote %}

[下篇：Cloudflare Workers绑定自定义域名进行访问](/2020/01/17/Cloudflare-Workers-Section2/)

这就是JSPROXY的反代啦，祝各位成功呀！
题外话：

下周要考试了，我好方，怎么办

我已经用此方法部署了Google镜像站、Google学术镜像站、wiki镜像站，可以在我的友链界面找到哦~

