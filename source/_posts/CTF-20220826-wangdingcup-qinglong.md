---
title: 2022网鼎杯青龙组——个人WriteUP
date: 2022-08-26 18:23:18
tags: [CTF, Crypto, Hash]
categories: CTF
---

## **签到**

没啥技术含量，求助于万能的 ~~百度~~ Bing

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-20220826-wangdingcup-qinglong/msedge-20220826-115011.png)

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-20220826-wangdingcup-qinglong/msedge-20220826-115015.png)

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-20220826-wangdingcup-qinglong/msedge-20220826-115020.png)

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-20220826-wangdingcup-qinglong/msedge-20220826-115024.png)

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-20220826-wangdingcup-qinglong/msedge-20220826-115028.png)

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-20220826-wangdingcup-qinglong/msedge-20220826-115033.png)

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-20220826-wangdingcup-qinglong/msedge-20220826-115036.png)

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-20220826-wangdingcup-qinglong/msedge-20220826-115042.png)

## **crypto091**

小A鼓起勇气向女神索要电话号码，但女神一定要考考他。女神说她最近刚看了一篇发表于安全顶会USENIX Security 2021的论文，论文发现苹果AirDrop隔空投送功能的漏洞，该漏洞可以向陌生人泄露AirDrop发起者或接收者的电话号码和电子邮箱。小A经过一番努力，获得了女神手机在AirDrop时传输的手机号哈希值，但再往下就不会了，你能继续帮助他吗？小A只记得女神手机号是170号段首批放号的联通号码。

Hash：c22a563acc2a587afbfaaaa6d67bc6e628872b00bd7e998873881f7c6fdc62fc

flag格式：flag{13位电话号码（纯数字，含国家代码）}

- 170号段首批放号的联通号码：1709
- 限定做法：Hash爆破
- Hash为64位，因此Hash的计算方法是`sha256`

```python
import hashlib
prefix = '861709' # 联通首批放号的电话号码头
compare_hash = 'c22a563acc2a587afbfaaaa6d67bc6e628872b00bd7e998873881f7c6fdc62fc'
result = 0
for i in range(0,10000000):
    to_hash = prefix+'{:0>7}'.format(str(i))	# 这么写主要是为了构造电话号码的格式
    to_compare_hash=hashlib.sha256(to_hash.encode()).hexdigest()
    print(to_hash, to_compare_hash)
    if to_compare_hash == compare_hash:
        result = prefix+str(i)
        break
print(result)
```

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-20220826-wangdingcup-qinglong/WindowsTerminal-20220826-115133.png)

## Hash爆破脚本

```python
import hashlib
from itertools import permutations
import string
salt = input('salt: ')
target = input('target: ')
ls = string.ascii_letters + string.digits
res = permutations(ls,4)
result = 'empty'
for _ in res:
    XXXX = _[0]+_[1]+_[2]+_[3]
    to_hash = XXXX+salt
    if hashlib.sha256(to_hash.encode()).hexdigest() == target: 
        result = XXXX
        break
print(result)
```

用于解决题目提示`XXXX + 一串salt == Hash值`的开头问题，因为已经很多次遇到这种问题了，所以写了个脚本来爆破，只需要输入对应的salt和hash就可以解出来
