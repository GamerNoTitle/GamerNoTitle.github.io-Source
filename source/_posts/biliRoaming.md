---
title: 收看B站港澳台地区番剧的正确方式 - 哔哩漫游biliRoaming
date: 2022-04-22 17:08:35
tags: Software
categories: Software
cover: https://github-do.panbaidu.cn/https://raw.githubusercontent.com/yujincheng08/BiliRoaming/master/imgs/icon.png
---

{% note danger %}

**<font size=32>本文禁止转载，也禁止大范围转发宣传！</font>**

{% endnote %}

因为某些众所周知的原因，有些番在B站只能在港澳台观看，而我们平时观看港澳台番剧会出现下面这张图的情况

![PC端](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/biliRoaming/msedge-20220422-171409.png?download=true)

![Android端（有些可能会写“您所在的区域不支持观看”）](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/biliRoaming/WsaClient-20220422-172138.png)

对于我这种追番老手来说，这可是不能接受的一件事情。而在我早期搜索B站港澳台的时候，发现了能够突破这种限制的油猴脚本[bilibili-helper/README.md at user.js · ipcjs/bilibili-helper (github.com)](https://github.com/ipcjs/bilibili-helper/blob/user.js/packages/unblock-area-limit/README.md)，以前这个脚本使用的是biliPlus的服务器，但是后来因为一封律师函，所以就只能自建服务器了（后面会说）

下面我将带领大家一步一步突破港澳台限制

## PC端

首先你需要给浏览器装上油猴插件（这里不讲），然后打开这个链接[解除B站区域限制 (greasyfork.org)](https://greasyfork.org/zh-CN/scripts/25718-解除b站区域限制)，安装这个插件

然后当你打开某一个番剧的详情页（不一定要港澳台的），有一个设置按钮（就是图片里面这个有点像星球的这个按钮）

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/biliRoaming/msedge-20220422-172608.png)

点开以后在里面填写服务器，服务器可以参照哔哩漫游提供的公共服务器 [公共解析服务器 · yujincheng08/BiliRoaming Wiki (github.com)](https://github.com/yujincheng08/BiliRoaming/wiki/公共解析服务器)，也可以自建（这里不讲，哔哩漫游的wiki里面有，自己找）

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/biliRoaming/msedge-20220422-173134.png)

我这里填的是自建服务器，因为额度有限就不共享了，upos服务器建议换成`ks3（金山）`，比较稳定

这时候你再访问番剧页面，它就会自动给你获取港澳台的番剧看了

![](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/biliRoaming/msedge-20220422-173256.png)

## 安卓端

你需要安装xposed框架并安装哔哩漫游模块 [Releases · yujincheng08/BiliRoaming (github.com)](https://github.com/yujincheng08/BiliRoaming/releases)

当然，如果你不是高玩，你也可以下载已经把模块集成在主程序的B站，官方下载地址是这个 -> https://wwe.lanzoux.com/b015ll4sb 2333

我自己打包的是这个 -> [[Lspatch] [Roaming-1.6.2] 哔哩哔哩 6.69.0](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/files/biliRoaming/%5BLspatch%5D%20%5BRoaming-1.6.2%5D%20%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%206.69.0.apk?download=true) [[Lspatch] [Roaming-1.6.2] 哔哩哔哩HD 1.17.0](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/files/biliRoaming/%5BLspatch%5D%20%5BRoaming-1.6.2%5D%20%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9HD%201.17.0.apk?download=true)

安装完成后，在设置中找到`哔哩漫游设置`，并按照我这样设置（解析服务器自己填，这里拿HD来做例子）

![打开前三个选项](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/biliRoaming/WsaClient-20220422-173746.png)

![填入解析服务器](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/biliRoaming/WsaClient-20220422-173814.png)

![Upos更改为k3c](https://gamernotitle.coding.net/p/assets/d/assets/git/raw/master/img/biliRoaming/WsaClient-20220422-173825.png)

完成后直接点`确定并重启客户端`，然后就能看港澳台番剧了

## 苹果iOS端

**你在想Peach？**

## Q&A

### 为啥只能看6分钟

因为有些番需要大会员才能看，没有大会员只能看前6分钟，所以你需要在PC端的设置页面点击账号授权（**请不要给陌生的解析服务器授权，因为这会把你所有的账号信息，包括Cookie共享到服务器**）

### 自建解析服务器

我只在这里放出PHP版本的代码，我使用[阿里云的云函数](https://www.aliyun.com/product/fc?userCode=05u8nbft&share_source=copy_link)创建的，因为这种东西还是少人知道比较好我就不放出来我的服务器和搭建方法了，具体方法自行摸索（这个版本没有在线黑名单，要分享的时候请谨慎！其他的版本在官方的wiki有）

```php
<?php

use RingCentral\Psr7\Response;
/*
To enable the initializer feature (https://help.aliyun.com/document_detail/89029.html)
please implement the initializer function as below：
function initializer($context) {
    echo 'initializing' . PHP_EOL;
}
*/

function handler($request, $context): Response
{
    /*
    $body       = $request->getBody()->getContents();
    $queries    = $request->getQueryParams();
    $method     = $request->getMethod();
    $headers    = $request->getHeaders();
    $path       = $request->getAttribute('path');
    $requestURI = $request->getAttribute('requestURI');
    $clientIP   = $request->getAttribute('clientIP');
    */
    /* Config */

    $upstream_pc_url = 'https://api.bilibili.com/pgc/player/web/playurl';
    $upstream_app_url = 'https://api.bilibili.com/pgc/player/api/playurl';
    $timeout = 5; // seconds


    /* Read incoming request */
    $request_method = $request->getMethod();
    $request_query = stristr($request->getAttribute("requestURI"), '?');
    $req_referer = $request->getHeaderLine('referer');;
    $request_headers = $request->getHeaders();
    $request_body = $request->getBody()->getContents();



    /* Forward request */
    $ch = curl_init();

    //清理相关header
    array_splice($request_headers, array_search('HOST', $request_headers));
    array_splice($request_headers, array_search('User-Agent', $request_headers));
    array_splice($request_headers, array_search('Referer', $request_headers));


    $headers = array();
    foreach ($request_headers as $key => $value) {
        $headers[] = $key . ': ' . $value;
    }
    //判断使用pc还是app接口
    if (substr_count($request_query, 'platform=android') != 0) {
        $url = $upstream_app_url . $request_query;
        curl_setopt($ch, CURLOPT_USERAGENT, 'Bilibili Freedoooooom/MarkII');
    } else {
        $url = $upstream_pc_url . $request_query;
        curl_setopt($ch, CURLOPT_REFERER, $req_referer);
    }
    //curl配置
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $request_method);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_body);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $header = array();

    if ($response === false) {
        $header['Content-Type'] = 'text/plain';
        return new Response(
            502,
            $header,
            'Upstream host did not respond.'
        );
    } else {
        $header_length = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $curl_response_headers = explode("\n", substr($response, 0, $header_length));
        $response_body = substr($response, $header_length);

        foreach ($curl_response_headers as $header_string) {
            $header_tmp = explode(': ', $header_string, 2);
            if (count($header_tmp) == 2) {
                $header[$header_tmp[0]] = trim($header_tmp[1]);
            }
        }

        curl_close($ch);
        // 这行用于调试请求信息
        // return new Response(200, array(), json_encode(array('header' => $header, 'body' => $response_body, 'url' => $url, 'response'=>$response, 'curl_headers'=>$curl_response_headers)));
        return new Response(
            200,
            $header,
            $response_body
        );
    }
}

/*tool*/
//某个字符串在另一个字符串第N此出现的下标
function str_n_pos($str, $find, $n)
{
    $pos_val = 0;
    for ($i = 1; $i <= $n; $i++) {
        $pos = strpos($str, $find);
        $str = substr($str, $pos + 1);
        $pos_val = $pos + $pos_val + 1;
    }
    $count = $pos_val - 1;
    return $count;
}
```

