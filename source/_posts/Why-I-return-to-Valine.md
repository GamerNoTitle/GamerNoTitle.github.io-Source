---
title: 为什么我选择用回了Valine？
date: 2023-07-23 20:40:43
tags: [Valine, Comments, Tech, Website]
categories: Software
cover: https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Why-I-return-to-Valine/msedge-20230723-211512.png
---

熟悉我的小伙伴应该知道，我的网站的评论系统经历了几次更换，最开始我用的是Gitalk，但是因为要登录Github账户，而且不是所有人都有Github账户，所以就更换了

后面用上了Valine，Valine用得很舒服，yysy，配置好Valine-Admin后基本上可以撒手不管了，但是后来Valine停止更新了，就想着去用下Waline

Waline用了没多久，发现这东西后端一直连接不上，然后就又更换了

最后换成了Twikoo，这个东西跟Waline一样是要用MongoDB的，所以直接把Waline的MongoDB给它用，没一会就搞定了

你以为到这里就这么简单了嘛？如果真的是的话我就不会发这篇文来吐槽了

## Twikoo Vercel部署无法发邮件

最开始我是部署在Vercel上面的，这种方式就是很方便，因为Vercel本来就是一个很便捷的平台，没有很多繁琐的操作，再说，Twikoo支持一键部署，所以就部署在了Vercel里面

用了两周以后发现一个很大的问题：Vercel链接微软服务器会超时！我的域名邮箱是在Office365上面的，自然邮件提醒功能就要链接微软的服务，然后Vercel使用邮件提醒的时候，就会超过Vercel规定的10秒上限，导致函数运行直接超时，然后发不出邮件

幸好，Twikoo不只是能够在Vercel部署，我又把目光投向了Zeabur这个平台

## Twikoo Zeabur部署 数据丢失事件

我不能说Zeabur不好用，他确实很好用，非常好用，几乎完美解决了我的容器需求，但是凡事都有个但是，Zeabur在2023年七月初上线了签到延长使用期限的功能，也就是说如果我不签到，我的应用会自动被停机

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Why-I-return-to-Valine/msedge-20230723-213632.png)

我在Zeabur部署Twikoo的时候，那还是Zeabur平台的早期，当时的设定是MongoDB会部署在Twikoo容器的内部，这就导致了但凡Twikoo进行了一次重启，所有的数据都会丢失

很不幸，我的数据正是在这种情况下丢失了，一点都没有剩下。幸好，在我之前部署Vercel的Twikoo的时候，里面的MongoDB的数据是还在的，尽管它不是最全的，但是能恢复一部分已经是很不错的事情了

或许你会问我：现在Zeabur的付费机制可以绑定支付宝，为什么不用呢？我只能说数据丢了一次以后，我在想尽各种办法来避免这种情况，所以目前Zeabur不在考虑范围内

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Why-I-return-to-Valine/msedge-20230723-220737.png)

## Twikoo Render部署 程序底层导致的无法发送邮件

当我把Zeabur上的应用迁移，特别是[Valora](https://github.com/GamerNoTitle/Valora)迁移的时候，我尝试找一个能够连续不断跑容器的平台，最后选择了[Render](https://render.com)这家，它可以在新加坡部署容器，且一个月有750小时的运行时间，完全够一个容器跑一个月的了，所以我也把Twikoo丢到了这个地方

当我搬上去以后，进行了一系列的配置，然后再次尝试邮件的时候，发现还是发不了，这不是配置上的问题，就是Twikoo发不出去

发现了以后，我又尝试用了Valine-Admin来发送

## 重新接入Valine

放弃使用Valine其实还有一个原因，就是Leancloud的国际版禁止国内IP访问了（业务域名和自带的引擎域名），我是搬到了国内版去用的，但是国内版要求备案，搞得我很烦（后来找了代备案搞定的）

这次重新接入Valine，我选用的是国际版，国际版之前的数据我都没删掉，就是换用Twikoo以后的新增数据没有了，这个没办法，最后就只要解决国内不能访问业务域名的问题就可以了

这里我用了Vercel作为反代，然后把serverURL设置为了我的反代域名，才解决了国内访问不了的问题

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Why-I-return-to-Valine/msedge-20230723-211512.png)

## 测试Valine邮件

我重新部署了一次Valine-Admin，来避免一些遗留下来的问题，部署完成后，在我的网站匿名发送了一条测试评论，邮件顺利送达

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Why-I-return-to-Valine/ApplicationFrameHost-20230723-220702.png)

最后我恢复了Valine的使用，尽管它现在已经不更新了，但是它能够满足我的基本需求，所以我还是选用它

## FIN

最后我改了一下我导出的MongoDB的数据，发现可以被Valine正常识别，只需要修改一下数据的类型就可以正常被导入了

导入以后发现……这个邮件它以前没发的全给我发了

![](https://cdn.bili33.top/gh/Vikutorika/newassets@master/img/Why-I-return-to-Valine/ApplicationFrameHost-20230723-220510.png)

**对不起对不起对不起**！！！我没想到它会自己发出去

## 加更：Twikoo合并入Valine并去重

就像我上面说的，我的Valine数据是导入进去过Twikoo的，现在Twikoo导出的数据是json（用管理面板里面的那个导出），直接导入Leancloud是没问题的，但是珲面临下面的问题：

- 时间格式不正确：Twikoo的时间格式是时间戳，而Valine用的是Leancloud的Date类型
- Twikoo无用数据较多，`uid`、`master`、`top`什么的标记需要去除
- 去重！去重！还是去重！

经过我在火车上的一小时奋战，我终于弄出了这个脚本（Twikoo导入Leancloud后在Leancloud导出数据库）

```python
import json
from datetime import datetime


def timestamp_to_iso8601(timestamp):
    # Convert timestamp to a datetime object
    try:
        dt_object = datetime.fromtimestamp(int(timestamp) / 1000)
    except TypeError:
        return timestamp

    # Format the datetime object to ISO 8601 format
    iso8601_format = dt_object.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

    return iso8601_format


with open('comment.0.jsonl', 'rt', encoding='utf8') as f:
    lines = f.readlines()


def write_data(data):
    with open('Comment.json', 'wt+', encoding='utf8') as f:
        f.write(data)


exist_data = []
finaldata = []
# write_data('#filetype:JSON-streaming {"type":"Class","class":"Comment"}\n')
for line in lines:
    if line.startswith('#'):
        continue
    data = json.loads(line)
    if {"nick": data.get('nick'), "link": data.get('link'), 'comment': data.get('comment')} in exist_data: continue
    if data.get('created'):
        data['insertedAt'] = {"__type":"Date","iso":timestamp_to_iso8601(data.get('created'))}  # Valine的时间索引
        data['createdAt'] = timestamp_to_iso8601(data.get('created'))   # Leancloud自带
        data['updatedAt'] = timestamp_to_iso8601(data.get('created'))   # Leancloud自带
    if data.get('top'):
        del data['top']
    if data.get('master'):
        del data['master']
    if data.get('uid'):
        del data['uid']
    if data.get('created'):
        del data['created']
    if data.get('mailMd5'):
        del data['mailMd5']
    finaldata.append(data)
    exist_data.append({
        "nick": data.get('nick'), "link": data.get('link'), 'comment': data.get('comment')
    })

write_data(json.dumps(finaldata, indent=4))
print(len(finaldata))

print('done')
```

运行完后在Leancloud导入`Comment.json`文件后，就完成了！
