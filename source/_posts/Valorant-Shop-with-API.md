---
title: 利用ValorantAPI开发商店查询网站
date: 2023-05-10 14:50:44
tags: [Valorant, API, Flask]
categories: Tech
cover: https://cdn.bili33.top/gh/GamerNoTitle/VSC@master/assets/img/1159991.jpg
---

{% note info %}

先上链接：[https://val.bili33.top/](https://val.bili33.top/)

附上可用于参考的文档（在别人的文档上改的，我的文档里附了源文档链接）：https://gamernotitle.notion.site/Valorant-API-baffa2069fb848a781664432564e94d0

{% endnote %}

出现这个Idea是因为最近从Go转瓦去玩了，然后每天商店会刷4个皮肤（玩过瓦的都知道每天8点蹲商店），能实现这个的有很多应用，其中不乏国产的小黑盒、游民星空；Google Play商店上面还有Vshop（因DMCA被暂时下架了），在这些应用中除了Vshop，其他的我用过的都存在一个问题：每天都要重新登陆，就会弄得，很烦。特别是我这种账号开了二次验证的玩家，还要天天跑邮箱收验证码。

然后我就去搜了一下拳头的API文档：[Riot Developer Portal (riotgames.com)](https://developer.riotgames.com/apis)，但是并没有发现相关的API（特别是瓦的API需要的APIkey的权限比较高，个人开发者拳头不给这么高的权限）

拳头的门槛太高了，搞得我被劝退了一段时间，直到我在网上搜索到了这个Notion文档（我的参考文档是从这里改的）：[新增模块：UAIOSC-valorant；新增功能：每日商店刷新检测等（使用GitHub上从Valorant客户端扒出来的API） (notion.site)](https://gamernotitle.notion.site/UAIOSC-valorant-GitHub-Valorant-API-0ac20cd4c5b744148a74c6cd0f3380dc)

既然有了别人整理出来的文档，那么就着手开始做吧！

{% note info %}

搭建网站用到的所有东西：

- 大佬的文档 [新增模块：UAIOSC-valorant；新增功能：每日商店刷新检测等（使用GitHub上从Valorant客户端扒出来的API） (notion.site)](https://ultronxr2ws.notion.site/UAIOSC-valorant-GitHub-Valorant-API-0ac20cd4c5b744148a74c6cd0f3380dc)
- Valorant-API [Valorant-API](https://valorant-api.com/)
- Valorant-api-docs [techchrism/valorant-api-docs: Automatically generated documentation for Valorant API endpoints the client uses internally (github.com)](https://github.com/techchrism/valorant-api-docs)
- ChatGPT服务
	- https://chat.openai.com/（API没过期前用的它）
	- [ChatGPT - Poe](https://poe.com/ChatGPT)（API过期后用的它）
- Zeabur PaaS服务平台（超级推荐！） [Zeabur - Deploy your service with one click](https://zeabur.com/zh-CN)
- Github Codespaces [Codespaces (github.com)](https://github.com/codespaces)
- Soft UI Design System [creativetimofficial/soft-ui-design-system: Soft UI Design System - Open Source Bootstrap 5 design system (github.com)](https://github.com/creativetimofficial/soft-ui-design-system)

{% endnote %}

> 我一人就是一支军队哒！！！！！

## 网站框架

因为个人用Python用的比较多（说白了就是其他的不熟，真不熟吧），所以第一反应是用Flask作为网站的引擎去开发。但是在做后端之前，得先把前端的框架大概搭建一下。为了把网站做的好看一点，我就去找模板去了。

之前做哔哩CDN的时候，用的是[Creative TIM](https://github.com/creativetimofficial)的Argon设计语言（[creativetimofficial/argon-design-system](https://github.com/creativetimofficial/argon-design-system)），这次我本来想在[TemplateMonster](https://www.templatemonster.com/)上面找的，但是这网站上面的模板那叫一个鱼龙混杂呀，所以我还是找回老东家Creative TIM的设计语言，自己去搭建框架，然后看到[Soft UI](https://github.com/creativetimofficial/soft-ui-design-system)这一套就挺不错的（毕竟总不可能网站都用一个风格嘛），就拿来用了

在大概花了三个小时把网站的前端框架给弄好（第一版只做了[首页（登录页）](https://github.com/GamerNoTitle/VSC/blob/dac43c236909c15507c0a3fce8e43f8e0175d43d/templates/index.html)、[EULA](https://github.com/GamerNoTitle/VSC/blob/dac43c236909c15507c0a3fce8e43f8e0175d43d/templates/EULA.html)和[市场页面](https://github.com/GamerNoTitle/VSC/blob/dac43c236909c15507c0a3fce8e43f8e0175d43d/templates/myMarket.html)），然后当天晚上就开始做后端的逻辑

## 登录部分

登录部分我最开始就想的是用轮子（倒不如说整个网站能用轮子的都用轮子），在Ultronxr大佬的文档中提到了三个登录库（最下面那个是大佬自己改了的，第一个是大佬用Java写的，但是404警告）：

>- https://github.com/Ultronxr/ValorantApp/blob/1e4d0e314cc5d7200e4da4a13e12a6552df3a414/src/main/java/cn/ultronxr/valorant/service/impl/RSOServiceImpl.java#L37
>- [floxay/python-riot-auth: A Python 3 library to get various Riot tokens and get around Cloudflare's filter during auth. (github.com)](https://github.com/floxay/python-riot-auth)
>- [Ultronxr/python-riot-auth: A Python 3 library to get various Riot tokens and get around Cloudflare's filter during auth. (github.com)](https://github.com/Ultronxr/python-riot-auth)

我试了一下底下两个（毕竟能不用Java就不用Java嘛），然后发现很尴尬的事情：登录不上。不知道是不是我的打开方式不对，但是我试了半个小时都是不行，那没办法啦，只能另寻他路

我用关键词`Riot Auth`在[交友平台](https://github.com)上面进行搜索，结果找到了这个仓库：[ohlunaaa/Riot-auth (github.com)](https://github.com/ohlunaaa/Riot-auth)

我先Clone了下来，然后尝试用里面的`example.py`进行登录，不管是开了2FA（二步验证，下同）还是没开的都能够登上，并且返回`access_token`和`entitlement_token`，然后我就用它了（这里登录用的我朋友的号，不是我的）

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/WindowsTerminal-20230510-160702.png)

着手把这个轮子改一改，进行亿点点改动，首先登录操作改成一个函数，然后把二步验证也打包成函数，这样输入验证码的时候就调用这个函数就行了，改着改着就给我改成了现在的样子：[VSC/RiotLogin.py at master · GamerNoTitle/VSC · GitHub](https://github.com/GamerNoTitle/VSC/blob/master/utils/RiotLogin.py)

然后在后端，接收前端传来的form数据，构建了一个登录函数

```python
@app.route('/api/login', methods=['POST'])
def RiotLogin():
    # print(request.form)
    username = request.form.get('Username')
    password = request.form.get('Password')
    # APServer = request.form.get('APServer')
    # EUServer = request.form.get('EUServer')
    # NAServer = request.form.get('NAServer')
    # KRServer = request.form.get('KRServer')
    checked_rule = request.form.get('CheckedRule')
    checked_eula = request.form.get('CheckedEULA')
    if username == '' or password == '' or not checked_eula or not checked_rule:
        return render_template('index.html', infoerror=True)
    else:
        CREDS = username, password
        user = Auth(username, password)
        if user.auth:
            response = make_response(render_template('myMarket.html'))
            response.set_cookie('access_token', user.access_token)
            response.set_cookie('entitlement_token', user.entitlement)
            response.set_cookie('region', user.Region)
            response.set_cookie('username', user.Name)
            response.set_cookie('tag', user.Tag)
            response.set_cookie('logged', '1')
            response.status_code = 200
        else:
            response = make_response(render_template('index.html', loginerror=True))
        return response
```

你可以发现这里面是有服务器选择的选项接收的，只不过被我注释掉了，其实我一开始以为登录的API需要用户根据自己账号所在地区选择（有的人打美服那就得选`NA`，同理，打欧服就得选`EU`，不过国区大部分人是港区、台区、缅甸区啥的，这都属于`AP`的范围），后来发现在登录的时候会返回地区（见上图），所以就给我注释掉了，后面更是删掉了。

至于二步验证，那是后面干的事情，让我们先进入商店获取阶段

## 获取商店

获取商店是一个很麻烦的事情，特别是要对武器啥的进行解析，让我们从获取开始

首先根据Ultronxr大佬的文档，有这样的一个API的端点表格（下图）

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/msedge-20230510-161958.png)

表格里面写的很详细，我们用到的API为这个（以亚太服为例） -> `https://pd.ap.a.pvp.netstore/v2/storefront/`

通过初始化一个`player`对象，来获取玩家的每日商店，并保存到自身的`shop`变量中，以供后续使用（[该版本文件](https://github.com/GamerNoTitle/VSC/blob/49485a5763fd194624e872be6715ba50772e490f/utils/GetPlayer.py)）

```python
class player:
    def __init__(self, access_token: str, entitlement_token: str, region: str, user_id: str):
        self.access_token = access_token
        self.entitlement = entitlement_token
        self.region = region
        self.__header = {
            'Authorization': f'Bearer {self.access_token}',
            'X-Riot-Entitlements-JWT': self.entitlement,
            'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'X-Riot-ClientVersion': 'release-06.07-shipping-16-866145', #requests.get('https://valorant-api.com/v1/version', timeout=30).json()['data']['riotClientVersion'],
            'Content-Type': 'application/json'
        }
        if region == 'ap':
            server = apServer
        elif region == 'eu':
            server = euServer
        elif region == 'na':
            server = naServer
        else:
            server = krServer
        response = requests.get(f'{server}{store}{user_id}', headers=self.__header, timeout=30)
        self.shop = response.json()
        if response.status_code == 400 or response.status_code == 404: self.auth = False
        else: self.auth = True
```

从这个API我们能够获取到很详细的商店数据（见文档，这里不贴了，太长了），其中对我们有用的是`SkinsPanelLayout`和`BonusStore`这两个东西，分别对应了每日商店（每天4个皮肤）和黑市（赛季结束前20天的商店，里面有6个皮肤）

根据获取到的字典，我们可以提取到皮肤的UUID，例如文档中给的示例`紫金狂潮 暴徒`的皮肤ID是`b9ee2457-481c-6776-3f5b-0ca8e8f90c89`，当我使用这个UUID去`https://valorant-api.com/`查询的时候，根据文档给出的格式`https://valorant-api.com/v1/weapons/b9ee2457-481c-6776-3f5b-0ca8e8f90c89`访问后发现提示（在我写文档的时候我发现是我当时搞错了，因为这个错误我还加了一层缓存，下面会提到，写完文档去改）

```json
{
    "status": 404,
    "error": "the requested uuid was not found"
}
```

然后我就直接访问`https://valorant-api.com/v1/weapons/skins`，把里面的所有内容扒了下来，做了一个缓存，里面写了所有皮肤名字对应的皮肤UUID（见[这里](https://github.com/GamerNoTitle/VSC/tree/master/assets/dict)）

通过自己做的这个缓存作为索引，去`Valorant-API`网站上调用到这个皮肤的所有信息，然后进行解析，得到这个皮肤的所有等级和炫彩数据，构成一个对象（下面代码是最初版本，[该版本文件](https://github.com/GamerNoTitle/VSC/blob/49485a5763fd194624e872be6715ba50772e490f/utils/Weapon.py)）

```python
class weapon:
    def __init__(self, uuid: str, cost: int):
        self.uuid = uuid
        self.cost = cost
        self.weapon_id = None
        with open('assets/dict/zh_CN.json') as f:
            data = json.loads(f.read())
            f.close()
        self.name = requests.get(f'https://valorant-api.com/v1/weapons/skinlevels/{self.uuid}?language=zh-CN', timeout=30).json()['data']['displayName']
        self.uid = data[self.name]  # the real series skin uuid for the weapon, not a level uuid
        self.data = requests.get(f'https://valorant-api.com/v1/weapons/skins/{self.uid}?language=zh-CN', timeout=30).json()['data']
        self.level = self.data['levels']    # Skin Levels
        self.chroma = self.data['chromas']  # Skin Chromas
        self.base_img = self.data['displayIcon']
```

然后直接在主程序里面创建`weapon`对象的变量，直接调用对象中的数据（[该版本文件](https://github.com/GamerNoTitle/VSC/blob/49485a5763fd194624e872be6715ba50772e490f/app.py)）

```python
@app.route('/market', methods=['GET'])
def market():
    cookie = request.cookies
    access_token = cookie.get('access_token')
    entitlement = cookie.get('entitlement_token')
    region = cookie.get('region')
    userid = cookie.get('user_id')
    user = player(access_token, entitlement, region, userid)
    if user.auth:
        shop = user.shop['SkinsPanelLayout']    # Flite the daily skin
        weapon0 = weapon(shop['SingleItemStoreOffers'][0]['OfferID'], shop['SingleItemStoreOffers'][0]["Cost"]["85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741"])
        weapon1 = weapon(shop['SingleItemStoreOffers'][1]['OfferID'], shop['SingleItemStoreOffers'][1]["Cost"]["85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741"])
        weapon2 = weapon(shop['SingleItemStoreOffers'][2]['OfferID'], shop['SingleItemStoreOffers'][2]["Cost"]["85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741"])
        weapon3 = weapon(shop['SingleItemStoreOffers'][3]['OfferID'], shop['SingleItemStoreOffers'][3]["Cost"]["85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741"])
        return render_template('myMarket.html', market=True, weapon0={"name": weapon0.name, "cost": weapon0.cost, "img": weapon0.base_img}, 
                               weapon1={"name": weapon1.name, "cost": weapon1.cost, "img": weapon1.base_img}, 
                               weapon2={"name": weapon2.name, "cost": weapon2.cost, "img": weapon2.base_img}, 
                               weapon3={"name": weapon3.name, "cost": weapon3.cost, "img": weapon3.base_img})
    else:
        response = make_response(redirect('/', 302))
        for cookie in request.cookies:
            response.delete_cookie(cookie)
        return response
```

接着再把所有数据返回给jinja2进行渲染，把东西填入表格，然后我就写了好大一堆`render_template`

因为刚好做这个项目的时候夜市是开着的，所以我也把夜市部分给做完了

```python
return render_template('myMarket.html', market=True, weapon0={"name": weapon0.name, "cost": weapon0.cost, "img": weapon0.base_img}, 
	weapon1={"name": weapon1.name, "cost": weapon1.cost, "img": weapon1.base_img}, 
	weapon2={"name": weapon2.name, "cost": weapon2.cost, "img": weapon2.base_img}, 
	weapon3={"name": weapon3.name, "cost": weapon3.cost, "img": weapon3.base_img})
```

## 更好的图片预览

在弄完电脑端的页面后，我发现图片太小了，而且帮我测试的同志（[@Vanilluv](https://github.com/Vanilluv)）给我提出了这个建议

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/QQ-20230510-164104.png)

我估计他说的是这种（图示为[Pixiv的一个浏览器插件 PixivBatchDownloader](https://github.com/xuejianxianzun/PixivBatchDownloader)）

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/msedge-20230510-164249.png)

但是但是，我实在想不出什么库可以达到这个效果，我就想到我的Blog的主题[hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly)用的fancybox，可以做到点击查看大图的效果，所以我就想做成这种

这个时候，我就开始求助ChatGPT了（因为懒得写html了，写起来真的很烦）

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/msedge-20230510-164936.png)

直接按照它给我的做法，往里面写，不一会就做好了√

## 二步验证

上面说到，一开始的登录部分是不支持二步验证的，但是轮子本身是支持二步验证的。我自己在测试的过程中，一开始如果是点击登录后，然后反弹回去登录页面加多一个验证码框框，让用户输入验证码后再点登陆，发现这样会导致会话终结，也就是说这个时候在拳头那里已经算是一个新的会话了。于是我又去问ChatGPT

> Q: 我想在flask服务器中保存requests的session，该怎么做
>
> A: 在 Flask 服务器中，您可以使用 Flask-Session 扩展来保存 requests 的 session。Flask-Session 提供了一个简单的方法来将 Flask 应用程序连接到服务器的会话存储。

诶，这刚好给了我方向，而且它也给了我代码，我把它给我的代码放进去，小改一下登录部分，不一会就做好了，但是下面坑就来了（等会说，记住GPT给我的建议，下面要考）

## 手机端页面适配

我一开始的想法是说把表格弄成竖直的样式，就是一个表格，从上到下是`名称`、`图片`、`价格`这样的顺序，这样想了以后，发现表头是不必要的东西，你想嘛，手机的宽度就那么小，再弄个表头在左边不是显得很多余嘛

然后我又去求助《万能的》GPT，GPT跟我说Soft UI这一套是用Bootstrap5制成的，里面有card这一class（就是我们平常见到的卡片式），然后我就直接把我的代码给GPT，它给我生成了card的代码，直接贴进去，SO EASY~

## 第一次踩坑：flask新版本

刚好做手机端适配的那一天我跟我爸出去了，所以我是抱着我的苏菲在外面写的代码，好不容易在codespaces里面调试完成了，`git push`一下，结果就直接BOOM了，提示如下

```
127.0.0.1 - - [10/May/2023 16:55:53] "GET / HTTP/1.1" 500 -
Error on request:
Traceback (most recent call last):
  File "C:\Users\GamerNoTitle\AppData\Local\Programs\Python\Python310\lib\site-packages\flask\app.py", line 2189, in wsgi_app
    ctx.push()
  File "C:\Users\GamerNoTitle\AppData\Local\Programs\Python\Python310\lib\site-packages\flask\ctx.py", line 377, in push

    self.session = session_interface.open_session(self.app, self.request)
  File "C:\Users\GamerNoTitle\AppData\Local\Programs\Python\Python310\lib\site-packages\flask_session\sessions.py", line 329, in open_session
    sid = request.cookies.get(app.session_cookie_name)
AttributeError: 'Flask' object has no attribute 'session_cookie_name'
```

这一个提示直接给我干懵了，因为我在codespaces里面是调试成功的，就没遇到500的问题，结果部署就出了问题，最最最关键的事情是，我当时没有分`master`和`dev`分支，也没有分`production`和`dev`分支（指部署上），然后直接让我的服务炸裂，不管谁访问都是500。不过当时我也没有发出去，用的人也就我群里的老朋友们，然后我就在群里发了条消息

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/qTRMpDZVlw.png)

这个时候刚好准备回家了，我就收拾了一下东西，先回家去

回到家里，我做的第一件事情就是回滚版本（就是把手机端页面适配先去掉），结果还是给我报一样的错误

接着我去问了ChatGPT（这个时候我就要划掉~~万能~~这两个字了）

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/msedge-20230510-170648.png)

我就很懵逼，我明明是配置了`SECRET_KEY`的，怎么还出现这种问题呢，我以为是PaaS平台（[Zeabur](https://zeabur.com/zh-CN)）没有读入我的环境变量，我当时是这么写的

```python
app.config['SECRET_KEY'] = 'A7C55959-3577-5F44-44B6-11540853E272' if not os.environ.get('SECRET_KEY') else os.environ.get('SECRET_KEY')
```

这里很明显就是说没有读取到`SECRET_KEY`也有一个缺省值，这样写了以后还是死活打不开，我甚至去问了Zeabur的管理员（真的要给他点赞他真的每次都在解答群友的问题）

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/Telegram-20230510-171244.png)

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/Telegram-20230510-171315.png)

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/Telegram-20230510-171321.png)

就是说我写法是没问题的，而且我后来开了个简单的应用试了一下，代码是这样的

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/photo_2023-05-02_22-35-28.jpg)

实测这个变量`env`确实进去了，不过端口没有进去是因为它用了`Gunicorn`开服务，所以端口不是在这里设置的

所以说，不是我代码的问题，应该是其他的原因

我重新开了一个Codespaces（为了重新开一个环境），然后按照我之前的配置方法去配置，诶，也出现了这个问题

这更加印证了代码不是这个问题的锅，应该是其他的原因

后来我去翻`flask`的文档和`flask-session`的文档，结果在flask的文档里面找到了这个更新 -> [Update 2.3.0](https://flask.palletsprojects.com/en/2.3.x/changes/#version-2-3-0)

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/msedge-20230510-172149.png)

注意我选定的位置，没错flask `2.3.0`更新把`session_cookie_name`给删掉了，且`Flask-Session`没有对此进行适配，导致了这个错误

于是我赶紧在`requirements.txt`里面固定了flask的版本

```
flask==2.2.4
```

重新部署后发现没问题了，这才安心了

从此刻开始，我开了Dev分支，在Zeabur也设置了Dev环境，用来开发用（省得又bug了导致服务中断）

## 中场休息

嗯没错，崩铁开服了，于是玩了一天的崩铁（开服冲级嘛），但我没想到8点就开服了，我是8点多准备开鼠标连点器抢UID的，因为当天九点半我要学车，月底要考科目二，结果本来想定位那个开服提示的确定键的，自己先点击了一下，然后进去了（捂脸），就变成UID前排了（100头，UID100201759，图为2023/5/10截的，崩铁我是手柄玩家）

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/StarRail-20230510-173008.jpg)

## 更换皮肤的显示语言

这个建议是[@Vanilluv](https://github.com/Vanilluv)提出的，因为这个网站毕竟是看国际服的，又不是看国服的，国际服最多是繁中而不是简中，所以推荐更换为繁中。这个也简单，更改了一下请求API的参数和访问缓存的语言就搞定了

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/msedge-20230510-172616.png)

## 自动保活

就是字面意思啦，上面也提到了拳头给的`access_token`和`entitlement_token`只有一小时的寿命，如果不进行重新获取的话，就会需要重新登陆

但其实这一节做了我很久，因为在我的登录模块的轮子里面有这样的内容

```python
data2 = {"language": "en_US","password": self.password,"remember": "true","type": "auth","username": self.username,}
```

这是登录的POST请求体，我天真地以为直接把`remember`设置为`true`就可以了，但是经过两天的测试发现这东西基本就是摆设……

本来我是不报什么希望了，然后在我翻Vshop（因为Vshop有自动更新token的机制，所以去翻了一下看看能不能找到什么线索）的时候，找到了它的官网，在它的[Credit](https://vshop.one/credits)页面，有一项引起了我的注意

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/msedge-20230510-173521.png)

因为我一开始在Github上没找到什么好的文档，找到的API就是他这里面写的这个`valorant-api.com`，而且我也用上了，但是这个库我是真的没有看见过，回到家我就直接查看这个库，果不其然里面有我们需要的东西

在文档里面有一项叫做`Cookie Reauth`，就是利用Cookie进行重新认证

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/msedge-20230510-173725.png)

这里的cookie按照我的理解是登陆时用的cookie，我先用浏览器进行访问，直接GET这个链接

> [https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1](https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1)

然后发现它会重定向到一个404页面（这404真好看哪天我要给他扒下来），**但是但是**，网址栏里面有我们需要的东西

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/kpLlOqVTD4.png)

完整链接如下（账号已登出，现在是无效的）

> https://playvalorant.com/opt_in#access_token=eyJraWQiOiJzMSIsImFsZyI6IlJTMjU2In0.eyJwcCI6eyJjIjoiYXMifSwic3ViIjoiZjYyMTYyNjUtN2U3NS01NDRjLTgyMGYtZWI5ZGY0MjEyM2UyIiwic2NwIjpbIm9wZW5pZCLCJjbG0iOlsib3BlbmlkIl0sImRhdCI6eyJjIjoidXcxIiwibGlkIjoiV3BvUUhWRW1yY1hmVFJnMVU3MnpwZyJ9LCJpc3MiOiJodHRwczpcL1wvYXV0aC5yaW90Z2FtZXMuY29tIiwiZXhwIjoxNjgzNzE1MTg4LCJpYXQiOjE2ODM3MTE1ODgsImp0aSI6ImRJNzB4d01JMXE4IiwiY2lkIjoicGxheS12YWxvcmFudC13ZWItcHJvZCJ9.ZffyYoYQlaWAOyr3rBSjtqHe4XBa8zlJU2lRvZGA-wgqU5PLR_wrWvd-6kObVwkJzfen7rpcSSQG9CFbZqflBYVtowadeufGarMM9NgRR6Pkyyfuo845M1NJp67O4EkpP0U-hRDrltghETxJLwGYFQntNVM1WWtW19iIZTQeWKk&scope=openid&iss=https%3A%2F%2Fauth.riotgames.com&id_token=eyJraWQiOiJzMSIsInR56ImlkX3Rva2VuK2p3dCIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiZGd3TzM2cVpNdFpsa1ctWm9xdGpZZyIsInN1YiI6ImY2MjE2MjY1LTdlNzUtNTQ0Yy04MjBmLWViOWRmNDIxMjNlMiIsImF1ZCI6InBsYXktdmFsb3JhbnQtd2ViLXByb2QiLCJhY3IiOiIwIiwiYW1yIjpbInBhc3N3b3JkIiwibWZhIiwiY29va2llIl0sImlzcyI6Imh0dHBzOlwvXC9hdXRoLnJpb3RnYW1lcy5jb20iLCJleHAiOjE2ODM3OTc5ODgsImxvY2FsZSI6InpoX01ZIiwiaWF0IjoxNjgzNzExNTg4LCJub25jZSI6IjEifQ.AOQt3i6xEZyQlNKXPT1ds4Lt8sVsEXR3dS7DJ9S8xbNSR1Pd4YON8nDAmV4F_XSH5t9VmBzv54-HLzJvRhJkJAgkOgJQAcHyetgcf0t6MealgfH2HsSnt8w9IlEgJXK6DVwGUA52inZtlq6xQUtfqigNlkXcRFtQQwnt_D-x_TU&token_type=Bearer&session_state=ps8t9j9WtxNYxhSuRy1SHt3aiUmROifqVwiC_zG5k.Nszsu7v9Q35PH87EzTqh8A&expires_in=3600

我们进行拆分，可以分为一下这几个东西

- `access_token`：认证用的token
- scope=openid
- iss=https%3A%2F%2Fauth.riotgames.com
- `id_token`：不知道是个啥token，但我们不用
- token_type=Bearer
- `session_state`：应该是session的标识符
- expires_in=3600（过期时间3600秒，这也就是1小时寿命的来源）

现在是有了`access_token`，我们还需要获得`entitlement_token`才能凑齐~~七颗龙珠~~(bushi)

在上面提到的那个文档中，还有这样的一个项目

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/msedge-20230510-174754.png)

这个给我们展示了如何获取`entitlement_token`，这里headers是需要把认证用的token填进去的，这就是为什么要先获取`access_token`，访问后会获得文档给我们展示的json，从中提取`entitlement_token`就行了

那么最后的问题来了，如果你是用Python直接访问拳头的链接，会被Cloudflare给挡住（因为你即使有Cookie，但也没有会话Session的存在），就像我调试的这样

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/WindowsTerminal-20230510-175459.png)

所以非常有必要把之前的session给保留，然后我就把之前登录用的session存入用户与我的服务之间的Session里面了，方便调用

然后推入Dev分支，Dev环境，调试了几天（那几天还是51放假），没问题后并入了`master`分支

## 皮肤预览

做这个的原因是，既然Vshop有这个功能，那我肯定也要嘛（别人有的我们也得有，毕竟本来想法就是对标Vshop的）

因为我对JavaScript不熟，所以一开始是打算点击按钮以后打开一个新的页面，里面只有一个视频的，结果被[@Vanilluv](https://github.com/Vanilluv)狠狠地吐槽了说不好看

最后还是选择了弹窗，一开始我直接把Soft UI的实例弹窗加进去，发现它不弹弹窗，就，什么也没有

后来我又找GPT去了，他告诉我可能是没有引入js，于是我就去cdnjs里面，找了bootstrap5的js引入后解决了问题，但是新的坑又来了

## 第二次踩坑：ID选择器变量

当我做好了以后，我发现一个问题就是，有的皮肤等级/炫彩点击就能弹出框框，有的就弹不出来，然后给我控制台报错

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/css-selector.png)

我一开始去问GPT，他说我可能是不存在id为这个东西的元素，我就奇了怪了，我说我命名有这东西，而且在F12控制台里面是能够找到对应的元素的，咋就不行

然后我改成在`class`里面写uuid，选择器改成了`.uuid`这样的格式，也是跟我说不行，我就非常纳闷

既然GPT给不了我答案，我就开始搜索，搜索着发现有一篇选择器说明的文章（找不到了，要不然我就附上链接了），里面写了选择器的格式规定

```
允许的字符：
- 0-9 数字
- A-Z 大写字母
- a-z 小写字母
- 中横线（-）
- 下划线（_）

特别规定：不能以数字开头
```

我再反过来看，我的这个不合法的选择器正好是以数字开头的，于是我采取了一个办法就是，在武器等级的前面加上`weapon-`头，在炫彩的前面加上`chorma-`头，这样才能够正常弹出我需要的框框

## 多语言

自大部分功能已经做完后，我就开始考虑多语言的事情了，因为有可能不只是我们在用，老外说不定看到了也想试一试（想Peach了），所以就开始做多语言了

因为json写起来很麻烦，而且不能够写注释，于是我用了yaml文档作为我的翻译索引文件的格式

我先按照我的网站，哪些地方的字是可以写其他语言的，大概构建了一下我的yaml文档格式

```yaml
global:
  title:
    dailyshop: 每日商店
    nightmarket: 折扣夜市
    shopdefault: 我的商店
  description:
    line1: 瓦罗兰特（无畏契约）商店查看，让你不用登陆游戏也能够查看每日商店（仅支持国际服）
    line2: 所有的登录名和密码服务器均不进行存取，仅用于登录
  nav:
    title: 瓦罗兰特商店查看
  button:
    dailyshop: 每日商店
    nightmarket: 折扣夜市
    account: 账户管理
    authinfo: 认证信息
    sponsor: 恰饭链接
    logout: 退出登录

login:
  front:
    title: 登陆你的Riot账号
    description:
      line1: 服务器不对账号的登录名和密码进行存取
      line2: 支持带有二步验证的账号，欢迎注重安全的各位使用！
  form:
    username:
      title: 用户名
      placeholder: 请输入你的用户名
    password:
      title: 密码
      placeholder: 请输入密码
    checkbox:
      remember: 保持登录（减少登录次数）
      nostorage: 我已明白网站仅会将我的登录名和密码用于登录我的账号
      eula: 我同意<a href="/EULA" class="text-dark"><u>最终用户许可协议</u></a>
  button:
    login: 登录
  alert:
    nocheck: 请先正确输入用户名和密码，并勾选下面两项后再点登陆！
    loginerror: 登录出错，请检查账号密码，然后重试！

mfa:
  front:
    title: 二步验证
    description:
      line1: 请前往你的绑定邮箱获取验证码后，在这里填入
      line2: 服务器不对账号的登录名和密码进行存取
  form:
    code:
      title: 二步验证码
      placeholder: 请输入验证码
  button:
    confirm: 确认

market:
  welcome:
    # Welcome message format:
    # <opening>{{player.name}}#{{player.tag}}
    # <credit> {{player.vp}} VP & {{player.rp}} RP
    opening: 欢迎回来
    credit: 你现在持有
  title: 今日商店 | Daily Shop
  table:
    skinname: 皮肤名称
    skinimg: 皮肤图片
    skincost: 皮肤售价
    skinpreview: 皮肤预览
  modal:
    videonotavaliable: 当前浏览器无法预览视频
  button:
    close: 关闭

nightmarket:
  welcome:
    # Welcome message format:
    # <opening>{{player.name}}#{{player.tag}}
    # <credit> {{player.vp}} VP & {{player.rp}} RP
    opening: 欢迎回来
    credit: 你现在持有
  notavaliable: 夜市还没有开放哦，先去看看每日商店吧！
  title: 夜市 | Night Market
  table:
    skinname: 皮肤名称
    skinimg: 皮肤图片
    skincost: 皮肤售价
    skinpreview: 皮肤预览
  modal:
    videonotavaliable: 当前浏览器无法预览视频
  button:
    close: 关闭

error:
  error500:
    tip: 500服务器错误
    error: 肥肠抱歉，服务器发生了点错误
    detail:
      front: 服务器发生了以下错误：
      solve: 你可以尝试点击下方的“重置网站数据”按钮来解决这个问题。<br>如果你已经点击了下面的按钮，但仍然出现了这个问题，请尝试清除浏览器的cookie来重置会话<br>如果上面这两种方法你都已经尝试过了，那么请带着此错误信息联系开发者！
    button:
      reset: 重置网站数据
  error404:
    tip: 404未找到
    error: 你来到了一个无人所知的地方
    button:
      home: 返回首页

```

然后就开始在模板里面修改，因为yaml的读取是用这样的代码

```python 
import yaml

lang = yaml.load(var, Loader=yaml.FullLoader)
```

我一开始以为这个`var`可以是文件，结果发现读出来的`lang`的变量类型是`str`而不是`dict`，才发现应该读入文件

但是，每次加载页面的时候都要读入文件会导致读写吞吐量变大，而且万一前一个进程还没有释放文件，下一个进程又开始读取了就会出bug（特别是访问量很多的情况下），为了避免这个情况我就采用了linux自带的命令`cat`来完成这个事情

最后改成了这样子

```python
lang=yaml.load(os.popen(f'cat lang/{str(request.accept_languages.best_match(app.config["BABEL_LANGUAGES"]))}.yml').read(), Loader=yaml.FullLoader)
```

虽然读写可能没有什么改善，但是至少不会锁文件，而且也不会爆内存（指读取后不释放变量）

然后写了几个语言的配置文件，分别是英语`en`、简中`zh-CN`、繁中`zh-TW`、日语（机翻）`ja-JP`，然后写了对应的yml文件放入`lang`文件夹

在上面我们做了皮肤预览的按钮，但是有些皮肤的等级会带有特殊的说明，例如

- 黑市 暴徒 等級2：此造型設計會因你是攻擊方或守備方而變化
- 靈爭鬪魂 幻象 等級2：每次擊殺敵人時，都會播放專屬視覺特效及音效
- 781-A協定 幻象 等級5：在地化語音可能會因地區而異
- 2021冠軍賽 暴徒 等級4（在對戰中取得最多擊殺時才會顯示光環）

这种写在武器等级后面的说明型的文字，如果写进按钮里面会非常的长。本来不做多语言的话就可以直接简单粗暴replace这些字符就行了，但是做了多语言就不可以这么做了

还有就是，在`valorant-api`返回的数据中，每个等级升级的内容都是用类似`metadata`的字符去说明的（下面是没做多语言之前直接写死的转换表）

```python
levelup_info = {
    "EEquippableSkinLevelItem::VFX": '视觉效果',
    "EEquippableSkinLevelItem::Animation": '视觉动画',
    "EEquippableSkinLevelItem::Finisher": '终结特效',
    "EEquippableSkinLevelItem::Voiceover": "本地化语音",
    "EEquippableSkinLevelItem::SoundEffects": "音效",
    "EEquippableSkinLevelItem::FishAnimation": "鱼缸动画",
    "EEquippableSkinLevelItem::KillBanner": "击杀旗帜",
    "EEquippableSkinLevelItem::TopFrag": "击杀光环",
    "EEquippableSkinLevelItem::KillCounter": "击杀计数器",
    "EEquippableSkinLevelItem::InspectAndKill": "击杀特效",
    "EEquippableSkinLevelItem::KillEffect": "击杀特效&音效",
    "EEquippableSkinLevelItem::AttackerDefenderSwap": "随阵营变色"
}
```

多语言下，我直接把他们归到了`metadata`字典里面去，写在对应语言的yaml文件中（下面为简中，但武器显示仍然为繁中，所以置换表为繁中，而转换表为简中）

```yaml
metadata:
  level:
    # This means what word "level" shoule be like in the language, you can find it in every upgradable skin
    # example: https://valorant-api.com/v1/weapons/skinlevels/4c8a49bd-4118-9523-6612-4a924651b4a9
    level: 等級
    EEquippableSkinLevelItem::VFX: 视觉效果
    EEquippableSkinLevelItem::Animation: 视觉动画
    EEquippableSkinLevelItem::Finisher: 终结特效
    EEquippableSkinLevelItem::SoundEffects: 音效
    # For Protocol 781-A Level 5 https://valorant-api.com/v1/weapons/skinlevels/a117218e-4f0e-0cca-7758-7ea30b08ac05
    EEquippableSkinLevelItem::Voiceover: 本地化语音
    # For Neptune Level 2 https://valorant-api.com/v1/weapons/skinlevels/24e39414-4a8e-e800-1242-08bd94b5e3c4
    EEquippableSkinLevelItem::FishAnimation: 鱼缸动画
    # For Neptune Level 3 https://valorant-api.com/v1/weapons/skinlevels/7b2826b6-4771-7529-b656-b89b9c1d86b6
    EEquippableSkinLevelItem::KillBanner: 击杀旗帜
    # For Champions Set Level 4 https://valorant-api.com/v1/weapons/skinlevels/4c8a49bd-4118-9523-6612-4a924651b4a9
    EEquippableSkinLevelItem::TopFrag: 击杀光环
    # For RGX 11z Pro Set Level 5 https://valorant-api.com/v1/weapons/skinlevels/796cf1d2-4893-fee7-3401-beb277c726c8
    EEquippableSkinLevelItem::KillCounter: 击杀计数器
    # For Champions Set Level 2 https://valorant-api.com/v1/weapons/skinlevels/f96ed262-4280-2363-2542-38b5620bfbb5
    EEquippableSkinLevelItem::InspectAndKill: 击杀特效
    # For some skins https://valorant-api.com/v1/weapons/skinlevels/bf4489ad-4739-555c-2511-7cbcc503566c
    EEquippableSkinLevelItem::KillEffect: 击杀特效&音效
    # For Black.Market Set Level 2 https://valorant-api.com/v1/weapons/skinlevels/65c7df10-4a5e-7eaa-dc45-d0a46f147b18
    EEquippableSkinLevelItem::AttackerDefenderSwap: 随阵营变色
  description:
    # All these sources to replace can be found at the links above
    # You need to add ?language=<your lang> to check your language
    # Available language: ar-AE / de-DE / en-US / es-ES / es-MX / fr-FR / id-ID / it-IT / ja-JP / ko-KR / pl-PL / pt-BR / ru-RU / th-TH / tr-TR / vi-VN / zh-CN / zh-TW
    # For China mainland players, all the names of the guns are using zh-TW, cause this program does not support Valorant from Tencent.
    # example: https://valorant-api.com/v1/weapons/skinlevels/a117218e-4f0e-0cca-7758-7ea30b08ac05?language=zh-CN
    Voiceover: 在地化語音可能會因地區而異
    KillEffect: 每次擊殺敵人時，都會播放專屬視覺特效及音效
    AttackerDefenderSwap: 此造型設計會因你是攻擊方或守備方而變化
    TopFrag: （在對戰中取得最多擊殺時才會顯示光環）
```

然后在模板文件的需要修改语言的对应位置，写好变量，就达成目的啦！

## Redis存储session

每次部署的时候，因为我们使用的是`filesystem`作为session的存储对象，所以在PaaS平台里面，部署会清除之前的数据，导致用户需要重新登陆。因为`Flask-Session`是支持`Redis`作为存储的，而且我自己也用的比较多，所以我就做了一个可以使用Redis存储的功能

直接让用户把配置写在环境变量里面（README里面有写）

```shell
$ export SESSION_TYPE=filesystem|redis  # If you want to use redis u need to set it as redis, and configure the following items
$ export REDIS_URL=<Your Redis URL>
# If your redis url cannot be parsed
$ export REDIS_HOST=<Your Redis Host>
$ export REDIS_PORT=<Your Redis Port>
$ export REDIS_PASSWORD=<Your Redis Password>
# Optional
$ export REDIS_SSL=True # If your redis does not support this, please DO NOT configure it, or this will make your application timeout.
```

这样就可以在`filesystem`和`redis`中进行选择，我用了[upstash]()的免费Redis存储，一个月可以用1W条命令，但是但是，在我测试的过程中我发现，就我们群里的几个人用的情况下，一天都能去到300条命令，多的时候甚至去到了500，这算下来一个月根本不够用啊

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/msedge-20230510-182115.png)

于是我投向了Zeabur的Redis存储应用

## 第三次踩坑：Redis的SSL连接

我在Zeabur里面新建了一个Redis数据库后，就准备把数据库连接改过去了，反正原来的Redis里面没什么数据，尽早更换也不用迁移数据，让群友重新登陆一下就行了，不换还好，一换就出事了，直接timeout了，我以为是Zeabur的服务问题（因为它还在试运营阶段，平常确实有点小问题），就去问老板

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/Telegram-20230510-182336.png)

我们排除了半个小时也没排出来问题，然后我也不好意思打扰人家，我就说明天再看吧，然后我自己又捣鼓了一会，然后突然想到一个很重要的问题：我让用户设置过SSL，而且我写的是**数据库支持再开，否则别开**，我就想Zeabur的数据库是不是不支持SSL（Upstash是支持的），然后我就关掉了SSL试了一下，果不其然就是SSL的问题

然后我就跟老板汇报了这个问题，这事也就这么结了

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Valorant-Shop-with-API/Telegram-20230510-183436.png)

## 结语

这个项目真的是从我自己立项开始做到现在，做了两周有多，接下来还有其他的更新，但是也是慢更了，就是那种小小的更新，功能性的除了一个皮肤库还没写以外，我就想不到还能做什么功能了，如果你有好的建议可以在下面评论，我看到会去试试的

如果你想给我赞助，除了访问[赞助页面](https://bili33.top/sponsors)以外，也可以给我的账号冲VP，DM（私聊）我我看到会给你发ID的，谢谢！
