---
title: Git
icon: fa-brands fa-git-alt fa-sm
order: 1
category: 
  - 计算机通识
---

git是目前最流行的代码版本控制管理工具。

学习网站参考：

- **git官网：** <https://git-scm.com/book/zh/v2>

- **菜鸟教程** <https://www.runoob.com/git/git-tutorial.html>

## git基本命令

git使用前 配置提交人信息

```bash
git config --global user.name 姓名       # 配置姓名
git config --global user.email 邮箱      # 配置邮箱
git config --list                       # 查看本地配置
```

常用命令

```bash
git init                      # 初始化git仓库
git status                    # 查看文件状态

git add 文件名                # 将文件添加到暂存区
git add .                     # 将当前目录下全部文件添加到暂存区
git commit -m 提交信息        # 将暂存区中的文件提交到本地库

git reflog                    # 查看本地的历史记录，只显示本地的操作，远端的提交记录同步过来也不会显示
git log                       # 查看完整提交历史记录
git log --oneline             # 将完整的提交记录精简化显示
```

其他命令

```bash
git rm --cached 文件名        # 将指定文件从暂存区中移出
git checkout 文件名           # 将暂存区中的文件覆盖工作目录上的
git restore 文件名            # 将本地仓库中的文件恢复到工作区中

git checkout <commit ID>     # 切换到指定提交的commit版本，需要通过git log查看commit ID
git switch -c 新分支名        # 在当前提交版本创建新分支
```

**补充：** 区分 `git commit` 不同后缀的区别

```bash
# 将暂存区内容提交到版本库, 进入 vim 命令界面输入提交信息
# vim 编辑器使用 修改第一行默认的提交信息，i：开始输入 esc：退出输入 
# 退出输入后 :q即可退出vim编辑器，或者输入:q!(强制退出不保存)、:wq(保存后退出)、:wq!(强制保存后退出)
git commit

# 将某些已被跟踪的文件提交到版本库（包含工作区和版本库）
git commit [file1] [file2] [...]

# 将暂存区内容提交到版本库, 无需进入 vi 命令界面输入提交信息
git commit -m [message]

# -a 后缀 表示跳过 git add, 将所有已被跟踪的文件更改直接提交到版本库，未追踪的不操作
git commit -am [message]

# 使用一次新的commit, 替代上一次提交
# 如果代码没有任何新变化, 则用来改写上一次commit的提交信息
git commit --amend -m [message]
```

## git撤销命令

git 撤销命令常用的有两个

```bash
git reset --hard commitID         # 回滚到指定版本版本，丢弃后面的提交

git revert commitID               # 重做到之前的一次版本，保留后面的提交
git commit -m 提交信息            # 重做后再次提交，指定的版本提交内容就已经消失
```

## git分支命令

分支合并冲突时需要手动调整，调整完毕后再进行一次**暂存，提交。**

```bash
git branch                    # 查看所有分支
git branch -a                 # 查看本地以及远程分支（需要绑定追踪关系）
git branch 分支名称           # 创建分支
git checkout-b 分支名称       # 创建并切换到指定分支
git checkout 分支名称         # 切换分支
git branch -m <新分支名称>    # 修改分支名称
git merge 分支名称            # 将指定的分支合并到当前分支上
git merge --abort            # 中止合并操作
git branch -d 分支名称        # 删除已经合并的分支（-D强制删除）
```

切换分支前保存暂存区中的内容

```bash
git stash                     # 临时存储暂存区中的改动
git stash pop                 # 回复之前存储的暂存区
```

## github远程仓库命令

为远程仓库注册别名

```bash
git remote -v                     # 查看已经注册的仓库别名
git remote add 别名 远程地址       # 为远程仓库注册别名
git remote rename  别名 新别名     # 对已有远程仓库的别名重命名
git remote remove 别名            # 移除已经注册的别名
```

远程命令

```bash
git push 地址 分支                  # 推送远程仓库指定分支
git pull 地址 分支                  # 拉取远程仓库，拉取前建议先执行commit提交本地库，再pull最新代码
git clone 地址                     # 克隆远程仓库到本地。默认为主分支
git clone -b 分支 地址              # 克隆远程仓库指定分支到本地

git push 远端地址 本地分支:远程分支    # 推送本地分支到远程仓库指定分支
git pull 远端地址 分支名称            # 拉取远程仓库指定分支

# 将本地分支与远程分支关联，origin是远程地址别名，关联后push pull不指定分支时即默认关联分支
git branch --set-upstream-to=origin/分支名  本地分支名
# 也可以在推送时就指定关联上游仓库分支
git push -u origin 本地分支名
# 如果需要解除追踪关系
git branch --unset-upstream 本地分支名
# 查看分支关联情况
git branch -vv
```


## 分支与团队协作

在本地进行功能开发时使用分支是一个良好的习惯，下面概述分支协作的流程：

```bash
# 1. 同步主分支代码
git checkout main                     # 切换到主分支
git pull origin main                  # 拉取最新代码

# 2. 创建功能分支，在功能分支上开发功能
git checkout -b feature/功能名称
git add .                             # 开发完毕暂存提交
git commit -m "feat: 添加xxx功能"

# 3. 保持分支同步（如果需要主分支最新提交的代码功能）
git checkout main                     # 切回主线拉取更新
git pull origin main
git checkout feature/功能名称         # 切换回功能分支，合并主线代码
git merge main

# 4. 功能分支合并
git push origin feature/功能名称       # 可以创建远程分支，通过 Pull Request 合并

git checkout main                      # 也可以本地合并后提交
git merge feature/功能名称
git push origin main

# 5. 删除合并后的功能分支
git branch -d feature/功能名称            # 删除本地分支
git push origin --delete feature/功能名称 # 删除远程分支
```


## 同分支协作

多人**合作改动同一分支**时，建议先提交自己的本地代码，然后拉取远程最新代码后再推送。

1. 当远程仓库被别人更新了时，自己的本地也做了一些修改，且别人修改的文件和自己本地修改的**文件不冲突**，此时：

  - 本地还没有commit，先pull远程仓库，会将远程仓库的代码拉取到本地，云端的提交记录被同步到本地，本地已修改的代码不受影响，可以继续add，commit，push。

  - 本地已经commit，然后再pull远程仓库，会在本地的commit记录补充云端的所有最新提交记录（*根据远端提交时间确定在本地commit前还是后*），并在本地追加一次最新的`Merge branch 'master' of 云端地址`，然后就可以继续push。push后远程提交记录与本地记录会保留这次merge记录。  

2. 当远程仓库的某些文件被别人更新了，而自己的本地相同文件也做了修改发生了**文件冲突**，此时：

  - 本地还没有commit，先pull远程仓库，会提示`Please commit your changes or stash them before you merge.`,即希望先commit或暂存，本地文件没有任何变化。

  - 本地已经commit，然后再pull远程仓库，会提示如下，即相关文件冲突了，需要手动修复。我们手动修复后即可继续add，commit，push。提交到远程后也会携带本地的这两次commit记录。

```bash
Auto-merging c.txt
CONFLICT (content): Merge conflict in c.txt
Automatic merge failed; fix conflicts and then commit the result.
```

3. 补充： 先commit，再pull时，会产生大量的merge记录（即使文件没有冲突），如果不想要这些merge记录，可以用 --rebase 变基处理（相当于拉取远程记录后将你的commit记录移动到变基位置后，从而省去不必要的merge记录），但使用变基会让提交记录不直观，建议主分支直接使用普通 pull, 功能分支使用变基处理。

此外，普通 pull 处理冲突时，可以一次解决所有提交记录涉及到冲突问题，然后统一add后再commit，但 pull --rebase 处理冲突时，如果本地有多次提交记录都冲突则需要按顺序处理。

```bash
git pull --rebase origin feature/功能名称   # 变基方式进行merge

# 如果有冲突：
# 1. 解决冲突
# 2. git add .
# 3. git rebase --continue
# 4. 如果多个提交有冲突，可能需要重复解决

# 如果想放弃 rebase，回到 rebase 前的状态
git rebase --abort
```


## .gitignore忽略文件

让git忽略指定的文件或文件夹，不进行版本控制。只需在隐藏的git文件夹同级目录下创建即可。

```bash
abc.txt                         # 忽略指定文件
node_modules                    # 忽略指定文件夹
node_modules/hello.js           # 忽略指定路径下的文件
css/*.js                        # 忽略指定文件夹下指定后缀名文件
```


## git与换行符问题

当我们克隆仓库打开项目时，有时会出现行尾序列报错问题。

由于历史原因，windows下和linux下的文本文件的换行符不一致。Windows在换行的时候，同时使用了回车符`CR(carriage-return character)`和换行符`LF(linefeed character)`。而Mac和Linux系统，仅仅使用了换行符`LF`。

| Windows | Linux/Mac | Old Mac(pre-OSX) |
| ------- | --------- | ---------------- |
| CRLF    | LF        | CR               |
| '\n\r'  | '\n'      | '\r'             |


git 争对此问题有相关配置属性：

`core.autocrlf` 可以控制 Git 在提交和检出时是否对换行符进行转换：

  - `true`：表示在提交时将 CRLF 转换为 LF，在检出时将 LF 转换为 CRLF 。这个选项适合 Windows 用户使用。
  - `input`：表示在提交时将 CRLF 转换为 LF，在检出时不进行转换。这个选项适合 Linux 和 MacOS 用户使用。
  - `false`：表示不进行任何转换。这个选项适合想保持原始换行符不变的用户使用。

`core.eol`（end of line），可以指定仓库中文件使用哪种换行符,优先级更高：

  - `lf`：表示仓库中文件使用 LF 作为换行符。
  - `crlf`：表示仓库中文件使用 CRLF 作为换行符。
  - `native`：表示仓库中文件使用当前操作系统默认的换行符。

所以，如果我们有 `prettier` 配置插件，或者是有 `.EditorConfig` 格式文件，那么可能检测插件就会报错。


所以，争对相关报错问题: 

1. 如果是我们 clone 后打开仓库就发现整个仓库行尾序列被插件检测到报错，就是 git自动对换行符进行转换了
```bash
git config --global core.autocrlf false # 关闭自动转换
```


## git push 证书问题

当我们向远程仓库提交代码或克隆仓库时，有时候可能会出现类似这样的报错：*fatal: unable to access "xxx": OpenSSL SSL_read:Connection was reset, errno 10054*, 根本原因在于 当你通过HTTPS访问Git远程仓库，如果服务器的SSL证书未经过第三方机构签署，那么Git就会报错。毕竟未知的没有签署过的证书意味着很大安全风险。或者，如果网站没有正式的SSL证书而是自己生成了自签署的临时证书，就可能会导致这样的报错。

解决办法：关闭提交时的证书校验，再次提交

```bash
git config --global http.sslVerify false
```

如果需要再次开启，直接将 false 修改为 true 即可
