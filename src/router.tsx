import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Start は getRouter を毎回呼び出して新しいルーターインスタンスを生成する
// （リクエストごとの状態分離のため）。
export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
