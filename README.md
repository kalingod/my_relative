# Relative Mini Program

## 安装依赖
```bash
pnpm add -D @tarojs/plugin-platform-weapp
pnpm add tdesign-miniprogram zustand
```

## 开发
```bash
pnpm dev:weapp
```

## 构建
```bash
pnpm build:weapp
```

TDesign 组件以自定义组件方式接入，各页面的 `index.config.ts` 已通过 `usingComponents` 声明了 `t-button`、`t-input`、`t-picker`、`t-switch`、`t-cell`、`t-cell-group` 等标签，JSX 中直接以 `<t-button />` 等标签使用。

## ECharts 图谱
若需启用图谱展示，请将官方 [ec-canvas](https://github.com/ecomfe/echarts-for-wechat) 目录拷贝到 `src/components/ec-canvas/` 下（包含 `ec-canvas.js/.wxml/.wxss` 与 `echarts.js`）。
拷贝后，首页会自动检测并使用图谱渲染；若未检测到，将显示提示并使用简版列表作为 fallback。
