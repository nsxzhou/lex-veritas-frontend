# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LexVeritas 是一个**可验证的法律助手前端应用**,旨在提供:

- 带区块链证据验证的法律咨询聊天界面
- 实时引用来源和可验证性证据展示
- 管理员后台和产品展示页面

### 当前状态

⚠️ **原型阶段**: 项目使用模拟数据 (`MOCK_CITATION`, `MOCK_SESSIONS`),无实际后端 API 集成。

**技术栈**:

- React 19.2.0 + TypeScript 5.9.3 + Vite 7.2.4
- React Router 7.9.6 (路由)
- Tailwind CSS 4.1.17 + shadcn/ui (UI 组件)
- Framer Motion 12.23.25 (动画) + Recharts (图表) + Lucide React (图标)

## Quick Start

### Development Commands

```bash
npm run dev      # 启动 Vite 开发服务器 (HMR 热更新)
npm run build    # TypeScript 类型检查 + Vite 生产构建
npm run lint     # ESLint 代码检查
npm run preview  # 预览生产构建
```

### First Run

```bash
npm install
npm run dev
# 访问 http://localhost:5173
```

## Architecture Overview

### Routing Structure

使用 **React Router 7.9.6**,路由配置在 `src/App.tsx`:

| 路由路径    | 页面组件       | 描述         |
| ----------- | -------------- | ------------ |
| `/`         | ChatPage       | 主聊天界面   |
| `/login`    | LoginPage      | 登录页面     |
| `/admin`    | AdminDashboard | 管理员后台   |
| `/showcase` | ShowcasePage   | 产品展示页面 |

**架构特点**:

- 所有页面都是**独立的顶级路由** (无嵌套路由)
- 无共享布局组件 (Layout Component)
- 页面间无数据共享 (各自独立状态)

### State Management

⚠️ **重要架构决策**: 项目**目前没有使用** Redux、Zustand 等全局状态管理库。

所有状态都通过 **React hooks** (useState, useEffect, useRef) 在组件内管理，**未来**如果需要跨多个页面共享状态 (如用户登录态),可以引入状态管理库。

#### ChatInterface 组件的状态示例

```typescript
const [messages, setMessages] = useState<Message[]>([]); // 聊天消息列表
const [input, setInput] = useState(""); // 输入框内容
const [isTyping, setIsTyping] = useState(false); // AI 响应状态
const [activeCitation, setActiveCitation] = useState<Citation | null>(null); // 当前引用
const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 侧边栏展开状态
```

#### 适用场景

- ✅ **当前**: 原型和小型应用,组件间状态共享需求有限
- ⚠️ **未来**: 如需跨多个页面共享状态 (如用户登录态),可以引入状态管理库

### Styling System

项目使用 **CSS 变量驱动的主题系统** + **Tailwind CSS 4.1.17**。

#### 1. CSS 变量主题 (支持 light/dark 模式)

在 `src/index.css` 中定义:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* HSL 格式 */
  --secondary: 210 40% 96.1%;
  /* ... 更多语义化颜色 */
}

.dark {
  --primary: 210 40% 98%; /* 暗色模式覆盖 */
}
```

#### 2. Tailwind 配置扩展

在 `tailwind.config.js` 中映射 CSS 变量:

```javascript
colors: {
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  // ... 其他语义化颜色
}
```

#### 3. shadcn/ui 组件模式

⚠️ **关键**: 组件代码直接在 `src/components/ui/` 中,**不是 npm 包**。

**特点**:

- 可以**完全自定义**组件代码 (直接修改 `button.tsx` 等文件)
- 使用 **CVA (Class Variance Authority)** 管理组件变体

**影响**:

- ✅ 高度可定制,适应设计需求
- ⚠️ 无法通过 `npm update` 自动更新组件

#### 4. cn() 工具函数

位于 `src/lib/utils.ts`,用于**合并 Tailwind 类名**:

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class"
)}>
```

### Directory Structure

```
src/
├── pages/              # 页面组件 (每个路由对应一个页面)
│   ├── ChatPage.tsx
│   ├── LoginPage.tsx
│   ├── AdminDashboard.tsx
│   └── ShowcasePage.tsx
├── components/
│   ├── ui/             # shadcn/ui 基础组件 (可直接修改)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── ChatInterface.tsx  # 主聊天界面 (核心组件)
│   └── EvidencePanel.tsx  # 证据面板组件
├── lib/
│   └── utils.ts        # 工具函数 (cn 等)
└── main.tsx            # 应用入口
```

## Core Conventions

### TypeScript

#### 路径别名

使用 `@/` 代替 `./src/` (配置在 `vite.config.ts` 和 `tsconfig.app.json`):

```typescript
// ✅ 推荐
import { Button } from "@/components/ui/button";

// ❌ 避免
import { Button } from "../../components/ui/button";
```

#### 严格模式

所有严格检查已启用 (`strict: true`):

- 强制类型安全
- 未使用变量/导入会触发警告

### Component Development

#### 组件类型

全部使用 **函数组件 + hooks** (无类组件):

```typescript
export function ComponentName({ prop1 }: ComponentNameProps) {
  const [state, setState] = useState<Type>(initialValue);
  return <div>...</div>;
}
```

#### 状态提升原则

如果多个组件需要共享状态:

1. 状态应该在**最近的共同父组件**中管理
2. 通过 **props** 向下传递状态和更新函数

### Animations

使用 **Framer Motion** (v12.23.25) 处理所有动画。

#### 常见模式

```typescript
import { motion, AnimatePresence } from "framer-motion";

<AnimatePresence initial={false}>
  {messages.map((message) => (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {message.content}
    </motion.div>
  ))}
</AnimatePresence>;
```

## Key Files

### Configuration

- **`vite.config.ts`** - Vite 配置 (路径别名 `@/` → `./src/`)
- **`tailwind.config.js`** - Tailwind 扩展配置 (自定义颜色)
- **`tsconfig.app.json`** - 应用 TypeScript 配置 (包含路径别名)

### Core Components

- **`src/App.tsx`** - 路由配置 (4 个主要路由)
- **`src/components/ChatInterface.tsx`** - 主聊天界面 (核心逻辑)
- **`src/components/EvidencePanel.tsx`** - 证据面板 (Citation 类型定义)

### Styling

- **`src/index.css`** - 全局样式 + CSS 变量定义 (light/dark 主题)
- **`src/lib/utils.ts`** - cn() 工具函数

## Architectural Decisions

### 1. 无全局状态管理

**决策**: 目前没有使用 Redux、Zustand 等状态管理库

**理由**: 项目处于原型阶段,组件间状态共享需求有限

**影响**:

- ✅ 代码简单,易于理解
- ⚠️ 如需跨页面共享状态,可以引入状态管理库

### 2. shadcn/ui 模式

**决策**: 组件代码直接在项目中 (`src/components/ui/`),而非 npm 包

**理由**: 完全控制组件样式和行为

**影响**:

- ✅ 高度可定制
- ⚠️ 无法通过 `npm update` 自动更新组件

### 3. 模拟数据

**决策**: 使用 `MOCK_CITATION` 和 `MOCK_SESSIONS` 模拟数据

**当前位置**: `src/components/ChatInterface.tsx`

**待实现**:

- 后端 API 集成
- 真实的区块链验证逻辑
- 用户认证系统

### 4. TypeScript 严格模式

**决策**: 启用所有严格检查

**影响**:

- 强制类型安全,减少运行时错误
- 需要显式处理 `null` 和 `undefined`

### 5. 动画优先

**决策**: 使用 **Framer Motion** 而非 CSS 过渡

**理由**: 更容易处理复杂的列表动画

**影响**:

- ✅ 动画代码可读性高
- ⚠️ 增加 bundle 大小

### 6. 主题系统

**决策**: 暂不实现主题切换功能
