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

## 勾股数

- 这个应该不用多介绍了吧……输出100以内的所有勾股数

```python
# 暴力做法
from math import sqrt

nums = list()

for a in range(1, 101):
    for b in range(1, a+1):
        if str(sqrt(a ** 2 + b ** 2)).endswith('.0') and sqrt(a ** 2 + b ** 2) <= 100:
            nums.append((b, a, int(sqrt(a**2+b**2))))
nums.sort(key=lambda x: x[0])
print(nums)

```

输出（共52个）

```
[(3, 4, 5), (5, 12, 13), (6, 8, 10), (7, 24, 25), (8, 15, 17), (9, 12, 15), (9, 40, 41), (10, 24, 26), (11, 60, 61), (12, 16, 20), (12, 35, 37), (13, 84, 85), (14, 48, 50), (15, 20, 25), (15, 36, 39), (16, 30, 34), (16, 63, 65), (18, 24, 30), (18, 80, 82), (20, 21, 29), (20, 48, 52), (21, 28, 35), (21, 72, 75), (24, 32, 40), (24, 45, 51), (24, 70, 74), (25, 60, 65), (27, 36, 45), (28, 45, 53), (28, 96, 100), (30, 40, 50), (30, 72, 78), (32, 60, 68), (33, 44, 55), (33, 56, 65), (35, 84, 91), (36, 48, 60), (36, 77, 85), (39, 52, 65), (39, 80, 89), (40, 42, 58), (40, 75, 85), (42, 56, 70), (45, 60, 75), (48, 55, 73), (48, 64, 80), (51, 68, 85), (54, 72, 90), (57, 76, 95), (60, 63, 87), (60, 80, 100), (65, 72, 97)]
```

## 不重复的三位数

- 用1、2、3、4能组成多少个互不相同且无重复数字的三位数？都是多少？
- （其实Python里面的`itertools`里面有个方法叫做`permutation()`

```python
from itertools import permutations

nums = [1, 2, 3, 4]
result = []

possible = permutations(nums, 3)
for a, b, c in possible:
    result.append(a*100+b*10+c)
print(result)
print(len(result))
```

输出

```
[123, 124, 132, 134, 142, 143, 213, 214, 231, 234, 241, 243, 312, 314, 321, 324, 341, 342, 412, 413, 421, 423, 431, 432]
24
```



