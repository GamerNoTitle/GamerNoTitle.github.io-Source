---
title: 从零开始的Python ACM Ch.4：序列和字符串的算法
date: 2022-10-29 08:12:55
tags: [Coding, String]
categories: Coding
---

### UVa272 TeX中的引号

[TEX Quotes - UVA 272 - Virtual Judge (vjudge.net)](https://vjudge.net/problem/UVA-272)

- 在Tex中，左引号是``,右引号是' '。
- 给定一段包含双引号的段落，你的任务是把它转换成Tex的格式。

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Go-for-Python-Ch4/Tex.png)

#### 个人题解

```python
ArticleInput = '''
"To be or not to be," quoth the bard, "that
is the question".
The programming contestant replied: "I must disagree.
To `C' or not to `C', that is The Question!"
'''
flag = False

ArticleOutput = ''

start = 0

for place in range(len(ArticleInput)):
    if ArticleInput[place] == '"' and not flag:
        ArticleOutput += ArticleInput[start:place] + "``"
        start = place + 1
        flag = True
    elif ArticleInput[place] == '"' and flag:
        ArticleOutput += ArticleInput[start:place] + "''"
        start = place + 1
        flag = False

print(ArticleOutput)
```

输出：

```
``To be or not to be,'' quoth the bard, ``that
is the question''.
The programming contestant replied: ``I must disagree.
To `C' or not to `C', that is The Question!''
```

### **UVa10082 WERTYU**

把手放在键盘上，稍不注意就会往右错一位。这样，输入Q会变成输入W，输入J会变成输入K等。键盘如图所示。 输入一个错位后敲出来的字符串（所有字母均大写），输出打字员本来想打出的矩阵输入保证合法，即一定是错位之后的字符串。例如输入中不会出现大写字母A。多行输入 每行包括数字，空格，大写字母（除了Q，A，Z）或者是标点符号（除了“’”(L右面第2个)），标有单词的按键，如Tab，BackSp，Control等等不会出现。你需要用每个字母或者符号左面的（在如图给出的QWERTY类型的键盘）那个按键内容替换他，输入的空格不作处理，依然输出空格。

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Go-for-Python-Ch4/UVa10082.jpg)

#### 个人题解（打表真累……）

[UVa10082 - WERTYU 题解 - 1v7w - 博客园 (cnblogs.com)](https://www.cnblogs.com/1v7w/p/13870486.html)

```python
KeyboardInput = 'O S, GOMR YPFSU/'

KeyMap = {
    'W': 'Q', 'E': 'W', 'R': 'E', 'T': 'R', 'Y': 'T', 'U': 'Y', 'I': 'U','O': 'I', 'P': 'O', '[': 'P', ']': '[', '\\': ']',
    'S': 'A', 'D': 'S', 'F': 'D', 'G': 'F', 'H': 'G', 'J': 'H', 'K': 'J', 'L': 'K', ':': 'L', "'": ':',
    'X': 'Z', 'C': 'X', 'V': 'C', 'B': 'V', 'N': 'B', 'M': 'N', ',': 'M', '.': ',', '/': '.',
    '2': '1', '3': '2', '4': '3', '5': '4', '6': '5', '7': '6', '8': '7', '9': '8', '0': '9', '-': '0', '=': '-'
}

Output = ''

for key in KeyboardInput:
    try:
        Output += KeyMap[key]
    except KeyError as e:
        Output += ' '

print(Output)
```

输出：

```
I AM FINE TODAY.
```

属于是牺牲空间换时间了~

### **回文串和镜像串的判断**

输入一个字符串，判断它是否为回文串以及镜像（左右翻转）串。输入字符串保证不含数字0。所谓回文串，就是反转以后与原串相同，如abba和madam。所谓镜像串，就是左右镜像之后和原串相同，如2S和3AIAE。注意，并不是每个字符在镜像之后都能得到一个合法字符。（空白项表示该字符镜像后不能得到一个合法字符。）

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Go-for-Python-Ch4/Mirror-and-Reverse.png)

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Go-for-Python-Ch4/Mirror-and-Reverse-Sample.png)

#### 个人题解

```python
InputStrings = '''NOTAPALINDROME
ISAPALINILAPASI
2A3MEAS
ATOYOTA'''

MirrorMap = {
    'A': 'A',
    'E': '3',
    'H': 'H',
    'I': 'I',
    'J': 'L',
    'L': 'J',
    'M': 'M',
    'O': 'O',
    'S': '2',
    'T': 'T',
    'U': 'U',
    'V': 'V',
    'W': 'W',
    'X': 'X',
    'Y': 'Y',
    'Z': '5',
    '1': '1',
    '2': 'S',
    '3': 'E',
    '5': 'Z',
    '8': '8'
}

for string in InputStrings.split('\n'):
    Reverse = True if string == string[::-1] else False
    Mirror = False
    MirrorString = ''
    Valid = True
    for char in string:
        if Valid:
            if MirrorMap.get(char, False):
                MirrorString += MirrorMap[char]
            else:
                Valid = False
    if Valid and MirrorString == string[::-1]:
        Mirror = True
    if Reverse and Mirror:
        print(f'{string} -- is a mirrored palindrome.')
    elif Reverse and not Mirror:
        print(f'{string} -- is a regular palindrome.')
    elif not Reverse and Mirror:
        print(f'{string} -- is a mirrored string.')
    else:
        print(f'{string} -- is not a palindrome.')
```

输出：

```
NOTAPALINDROME -- is not a palindrome.
ISAPALINILAPASI -- is a regular palindrome.
2A3MEAS -- is a mirrored string.
ATOYOTA -- is a mirrored palindrome.
```

### UVa340 **猜数字游戏的提示**

这是一个猜数游戏，第1行是答案序列的长度，也是询问的序列的长度（输入0结束），第2行是答案序列，接下来n行是询问序列，直到输入全0结束，每一个询问你都得给出回答，(x,y)，x代表的是输入的序列中的数字与答案序列中的数字有几个是吻合的，y代表输入序列中的数字与答案序列中的数字有几个相同的，但是不在同一位置，也就是不吻合。现在请你编程实现这个功能。

![](https://registry.npmmirror.com/gamernotitle-oss/1.0.4/files/img/Go-for-Python-Ch4/Number-Game.png)

#### 个人题解

```python
length = int(input('Length: '))
Origin = input('Origin Input (Split with space): ').split(' ')

def getOutput(Input):
    NumCount = getNumMatch(Input)
    PosCount = getPosMatch(Input)
    return (PosCount, NumCount)

def getNumMatch(Input):
    NumCount = 0
    InputList = Input.split(' ')
    CheckedList = []
    for pos in range(len(InputList)):
        if InputList[pos] in Origin and InputList[pos] == Origin[pos]:
            CheckedList.append(InputList[pos])
        if InputList[pos] in Origin and InputList[pos] != Origin[pos] and not InputList[pos] in CheckedList:
            print(pos)
            NumCount += 1
    return NumCount

def getPosMatch(Input):
    PosMatch = 0
    InputList = Input.split(' ')
    print(InputList, Origin)
    for pos in range(length):
        if InputList[pos] == Origin[pos]:
            PosMatch += 1
    return PosMatch
    

if __name__ == '__main__':
    while True:
        Input = input('Input: ')
        if len(Input.split(' ')) == length and not any(Input.split(' ')):   # any()一旦里面有一个不是0就会返回True
            break
        else:
            Result = getOutput(Input)
            print(Result)
```

