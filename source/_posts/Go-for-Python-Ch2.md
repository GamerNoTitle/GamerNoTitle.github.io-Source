---
title: 从零开始的Python ACM Ch.2：时间复杂度、栈、面向对象及链表
date: 2022-10-18 19:38:45
tags: Coding
categories: Coding
---

## 列表与字典的时间复杂度

列表的`ls.append()`复杂度是`O(n)`，字典的插入`dt['key'] = value`的复杂度是`O(1)`。Python自带的字典排序`ls.sort()`复杂度是`O(nlogn)`（这个排序算法是用C语言写的，基本上自己在Python里面写的排序算法都没有它快

## 栈(Stack)

基本操作：

- 压栈	`stack.append(element)`
- 出栈    `del stack[-1]`
- 判断是否为空    `len(stack) == 0`

## 面向对象的Python编程

以栈对象为例

```python
class Stack:
    def __init__(self, x, y):		# 构造类里面的函数，在每次实例化的同时会自动调用__init__函数
        self.x = x
        self.y = y
        self.summary = x + y
s = Stack(3, 4)	# 得到一个Stack类型的实例（实例化）
print(s.x, s.y, s.summary)

'''
=== Output ===
3 4 7
'''
```

更深一步，在对象里面定义对象的方法

```python
class Stack:
    def __init__(self, x, y):		# 构造类里面的函数，在每次实例化的同时会自动调用__init__函数
        self.x = x
        self.y = y

    def summary(self):
        return self.x + self.y

    def reset(self):
        self.x = 0
        self.b = 0


s = Stack(3, 4)  # 得到一个Stack类型的实例（实例化）
print(s.summary())

'''
=== Output ===
7
'''
```

### 例题

创建一个类型`Rect`（矩形），能执行以下代码

```python
r1 = Rect(10, 20)
print(r1.width)		# 10
print(r1.height)	# 20
print(r1.area())	# 200
print(r1.length())	# 60

r2 = Rect(5, 6)
print(r2.area())
```

我的题解：

```python
class Rect:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def length(self):
        return (self.width + self.height) * 2


r1 = Rect(10, 20)
print(r1.width)		# 10
print(r1.height)  # 20
print(r1.area())  # 200
print(r1.length())  # 60

r2 = Rect(5, 6)
print(r2.area())

'''
=== Output ===
10
20
200
60
30
'''
```

### 例题：使用列表模拟栈

```python
class Stack:
    def __init__(self):
        self.data = []

    def enquen(self, value):
        self.data.append(value)
    
    def dequen(self):
        value = self.data[-1]
        del self.data[-1]
        return value

    def isEnpty(self):
        return len(self.data) == 0
```

对栈进行操作：

```python
import random

class Stack:
    def __init__(self):
        self.data = []

    def enquen(self, value):
        self.data.append(value)
    
    def dequen(self):
        value = self.data[-1]
        del self.data[-1]
        return value

    def isEmpty(self):
        return len(self.data) == 0

if __name__ == '__main__':
    stack = Stack()
    for i in range(100):
        stack.enquen(random.randint(0,100))
    print(stack.data)
    for i in range(10):
        value = stack.dequen()
        print(value, end=' ')
    print('\n')
    print(stack.data)
    
'''
=== Output ===
[3, 88, 78, 41, 28, 81, 33, 91, 86, 17, 57, 39, 17, 17, 98, 69, 65, 86, 83, 60, 67, 10, 95, 8, 66, 37, 10, 64, 41, 79, 39, 57, 32, 44, 62, 28, 32, 75, 41, 42, 87, 8, 7, 82, 85, 54, 2, 13, 96, 70, 1, 25, 47, 10, 75, 29, 92, 60, 29, 73, 24, 76, 5, 70, 62, 5, 85, 54, 25, 44, 37, 53, 11, 39, 25, 67, 37, 6, 99, 58, 97, 33, 26, 35, 50, 73, 48, 49, 16, 89, 2, 86, 28, 10, 89, 91, 1, 81, 9, 26]
26 9 81 1 91 89 10 28 86 2

[3, 88, 78, 41, 28, 81, 33, 91, 86, 17, 57, 39, 17, 17, 98, 69, 65, 86, 83, 60, 67, 10, 95, 8, 66, 37, 10, 64, 41, 79, 39, 57, 32, 44, 62, 28, 32, 75, 41, 42, 87, 8, 7, 82, 85, 54, 2, 13, 96, 70, 1, 25, 47, 10, 75, 29, 92, 60, 29, 73, 24, 76, 5, 70, 62, 5, 85, 54, 25, 44, 37, 53, 11, 39, 25, 67, 37, 6, 99, 58, 97, 33, 26, 35, 50, 73, 48, 49, 16, 89]
'''
```

### 例题：匹配括号

已知一串由小括号`(` `)`组成的字符串，试判断该字符串中的括号组合是否合法

我的题解（时间复杂度`O(n^2)`，因为`replace`要先查找再替换，进行了两次遍历：

```python
s = ()()()(((())))))()
result = -1

while True:
    if "()" not in s:
        result = False
        break
    if len(s) == 0:
        result = True
        break
    s.replace('()','')
print(result)
```

优化版（利用栈的特性）：

```python
class Stack:
    def __init__(self):
        self.data = []

    def enquen(self, value):
        self.data.append(value)

    def dequen(self):
        value = self.data[-1]
        del self.data[-1]
        return value

    def isEmpty(self):
        return len(self.data) == 0


s = '()()()(((())))))()'

if __name__ == '__main__':
    result=-1
    stack=Stack()
    for c in s:
        if c == '(':
            stack.enquen('(')
        else:
            if stack.isEmpty():
                result=False
                break
            stack.dequen()
        result=stack.isEmpty()
    print(result)
```

### 例题：匹配括号（升级版）

在上一题的基础上，括号不只有小括号了，还有中括号`[]`和花括号`{}`，同样判断括号对是否合法

```python
class Stack:
    def __init__(self):
        self.data = []

    def enquen(self, value):
        self.data.append(value)

    def dequen(self):
        value = self.data[-1]
        del self.data[-1]
        return value

    def isEmpty(self):
        return len(self.data) == 0


s = '()(((())))))){{}}}}[[]]]]]])'

if __name__ == '__main__':
    result = -1
    stack = Stack()
    for c in s:
        if c in "([{":
            stack.enquen(c)
        else:
            if stack.isEmpty():
                result = False
                break
            value = stack.dequen()
            if (c == ')' and value == '(') or (c == ']' and value == '[') or (c == '}' and value == '{'):
                pass
            else:
                result = False
                break
        result = stack.isEmpty()
    print(result)
```

## all()/any()的用法

官方说明

```
all()

Return True if bool(x) is True for all values x in the iterable.

If the iterable is empty, return True.

=========================================================================

any()

Return True if bool(x) is True for any x in the iterable.

If the iterable is empty, return False.
```

应用举例

```python
dt = {1: 0, 2: 0, 3: 1}
print(all(dt.values()))
print(any(dt.values()))

'''
=== Output ===
False
True
'''
```

因为字典里面不全是`1`，在Python里面，`1`代表`True`，不全为`1`所以为`False`，但是对于`any`函数，里面一旦出现了`True`就返回`True`，所以这里是`True`

## 链表

链表里面的基本单位是`结点(node)`，单链表只存储值和下一节点的位置，双链表保存到一个上一节点的位置

```python
class Node:		# 单链表
    def __init__(self, value, next):
        self.value = value
        self.next = next
        
class Node:		# 双链表
    def __init__(self, value, prev, next):
        self.value = value
        self.next = next
        self.prev = prev
```

### 用双链表模拟栈

```python
class Node:		# 双链表
    def __init__(self, value, prev = None, next = None):
        self.value = value
        self.prev = prev
        self.next = next
        
class Stack:
    def __init__(self):
        self.tail = None
        
    def enquen(self, value):
        node = Node(value)
        node.prev = self.tail
        if self.tail:
            self.tail.next = node
            self.tail = node

    def dequen(self):
        self.tail = self.tail.prev
        if self.tail:
        	self.tail.next = None
	
    def isEmpty(self):
        self.tail == None
```

