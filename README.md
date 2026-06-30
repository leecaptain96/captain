# 李家民 · AI Director Portfolio

一个纯本地、零第三方依赖的导演作品集。页面数据集中在 `data/portfolio.js`，图片、真实 AI 视频预览与 AI 音乐都从 `assets/` 读取。

## 本地预览

Windows PowerShell：

```powershell
node server.mjs
```

然后打开：`http://127.0.0.1:4173`

也可以使用：

```powershell
npm.cmd run dev
```

## 内容替换

- 个人信息、联系方式、作品文案：`data/portfolio.js`
- 图片：`assets/images/`
- AI 视频预览：`assets/videos/ai/`
- AI 音乐：`assets/audio/`
- 页面结构：`index.html`
- 视觉样式：`styles.css`
- 交互和项目详情：`src/main.js`

当前精选项目来自真实 AI 视频作品；视频与 WAV 音乐已生成适合网页播放的轻量版本，桌面原文件未做修改。
