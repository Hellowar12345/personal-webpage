# 📝 Session Summary — 2026/02/24

## 🗣️ 使用的 Prompt

> **create a personal webpage with html "4112065022李欣員" and the time now on it and make it feel like a pro computer science engineer's personal webpage and i want the time on it**

---

## 🔧 步驟總覽

### Step 1：規劃與設計
- 分析使用者需求：一個專業 CS 工程師風格的個人網頁，需包含姓名 **李欣員**、學號 **4112065022**，以及 **即時時鐘**。
- 決定採用 **純 HTML + CSS + JavaScript**（無框架），深色科技風主題。
- 設計靈感來自現代開發者 Portfolio 風格：暗色模式、霓虹色系、終端機美學。

### Step 2：建立專案資料夾
- 在 `C:\Users\linmaggie\.gemini\antigravity\scratch\personal-webpage\` 下建立專案。

### Step 3：建立 `index.html`
- 撰寫完整的 HTML 結構，包含以下區塊：
  - **Navbar**：導覽列，右上角含即時時鐘顯示
  - **Hero Section**：主視覺區
    - `$ whoami` 終端機風格標籤
    - 姓名 **李欣員** + 學號 **4112065022**
    - 職稱 "Computer Science Engineer"
    - **system_clock.exe** 時鐘小工具（日期、時間含毫秒、時區、Session Uptime）
    - CTA 按鈕（View Projects / Contact Me）
    - SVG 頭像 + 旋轉光環動畫
    - 浮動程式碼片段（`const life = code();` 等）
  - **About Section**：自我介紹 + 數據統計卡片（專案數、語言數、commits 數、咖啡杯數）
  - **Skills Section**：技術棧進度條（Languages / Frameworks & Tools / Cloud & Data）
  - **Projects Section**：3 張精選專案卡片
  - **Contact Section**：聯繫區塊 + 社群連結
  - **Footer**：頁尾

### Step 4：建立 `style.css`
- 定義 CSS 變數（色彩系統、字體、光暈效果）
- 深色主題配色：`#0a0e1a` 背景 + `#64ffda` 青綠 + `#bd93f9` 紫色 霓虹強調色
- 字體：**JetBrains Mono**（程式碼）+ **Inter**（內文）
- 實現動畫效果：
  - 粒子背景（Canvas）
  - 打字機游標閃爍
  - 頭像旋轉光環
  - 浮動程式碼片段上下漂浮
  - 滾動滑鼠指示器
  - 技能條填充動畫
  - 卡片 hover 效果（上浮 + 光暈）
  - 頁面載入淡入動畫（staggered fade-in-up）
- 完整 RWD 響應式設計（1024px / 768px 斷點）

### Step 5：建立 `script.js`
- **粒子背景系統**：80 顆粒子 + 連線效果 + 滑鼠互動
- **即時時鐘系統**：
  - 導覽列時鐘（每 50ms 更新）
  - 主時鐘含毫秒顯示
  - 自動偵測時區（Asia/Taipei UTC+08:00）
  - Session Uptime 計時器
- **捲動效果**：Navbar 縮小 + 當前區塊高亮
- **Intersection Observer**：
  - 技能條捲動至可見時觸發填充動畫
  - 統計數字捲動至可見時觸發計數動畫
- **平滑滾動導覽**
- **Console 彩蛋**（開發者工具中的歡迎訊息）

### Step 6：瀏覽器預覽與驗證
- 在瀏覽器中開啟 `index.html` 進行預覽
- 捲動瀏覽各區塊確認效果
- 截圖驗證所有功能正常運作 ✅

---

## 📁 產出檔案

| 檔案 | 說明 |
|---|---|
| `index.html` | 主要 HTML 頁面結構 |
| `style.css` | 完整樣式表（深色主題 + 動畫 + RWD） |
| `script.js` | 粒子背景、即時時鐘、捲動動畫邏輯 |

---

## ✨ 網頁特色

- 🌑 深色科技風主題
- ⏰ 即時時鐘（導覽列 + 主時鐘含毫秒、時區、Uptime）
- 🎆 粒子背景動畫（含滑鼠互動）
- 💻 終端機美學（`$ whoami`、`system_clock.exe`）
- 📊 動態技能條 + 計數器動畫
- 🃏 專案卡片 hover 特效
- 📱 完全響應式設計
- 🔤 專業字體（JetBrains Mono + Inter）
- 🥚 Console 彩蛋
