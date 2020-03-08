---
title: Netease-Comment-Spider 网易云音乐热评爬虫使用手册
date: 2020-02-17 17:35:16
tags: Tech
cover: https://cdn.jsdelivr.net/gh/GamerNoTitle/Picture-repo-v1@2020.2.17-2/img/Netease-Comment-Spider/cover.png
sage: false
---

今天有人申请适配网易云音乐热评的api，反正也没啥事干，就做一个吧！

如果你想看使用手册，那么请你直接往下拉跳过制作过程

**观前提示：可以点击左下角点开导航栏阅读，项目地址：https://github.com/GamerNoTitle/Netease-Comment-Spider**

---

### 制作过程

本程序是调用的[https://www.mouse123.cn/api/163/api.php](https://www.mouse123.cn/api/163/api.php)这个api，会返回很多数据，下面是一个返回的例子

```json
{"song_id":"118","title":"Wolves","images":"https:\/\/p1.music.126.net\/-nQ2E-8ZjuwGtMipBTYzBw==\/17902248323721194.jpg","author":"Selena Gomez","album":"Wolves","description":"\u6b4c\u624b\uff1aSelena Gomez\u3002\u6240\u5c5e\u4e13\u8f91\uff1aWolves\u3002","pub_date":"2017-10-24 16:00:00","comment_id":"1510","comment_user_id":"333845131","comment_nickname":"Stroyberry","comment_avatar_url":"https:\/\/p2.music.126.net\/D7Z2xViXVpB7xH3m5NxDIw==\/109951164448917887.jpg","comment_content":"\ud83d\udc95\u5bf9\u65b0\u6b4c\u6709\u8bf4\u4e0d\u51fa\u7684\u611f\u89c9\uff0csel\u7684\u58f0\u97f3\u8f7b\u5feb\u5374\u53c8\u5f88\u968f\u6027\uff0c\u50cf\u662f\u8ffd\u72fc\u5374\u53c8\u9a7e\u9a6d\u7740\uff0c\u5b8c\u7f8e\u7684future bass\u8ba9\u4f60\u65e0\u6cd5\u81ea\u62d4\u554a\uff01sel\u548c\u68c9\u82b1\u7cd6\u8fd9\u6837\u795e\u7ea7\u7684\u78b0\u649e\ud83d\udca5\u8ba9\u4eba\u7a92\u606f\uff01\u5feb\u5e26\u4e0a\u8033\u673a\ud83c\udfa7\uff01\u95ed\u4e0a\u773c\u775b\uff01\u4e00\u8d77\u7a7f\u68ad\u4e8e\u4e1b\u6797\u4e4b\u4e2d\ud83d\ude0f","comment_pub_date":"2017-10-26 22:23:26"}
```

这个返回的数据看上去很复杂，但是分析一下，返回的还是json格式，那么这个东西的解析就跟[一言的那个项目](http://bili33.top/2020/02/11/Hitokoto-Spider/)是一样的，根据上面的信息，我把config.json的可选配置分成了以下几个

```json
{
    "path": "Netease.csv",
    "times": 100,
    "delay": 0,
    "timeout": 60,
    "song_id": false,
    "images": false,
    "album": false,
    "description": false,
    "pub_date": false,
    "comment_user_id": false,
    "comment_avatar_url": false,
    "comment_pub_date": false
}
```

``path``为文件输出的路径，文件以csv格式输出，请务必带文件后缀！

``times``为抓取次数，支持大于0的整数，直接输入数字即可！

``delay``表示抓取一次得到结果以后等待的时长，为了不给api提供商造成太大的服务器负担，我强烈建议设置此项，填入大于等于0的整数即可，单位是秒

``timeout``表示连接超时时长，支持大于5的整数

``song_id``为歌曲的id，如果开启将把歌曲id写入csv文档，只支持true或false

``images``表示是否抓取图片，这是专辑封面，将保存到``".\albums"``文件夹并命名为对应的评论ID，只支持true或false

``album``表示歌曲来源专辑，如果开启将把专辑名写入csv文件，只支持true或false

``description``表示歌曲的描述，如果开启将把描述写入csv文件，只支持true或false

``pub_date``表示歌曲发行的时间，如果开启将把时间写入csv文档，格式为``YYYY-MM-DD HH:MM:SS``，只支持true或false

``comment_user_id``表示评论的用户的id，如果开启将把id写入csv文档，只支持true或false

``comment_avatar_url``表示评论用户的头像，如果开启将把头像存瑞``.\avatars``文件夹并命名为对应的评论ID，只支持true或false

``comment_pub_date``表示评论发布的时间，如果开启将把时间写入csv文档，格式为``YYYY-MM-DD HH:MM:SS``，只支持true或false

搞定可选配置以后，把[一言的那个项目](http://bili33.top/2020/02/11/Hitokoto-Spider/)拿过来当模板，然后把变量名称往里面套，很快就做好了一个程序。但是这个api返回的数据还是有些不一样的，其中就返回了``专辑封面的URL``、``评论用户的头像URL``，这两个URL可以让我们获取到相应的图片

另外，这个api返回的编码格式是Unicode，与一言直接返回中文不一样，我本来想做一个Unicode直接转成gbk保存的功能，但是最后只能以UTF8保存*（有能做出相应功能的大佬欢迎提交PR）*

我使用了requests直接获取图片的二进制码，然后将其写入一个文件来达到保存功能，具体实现方式如下：

```python
if(conf['images']):
    print("正在保存专辑封面……")
    image = r.get(data['images']).content
    with open('./images/' + data['comment_id'] + '.jpg', 'wb') as f:
        f.write(image)
if(conf['comment_avatar_url']):
    print("正在保存评论用户头像……")
    image = r.get(data['comment_avatar_url']).content
    with open('./avatars/' + data['comment_id'] + '.jpg', 'wb') as f:
        f.write(image)
```

这样就可以保存图片了，但是对应的文件夹不能够删除，否则会出现找不到文件的BUG~



---

### 使用手册

#### 基本功能

基本功能就有从api获取对应的信息，并将其存入csv文件，固定有的信息是``comment_id``、``comment_username``、``title``、``author``、``comment_content``这几个信息，另外可选的在config.json中进行修改

输出的csv文件目前是以UTF8的编码保存的，如果想要在Excel中查看，你需要使用vscode之类的文本编辑器更改保存的编码方式为gbk才能够在Excel中查看，否则会乱码

#### 可选配置

克隆了代码以后，在目录下有一个config.json文件，在config.json文件可以对选项进行启用

```json
{
    "path": "Netease.csv",
    "times": 100,
    "delay": 0,
    "timeout": 60,
    "song_id": false,
    "images": false,
    "album": false,
    "description": false,
    "pub_date": false,
    "comment_user_id": false,
    "comment_avatar_url": false,
    "comment_pub_date": false
}
```



``path``为文件输出的路径，文件以csv格式输出，请务必带文件后缀！

``times``为抓取次数，支持大于0的整数，直接输入数字即可！

``delay``表示抓取一次得到结果以后等待的时长，为了不给api提供商造成太大的服务器负担，我强烈建议设置此项，填入大于等于0的整数即可，单位是秒

``timeout``表示连接超时时长，支持大于5的整数

``song_id``为歌曲的id，如果开启将把歌曲id写入csv文档，只支持true或false

``images``表示是否抓取图片，这是专辑封面，将保存到``".\albums"``文件夹并命名为对应的评论ID，只支持true或false

``album``表示歌曲来源专辑，如果开启将把专辑名写入csv文件，只支持true或false

``description``表示歌曲的描述，如果开启将把描述写入csv文件，只支持true或false

``pub_date``表示歌曲发行的时间，如果开启将把时间写入csv文档，格式为``YYYY-MM-DD HH:MM:SS``，只支持true或false

``comment_user_id``表示评论的用户的id，如果开启将把id写入csv文档，只支持true或false

``comment_avatar_url``表示评论用户的头像，如果开启将把头像存瑞``.\avatars``文件夹并命名为对应的评论ID，只支持true或false

``comment_pub_date``表示评论发布的时间，如果开启将把时间写入csv文档，格式为``YYYY-MM-DD HH:MM:SS``，只支持true或false

上面这些参数根据自己的需要进行设置即可！需要注意的是如果开启了``images``和``comment_avatar_url``选项那么不能够删除``avatars``和``images``文件夹，否则会报错！！！

#### Q & A

##### Q: [Errno 2] No such file or directory

如果你在使用本程序的时候出现了以下错误：

```bash
Traceback (most recent call last):
  File "main.py", line 107, in <module>
    with open('images/' + data['comment_id'] + '.jpg', 'wb') as f:
FileNotFoundError: [Errno 2] No such file or directory: 'images/xxx.jpg' 
# 此处xxx应为某一个数字
```

A: 请你检查是否删除了``avatars``文件夹或``images``文件夹！



---

##### Q: KeyboardInterrupt

如果你在使用本程序的时候出现了以下错误：

```bash
Traceback (most recent call last):
  File "main.py", line 50, in <module>
    res = r.get("https://www.mouse123.cn/api/163/api.php",timeout=timeout)  # 调用api
  File "C:\Users\bili33\AppData\Local\Programs\Python\Python38\lib\site-packages\requests\api.py", line 75, in get
    return request('get', url, params=params, **kwargs)
  File "C:\Users\bili33\AppData\Local\Programs\Python\Python38\lib\site-packages\requests\api.py", line 60, in request
    return session.request(method=method, url=url, **kwargs)
  File "C:\Users\bili33\AppData\Local\Programs\Python\Python38\lib\site-packages\requests\sessions.py", line 533, in request
    resp = self.send(prep, **send_kwargs)
  File "C:\Users\bili33\AppData\Local\Programs\Python\Python38\lib\site-packages\requests\sessions.py", line 646, in send
    r = adapter.send(request, **kwargs)
  File "C:\Users\bili33\AppData\Local\Programs\Python\Python38\lib\site-packages\requests\adapters.py", line 439, in send
    resp = conn.urlopen(
  File "C:\Users\bili33\AppData\Local\Programs\Python\Python38\lib\site-packages\urllib3\connectionpool.py", line 665, in urlopen
    httplib_response = self._make_request(
  File "C:\Users\bili33\AppData\Local\Programs\Python\Python38\lib\site-packages\urllib3\connectionpool.py", line 376, in _make_request
    self._validate_conn(conn)
  File "C:\Users\bili33\AppData\Local\Programs\Python\Python38\lib\site-packages\urllib3\connectionpool.py", line 994, in _validate_conn
    conn.connect()
  File "C:\Users\bili33\AppData\Local\Programs\Python\Python38\lib\site-packages\urllib3\connection.py", line 300, in connect
    conn = self._new_conn()
  File "C:\Users\bili33\AppData\Local\Programs\Python\Python38\lib\site-packages\urllib3\connection.py", line 156, in _new_conn
    conn = connection.create_connection(
  File "C:\Users\bili33\AppData\Local\Programs\Python\Python38\lib\site-packages\urllib3\util\connection.py", line 74, in create_connection
    sock.connect(sa)
KeyboardInterrupt
```

A: 请你检查在程序运行的过程中是否有键盘的操作，例如<kbd>Ctrl</kbd>+<kbd>C</kbd>之类的操作！



---

##### Q: requests.exceptions.SSLError

```bash
Traceback (most recent call last):
  File "C:\ProgramData\Anaconda3\lib\site-packages\urllib3\contrib\pyopenssl.py", line 453, in wrap_socket
    cnx.do_handshake()
  File "C:\ProgramData\Anaconda3\lib\site-packages\OpenSSL\SSL.py", line 1915, in do_handshake
    self._raise_ssl_error(self._ssl, result)
  File "C:\ProgramData\Anaconda3\lib\site-packages\OpenSSL\SSL.py", line 1639, in _raise_ssl_error
    raise SysCallError(errno, errorcode.get(errno))
OpenSSL.SSL.SysCallError: (10060, 'WSAETIMEDOUT')

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "C:\ProgramData\Anaconda3\lib\site-packages\urllib3\connectionpool.py", line 600, in urlopen
    chunked=chunked)
  File "C:\ProgramData\Anaconda3\lib\site-packages\urllib3\connectionpool.py", line 343, in _make_request
    self._validate_conn(conn)
  File "C:\ProgramData\Anaconda3\lib\site-packages\urllib3\connectionpool.py", line 839, in _validate_conn
    conn.connect()
  File "C:\ProgramData\Anaconda3\lib\site-packages\urllib3\connection.py", line 344, in connect
    ssl_context=context)
  File "C:\ProgramData\Anaconda3\lib\site-packages\urllib3\util\ssl_.py", line 344, in ssl_wrap_socket
    return context.wrap_socket(sock, server_hostname=server_hostname)
  File "C:\ProgramData\Anaconda3\lib\site-packages\urllib3\contrib\pyopenssl.py", line 459, in wrap_socket
    raise ssl.SSLError('bad handshake: %r' % e)
ssl.SSLError: ("bad handshake: SysCallError(10060, 'WSAETIMEDOUT')",)

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "C:\ProgramData\Anaconda3\lib\site-packages\requests\adapters.py", line 449, in send
    timeout=timeout
  File "C:\ProgramData\Anaconda3\lib\site-packages\urllib3\connectionpool.py", line 638, in urlopen
    _stacktrace=sys.exc_info()[2])
  File "C:\ProgramData\Anaconda3\lib\site-packages\urllib3\util\retry.py", line 398, in increment
    raise MaxRetryError(_pool, url, error or ResponseError(cause))
urllib3.exceptions.MaxRetryError: HTTPSConnectionPool(host='p2.music.126.net', port=443): Max retries exceeded with url: /gxo54B2ypqq0Y6tmahBnIw==/109951163596240238.jpg (Caused by SSLError(SSLError("bad handshake: SysCallError(10060, 'WSAETIMEDOUT')")))

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "main.py", line 77, in <module>
    image = r.get(data['images']).content
  File "C:\ProgramData\Anaconda3\lib\site-packages\requests\api.py", line 75, in get
    return request('get', url, params=params, **kwargs)
  File "C:\ProgramData\Anaconda3\lib\site-packages\requests\api.py", line 60, in request
    return session.request(method=method, url=url, **kwargs)
  File "C:\ProgramData\Anaconda3\lib\site-packages\requests\sessions.py", line 533, in request
    resp = self.send(prep, **send_kwargs)
  File "C:\ProgramData\Anaconda3\lib\site-packages\requests\sessions.py", line 646, in send
    r = adapter.send(request, **kwargs)
  File "C:\ProgramData\Anaconda3\lib\site-packages\requests\adapters.py", line 514, in send
    raise SSLError(e, request=request)
requests.exceptions.SSLError: HTTPSConnectionPool(host='p2.music.126.net', port=443): Max retries exceeded with url: /gxo54B2ypqq0Y6tmahBnIw==/109951163596240238.jpg (Caused by SSLError(SSLError("bad handshake: SysCallError(10060, 'WSAETIMEDOUT')")))

```

这种情况是握手失败导致的，请检查网络连接！

---

### 欢迎提交PR！