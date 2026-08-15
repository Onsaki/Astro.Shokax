---
title: 在一台电脑上同时部署两个 Hexo 博客到 GitHub 的详细步骤
date: 2025-09-14 07:44:47
tags:
  - hexo
slug: hexo-4
categories:
  - 关于hexo
---



> 以下内容完全由豆包AI整理生成，权当个乐子，万一真管用呢。

# 在一台电脑上同时部署两个 Hexo 博客到 GitHub 的详细步骤

## 目录



1.  [准备工作](#准备工作)

2.  [生成 SSH 密钥对](#生成ssh密钥对)

3.  [配置 SSH config 文件](#配置ssh-config文件)

4.  [在 GitHub 上添加 SSH 公钥](#在github上添加ssh公钥)

5.  [验证 SSH 连接](#验证ssh连接)

6.  [安装和配置第一个 Hexo以下客](#安装和配置第一个hexo博客)

7.  [安装和配置第二个 Hexo 博客](#安装和配置第二个hexo博客)

8.  [解决端口冲突问题](#解决端口冲突问题)

9.  [部署博客到 GitHub](#部署博客到github)

10.  [常见问题及解决方案](#常见问题及解决方案)



***

## 准备工作

### 1.1 安装必要软件

确保您的电脑上已经安装了以下软件：



*   **Node.js** (推荐版本>= 14.x)


    *   下载地址：[https://nodejs.org/](https://nodejs.org/)
    
    *   验证安装：`node -v`

*   **Git**


    *   下载地址：[https://git-scm.com/](https://git-scm.com/)
    
    *   验证安装：`git --version`

### 1.2 创建 GitHub 仓库

为每个博客创建一个 GitHub 仓库：



1.  登录 GitHub 账号

2.  创建新仓库，仓库名格式必须为：`username.github.io`

*   例如：`blog1.github.io` 和 `blog2.github.io`

1.  勾选 "Initialize this repository with a README"



***

## 生成 SSH 密钥对

### 2.1 查看现有密钥

首先查看是否已有 SSH 密钥：



```
ls \~/.ssh/
```

如果显示 `id_rsa` 和 `id_rsa.pub`，说明已经有一对密钥。

### 2.2 生成第一个博客的 SSH 密钥



```
ssh-keygen -t rsa -b 4096 -C "your\_email\_for\_blog1@example.com" -f \~/.ssh/id\_rsa\_blog1
```

**参数说明：**



*   `-t rsa`: 指定密钥类型为 RSA

*   `-b 4096`: 密钥长度为 4096 位

*   `-C`: 添加注释（建议使用邮箱）

*   `-f`: 指定密钥文件名

按 Enter 键两次跳过密码设置（或设置密码增加安全性）。

### 2.3 生成第二个博客的 SSH 密钥



```
ssh-keygen -t rsa -b 4096 -C "your\_email\_for\_blog2@example.com" -f \~/.ssh/id\_rsa\_blog2
```

### 2.4 查看生成的密钥



```
ls \~/.ssh/
```

应该看到以下文件：



*   `id_rsa_blog1` (私钥)

*   `id_rsa_blog1.pub` (公钥)

*   `id_rsa_blog2` (私钥)

*   `id_rsa_blog2.pub` (公钥)



***

## 配置 SSH config 文件

### 3.1 创建或编辑 config 文件



```
\# Windows用户

notepad \~/.ssh/config

\# Mac/Linux用户

nano \~/.ssh/config
```

### 3.2 配置内容



```
\# 第一个博客的配置

Host github.com-blog1

&#x20;   HostName github.com

&#x20;   User git

&#x20;   IdentityFile \~/.ssh/id\_rsa\_blog1

&#x20;   IdentitiesOnly yes

&#x20;   PreferredAuthentications publickey

\# 第二个博客的配置

Host github.com-blog2

&#x20;   HostName github.com

&#x20;   User git

&#x20;   IdentityFile \~/.ssh/id\_rsa\_blog2

&#x20;   IdentitiesOnly yes

&#x20;   PreferredAuthentications publickey
```

**配置说明：**



*   `Host`: 自定义别名，用于区分不同账号

*   `HostName`: 实际的服务器地址（[github.com](https://github.com)）

*   `User`: 固定为 git

*   `IdentityFile`: 指定对应的私钥文件

*   `IdentitiesOnly yes`: 强制只使用指定的密钥

### 3.3 设置文件权限（仅 Mac/Linux）



```
chmod 600 \~/.ssh/config
```



***

## 在 GitHub 上添加 SSH 公钥

### 4.1 复制第一个公钥



```
\# Windows

clip < \~/.ssh/id\_rsa\_blog1.pub

\# Mac

pbcopy < \~/.ssh/id\_rsa\_blog1.pub

\# Linux

xclip -sel clip < \~/.ssh/id\_rsa\_blog1.pub
```

### 4.2 添加到 GitHub（第一个账号）



1.  登录第一个 GitHub 账号

2.  进入 Settings → SSH and GPG keys

3.  点击 "New SSH key"

4.  Title: 可以填写 "Blog1 Key"

5.  Key: 粘贴刚才复制的公钥内容

6.  点击 "Add SSH key"

### 4.3 复制第二个公钥



```
\# Windows

clip < \~/.ssh/id\_rsa\_blog2.pub

\# Mac

pbcopy < \~/.ssh/id\_rsa\_blog2.pub

\# Linux

xclip -sel clip < \~/.ssh/id\_rsa\_blog2.pub
```

### 4.4 添加到 GitHub（第二个账号）

重复 4.2 的步骤，将第二个公钥添加到第二个 GitHub 账号。



***

## 验证 SSH 连接

### 5.1 测试第一个连接



```
ssh -T git@github.com-blog1
```

成功提示：



```
Hi username1! You've successfully authenticated, but GitHub does not provide shell access.
```

### 5.2 测试第二个连接



```
ssh -T git@github.com-blog2
```

成功提示：



```
Hi username2! You've successfully authenticated, but GitHub does not provide shell access.
```

### 5.3 如果连接失败

如果出现以下错误：



```
Could not open a connection to your authentication agent.
```

解决方案：



```
\# 启动SSH agent

eval "\$(ssh-agent -s)"

\# 添加密钥

ssh-add \~/.ssh/id\_rsa\_blog1

ssh-add \~/.ssh/id\_rsa\_blog2
```



***

## 安装和配置第一个 Hexo 博客

### 6.1 创建博客目录



```
\# 创建博客目录

mkdir \~/hexo-blogs

cd \~/hexo-blogs

\# 创建第一个博客目录

mkdir blog1

cd blog1
```

### 6.2 初始化 Hexo



```
\# 安装Hexo CLI（如果尚未安装）

npm install -g hexo-cli

\# 初始化博客

hexo init .

npm install
```

### 6.3 安装部署插件



```
npm install hexo-deployer-git --save
```

### 6.4 配置第一个博客

编辑 `_config.yml` 文件：



```
\# Site

title: 博客1标题

subtitle: 博客1副标题

description: 博客1描述

keywords:

author: 作者名

language: zh-CN

timezone: Asia/Shanghai

\# URL

url: https://username1.github.io

root: /

permalink: :year/:month/:day/:title/

permalink\_defaults:

\# Deployment

deploy:

&#x20; type: git

&#x20; repository: git@github.com-blog1:username1/username1.github.io.git

&#x20; branch: main

&#x20; message: "博客1更新: {{ now('YYYY-MM-DD HH:mm:ss') }}"
```

### 6.5 设置 Git 用户信息（重要）



```
\# 取消全局配置（如果已设置）

git config --global --unset user.name

git config --global --unset user.email

\# 设置当前仓库的用户信息

git config user.name "username1"

git config user.email "your\_email\_for\_blog1@example.com"
```



***

## 安装和配置第二个 Hexo 博客

### 7.1 创建第二个博客目录



```
cd \~/hexo-blogs

mkdir blog2

cd blog2
```

### 7.2 初始化第二个博客



```
hexo init .

npm install
```

### 7.3 安装部署插件



```
npm install hexo-deployer-git --save
```

### 7.4 配置第二个博客

编辑 `_config.yml` 文件：



```
\# Site

title: 博客2标题

subtitle: 博客2副标题

description: 博客2描述

keywords:

author: 作者名

language: zh-CN

timezone: Asia/Shanghai

\# URL

url: https://username2.github.io

root: /

permalink: :year/:month/:day/:title/

permalink\_defaults:

\# Deployment

deploy:

&#x20; type: git

&#x20; repository: git@github.com-blog2:username2/username2.github.io.git

&#x20; branch: main

&#x20; message: "博客2更新: {{ now('YYYY-MM-DD HH:mm:ss') }}"
```

### 7.5 设置第二个博客的 Git 用户信息



```
git config user.name "username2"

git config user.email "your\_email\_for\_blog2@example.com"
```



***

## 解决端口冲突问题

### 8.1 查看端口占用（Windows）



```
netstat -aon | findstr "4000"

tasklist | findstr "PID号"
```

### 8.2 查看端口占用（Mac/Linux）



```
lsof -i :4000
```

### 8.3 指定不同端口启动博客



```
\# 第一个博客使用默认端口4000

cd \~/hexo-blogs/blog1

hexo server

\# 第二个博客使用端口5000

cd \~/hexo-blogs/blog2

hexo server -p 5000
```

### 8.4 或者修改配置文件设置默认端口

在每个博客的 `_config.yml` 中添加：



```
\# Server

server:

&#x20; port: 4000  # 第一个博客

&#x20; compress: true

&#x20; header: true
```



```
\# Server

server:

&#x20; port: 5000  # 第二个博客

&#x20; compress: true

&#x20; header: true
```



***

## 部署博客到 GitHub

### 9.1 部署第一个博客



```
cd \~/hexo-blogs/blog1

hexo clean

hexo generate

hexo deploy
```

### 9.2 部署第二个博客



```
cd \~/hexo-blogs/blog2

hexo clean

hexo generate

hexo deploy
```

### 9.3 查看部署结果

部署完成后，访问以下地址查看博客：



*   博客 1: [https://username1.github.io](https://username1.github.io)

*   博客 2: [https://username2.github.io](https://username2.github.io)



***

## 常见问题及解决方案

### 10.1 Permission denied 错误

**错误信息：**



```
ERROR: Permission to username/username.github.io.git denied to other\_username.
```

**解决方案：**



1.  检查 SSH config 配置是否正确

2.  验证 SSH 连接：`ssh -T git@github.com-blog1`

3.  确保使用了正确的 Host 别名

### 10.2 端口被占用

**错误信息：**



```
Port 4000 has been used. Try other port instead.
```

**解决方案：**



1.  查看端口占用：`netstat -aon | findstr "4000"`

2.  结束占用端口的进程

3.  或者使用其他端口：`hexo server -p 5000`

### 10.3 fatal: not in a git directory

**错误信息：**



```
fatal: not in a git directory
```

**解决方案：**



1.  进入正确的目录：`cd ~/hexo-blogs/blog1/.deploy_git`

2.  然后设置用户信息：`git config user.name "username1"`

### 10.4 部署后页面空白

**可能原因：**



1.  URL 配置错误

2.  主题配置问题

3.  静态文件生成失败

**解决方案：**



1.  检查 `_config.yml` 中的 URL 配置

2.  执行 `hexo clean && hexo generate`

3.  查看本地预览是否正常

### 10.5 SSH agent 连接问题

**错误信息：**



```
Could not open a connection to your authentication agent.
```

**解决方案：**



```
\# 启动SSH agent

eval "\$(ssh-agent -s)"

\# 添加密钥

ssh-add \~/.ssh/id\_rsa\_blog1

ssh-add \~/.ssh/id\_rsa\_blog2
```



***

## 日常使用命令

### 新建文章



```
\# 博客1

cd \~/hexo-blogs/blog1

hexo new "文章标题"

\# 博客2

cd \~/hexo-blogs/blog2

hexo new "文章标题"
```

### 本地预览



```
\# 博客1（默认4000端口）

hexo server

\# 博客2（5000端口）

hexo server -p 5000
```

### 部署更新



```
hexo clean && hexo generate && hexo deploy
```



***

## 总结

通过以上步骤，您已经成功在一台电脑上部署了两个独立的 Hexo 博客到 GitHub。关键要点：



1.  **SSH 密钥管理**：为每个博客创建独立的 SSH 密钥对

2.  **SSH config 配置**：通过 Host 别名区分不同的 GitHub 账号

3.  **Git 用户信息**：为每个博客仓库单独设置用户信息

4.  **端口管理**：使用不同端口避免本地预览冲突

5.  **配置文件**：确保每个博客的配置文件正确指向对应的 GitHub 仓库

按照这些步骤操作，您可以避免常见的配置冲突和权限问题，确保两个博客都能正常运行和部署。

> （注：文档部分内容可能由 AI 生成）
