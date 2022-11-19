---
title: 从零开始的Python ACM Ch.9：动态规划
date: 2022-11-15 19:48:27
tags: Coding
categories: Coding
---

## 例题：跳台阶

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

- 示例 1

输入：n = 2 输出：2 

解释：有两种方法可以爬到楼顶。 

1. 1 阶 + 1 阶 

2. 2 阶

- 示例 2：

输入：n = 3 输出：3 

解释：有三种方法可以爬到楼顶。 

1. 1 阶 + 1 阶 + 1 阶 

2. 1 阶 + 2 阶 

3. 2 阶 + 1 阶 



1 <= n <= 45

### 题解（递归法）

解释：一个`steps`为`n`的问题可以看做是`steps`为`n-1`和`steps`为`n-2`的步骤和

```python
steps = int(input('Steps: '))   # 台阶数

def degrade(steps):
    if steps == 1: return 1
    if steps == 2: return 2
    return degrade(steps - 1) + degrade(steps - 2)

print(degrade(steps))
```

这个方法可以发现，当输入`steps`为`10`时，`degrade(9)`计算了`1`次，`degrade(8)`计算了`2`次（`degrade(9)`里面一次，自身一次），再往下发现越往下计算的次数越多，如果计算式子很复杂会消耗更多的时间

所以有一个优化的方式，就是把已经算过的值丢到一个新的变量里面存起来，如果计算过就不用计算了（缓存优化）

```python
steps = int(input('Steps: '))   # 台阶数
memory = [-1] * 10000000

def degrade(steps):
    if steps == 1: return 1
    if steps == 2: return 2
    if memory[steps] >= 0: return memory[steps]
    memory[steps] = degrade(steps - 1) + degrade(steps - 2)
    return memory[steps]

print(degrade(steps))
```

或者使用字典来存储

```python
steps = int(input('Steps: '))   # 台阶数
memory = {}

def degrade(steps):
    if steps == 1: return 1
    if steps == 2: return 2
    if steps in memory: return memory[steps]
    memory[steps] = degrade(steps - 1) + degrade(steps - 2)
    return memory[steps]

print(degrade(steps))
```

## 递归问题

步骤只有两步：

- 分解（分解为规模较小的相似问题）
- 原子问题（可以由问题分解推出，这里就是`i=1`和`i=2`的情况）

很多DP算法都能够用递归解决，因为这个比DP简单，所以先在这里列出来。

**递归会占用系统资源，而且递归一定会比循环更慢一些（尽管你用了缓存优化）**，当递归数过高时会超过Python的最大深度，引起`RecursionError`然后就……像下面这样

```
Steps: 10000
Traceback (most recent call last):
  File "c:\Users\GamerNoTitle\.vscode\extensions\ms-python.python-2022.18.2\pythonFiles\lib\python\debugpy\_vendored\pydevd\_pydevd_bundle\pydevd_trace_dispatch_regular.py", line 359, in __call__
    is_stepping = pydev_step_cmd != -1
RecursionError: maximum recursion depth exceeded in comparison

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "C:\Users\GamerNoTitle\AppData\Local\Programs\Python\Python310\lib\runpy.py", line 196, in _run_module_as_main
    return _run_code(code, main_globals, None,
  File "C:\Users\GamerNoTitle\AppData\Local\Programs\Python\Python310\lib\runpy.py", line 86, in _run_code
    exec(code, run_globals)
  File "c:\Users\GamerNoTitle\.vscode\extensions\ms-python.python-2022.18.2\pythonFiles\lib\python\debugpy\__main__.py", line 39, in <module>
    cli.main()
  File "c:\Users\GamerNoTitle\.vscode\extensions\ms-python.python-2022.18.2\pythonFiles\lib\python\debugpy/..\debugpy\server\cli.py", line 430, in main
    run()
  File "c:\Users\GamerNoTitle\.vscode\extensions\ms-python.python-2022.18.2\pythonFiles\lib\python\debugpy/..\debugpy\server\cli.py", line 284, in run_file
    runpy.run_path(target, run_name="__main__")
  File "c:\Users\GamerNoTitle\.vscode\extensions\ms-python.python-2022.18.2\pythonFiles\lib\python\debugpy\_vendored\pydevd\_pydevd_bundle\pydevd_runpy.py", line 321, in run_path
    return _run_module_code(code, init_globals, run_name,
  File "c:\Users\GamerNoTitle\.vscode\extensions\ms-python.python-2022.18.2\pythonFiles\lib\python\debugpy\_vendored\pydevd\_pydevd_bundle\pydevd_runpy.py", line 135, in _run_module_code
    _run_code(code, mod_globals, init_globals,
  File "c:\Users\GamerNoTitle\.vscode\extensions\ms-python.python-2022.18.2\pythonFiles\lib\python\debugpy\_vendored\pydevd\_pydevd_bundle\pydevd_runpy.py", line 124, in _run_code
    exec(code, run_globals)
  File "c:\Users\GamerNoTitle\Desktop\Untitled.py", line 11, in <module>
    print(degrade(steps))
  File "c:\Users\GamerNoTitle\Desktop\Untitled.py", line 8, in degrade
    memory[steps] = degrade(steps - 1) + degrade(steps - 2)
  File "c:\Users\GamerNoTitle\Desktop\Untitled.py", line 8, in degrade
    memory[steps] = degrade(steps - 1) + degrade(steps - 2)
  File "c:\Users\GamerNoTitle\Desktop\Untitled.py", line 8, in degrade
    memory[steps] = degrade(steps - 1) + degrade(steps - 2)
  [Previous line repeated 983 more times]
  File "c:\Users\GamerNoTitle\Desktop\Untitled.py", line 4, in degrade
    def degrade(steps):
  File "c:\Users\GamerNoTitle\.vscode\extensions\ms-python.python-2022.18.2\pythonFiles\lib\python\debugpy\_vendored\pydevd\_pydevd_bundle\pydevd_trace_dispatch_regular.py", line 469, in __call__
    return None if event == 'call' else NO_FTRACE
RecursionError: maximum recursion depth exceeded in comparison
```
##  DP算法

### 核心问题

- 合成问题
- 初始状态（就是`i=1`和`i=2`的状态）
- 计算后续状态

## DP算法求解

还是上面那个跳台阶问题

```python
steps = int(input('Steps: '))   # 台阶数

def degrade(steps):
    result = [0] * (steps + 1)
    result[1], result[2] = 1, 2
    for i in range(3, steps+1):
        result[i] = result[i-1] + result[i-2]
    return result[steps]

print(degrade(steps))

```

输出

```
Steps: 10000
54438373113565281338734260993750380135389184554695967026247715841208582865622349017083051547938960541173822675978026317384359584751116241439174702642959169925586334117906063048089793531476108466259072759367899150677960088306597966641965824937721800381441158841042480997984696487375337180028163763317781927941101369262750979509800713596718023814710669912644214775254478587674568963808002962265133111359929762726679441400101575800043510777465935805362502461707918059226414679005690752321895868142367849593880756423483754386342639635970733756260098962462668746112041739819404875062443709868654315626847186195620146126642232711815040367018825205314845875817193533529827837800351902529239517836689467661917953884712441028463935449484614450778762529520961887597272889220768537396475869543159172434537193611263743926337313005896167248051737986306368115003088396749587102619524631352447499505204198305187168321623283859794627245919771454628218399695789223798912199431775469705216131081096559950638297261253848242007897109054754028438149611930465061866170122983288964352733750792786069444761853525144421077928045979904561298129423809156055033032338919609162236698759922782923191896688017718575555520994653320128446502371153715141749290913104897203455577507196645425232862022019506091483585223882711016708433051169942115775151255510251655931888164048344129557038825477521111577395780115868397072602565614824956460538700280331311861485399805397031555727529693399586079850381581446276433858828529535803424850845426446471681531001533180479567436396815653326152509571127480411928196022148849148284389124178520174507305538928717857923509417743383331506898239354421988805429332440371194867215543576548565499134519271098919802665184564927827827212957649240235507595558205647569365394873317659000206373126570643509709482649710038733517477713403319028105575667931789470024118803094604034362953471997461392274791549730356412633074230824051999996101549784667340458326852960388301120765629245998136251652347093963049734046445106365304163630823669242257761468288461791843224793434406079917883360676846711185597501
```

## DP与递归的区别

DP是正着算，递归是反着算，仅此而已，思考问题的思路不同。

## 例题：网络路径数

一个机器人位于一个 m x n 网格的左上角 。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角。

问总共有多少条不同的路径？

- 示例 1

输入：m = 3, n = 7 输出：28

- 示例 2

输入：m =3, n = 2 输出：3 解释：从左上角开始，总共有 3 条路径可以到达右下角。 

1. 向右 -> 向下 -> 向下 

2. 向下 -> 向下 -> 向右 

3. 向下 -> 向右 -> 向下 

- 示例 3

输入：m =7, n = 3 

输出：28 

- 示例 4

输入：m = 3, n = 3 

输出：6

### 题解（递归法）

```python
def pathcount(m, n):
    if m == 1 or n == 1: return 1
    return pathcount(m-1, n) + pathcount(m, n-1)
```

### 题解（DP法）

```python
def pathcount(m, n):
    ls = [[0 for _ in range(n+1)] for __ in range(m+1)]
    ls[1][1] = 0
    for i in range(1, len(ls[1])):	# 初始化状态初值
        ls[1][i] = 1
    for i in range(1, len(ls)):
        ls[i][1] = 1
    ls[1][2] = 1
    ls[2][1] = 1
    for b in range(2, m+1): # b是行
        for a in range(2, n+1): # a是列
            ls[b][a] = ls[b-1][a] + ls[b][a-1]
    print(ls)
    return ls[m][n]
```



