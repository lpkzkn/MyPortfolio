import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

// Cloudflare Pages配信用のベースパス。
const BASE_PATH = '/'

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
