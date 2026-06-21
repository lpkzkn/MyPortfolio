import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

// GitHub Pages配信用のベースパス。
// https://<username>.github.io/MyPortfolio/ で配信する想定。
// カスタムドメインを取得した場合はここを '/' に変更する。
const BASE_PATH = '/MyPortfolio/'

export default defineConfig({
  base: BASE_PATH,
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      // GitHub PagesはSSRサーバーを持てないため、
      // ビルド時に全ページを静的HTMLとして書き出すプリレンダリングモードを使う。
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
    viteReact(),
  ],
})
