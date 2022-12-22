---
title: 从零开始的Python ACM Ch.3：队列、链表与二叉树
date: 2022-10-22 08:06:31
tags: [Coding, Queue]
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

## 例题：击鼓传花

一共有`n`个人玩击鼓传花小游戏，步数为`p`，问最后活下来的是谁

```python
def game(persons: list, step: int):
    last = -1
    while len(persons) > 1:
        last += step
        last = last % len(persons)
        del persons[last]
    return persons[0]


print(game(list('ABCD'), 3))

'''
=== Output ===
A
'''
```

## 链表与二叉树

{% mermaid %}
graph TD;
	1-->2;
	1-->3;
	1-->4;
	3-->5;
	3-->6;
	3-->7;
	4-->8;
	4-->9;
	7-->10;
	7-->11;
	11-->12;
{% endmermaid %}

如图，用链表模拟二叉树

```python
class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.childs = []

    def depth(self):
        if not self.childs: # 没有孩子节点
            return 1
        return 1 + max([node.depth() for node in self.childs])

    def iter_depth(self):   # 深度优先
        items = []
        items.append(self.value)
        for child in self.childs:
            items.extend(child.iter_depth())
        return items

    def iter_width(self):   # 广度优先
        items = [self.value]
        for child in self.childs:
            items.extend(child.iter_width())
        return items


root = Node(1)

for i in range(2,5):
    root.childs.append(Node(i))

node: Node = root.childs[1]
for i in range(5,8):
    node.childs.append(i)

node = root.childs[2]
for i in range(8,10):
    node.childs.append(i)

node = root.childs[1][2]
for i in range(10, 12):
    node.childs.append(i)

node = node[1]
node.childs.append(12)
```

