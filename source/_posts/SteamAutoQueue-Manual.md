---
title: SteamAutoQueue —— Steam自动探索3次队列，帮你拿到促销期间的卡牌！
date: 2022-06-21 19:47:41
tags: Tech
categories: Tech
cover: https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/SteamAutoQueue/msedge-20220627-225929.png
---

**其实这个我从夏促前就开始写了，只不过刚好那一周撞上各种考试，所以就保证了本地Windows版本的正常运行，Linux的就没动，等到周末再干的时候夏促已经开始了……**

为啥我要做这个？主要是学生党又不是天天开电脑，像TemperMonkey的那种自动探索队列的脚本或者是Steam++里面带的那个，都要打开电脑，再去打开浏览器或者是Steam，所以我就做了一个这个不需要打开任何东西的。

因为完成太晚了，所以等到冬促的时候我再去推广吧，要是有哪位大哥愿意帮我推广的尽管发就行了，发完了[站内艾特一下我](https://space.bilibili.com/44666814)~

> 先点个STAR✨，我们马上开始教学！

## 简体中文

- [变量获取](#变量获取)
- [在Github Action运行](#在Github%20Action运行)

### 变量获取

首先先打开你的Steam商店，正常登录你的账号后（登录时一定要选择`在这台电脑上记住我`），按<kbd>F12</kbd>打开开发者工具

然后在上面的导航栏找到应用程序(Application)，然后在左边的树状图导航栏找到`cookie` -> `https://store.steampowered.com`

你应该会看到像我图示的这样的表格

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/SteamAutoQueue/msedge-20220702-170037.png)

在这里面我们需要找到以下内容，对应着config文件的配置（<`名称`: `变量类型`>）

其中`proxy`是代理的地址，这个根据自己的需求去填写（有的人可能会开v2ray啥的，所以做了个这个，如果是在Github Action运行则不需要这个）

**请注意，`steamRememberLogin`只有一个月的有效期，目前不清楚缺少这个是否能够运行（主要因为我懒我没测）**

```
{
    "proxy": "",
    "steam": {
        "sessionid": <sessionid: str>,
        "steamRememberLogin": <steamRememberLogin: str>,
        "steamMachineAuth": <steamMachineAuth76560000000000000: str>,
        "steamLoginSecure": <steamLoginSecure: str>,
        "browserid": <browserid: str>,
        "steamID64": <Steam64位ID，就是steamMachineAuth后面的数字: str>
    }
}
```

下面是一个例子（例子中的内容对应的账号已经退出登录，故内容为无效cookie）

```
{
    "proxy": "",
    "steam": {
        "sessionid": "9775e63b29f841ea44c4d5f2",
        "steamRememberLogin": "76561199072167687%7C%7C326064558c5f741e8770684f1a394570",
        "steamMachineAuth": "9C424851054888334B954705A300E59CD9E050B5",
        "steamLoginSecure": "76561199072167687%7C%7C19A14B89549F7DA47F0E071CC9D33FEF63D5EC27",
        "browserid": "2683598387774835722",
        "steamID64": "76561199072167687"
    }
}
```

### 在Github Action运行

首先先打开仓库页面，Fork一份 -> [ElainaMoe/SteamAutoQueue: 利用Github Action来Steam自动探索队列，不是油猴脚本，不需要打开浏览器或者Steam就可以运行，促销期间必备！](https://github.com/ElainaMoe/SteamAutoQueue)

然后点击Settings ->  Secrets -> Actions，进入变量添加页面

添加如图所示的变量，[变量获取请查看这里](#变量获取)

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/SteamAutoQueue/msedge-20220702-171847.png)

当然你也可以把Cookie用仓库里自带的`SetCookie.py`脚本放到你的Redis数据库里（填写`config.json`的`Steam`相关字段后，只需要把`Steam`键下的内容贴进脚本里设置就行了），这样你就不需要一个一个加，但是不是所有人都有数据库，所以说没有数据库的话就一个一个来吧。

添加完后点击顶上导航栏的Action按钮，然后点击中间的绿色按钮开启Action

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/SteamAutoQueue/msedge-20220702-172116.png)

然后按照如图所示的方式打开两个Action脚本

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/SteamAutoQueue/msedge-20220702-172237.png)

打开后可以运行一次看看结果，一般来说没有打叉就是没啥问题了

运行结果应该像下面这个这样（注：我这里Cookie的设置方式不太一样，我放在了Redis里面）

```
2022-07-02 09:15:54:INFO:
     __ _                           _         _            ____                       
    / _\ |_ ___  __ _ _ __ ___     /_\  _   _| |_ ___     /___ \_   _  ___ _   _  ___ 
    \ \| __/ _ \/ _` | '_ ` _ \   //_\\| | | | __/ _ \   //  / / | | |/ _ \ | | |/ _ \
    _\ \ ||  __/ (_| | | | | | | /  _  \ |_| | || (_) | / \_/ /| |_| |  __/ |_| |  __/
    \__/\__\___|\__,_|_| |_| |_| \_/ \_/\__,_|\__\___/  \___,_\ \__,_|\___|\__,_|\___|
                                                            -- Made by GamerNoTitle
2022-07-02 09:15:55:INFO:[SteamAutoQueue] Cookie get from Redis
2022-07-02 09:15:55:INFO:[SteamAutoQueue] Initalizing instance...
2022-07-02 09:15:56:INFO:[SteamAutoQueue] Instance initalized.
2022-07-02 09:15:56:INFO:[SteamAutoQueue] Trying to access steam store.
2022-07-02 09:15:57:INFO:[SteamAutoQueue] Successfully access steam store. Adding cookie...
2022-07-02 09:15:57:INFO:[SteamAutoQueue] Successfully add cookie.
2022-07-02 09:15:59:INFO:[SteamAutoQueue] You have been logged in as 
2022-07-02 09:15:59:INFO:[SteamAutoQueue] Try to start the queue.
2022-07-02 09:15:59:INFO:[SteamAutoQueue] Start the queue failed, maybe you have already started a queue.
2022-07-02 09:15:59:INFO:[SteamAutoQueue] We will try to spawn a new one.
2022-07-02 09:16:06:INFO:[SteamAutoQueue] Starting Queue No.1
2022-07-02 09:16:06:INFO:[SteamAutoQueue] Exploring 终暮黎明 with link https://store.steampowered.com/app/1823890/_/
2022-07-02 09:16:08:INFO:[SteamAutoQueue] Exploring 未命名穿越记录 with link https://store.steampowered.com/app/1548680/_/
2022-07-02 09:16:10:INFO:[SteamAutoQueue] Exploring Noctem with link https://store.steampowered.com/app/1701740/Noctem/
2022-07-02 09:16:11:INFO:[SteamAutoQueue] Exploring Dagon: by H. P. Lovecraft with link https://store.steampowered.com/app/1481400/Dagon_by_H_P_Lovecraft/
2022-07-02 09:16:13:INFO:[SteamAutoQueue] Exploring Trash Horror Collection with link https://store.steampowered.com/app/2017370/Trash_Horror_Collection/
2022-07-02 09:16:16:INFO:[SteamAutoQueue] Exploring Critters for Sale with link https://store.steampowered.com/app/1078420/Critters_for_Sale/
2022-07-02 09:16:17:INFO:[SteamAutoQueue] Exploring Will Die Alone with link https://store.steampowered.com/app/1879820/Will_Die_Alone/
2022-07-02 09:16:19:INFO:[SteamAutoQueue] Exploring Faded Stories: Greenberg with link https://store.steampowered.com/app/1837820/Faded_Stories_Greenberg/
2022-07-02 09:16:20:INFO:[SteamAutoQueue] Exploring Cyclone with link https://store.steampowered.com/app/1803590/Cyclone/
2022-07-02 09:16:23:INFO:[SteamAutoQueue] Exploring QUICKERFLAK_RUTHLESSMOD with link https://store.steampowered.com/app/2010110/QUICKERFLAK_RUTHLESSMOD/
2022-07-02 09:16:25:INFO:[SteamAutoQueue] Exploring 智能工厂大亨：序章 with link https://store.steampowered.com/app/1810980/_/
2022-07-02 09:16:26:INFO:[SteamAutoQueue] Found age check when accessing https://store.steampowered.com/agecheck/app/919290/, skipping.
2022-07-02 09:16:27:INFO:[SteamAutoQueue] Queue is empty, trying to spawn a new one.
2022-07-02 09:16:32:INFO:[SteamAutoQueue] Spawned. Now we will continue the work.
2022-07-02 09:16:32:INFO:[SteamAutoQueue] Starting Queue No.2
2022-07-02 09:16:32:INFO:[SteamAutoQueue] Exploring 元宇宙-原始世界 with link https://store.steampowered.com/app/1757830/_/
2022-07-02 09:16:34:INFO:[SteamAutoQueue] Exploring 残世界的鸢尾花 with link https://store.steampowered.com/app/1669330/_/
2022-07-02 09:16:37:INFO:[SteamAutoQueue] Exploring 重力朋克 with link https://store.steampowered.com/app/1831520/_/
2022-07-02 09:16:38:INFO:[SteamAutoQueue] Exploring 最后的夜晚 Babel with link https://store.steampowered.com/app/1436980/_Babel/
2022-07-02 09:16:40:INFO:[SteamAutoQueue] Exploring 畢業生模擬器 with link https://store.steampowered.com/app/1806070/_/
2022-07-02 09:16:41:INFO:[SteamAutoQueue] Found age check when accessing https://store.steampowered.com/agecheck/app/1762700/, skipping.
2022-07-02 09:16:43:INFO:[SteamAutoQueue] Exploring Zcrew(Z字特遣队) with link https://store.steampowered.com/app/1386650/ZcrewZ/
2022-07-02 09:16:45:INFO:[SteamAutoQueue] Exploring Firelight Fantasy: Vengeance with link https://store.steampowered.com/app/1668780/Firelight_Fantasy_Vengeance/
2022-07-02 09:16:47:INFO:[SteamAutoQueue] Exploring Orakyubu with link https://store.steampowered.com/app/1654900/Orakyubu/
2022-07-02 09:16:54:INFO:[SteamAutoQueue] Exploring Crazy Kung Fu with link https://store.steampowered.com/app/1340300/Crazy_Kung_Fu/
2022-07-02 09:16:55:INFO:[SteamAutoQueue] Exploring Gunborg: Dark Matters with link https://store.steampowered.com/app/1529160/Gunborg_Dark_Matters/
2022-07-02 09:16:57:INFO:[SteamAutoQueue] Exploring Cyrah's Ascent with link https://store.steampowered.com/app/1992850/Cyrahs_Ascent/
2022-07-02 09:16:58:INFO:[SteamAutoQueue] Queue is empty, trying to spawn a new one.
2022-07-02 09:17:03:INFO:[SteamAutoQueue] Spawned. Now we will continue the work.
2022-07-02 09:17:03:INFO:[SteamAutoQueue] Starting Queue No.3
2022-07-02 09:17:03:INFO:[SteamAutoQueue] Exploring 恋与你 Love with You with link https://store.steampowered.com/app/1814380/_Love_with_You/
2022-07-02 09:17:08:INFO:[SteamAutoQueue] Exploring 堪舆剑冢 with link https://store.steampowered.com/app/1640150/_/
2022-07-02 09:17:10:INFO:[SteamAutoQueue] Exploring Villwars with link https://store.steampowered.com/app/2013990/Villwars/
2022-07-02 09:17:11:INFO:[SteamAutoQueue] Exploring Siege of Treboulain with link https://store.steampowered.com/app/1849760/Siege_of_Treboulain/
2022-07-02 09:17:13:INFO:[SteamAutoQueue] Exploring Contract Killer with link https://store.steampowered.com/app/1588250/Contract_Killer/
2022-07-02 09:17:15:INFO:[SteamAutoQueue] Exploring Tales From Hoia Baciu Forest with link https://store.steampowered.com/app/2002560/Tales_From_Hoia_Baciu_Forest/
2022-07-02 09:17:16:INFO:[SteamAutoQueue] Exploring Endlanders : First Encounter with link https://store.steampowered.com/app/2010450/Endlanders__First_Encounter/
2022-07-02 09:17:18:INFO:[SteamAutoQueue] Exploring Flight Of Nova with link https://store.steampowered.com/app/1069190/Flight_Of_Nova/
2022-07-02 09:17:19:INFO:[SteamAutoQueue] Exploring Gary Grigsby's War in the East 2 with link https://store.steampowered.com/app/1775550/Gary_Grigsbys_War_in_the_East_2/
2022-07-02 09:17:21:INFO:[SteamAutoQueue] Exploring DOOM TOMB with link https://store.steampowered.com/app/1893050/DOOM_TOMB/
2022-07-02 09:17:22:INFO:[SteamAutoQueue] Exploring Nyaaaanvy with link https://store.steampowered.com/app/1771990/Nyaaaanvy/
2022-07-02 09:17:24:INFO:[SteamAutoQueue] Exploring Batho[tel] with link https://store.steampowered.com/app/1981590/Bathotel/
2022-07-02 09:17:25:INFO:[SteamAutoQueue] SteamAutoQueue's work has done!
```

### 无法运行/发现Bug

请带着你的运行日志到[Issues · ElainaMoe/SteamAutoQueue (github.com)](https://github.com/ElainaMoe/SteamAutoQueue/issues)报个BUG吧

## English

- [Getting variables](#Getting%20variables)
- [Run on Github Action](#Run%20on%20Github%20Action)

**Actually I started to do this before Summer-Sale. However that week is filled with examinations. So I just guarantee the Windows local version can be run successfully and left Linux behind. When it comes to the weekend, it was the time that Summer-Sale has began......**

Why I made this? For the reason that as a student, I will not open my computer everyday. The script that run on TemperMoney or the one in Steam++ need a browser or Steam client to run. So I make this one that no anything need to open.

But I finish this too late, so when it comes to the Winter-Sale that I will promote it by myself. If  you're willing to promote my script, just do it. No any permission needed. After you promote it, just left you link in the comment below. Thank you!

> Give me a STAR ✨ and we will start now.

### Getting variables

First, you need to open your browser and login your Steam account (`Remember me on this computer` should be checked), then press <kbd>F12</kbd> to open the developer tool.

Find the `Application` button on the nav-bar and find `cookie` -> `https://store.steampowered.com` on the tree-nav on the left.

You will see the sheets like this

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/SteamAutoQueue/msedge-20220702-170037.png)

What we need is to find the content for the config below (<`name`: `Variable-Type`>)

`proxy` is the address that you need to use for proxy, use it as you need. (Some one will use v2ray or something else so I made this. If you're running on Github Action, then this is not needed.)

**CAUTION: `steamRememberLogin` is valid for one month, and I didn't know whether the script can be run if this is missing (Actually the thing is that I'm too lazy to test it.)**

```
{
    "proxy": "",
    "steam": {
        "sessionid": <sessionid: str>,
        "steamRememberLogin": <steamRememberLogin: str>,
        "steamMachineAuth": <steamMachineAuth76560000000000000: str>,
        "steamLoginSecure": <steamLoginSecure: str>,
        "browserid": <browserid: str>,
        "steamID64": <Steam 64ID, you can find it behind steamMachineAuth: str>
    }
}
```

This is an example (This account has been logged out so this is not valid for using)

```
{
    "proxy": "",
    "steam": {
        "sessionid": "9775e63b29f841ea44c4d5f2",
        "steamRememberLogin": "76561199072167687%7C%7C326064558c5f741e8770684f1a394570",
        "steamMachineAuth": "9C424851054888334B954705A300E59CD9E050B5",
        "steamLoginSecure": "76561199072167687%7C%7C19A14B89549F7DA47F0E071CC9D33FEF63D5EC27",
        "browserid": "2683598387774835722",
        "steamID64": "76561199072167687"
    }
}
```

### Run on Github Action

First open the repo and fork it -> [ElainaMoe/SteamAutoQueue: Using Github Action to explore Steam queue every day. You will need it when it comes to the Summer/Winter Sale.](https://github.com/ElainaMoe/SteamAutoQueue)

Then click on Settings ->  Secrets -> Actions to enter the page to add variables

Add the variables shown on this picture, [you can know how to get then from here](#Getting variables)

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/SteamAutoQueue/msedge-20220702-171847.png)

The other way is that you can run the internal script `SetCookie.py` to place your config in your Redis. (Just fill in the `Steam` key in `config.json` and paste the `key` and `value` of `Steam` key in the `config.json` .) But not everyone has a Redis database. So if you don't have one, then you should add it one-by-one.

After you finishing it, click the Action button from nav-bar and click the green button on the center to turn Action on.

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/SteamAutoQueue/msedge-20220702-172116.png)

Then enable the two scripts like this in the picture.

![](https://cdn.bilicdn.tk/gh/Vikutorika/assets@master/img/SteamAutoQueue/msedge-20220702-172237.png)

After you opened them, you can run them by yourself. If it doesn't display something wrong, then you have finished.

The result should like this (I placed the variables in my Redis)

```
2022-07-02 09:15:54:INFO:
     __ _                           _         _            ____                       
    / _\ |_ ___  __ _ _ __ ___     /_\  _   _| |_ ___     /___ \_   _  ___ _   _  ___ 
    \ \| __/ _ \/ _` | '_ ` _ \   //_\\| | | | __/ _ \   //  / / | | |/ _ \ | | |/ _ \
    _\ \ ||  __/ (_| | | | | | | /  _  \ |_| | || (_) | / \_/ /| |_| |  __/ |_| |  __/
    \__/\__\___|\__,_|_| |_| |_| \_/ \_/\__,_|\__\___/  \___,_\ \__,_|\___|\__,_|\___|
                                                            -- Made by GamerNoTitle
2022-07-02 09:15:55:INFO:[SteamAutoQueue] Cookie get from Redis
2022-07-02 09:15:55:INFO:[SteamAutoQueue] Initalizing instance...
2022-07-02 09:15:56:INFO:[SteamAutoQueue] Instance initalized.
2022-07-02 09:15:56:INFO:[SteamAutoQueue] Trying to access steam store.
2022-07-02 09:15:57:INFO:[SteamAutoQueue] Successfully access steam store. Adding cookie...
2022-07-02 09:15:57:INFO:[SteamAutoQueue] Successfully add cookie.
2022-07-02 09:15:59:INFO:[SteamAutoQueue] You have been logged in as 
2022-07-02 09:15:59:INFO:[SteamAutoQueue] Try to start the queue.
2022-07-02 09:15:59:INFO:[SteamAutoQueue] Start the queue failed, maybe you have already started a queue.
2022-07-02 09:15:59:INFO:[SteamAutoQueue] We will try to spawn a new one.
2022-07-02 09:16:06:INFO:[SteamAutoQueue] Starting Queue No.1
2022-07-02 09:16:06:INFO:[SteamAutoQueue] Exploring 终暮黎明 with link https://store.steampowered.com/app/1823890/_/
2022-07-02 09:16:08:INFO:[SteamAutoQueue] Exploring 未命名穿越记录 with link https://store.steampowered.com/app/1548680/_/
2022-07-02 09:16:10:INFO:[SteamAutoQueue] Exploring Noctem with link https://store.steampowered.com/app/1701740/Noctem/
2022-07-02 09:16:11:INFO:[SteamAutoQueue] Exploring Dagon: by H. P. Lovecraft with link https://store.steampowered.com/app/1481400/Dagon_by_H_P_Lovecraft/
2022-07-02 09:16:13:INFO:[SteamAutoQueue] Exploring Trash Horror Collection with link https://store.steampowered.com/app/2017370/Trash_Horror_Collection/
2022-07-02 09:16:16:INFO:[SteamAutoQueue] Exploring Critters for Sale with link https://store.steampowered.com/app/1078420/Critters_for_Sale/
2022-07-02 09:16:17:INFO:[SteamAutoQueue] Exploring Will Die Alone with link https://store.steampowered.com/app/1879820/Will_Die_Alone/
2022-07-02 09:16:19:INFO:[SteamAutoQueue] Exploring Faded Stories: Greenberg with link https://store.steampowered.com/app/1837820/Faded_Stories_Greenberg/
2022-07-02 09:16:20:INFO:[SteamAutoQueue] Exploring Cyclone with link https://store.steampowered.com/app/1803590/Cyclone/
2022-07-02 09:16:23:INFO:[SteamAutoQueue] Exploring QUICKERFLAK_RUTHLESSMOD with link https://store.steampowered.com/app/2010110/QUICKERFLAK_RUTHLESSMOD/
2022-07-02 09:16:25:INFO:[SteamAutoQueue] Exploring 智能工厂大亨：序章 with link https://store.steampowered.com/app/1810980/_/
2022-07-02 09:16:26:INFO:[SteamAutoQueue] Found age check when accessing https://store.steampowered.com/agecheck/app/919290/, skipping.
2022-07-02 09:16:27:INFO:[SteamAutoQueue] Queue is empty, trying to spawn a new one.
2022-07-02 09:16:32:INFO:[SteamAutoQueue] Spawned. Now we will continue the work.
2022-07-02 09:16:32:INFO:[SteamAutoQueue] Starting Queue No.2
2022-07-02 09:16:32:INFO:[SteamAutoQueue] Exploring 元宇宙-原始世界 with link https://store.steampowered.com/app/1757830/_/
2022-07-02 09:16:34:INFO:[SteamAutoQueue] Exploring 残世界的鸢尾花 with link https://store.steampowered.com/app/1669330/_/
2022-07-02 09:16:37:INFO:[SteamAutoQueue] Exploring 重力朋克 with link https://store.steampowered.com/app/1831520/_/
2022-07-02 09:16:38:INFO:[SteamAutoQueue] Exploring 最后的夜晚 Babel with link https://store.steampowered.com/app/1436980/_Babel/
2022-07-02 09:16:40:INFO:[SteamAutoQueue] Exploring 畢業生模擬器 with link https://store.steampowered.com/app/1806070/_/
2022-07-02 09:16:41:INFO:[SteamAutoQueue] Found age check when accessing https://store.steampowered.com/agecheck/app/1762700/, skipping.
2022-07-02 09:16:43:INFO:[SteamAutoQueue] Exploring Zcrew(Z字特遣队) with link https://store.steampowered.com/app/1386650/ZcrewZ/
2022-07-02 09:16:45:INFO:[SteamAutoQueue] Exploring Firelight Fantasy: Vengeance with link https://store.steampowered.com/app/1668780/Firelight_Fantasy_Vengeance/
2022-07-02 09:16:47:INFO:[SteamAutoQueue] Exploring Orakyubu with link https://store.steampowered.com/app/1654900/Orakyubu/
2022-07-02 09:16:54:INFO:[SteamAutoQueue] Exploring Crazy Kung Fu with link https://store.steampowered.com/app/1340300/Crazy_Kung_Fu/
2022-07-02 09:16:55:INFO:[SteamAutoQueue] Exploring Gunborg: Dark Matters with link https://store.steampowered.com/app/1529160/Gunborg_Dark_Matters/
2022-07-02 09:16:57:INFO:[SteamAutoQueue] Exploring Cyrah's Ascent with link https://store.steampowered.com/app/1992850/Cyrahs_Ascent/
2022-07-02 09:16:58:INFO:[SteamAutoQueue] Queue is empty, trying to spawn a new one.
2022-07-02 09:17:03:INFO:[SteamAutoQueue] Spawned. Now we will continue the work.
2022-07-02 09:17:03:INFO:[SteamAutoQueue] Starting Queue No.3
2022-07-02 09:17:03:INFO:[SteamAutoQueue] Exploring 恋与你 Love with You with link https://store.steampowered.com/app/1814380/_Love_with_You/
2022-07-02 09:17:08:INFO:[SteamAutoQueue] Exploring 堪舆剑冢 with link https://store.steampowered.com/app/1640150/_/
2022-07-02 09:17:10:INFO:[SteamAutoQueue] Exploring Villwars with link https://store.steampowered.com/app/2013990/Villwars/
2022-07-02 09:17:11:INFO:[SteamAutoQueue] Exploring Siege of Treboulain with link https://store.steampowered.com/app/1849760/Siege_of_Treboulain/
2022-07-02 09:17:13:INFO:[SteamAutoQueue] Exploring Contract Killer with link https://store.steampowered.com/app/1588250/Contract_Killer/
2022-07-02 09:17:15:INFO:[SteamAutoQueue] Exploring Tales From Hoia Baciu Forest with link https://store.steampowered.com/app/2002560/Tales_From_Hoia_Baciu_Forest/
2022-07-02 09:17:16:INFO:[SteamAutoQueue] Exploring Endlanders : First Encounter with link https://store.steampowered.com/app/2010450/Endlanders__First_Encounter/
2022-07-02 09:17:18:INFO:[SteamAutoQueue] Exploring Flight Of Nova with link https://store.steampowered.com/app/1069190/Flight_Of_Nova/
2022-07-02 09:17:19:INFO:[SteamAutoQueue] Exploring Gary Grigsby's War in the East 2 with link https://store.steampowered.com/app/1775550/Gary_Grigsbys_War_in_the_East_2/
2022-07-02 09:17:21:INFO:[SteamAutoQueue] Exploring DOOM TOMB with link https://store.steampowered.com/app/1893050/DOOM_TOMB/
2022-07-02 09:17:22:INFO:[SteamAutoQueue] Exploring Nyaaaanvy with link https://store.steampowered.com/app/1771990/Nyaaaanvy/
2022-07-02 09:17:24:INFO:[SteamAutoQueue] Exploring Batho[tel] with link https://store.steampowered.com/app/1981590/Bathotel/
2022-07-02 09:17:25:INFO:[SteamAutoQueue] SteamAutoQueue's work has done!
```

### Unable to run / Find a bug

Please go to [Issues · ElainaMoe/SteamAutoQueue (github.com)](https://github.com/ElainaMoe/SteamAutoQueue/issues) and submit a issue. Thanks!
