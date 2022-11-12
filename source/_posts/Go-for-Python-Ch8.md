---
title: 从零开始的Python ACM Ch.8：综合题目
date: 2022-11-12 08:19:26
tags: Coding
categories: Coding
---

## 数据加密

一个公司对于一个四位数的整型数字的加密方式为：每位数位上的数字+5后除以十得到余数，将各数位上的余数按照第一位与第四位、第二位与第三位的顺序进行交换，得到最终结果

```python
message = input('num: ')

message = [message[0], message[1], message[2], message[3]]
for i in range(0, len(message)):
    message[i] = int(message[i]) + 5 % 10
message[0], message[1], message[2], message[3] = message[3], message[2], message[1], message[0]
result = ''
for i in message:
    result += str(i)
print(result)

```

## 双色球

用程序模拟双色球开奖过程，红色球范围为1~33，蓝色球范围为1~16，红色球有6个且数字不能重复，蓝色球只有1个。

输出格式为：红色球：x x x x x x 蓝色球：x

```python
import random

reds = set()
blue = -1
while len(reds) < 6:
    reds.add(random.randint(1,33))

blue = random.randint(1,16)

print('红色球：', end='')
for i in reds:
    print(i, end=' ')
print(f'蓝色球：{blue}')
```

