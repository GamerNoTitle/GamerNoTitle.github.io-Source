---
title: 使用Github Action将当前仓库同步到Cloudflare R2存储桶
date: 2024-07-11 16:30:22
tags: [Cloudflare, R2, Github, Action]
categories: Tech
cover: https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_EpS8JUW5NW.png
---

{% note info %}

因为昨晚弄的时候忘记截图了，所以与付款有关的操作我使用小号进行的

{% endnote %}

# 前言

在一天很平常的更新域名DNS记录的时候，我忽然看到了Cloudflare又上架了一个我没见过的功能，就是左边的这个R2

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_z4qVq5MItf.png)

我点进去看了一下，看起来是个存储桶服务，而且这个价格还很亲民啊，总共10GB的存储，每个月一百万次的A类操作和一千万次的B类操作，这不比阿里云什么的香？

> Cloudflare —— 赛博菩萨

![Cloudflare R2页面——免费用量](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_KkNqo7uDml.png)

> ### Class A操作
>
> Class A操作包括：
>
> - ListBuckets（列出存储桶）
> - PutBucket（创建存储桶）
> - ListObjects（列出对象）
> - PutObject（上传对象）
> - CopyObject（复制对象）
> - CompleteMultipartUpload（完成分段上传）
> - CreateMultipartUpload（创建分段上传）
> - LifecycleStorageTierTransition（生命周期存储层转换）
> - ListMultipartUploads（列出分段上传）
> - UploadPart（上传分段）
> - UploadPartCopy（复制上传分段）
> - ListParts（列出分段）
> - PutBucketEncryption（设置存储桶加密）
> - PutBucketCors（设置存储桶跨域资源共享）
> - PutBucketLifecycleConfiguration（设置存储桶生命周期配置）
>
> ### Class B操作
>
> Class B操作包括：
>
> - HeadBucket（获取存储桶元数据）
> - HeadObject（获取对象元数据）
> - GetObject（获取对象）
> - UsageSummary（使用情况摘要）
> - GetBucketEncryption（获取存储桶加密配置）
> - GetBucketLocation（获取存储桶位置）
> - GetBucketCors（获取存储桶跨域资源共享配置）
> - GetBucketLifecycleConfiguration（获取存储桶生命周期配置）
>
> ### 免费操作
>
> 免费操作包括：
>
> - DeleteObject（删除对象）
> - DeleteBucket（删除存储桶）
> - AbortMultipartUpload（终止分段上传）

# 使用Cloudflare R2

## 开通

我开通这个服务，使用的是PayPal（毕竟没有信用卡)

在上面那张图的右上角有个蓝色的PayPal按钮你发现了吗？

PayPal应该没有区域要求，我的PayPal所属区域是中国大陆，并且我绑定的是建设银行和中国银行的卡，正常通过（付款用的中国银行卡，里面只有三十块不会扣得太狠）

地址如实填写就可以了，人也不会去查你撒

## 新建存储桶

开通以后与大多数的OSS服务一样，首先是要新建一个存储桶

开通后，这个页面会变成下图的样子

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_pSQvQJew2Y.png)

点击那个蓝色的Bucket创建一个桶就行了，名字随意，但是不能和你自己已经有的重名，我这里就新建一个`test`存储桶，地区可以随意，但我更偏向于指定一下，毕竟咱们人在亚太地区

填好了点下面的新建按钮就可以了

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_lFnb7PXXOJ.png)

## 上传文件

### 浏览器上传

当我们新建完存储桶后，就会带我们到存储桶的页面，在这个页面的Object选项卡下，直接将文件拖入页面就可以上传了

但是这样做有一定的局限性：

- 文件不得大于300MB
- 上传文件夹时，文件数目不得大于100

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_aaIJ2UuQaD.png)

### 使用Amazon CLI上传

因为Cloudflare的R2兼容亚马逊的套件，所以我们可以使用这个方法来上传，同时也可以避免浏览器上传的一些限制

#### 安装Amazon CLI

我们访问亚马逊自己的文档，找到CLI安装的一节

> [Install, update, and uninstall the AWS CLI - AWS Command Line Interface (amazon.com)](https://docs.aws.amazon.com/cli/v1/userguide/cli-chap-install.html)

根据文档和自己的系统选择合适的安装包进行安装，安装过程省略

#### 获取Cloudflare R2存储桶的链接凭据

我们访问[Cloudflare文档](https://developers.cloudflare.com/r2/api/s3/tokens/)给我们提供的链接，来到API创建页面

> https://dash.cloudflare.com/?to=/:account/r2/api-tokens

创建一个API Token，供我们待会使用

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_jSBoo5VRNg.png)

填好了点下面的`Create Token`，然后Cloudflare会给我们展示我们的凭据

我们需要的是`Access Key ID`、`Secret Access Key`和下面的`Use jurisdiction-specific endpoints for S3 clients`里面的链接，把这几个东西保存下来备用

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_jGatAIreU1.png)

#### 在AWS CLI中设置相关凭据

我们运行下面的命令，设置一下我们的凭据（将里面的内容换成自己的）

```bash
$ aws configure set aws_access_key_id <Access Key ID>
$ aws configure set aws_secret_access_key <Secret Access Key>
```

#### 上传文件

我们找到一个需要上传的文件，这里我需要上传的是一整个文件夹，但是我不想上传`.git`文件夹，于是我运行了下面的命令

```bash
$ aws s3 sync . s3://test --endpoint-url=https://<userid>.r2.cloudflarestorage.com --exclude ".git/*"
```

##### 命令解释

- `s3` 使用的是AWS CLI里面的s3组件，这个组件里面包括了对存储桶的操作函数
- `sync` 同步功能，将本地文件上传到存储桶里
- `.` 指当前目录
- `s3://test` 固定用法，在`s3://`后面接上存储桶的名字（就是你创建的时候填的那个）
- `--endpoint-url=https://<userid>.r2.cloudflarestorage.com`  s3存储桶的API访问地址，这里是填Cloudflare给我们的那个链接
- `--exclude ".git/*"` 忽略`.git`文件夹及其内部的所有内容

如果我们在这个文件夹进行了更新，但是不想重新上传里面已有的文件，可以加入`--exact-timestamps`这个参数，但是如果要覆盖的话，则需要加入`--delete`，例如

- 覆盖

  ```bash
  $ aws s3 sync . s3://test --endpoint-url=https://<userid>.r2.cloudflarestorage.com --exclude ".git/*" --delete
  ```

- 跳过已有

  ```bash
  $ aws s3 sync . s3://test --endpoint-url=https://<userid>.r2.cloudflarestorage.com --exclude ".git/*" --exact-timestamps
  ```

## 同步Github图床的文件

因为我之前的文件是丢Github并且使用jsdelivr来代理的，这时我需要把所有的文件同步上去，但是我用浏览器上传就会提示文件数目超过100个，所以我只能使用CLI上传

而我就在想，能不能每次更新图床的时候都同步到存储桶内，于是我使用了Github Action来帮我做这个事情

### 添加Workflow文件

我们需要在仓库中新建`.github/workflows/<name>.yml`文件来新建这个workflow，我的Workflow文件内容如下（仅供参考）

```yaml
name: Upload to Cloudflare R2

on:
  push:
    branches:
      - master
  workflow_dispatch: 

jobs:
  upload:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Install AWS CLI
      run: |
        curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
        unzip awscli-bundle.zip
        sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws

    - name: Configure AWS CLI for Cloudflare R2
      run: |
        aws configure set aws_access_key_id ${{ secrets.CLOUDFLARE_ACCESS_KEY_ID }}
        aws configure set aws_secret_access_key ${{ secrets.CLOUDFLARE_SECRET_ACCESS_KEY }}
      env:
        CLOUDFLARE_ACCESS_KEY_ID: ${{ secrets.CLOUDFLARE_ACCESS_KEY_ID }}
        CLOUDFLARE_SECRET_ACCESS_KEY: ${{ secrets.CLOUDFLARE_SECRET_ACCESS_KEY }}

    - name: Upload to Cloudflare R2
      run: |
        aws s3 sync . s3://${{ secrets.R2_BUCKET_NAME }} --endpoint-url=${{ secrets.R2_ENDPOINT_URL }} --exclude ".git/*" --exclude "awscli-bundle.zip" --exclude "awscli-bundle/*" --exact-timestamps
      env:
        R2_BUCKET_NAME: ${{ secrets.R2_BUCKET_NAME }}
        R2_ENDPOINT_URL: ${{ secrets.R2_ENDPOINT_URL }}

```

### 设置Action环境变量

我们打开Github仓库的设置，在左侧`Secrets and variables`选项卡下选择`Action`，然后在`Repository secrets`下加入四个变量（如图）

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_fXnNEIp05K.png)

### 测试Workflow

我们点击上面的Action按钮，然后再点到我们的Workflow，让它跑一次来测试，同时也是我们第一次同步仓库

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_mr8yUvTga6.png)

等到它变成绿色（图片中下面的那一堆），就说明同步完成啦

## 公开Bucket访问

### 使用内置的`r2.dev`域名

我们在存储桶的页面，点击上面的`Settings`，往下滑找到`R2.dev subdomain`，点击右边的`Allow Access`来开启它

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_35domLdQYk.png)

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_HP7oOWHZFg.png)

### 使用自定义域名

既然Cloudflare这名赛博菩萨都是DNS服务商了，怎么可能会不让你用自己的域名呢？

我们还是找到`Settings`，在里面找到`Custom Domains`这一部分

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/msedge_35domLdQYk.png)

点击`Connect Domain`并输入自己的域名，根据提示来就可以了

# 结语

怎么说呢，Cloudflare确实很大气，但是也不要乱跑流量，[因为之前有人一个月消耗了1PB流量差点被封号了](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44a5016321844a159e3402d10f0b01be~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1170&h=2507&s=283568&e=jpg&b=131313)，合理使用才能变得更长久

![](https://assets.bili33.top/img/Sync-Github-Repo-to-Clouflare-R2-Bucket-with-Action/f20bd9b7480ec9747ff4969fd5095edf.jpg)
