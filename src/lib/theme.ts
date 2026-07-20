/**
 * このアプリで利用可能なテーマの一覧。
 *
 * 新しいテーマを追加する手順は src/styles/themes/index.css のコメントを参照。
 * ここに1行追加するだけで、テーマ切り替えUI（ThemeSwitcher）の選択肢にも
 * 型安全に反映される。
 */
export const THEMES = [
  'light',
  'dark',
  'blue-ocean',
  'happy-orange',
  'gaming-red',
  'sakura-pink',
] as const

export type Theme = (typeof THEMES)[number]

export const DEFAULT_THEME: Theme = 'light'

export const THEME_LABELS: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  'blue-ocean': 'Blue Ocean',
  'happy-orange': 'Happy Orange',
  'gaming-red': 'Gaming Red',
  'sakura-pink': 'Sakura Pink',
}

export function isTheme(value: string): value is Theme {
  return (THEMES as readonly string[]).includes(value)
}
