---
title: 从零开始的Python ACM Ch.5：练习系列
date: 2022-11-01 19:33:57
tags: Coding
categories: Coding
---

## 求素数
- 问题描述
  求给定范围start、end之间的所有素数。

- 问题分析
  素数指的是只能被1和它自身整除的整数。判定一个整数m是否为素数的关键，就是要判定整数m能否能被除1和它自身以外的其他任何整数所整除，若都不能整除，则m为素数。本题求的是给定范围start、end之间的所有素数，考虑到程序的通用性，需要从键盘输入start和end的值，例如输入sta：1，end=1000，则所编写的程序应能够打印出1、1000之间的所有素数。

- 求素数的方法参考：[判断一个数是否为质数（素数）的4种方法_是杰夫呀的博客-CSDN博客_如何判断一个数是不是质数](https://blog.csdn.net/sinat_26811377/article/details/96584293)

```python
from math import sqrt

start = int(input('Start: '))
end = int(input('End: '))


def isPrime(num):
    if num == 2: return True
    if num % 2 == 0: return False
    i = 3
    while i <= sqrt(num):
        if num % i == 0: return False
        i += 2
    return True


for i in range(start, end + 1):
    if isPrime(i):
        print(i)

```

## 哥德巴赫猜想
- 问题描述
  2000以内的不小于4的**正偶数**都能够分解为两个素数之和（即验证歌德巴赫猜想对2000以内的正偶数成立）。

- 问题分析
  根据问题描述，为了验证歌德巴赫猜想对2000以内的正偶数都是成立的，要将整数分解为两部分，然后判断分解出的两个整数是否均为素数。若是，则满足题意，否则应重新进行分解和判断。针对该问题，我们可以给定如下的输入和输出限定。
  输入时：每行输入一组数据，即2000以内的正偶数n，一直输入到文件结束符为止。
  输出时：输出n能被分解成的素数a和b。如果不止一组解，则输出其中a最小的那组解。
  当然，读者可以根据实际的需要规定不同的输入和输出形式。
- 这里指定输入方式：从控制台读入，空格分割

```python
from math import sqrt

nums = input('Nums(split with space): ').split()


def isPrime(num):
    if num == 2: return True
    if num % 2 == 0: return False
    i = 3
    while i <= sqrt(num):
        if num % i == 0: return False
        i += 2
    return True

nums = list(map(int, nums))
for num in nums:
    add1 = -1
    add2 = -1
    for i in range(2, num):
        if not isPrime(i): continue
        else:
            for j in range(num, 1, -1):
                if not isPrime(j): continue
                else:
                    if i + j == num:
                        add1 = i
                        add2 = j
                        break
        if add1 != -1 and add2 != -1: break
    print(add1, add2)
    
```

输入与输出

```
Nums(split with space): 4 5 6 7 8 9 10
2 2
2 3
3 3
2 5
3 5
2 7
3 7
```

## 1898
- 问题描述：“1898一要发就发"。请将不超过1993的所有素数从小到大排成第一行，第二行上的每个数都等于它上面相邻两个素数之差。编程求出：第二行数中是否存在若干个连续的整数，它们的和恰好为1898？假如存在的话，又有几种这样的情况？
  两行数据分别如下：
  第一行：2，3，5，7，11，13，17 …… 1979，1987，1993

  第二行：1，2，2，4，2，4……8，6

（还没做）
