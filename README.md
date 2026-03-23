# 2025 Annual Review Webpage

A lightweight static annual review webpage built with plain HTML, CSS, and JavaScript.

## Features

- Responsive single-page layout
- Timeline storytelling section
- “数字年度” statistics grid
- Dark mode toggle with `localStorage`
- Scroll reveal animation
- Hidden easter egg message

## 复制即运行

在仓库根目录直接复制下面这段命令：

```bash
chmod +x start.sh
./start.sh
```

默认会启动在：<http://localhost:4173>

如果你想换端口，也可以直接这样运行：

```bash
./start.sh 8080
```

然后访问：<http://localhost:8080>

## 部署到 GitHub Pages

我已经补好了 GitHub Pages 工作流文件：`.github/workflows/deploy-pages.yml`。

你现在只需要：

1. 把仓库推到 GitHub。
2. 确保默认发布分支是 `main`。
3. 在 GitHub 仓库页面进入 **Settings → Pages**。
4. 在 **Build and deployment** 里选择 **GitHub Actions**。
5. Push 到 `main` 后，GitHub 会自动部署这个静态站点。

部署成功后，公开链接通常会是：

```text
https://<你的 GitHub 用户名>.github.io/<仓库名>/
```

如果仓库名是 `life`，例如：

```text
https://your-name.github.io/life/
```

## 手动运行

如果你不想用脚本，也可以直接运行：

```bash
python3 -m http.server 4173
```

或者直接双击打开 `index.html`。
