---
title: 从零开始的Python ACM Ch.1
date: 2022-10-15 08:15:51
tags: Coding
categories: Coding
---

## 基本数据类型

###  可迭代数据类型

通用操作： 

- 遍历
- max
- min
- sum
- len
- 成员测试 in、not in

###  序列数据类型

通用操作： 

- 索引 
- 切片 
- index 
- count 
- 同类型加法拼接 
- 整数乘法重复

#### 字符串

不可变数据类型（对字符串的所有修改操作，都是返回一个新的字符串）

特有操作：

- `s.upper() `
- `s.lower() `
- `s.replace(sub1, sub2) `
- `s.join(Iterable[str]) `
- `s.format() `
- `s.split(c)`

#### 元组

不可变数据类型，基本是拿来用索引，或者切片

#### 列表

可变数据类型

特有操作： 

- 通过索引进行修改 
- 通过切片进行修改 
- `ls.append(x) `
- del ls[i] i为元素索引 
- `ls.remove(x)` x为元素值 
- `ls.extend(lt2) `
- `ls.insert(i, x) `
- `ls.reverse() `
- `ls.clear()`

- 列表表达式

#### 集合 & 字典

集合中的元素、字典的键 都必须为不可变数据类型，不能重复 

如果直接对字典进行`for`循环的遍历，那么出来的是字典的键

集合的特有方法：

- `s.pop()` 弹出集合s中的一个元素 
- `s.add(x)` 将x添加到集合s中 
- `s.remove(x)` 删除集合s中的元素x，x不存在则出错 
- `s.discard(x)` 删除集合s中的元素x，x不存在不出错 
- `s.update(t)` 将集合t合并到集合s中 
- `s.clear()` 清空集合s 
- `s-t` 差集 
- `s&t` 交集 
- `s|t` 并集 
- `s^t` 并集减去交集 
- `s.isdisjoint(t)` 判断是否相交 比较操作 判断包含关系

字典的特有方法： 

- 通过键进行索引 

- `d.keys()` 所有键的迭代器 
- `d.values()` 所有值的迭代器 
- `d.items()` 所有键值对的迭代器 
- `d.get(key, default)` 如果key存在，返回d[key]，否则返回default 
- `d.pop(key, default)` 返回 `d.get(key, default)` 并不出错的删除key 
- `d.popitem() `
- `d.update(d2)`

## 列表表达式

一般我们使用的列表长这样

```python
ls = [123,456,789,0]
```

但是Python里面有个东西叫做列表表达式，例如

```python
ls1 = [i for i in range(0,100)]
```

这会生成一个带有0-99的`int`数据类型的列表，非常简洁

## 列表的排序

一般来说，你自己在Python里面写的对列表进行排序的函数，都不如内置的`list().sort(*, key=key, reverse=False)`要快，谁让人家是C语言写的排序呢……

但是`list().sort()`有个坑，我前两天帮人数学建模的时候还是踩进了这个坑，就是：这个方法是直接作用于列表本身，没有返回值的，所以进行赋值的时候就会变成`none`

### 例题1

下面的列表`a`是人物的名字，`b`是他们对应的年龄，请输出18岁以下的人物并根据他们的年龄进行升序排列

```python
a = ['tom', 'iron man','jerry', 'donald', 'micky', 'spider man']
b = [3, 32, 1, 8, 2, 19]
```

我的做法是用多一个列表，往里面用元组的形式填他们的名字以及年龄信息

```python
ls = []

for i in a:
    pos = a.index(i)
    age = b[pos]
    if age < 18:
        ls.append((i,age))
```

对`ls`进行打印，得出这样的一个列表

```python
[('tom', 3), ('jerry', 1), ('donald', 8), ('micky', 2)]
```

再通过`sort`函数和`lambda`表达式进行排序，对所需要的东西进行打印

```python
ls.sort(key=lambda x: x[1])
for i in ls:
    print(i[0])
```

输出为

```
jerry
micky
tom
donald
```

但是经过教员的提醒，还有个`zip()`函数可以直接把两个列表中的对应位置的元素合在一起变成元组

```python
items = list(zip(a,b))
```

这样做的结果跟上面的`ls`的结果是一样的

然后再在列表表达式里面筛选，两步可以合在一起

```python
items = [item for item in list(zip(a,b)) if item[1] < 18]
for i in items:
    print(i[0])
```

**启示：少用字典，筛选放在后面去**

### 例题2

[2089. 找出数组排序后的目标下标 - 力扣（LeetCode）](https://leetcode.cn/problems/find-target-indices-after-sorting-array/)

我的题解：

```python
class Solution:
    def targetIndices(self, nums: List[int], target: int) -> List[int]:
        nums.sort()
        result = []
        for i in range(0,len(nums)):
            if nums[i] == target:
                result.append(i)
        return result
```

优化版（因为找到了以后，再往后就不存在要找的了，所以可以直接`break`掉）

```python
class Solution:
    def targetIndices(self, nums: List[int], target: int) -> List[int]:
        nums.sort()
        result = []
        found = False
        for i in range(0,len(nums)):
            if nums[i] == target:
                result.append(i)
            if nums[i] != target and found:
                break
        return result
```

### 例题3

[2215. 找出两数组的不同 - 力扣（LeetCode）](https://leetcode.cn/problems/find-the-difference-of-two-arrays/submissions/)

我的题解：

```python
class Solution:
    def findDifference(self, nums1: List[int], nums2: List[int]) -> List[List[int]]:
        answer = [[],[]]
        for i in nums1:
            if i not in nums2 and i not in answer[0]:
                answer[0].append(i)
        for i in nums2:
            if i not in nums1 and i not in answer[1]:
                answer[1].append(i)
        return answer
```

优化版（找不同的可以用集合去做）：

```python
class Solution:
    def findDifference(self, nums1: List[int], nums2: List[int]) -> List[List[int]]:
        s1 = set(nums1)
        s2 = set(nums2)
        answer = [[],[]]
        answer[0] = list(s1-s2)
        answer[1] = list(s2-s1)
        return answer
```

### 例题4

[599. 两个列表的最小索引总和 - 力扣（LeetCode）](https://leetcode.cn/problems/minimum-index-sum-of-two-lists/submissions/)

我的题解：

```python
class Solution:
    def findRestaurant(self, list1: List[str], list2: List[str]) -> List[str]:
        lovedRest = []
        for i in list1:
            if i in list2:
                indexSum = list1.index(i) + list2.index(i)
                lovedRest.append((i,indexSum))
        lovedRest.sort(key=lambda x: x[1])
        result = []
        result.append(lovedRest[0][0])
        for i in range(1,len(lovedRest)):
            if lovedRest[i][1] == lovedRest[0][1]: result.append(lovedRest[i][0])
            else: break
        return result
```

`enumerate(list)`在遍历的过程中出现`index, value`的返回值，可以在for循环使用，例如

```python
...(上面已经定义了ls为列表)
for i, value in enumerate(ls):
    pass
```

所以上面这一题也可以改一改，用这个方法可以免去用`ls.index()`的麻烦

### 例题5

[2200. 找出数组中的所有 K 近邻下标 - 力扣（LeetCode）](https://leetcode.cn/problems/find-all-k-distant-indices-in-an-array/submissions/)

我的题解（`OT`了）：

```python
class Solution:
    def abs(num):
        if num < 0:
            return num*-1
        else: return num
    def findKDistantIndices(self, nums: List[int], key: int, k: int) -> List[int]:
        keyPos = [i for i in range(0,len(nums)) if nums[i] == key]
        result = []
        for pos in keyPos:
            for i in range(0,len(nums)):
                if abs(i-pos)<=k and i not in result: result.append(i) 
                else: pass
        result.sort()
        return result
```

优化版：

思路是从`i`所在位置往左往右`k`个位置是否有key，如果有的话就进行计算，没有就跳过，省去了很多遍历

```python
class Solution:
    def findKDistantIndices(self, nums: List[int], key: int, k: int) -> List[int]:
        result = []
        for i in range(len(nums)):
            if key in nums[max(0,i-k):i+k+1]:
                result.append(i)
        return result
```

## 列表的空间

列表在内存中是连续的，但是如果要用申请的空间之外的地方的话（即加长列表）就要再次申请，会减慢运行，所以可以先申请一大片空间

```python
ls = [0]*1000
```

