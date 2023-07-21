import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as d,c as l,a as n,b as s,e,d as c}from"./app-04f25f71.js";const o={},r=n("p",null,"git作为目前最流行的代码版本控制管理工具。",-1),p=n("p",null,"学习网站参考：",-1),u=n("strong",null,"git官网：",-1),m={href:"https://git-scm.com/book/zh/v2",target:"_blank",rel:"noopener noreferrer"},v=n("strong",null,"菜鸟教程",-1),g={href:"https://www.runoob.com/git/git-tutorial.html",target:"_blank",rel:"noopener noreferrer"},b=c(`<h2 id="git基本命令" tabindex="-1"><a class="header-anchor" href="#git基本命令" aria-hidden="true">#</a> git基本命令</h2><p>git使用前 配置提交人信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name 姓名       配置姓名
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email 邮箱      配置邮箱
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>常用命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> init                      初始化git仓库
<span class="token function">git</span> status                    查看文件状态

<span class="token function">git</span> <span class="token function">add</span> 文件名                	将文件添加到暂存区
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>                     将全部文件添加到暂存区
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> 提交信息     		将暂存区中的文件提交到本地库

<span class="token function">git</span> reflog                    查看简单提交历史记录
<span class="token function">git</span> log                       查看详细提交历史记录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> 文件名        将指定文件从暂存区中移出
<span class="token function">git</span> checkout 文件名           将暂存区中的文件覆盖工作目录上的
<span class="token function">git</span> restore 文件名						 将本地仓库中的文件恢复到工作区中
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>补充：</strong> 区分 <code>git add</code> 添加暂存区不同后缀的区别</p><table><thead><tr><th>Git Version 2.x</th><th>新文件</th><th>被修改的文件</th><th>被删除的文件</th><th>是否受当前所在目录限制</th><th>说明</th></tr></thead><tbody><tr><td>git add -A</td><td>✅</td><td>✅</td><td>✅</td><td>❌</td><td>将当前整个工作区中所有的文件改动提交至暂存区，包括新增、修改和被删除的文件，不受当前所在目录限制</td></tr><tr><td>git add .</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>将当前工作区中当前目录(包括子目录)下的所有的文件改动提交至暂存区，包括新增、修改和被删除的文件</td></tr><tr><td>git add -u.</td><td>❌</td><td>✅</td><td>✅</td><td>❌</td><td>将当前整个工作区中被修改和被删除的文件提交至暂存区。而新文件因为未被跟踪(untracked)，所以不会被提交至暂存区</td></tr><tr><td>git add *</td><td>❌</td><td>✅</td><td>✅</td><td>✅</td><td>将当前工作区中当前目录(包括子目录)下的所有的文件改动提交至暂存区，包括新增、修改和被删除的文件，但不包括文件名以 <code>.</code> 符号开头的文件的改动</td></tr></tbody></table><p><strong>补充：</strong> 区分 <code>git commit</code> 不同后缀的区别</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将暂存区内容提交到版本库, 进入 vim 命令界面输入提交信息</span>
<span class="token comment"># vim 编辑器使用 修改第一行默认的提交信息，i：开始输入 esc：退出输入 </span>
<span class="token comment"># 退出输入后 :q即可退出vim编辑器，或者输入:q!(强制退出不保存)、:wq(保存后退出)、:wq!(强制保存后退出)</span>
<span class="token function">git</span> commit

<span class="token comment"># 将某些已被跟踪的文件提交到版本库（包含工作区和版本库）</span>
<span class="token function">git</span> commit <span class="token punctuation">[</span>file1<span class="token punctuation">]</span> <span class="token punctuation">[</span>file2<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 将暂存区内容提交到版本库, 无需进入 vi 命令界面输入提交信息</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token punctuation">[</span>message<span class="token punctuation">]</span>

<span class="token comment"># -a 后缀 表示跳过 git add, 将所有已被跟踪的文件更改直接提交到版本库，未追踪的不操作</span>
<span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token punctuation">[</span>message<span class="token punctuation">]</span>

<span class="token comment"># 使用一次新的commit, 替代上一次提交</span>
<span class="token comment"># 如果代码没有任何新变化, 则用来改写上一次commit的提交信息</span>
<span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">-m</span> <span class="token punctuation">[</span>message<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git撤销命令" tabindex="-1"><a class="header-anchor" href="#git撤销命令" aria-hidden="true">#</a> git撤销命令</h2><p>git 撤销命令常用的有两个</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> commitID		回滚到指定版本版本，丢弃后面的提交
<span class="token function">git</span> push <span class="token parameter variable">-f</span> 地址 分支			 		回滚后版本号变旧需要强制推送

<span class="token function">git</span> revert commitID					重做到之前的一次版本，保留后面的提交
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> 提交信息			 重做后再次提交，指定的版本提交内容就已经消失
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git分支命令" tabindex="-1"><a class="header-anchor" href="#git分支命令" aria-hidden="true">#</a> git分支命令</h2><p>分支合并冲突时需要手动调整，调整完毕后再进行一次<strong>暂存，提交。</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> branch <span class="token parameter variable">-v</span>                查看分支
<span class="token function">git</span> branch 分支名称           创建分支
<span class="token function">git</span> checkout 分支名称         切换分支
<span class="token function">git</span> merge 分支名称            将指定的分支合并到当前分支上
<span class="token function">git</span> branch <span class="token parameter variable">-d</span> 分支名称        删除已经合并的分支（-D强制删除）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>切换分支前保存暂存区中的内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> stash                     临时存储暂存区中的改动
<span class="token function">git</span> stash pop                 回复之前存储的暂存区
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="github远程仓库命令" tabindex="-1"><a class="header-anchor" href="#github远程仓库命令" aria-hidden="true">#</a> github远程仓库命令</h2><p>为远程仓库注册别名</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> remote <span class="token parameter variable">-v</span>                     查看已经注册的仓库别名
<span class="token function">git</span> remote <span class="token function">add</span> 别名 远程地址        为远程仓库注册别名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>远程命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> push 地址 分支                  推送远程仓库
<span class="token function">git</span> pull 地址 分支                  拉取远程仓库，拉取前建议先执行commit提交本地库，再pull最新代码
<span class="token function">git</span> clone 地址                     克隆全程仓库到本地
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多人合作时务必先拉去远程仓库的最新代码后再推送。</p><h2 id="gitignore忽略文件" tabindex="-1"><a class="header-anchor" href="#gitignore忽略文件" aria-hidden="true">#</a> .gitignore忽略文件</h2><p>让git忽略指定的文件或文件夹，不进行版本控制。只需在隐藏的git文件夹同级目录下创建即可。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>abc.txt							忽略指定文件
node_modules					忽略指定文件夹
node_modules/hello.js			忽略指定路径下的文件
css/*.js						忽略指定后缀名文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28);function h(k,f){const a=i("ExternalLinkIcon");return d(),l("div",null,[r,p,n("ul",null,[n("li",null,[n("p",null,[u,s(),n("a",m,[s("https://git-scm.com/book/zh/v2"),e(a)])])]),n("li",null,[n("p",null,[v,s(),n("a",g,[s("https://www.runoob.com/git/git-tutorial.html"),e(a)])])])]),b])}const w=t(o,[["render",h],["__file","git.html.vue"]]);export{w as default};
