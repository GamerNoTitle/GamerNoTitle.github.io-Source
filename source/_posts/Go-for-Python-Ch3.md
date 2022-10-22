---
title: 从零开始的Python ACM Ch.3
date: 2022-10-22 08:06:31
tags: Coding
categories: Coding
---

## 队列

队列，跟现实中一样，遵循先进先出的原则`FIFO`，从尾巴进去，从头部出来

### 用列表模拟队列

```python
class Queue:
    def __init__(self):
        self.data = []

    def enquen(self, value):
        self.data.append(value)
    
    def dequen(self):
        value = self.data[0]
        del self.data[0]
        return value
```

删除会比较慢（不如链表构建的队列），因为每次`del`都是一个完整的`O(n)`操作

### 用链表模拟队列

```python
class Node:
    def __init__(self, value=None, next=None):
        self.value = value
        self.next = next

class Queue:
    def __init__(self):
        self.head = None

    def enquen(self, value):
        if not self.head:   # 当头为空
            self.head = Node(value) # 将头设置为新节点
            return
        tail: Node = self.head
        while tail.next:
            tail = tail.next
        tail.next = Node(value)

    def dequen(self):
        value = self.head.value
        self.head = self.head.next
        return value

    def size(self):
        if not self.head:
            return 0 
        count = 0
        head = self.head
        while head != None:
            count += 1
            head = head.next
        return count
```

`size`还可以作为属性来写，更方便

```python
class Node:
    def __init__(self, value=None, next=None):
        self.value = value
        self.next = next

class Queue:
    def __init__(self):
        self.head = None
        self.size = 0

    def enquen(self, value):
        if not self.head:   # 当头为空
            self.head = Node(value) # 将头设置为新节点
            self.size += 1
            return
        tail: Node = self.head
        while tail.next:
            tail = tail.next
        tail.next = Node(value)
        self.size += 1

    def dequen(self):
        value = self.head.value
        self.head = self.head.next
        self.size -= 1
        return value
```

