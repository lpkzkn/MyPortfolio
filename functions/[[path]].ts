// Cloudflare Pages Functions entrypoint
// Routes all requests to TanStack Start server handler
// @ts-ignore
import serverHandler from '../dist/server/server.js'

export const onRequest = async (context: { request: Request; env: unknown }) => {
  if (typeof serverHandler === 'function') {
    return serverHandler(context.request, context.env)
  }
  if (serverHandler && typeof serverHandler.fetch === 'function') {
    return serverHandler.fetch(context.request, context.env)
  }
  return new Response('Server Handler Not Found', { status: 500 })
}
