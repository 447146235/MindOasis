# 🌿 MindOasis - 心灵绿洲

**MindOasis** 是一款专为当代高压“打工人”设计的情绪疗愈 Web 应用程序。它提供了一个私密、温暖的数字空间，通过心理学互动、白噪音疗愈和 AI 陪伴，帮助用户缓解焦虑，找回内心的平静。

---

## ✨ 核心功能

1.  **📊 情绪日记 (Mood Diary)**
    *   可视化的日历视图，记录每一天的心情状态。
    *   提供月度情绪统计，帮助用户觉察自身的情绪波动模式。
    
2.  **🗑️ 烦恼粉碎机 (Worry Shredder)**
    *   一种极具仪式感的宣泄方式。写下烦恼，看着它被模拟碎纸机粉碎，配合真实的音效和视觉反馈，释放心理负担。

3.  **🎧 疗愈声波 (Healing Soundscapes)**
    *   基于 Web Audio API 实时生成的白噪音和自然音效（雨声、海浪、森林风声、颂钵等）。
    *   支持自定义音量，帮助助眠、冥想或专注工作。

4.  **💬 AI 树洞疗愈师 (Empathetic AI Chat)**
    *   基于 Google Gemini 2.5 模型构建的 AI 心理陪伴。
    *   提供深度共情的情绪价值，而非冷冰冰的说教。
    *   **语音陪伴**：支持将 AI 的回复转化为温暖的语音 (Text-to-Speech)。

5.  **🌞 每日能量 (Daily Wisdom)**
    *   根据时间段自动切换问候语（早安/午安/晚安）。
    *   AI 每日生成一句治愈系语录，为你注入心理能量。

---

## 🛠️ 技术栈

*   **Frontend Framework**: React 19 + TypeScript
*   **Styling**: Tailwind CSS (用于快速构建现代化 UI)
*   **AI Model**: Google Gemini API (`gemini-2.5-flash`, `gemini-2.5-flash-preview-tts`)
*   **Audio**: Web Audio API (程序化生成音频，无需加载大型音频文件)
*   **Icons**: SVG Components (无额外图标库依赖)

---

## 🚀 快速开始 (本地开发)

### 1. 前置准备
*   安装 [Node.js](https://nodejs.org/) (推荐 v18+)。
*   获取一个 [Google Gemini API Key](https://aistudio.google.com/app/apikey)。

### 2. 初始化项目
推荐使用 Vite 创建一个 React + TypeScript 项目：

```bash
npm create vite@latest mind-oasis -- --template react-ts
cd mind-oasis
```

### 3. 安装依赖
安装项目所需的依赖包：

```bash
npm install
npm install @google/genai
npm install -D tailwindcss postcss autoprefixer
```

初始化 Tailwind CSS：
```bash
npx tailwindcss init -p
```
*注意：请确保按照 Tailwind 官方文档配置 `tailwind.config.js` 和 `index.css`。*

### 4. 复制代码
将本项目中的 `App.tsx`, `main.tsx` (或 `index.tsx`), 以及 `components/`, `services/`, `types.ts`, `constants.tsx` 等文件复制到你的 `src` 目录下。

### 5. 配置环境变量
在项目根目录下创建一个 `.env` 文件，并填入你的 API Key：

```env
VITE_API_KEY=your_google_gemini_api_key_here
```

*注意：在代码中调用时请使用 `import.meta.env.VITE_API_KEY` (Vite) 或 `process.env.API_KEY` (视构建工具而定)。本项目代码示例使用的是 `process.env.API_KEY`，如果在 Vite 下运行，请在 `services/gemini.ts` 中修改为 `import.meta.env.VITE_API_KEY`。*

### 6. 启动项目
```bash
npm run dev
```
打开浏览器访问 `http://localhost:5173` 即可体验。

---

## 🌐 部署指南 (Deploy)

本项目是纯静态 SPA (单页应用)，非常容易部署到 Vercel、Netlify 或 GitHub Pages。

### 部署到 Vercel (推荐)

1.  将你的代码上传到 GitHub 仓库。
2.  登录 [Vercel](https://vercel.com/)，点击 "Add New Project"。
3.  导入你的 GitHub 仓库。
4.  **关键步骤**：在 "Environment Variables" (环境变量) 设置中：
    *   Key: `API_KEY` (或者 `VITE_API_KEY`)
    *   Value: `你的_Google_Gemini_API_Key`
5.  点击 "Deploy"。

等待几分钟，你的专属心灵绿洲就上线了！你可以将链接分享给身边的朋友。

---

## ⚠️ 注意事项

*   **API 限额**：Google Gemini API 免费层级有速率限制，请留意你的使用量。
*   **隐私说明**：日记和名字数据目前存储在浏览器的 `localStorage` 中，清除缓存会导致数据丢失。建议在未来版本中接入后端数据库。

---

**Made with ❤️ for every hardworking soul.**
