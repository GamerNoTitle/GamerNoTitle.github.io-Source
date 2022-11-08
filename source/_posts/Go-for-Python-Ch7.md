---
title: 从零开始的Python ACM Ch.7：整数练习
date: 2022-11-08T19:51:46+08:00
tags:
---

## 黑洞数

- 黑洞数又称陷阱数，是类具有奇特转换特性的整数。任何一个数字不全相同整数，经有限“重排求差”操作，总会得某一个或一些数，这些数即为黑洞数。“重排求差”操作即把组成该数的数字重排后得到的最大数减去重排后得到的最小数。或者是冰雹原理中的“1”黑洞数
- 求出三位数以内的黑洞数

```python
blackhole_num = set({})

def sort(num):
    num_ascend_ls = sorted(list(str(num)))
    num_ascend = int(num_ascend_ls[0]+num_ascend_ls[1]+num_ascend_ls[2])
    num_decend_ls = list(reversed(sorted(list(str(num)))))
    num_decend = int(num_decend_ls[0]+num_decend_ls[1]+num_decend_ls[2])
    return num_ascend, num_decend

for i in range(100,1000):
    num = i
    while True:
        num_ascend, num_decend = sort(num)
        tmp = num_decend - num_ascend
        if tmp == num:
            blackhole_num.add(tmp)
            break
        elif tmp < 100:
            break
        else:
            num = tmp
print(blackhole_num)
```

输出

```
{495}
```

我还去[百度了一下](https://baike.baidu.com/item/%E9%BB%91%E6%B4%9E%E6%95%B0/761618)，三位数的黑洞数确实只有495……
