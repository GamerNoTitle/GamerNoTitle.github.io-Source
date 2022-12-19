---
title: 使用Fly.io平台部署哔哩漫游服务器
date: 2022-12-18 17:11:03
tags: Tech
categories: Tech
cover: https://cdn.bilicdn.tk/gh/Vikutorika/newassets/img/Deploy-biliroaming-go-server-with-flyio/msedge_EB3k3IEoNv.png
---

做这个是因为之前 @wuki 问我说能不能用[Deploy app servers close to your users · Fly](https://fly.io/)这个平台弄哔哩漫游服务器，然后借了我一个号，结果陆陆续续总共拖了将近半年才弄出来，在这留个记录。

{% note warning %}

请注意：fly.io平台免费账户需要信用卡验证后才能够部署项目！

{% endnote %}

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets/img/Deploy-biliroaming-go-server-with-flyio/msedge_EB3k3IEoNv.png)

---

这里我们使用的项目是[JasonKhew96/biliroaming-go-server (github.com)](https://github.com/JasonKhew96/biliroaming-go-server)

根据fly.io官方的文档，有以下地区可选（[Regions · Fly Docs](https://fly.io/docs/reference/regions/#fly-io-regions)）

| Region ID | Region Location              | Gateway* |
| --------- | ---------------------------- | -------- |
| ams       | Amsterdam, Netherlands       | ✓        |
| cdg       | Paris, France                | ✓        |
| den       | Denver, Colorado (US)        | ✓        |
| dfw       | Dallas, Texas (US)           | ✓        |
| ewr       | Secaucus, NJ (US)            |          |
| fra       | Frankfurt, Germany           | ✓        |
| gru       | São Paulo                    |          |
| **hkg**   | **Hong Kong, Hong Kong**     | **✓**    |
| iad       | Ashburn, Virginia (US)       |          |
| jnb       | Johannesburg, South Africa   |          |
| lax       | Los Angeles, California (US) | ✓        |
| lhr       | London, United Kingdom       | ✓        |
| maa       | Chennai (Madras), India      | ✓        |
| mad       | Madrid, Spain                |          |
| mia       | Miami, Florida (US)          |          |
| nrt       | Tokyo, Japan                 | ✓        |
| ord       | Chicago, Illinois (US)       | ✓        |
| otp       | Bucharest, Romania           |          |
| scl       | Santiago, Chile              | ✓        |
| sea       | Seattle, Washington (US)     | ✓        |
| sin       | Singapore                    | ✓        |
| sjc       | Sunnyvale, California (US)   | ✓        |
| syd       | Sydney, Australia            | ✓        |
| waw       | Warsaw, Poland               |          |
| yul       | Montreal, Canada             |          |
| yyz       | Toronto, Canada              | ✓        |

在这里我们选择的就是香港地区(hkg)，在部署中，它的cli是把当前目录下的文件打包为docker镜像上传到它的镜像库中再进行部署的

### 安装CLI

官网提供的安装方式如下

#### macOS

If you have the [Homebrew](https://brew.sh/) package manager installed, flyctl can be installed by running:

```shell
brew install flyctl
```

If not, you can run the install script:

```shell
curl -L https://fly.io/install.sh | sh
```

#### Linux

Run the install script:

```shell
curl -L https://fly.io/install.sh | sh
```

#### Windows

Run the Powershell install script:

```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

但是因为我的网络太小霸王了，所以我用了Github的Codespaces来作为中介去干这个

#### 使用Github Codespaces

在这个绿绿的`Code`按钮里面点到Codespaces，然后创建一个（我这里创建过了所以有一个）

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets/img/Deploy-biliroaming-go-server-with-flyio/msedge_blfgaVum2p.png)

直接打开，可以在网页打开，也可以接入自己的Vscode，进入以后按快捷键<kbd>Ctrl</kbd> + <kbd>L-Shift</kbd> + <kbd>\`</kbd>打开一个终端，并把安装`flyctl`的命令写进去

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets/img/Deploy-biliroaming-go-server-with-flyio/Code_IPvqowlcdn.png)

这样就是安装完毕了，估计是Codespaces的机制问题，所以需要通过绝对路径去访问它

输入一下命令来登录（这里我就不打绝对路径了，这里假设是用本地电脑且`flyctl`已经加入环境变量）

```shell
$ flyctl auth login
```

然后终端会显示一个链接，如果你跟我一样用的是Codespaces，那就把这个链接放到自己的浏览器里面去访问登录就行了，如果你是本地运行，应该会自动打开登录页面（没截图，登录应该是小问题）

### 初始化项目

首先打开`.gitignore`文件和`.dockerignore`文件（如果有的话），把里面的内容全部删掉，因为部署的时候我们是需要把配置文件给一起上传的，而`.gitignore`把这些文件都排除掉了，所以要删掉里面的所有内容

再打开`fly.toml`，在最底下加上这些内容

```properties
[build.args]
  BP_KEEP_FILES = "*"
```

不这么做的后果↓

```
2022-12-19T10:02:56.427 runner[86dbcaaa] hkg [info] Starting instance
2022-12-19T10:02:58.492 runner[86dbcaaa] hkg [info] Configuring virtual machine
2022-12-19T10:02:58.494 runner[86dbcaaa] hkg [info] Pulling container image
2022-12-19T10:02:59.436 runner[86dbcaaa] hkg [info] Unpacking image
2022-12-19T10:02:59.450 runner[86dbcaaa] hkg [info] Preparing kernel init
2022-12-19T10:02:59.946 runner[86dbcaaa] hkg [info] Configuring firecracker
2022-12-19T10:03:00.411 runner[86dbcaaa] hkg [info] Starting virtual machine
2022-12-19T10:03:00.671 app[86dbcaaa] hkg [info] Starting init (commit: f447594)...
2022-12-19T10:03:00.700 app[86dbcaaa] hkg [info] Preparing to run: `/cnb/process/biliroaming-go-server` as 1000
2022-12-19T10:03:00.723 app[86dbcaaa] hkg [info] 2022/12/19 10:03:00 listening on [fdaa:0:6690:a7b:7f07:86db:caaa:2]:22 (DNS: [fdaa::3]:53)
2022-12-19T10:03:00.816 app[86dbcaaa] hkg [info] 2022/12/19 10:03:00 stat ./config.yml: no such file or directory
2022-12-19T10:03:01.705 app[86dbcaaa] hkg [info] Starting clean up.
```

接着我们把`Dockerfile`删掉，因为如果有这个文件的话，`flyctl`会把这个判定为docker项目，这样的话我们就很难把配置文件丢进去，所以我们要更改它的判定，将判定改为`go`项目，所以要删掉这个

然后运行以下命令来初始化，跟着它的提示进行就行，只是最后问我们要不要部署，我们先选择不部署，因为我们接下来要导入数据库（记得把弹出来的数据库连接信息记住，因为它只会展示一次，然后就找不到啦）

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets/img/Deploy-biliroaming-go-server-with-flyio/Code_j3ENjuAEAf.png)接着我们修改一下项目的端口，将`config.example.yml`复制一份，为`config.yml`找到`port`，把后面的数字改为`8080`

接着我们打开`config.yml`修改数据库配置，找到以下内容，注释掉`passwordFile`，然后修改配置为我们前面创建数据库时给的内容

```yaml
# 数据库
postgreSQL:
  host: "<app_name>-db.internal"
  user: "postgres"
  password: 'password'
  #passwordFile: "/run/secrets/db-password"
  dbName: "<db>"
  port: 5432
```

### 导入数据库

fly.io的创建的数据库进行连接的时候是使用内部域名进行连接的（格式大概是`<app_name>-db.internal`，所以我们不能够通过正常的方式进行连接。所幸，`flyctl`里面可以把数据库给映射到本地

使用以下命令进行映射

```shell
$ flyctl proxy 5432 -a <db_name>
```

这里我就使用下面这个命令进行连接

```shell
$ flyctl proxy 5432:5432 -a biliroaming-tutorial-db
```

显示如下内容的时候就是可以进行连接了

```
Proxying local port 5432 to remote [biliroaming-tutorial-db.internal]:5432
```

codespaces还可以在`PORTS`选项卡里看到绑定的本地端口

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets/img/Deploy-biliroaming-go-server-with-flyio/Code_cKM3RAPklr.png)

这里使用navicat进行连接，在测试之前一定要确保信息填对了

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets/img/Deploy-biliroaming-go-server-with-flyio/navicat_pBpgBHRGhZ.png)

连接以后，我们在左侧可以看到两个数据库，一个是`postgres`，一个是`<app_name>`用哪个随便，不过如果要用`<app_name>`那个，就需要在配置文件里面相应地改掉（在初始化项目那里的数据库连接那个地方）

右键自己需要使用的数据库，选择`Execute SQL File`（执行SQL脚本，我这里是英文版），然后逐个将项目的sql文件夹内的脚本执行，构建数据库结构

### 部署项目

使用以下命令来部署项目

```shell
$ flyctl deploy
```

如果在部署过程中遇到了下面这个问题（用codespaces就出现了，不过这个好像是它服务器的部署器的问题而不是我codespaces的问题）

```
Error failed to fetch an image or build from source: downloading buildpack: extracting from registry gcr.io/paketo-buildpacks/go: fetching image: error pulling image configuration: error parsing HTTP 403 response body: invalid character '<' looking for beginning of value: "<?xml version='1.0' encoding='UTF-8'?><Error><Code>AccessDenied</Code><Message>Access denied.</Message><Details>We're sorry, but this service is not available in your location</Details></Error>"
```

那就要加多个`--local-only`参数，变成

```shell
$ flyctl deploy --local-only
```

当你的fly.io项目的`monitor`里面显示如下就是部署成功了

```
2022-12-19T10:35:04.789 runner[fa79ac75] hkg [info] Starting instance
2022-12-19T10:35:07.119 runner[fa79ac75] hkg [info] Configuring virtual machine
2022-12-19T10:35:07.121 runner[fa79ac75] hkg [info] Pulling container image
2022-12-19T10:35:14.098 runner[fa79ac75] hkg [info] Unpacking image
2022-12-19T10:35:15.511 runner[fa79ac75] hkg [info] Preparing kernel init
2022-12-19T10:35:15.926 runner[fa79ac75] hkg [info] Configuring firecracker
2022-12-19T10:35:16.157 runner[fa79ac75] hkg [info] Starting virtual machine
2022-12-19T10:35:16.547 app[fa79ac75] hkg [info] Starting init (commit: f447594)...
2022-12-19T10:35:16.591 app[fa79ac75] hkg [info] Preparing to run: `/cnb/process/biliroaming-go-server` as 1000
......
2022-12-19T10:35:17.834 app[fa79ac75] hkg [info] DELETE FROM "th_subtitle_caches" WHERE ("th_subtitle_caches"."updated_at" <= $1);
2022-12-19T10:35:17.834 app[fa79ac75] hkg [info] [2022-12-19 10:20:17.834077308 +0000 UTC]
2022-12-19T10:35:17.835 app[fa79ac75] hkg [info] 2022-12-19T10:35:17.835Z DEBUG biliroaming-go-server/main.go:124 Cleanup 0 TH subtitle cache
```

### 获取ipv4地址

因为fly.io默认只分配了ipv6地址，然而ipv6还没有普及，我们还是需要ipv4的

使用以下命令来为项目获取ipv4地址

```shell
$ flyctl ips allocate-v4 -a <app_name>
```

会显示获取到的IP地址等信息

```
VERSION IP              TYPE    REGION  CREATED AT 
v4      149.248.221.246 public  global  7s ago    
```

### 已知的bug

#### 显示“账号未登录”

![](https://cdn.bilicdn.tk/gh/Vikutorika/newassets/img/Deploy-biliroaming-go-server-with-flyio/QQ图片20221219181007.jpg)

