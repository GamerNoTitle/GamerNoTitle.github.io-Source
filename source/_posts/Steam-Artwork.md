---
title: Steam资料美化 —— 让你的展柜变得好看！
date: 2020-09-26 08:52:29
tags: [Software, Steam, Customize]
categories: Software
cover: https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/cover.png
---

你也想拥有想别人那样Steam资料有自己喜欢的人物嘛？你也想自己动动手，让自己的Steam资料变得好看吗？现在你不需要去某宝/某东，只要你跟着做，你就能够做到！

观前提示：本教程全程使用Photoshop（包括模板文件），请自备该软件~（另：抠图不是我应该教的）

话不多说，先上一张效果图（你也可以到[我的Steam个人资料](https://steamcommunity.com/id/bili33/)页面查看）

![效果图](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/cover.png)

---

### 找图

找图当然是最重要的呀，没有图哪里来的背景……如果你的Steam个人资料没有背景，你可以去[点数商店](https://store.steampowered.com/points/shop/)换一个自己喜欢的（点数确实挺难赚的就是了，G胖心里偷喜）

接着我们打开自己的Steam库存，选择你想用来做背景的图，点击查看完整大小

![查看完整大小](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/showfull.png)

你可以直接点击它，你也可以右键复制链接地址，反正我们需要的是链接

接着我们打开[Steam.Design](https://steam.design/)，把自己的链接贴进去点"Change BG"，然后点Download Images

![操作步骤](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/SteamDesign.png)

下载下来是个压缩包，我们只要里面的`Artwork_Middle.png`和`Artwork_Right_Top.png`即可，如果你对头像也有要求可以把`Avatar.png`也用上，但是本教程不涉及

至于人物图嘛……[P站](https://www.pixiv.net/)很多自己找吧

### 裁剪

接下来就是要Photoshop的时候了，我会完整告诉你怎么弄，当然你也可以直接下载我提供的[模板（懒人必备）](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/Tamplate.psd)，可以省去切片的步骤，直接把图片拖进去然后保存即可

我们先新建一个607\*942的空白画布，如图

![新建画布](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/NewFile.png)

打开来就是一个纯空白的文件，接着把我们下载的两个图片拖进去

![拖~进去](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/DrugIn.png)

然后把两个图片分别拖到左右两边，大的在做，小的在右。如果你操作正确的话中间会留下一列空白（纯色）

![正确操作](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/CorrectlyOperated.png)

接着把自己的人物图放进去（请先自己扣好图），如果人物被挡住了需要把人的那一个图层向上移动（两个背景图层没有顺序要求，但是人物一定要在上面）

![图层排列](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/Upward.png)

重点来了！选择切片工具（如果你没有切片工具，请右键裁切工具选择切片工具）![工具选择](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/Tool.png)

从透明的那一列开始往下拉到底，将图划分为三个区域（因为透明那一列也是一个区域）

![划分区域](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/Cutting.png)

![区域显示](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/Devided.png)

如果你不放心自己是否裁切对了，你可以按住`Alt`+`鼠标滑轮上`放大来检视自己的操作，如果不对，就可以将切片线移动到正确位置

![放大检视](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/ShowDetail.png)

最后我们按住`Ctrl`+`Alt`+`Shift`+`S`，进行文件的保存（**品质手动拉到100**）文件名随便你，反正我们用不到文件名，裁剪就完成了

### 上传

我们打开[Steam艺术作品上传页面](https://steamcommunity.com/sharedfiles/edititem/767/3/)（需要梯子或者Steamcommunity302），添加自己的文件，给自己的作品命名

重点来啦！按F12打开开发者工具，选择console，将以下的代码复制进去按回车运行

```javascript
var num= document.getElementsByName("image_width")[0].value;

document.getElementsByName("image_height")[0].value = num-(num-1);

document.getElementsByName("image_width")[0].value= num*100;
```

最后会得到一行数字（两个数字的结果不一样，第一个是`50600`，第二个是`10000`，两个都要运行）

![开发者工具](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/DeveloperTool.png)

上传完成后我们点到Steam编辑个人资料，选择艺术作品展柜，并将自己的艺术作品展示出来，保存

![修改个人资料展柜](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/Edit.png)

这样你就得到了属于你自己的Steam个人资料页面了！

![效果图](https://cdn1.tianli0.top/gh/Vikutorika/assets@master/img/Steam-Artworks/cover.png)

---

### 题外话

最近Leancloud国际版又崩了……评论获取不到，烦……

原神挺好玩的，虽然我每天有一个半小时的限制……

CSGO的排位还没打完哭了……昨晚三连跪了