import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { DEFAULT_THEME, THEMES, type Theme, isTheme } from '~/lib/theme'

const STORAGE_KEY = 'my-portfolio:theme'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: typeof THEMES
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && isTheme(stored)) return stored

  return DEFAULT_THEME
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // SSR/プリレンダリング時とクライアントの初期描画を一致させるため、
  // 初期値は常に DEFAULT_THEME とし、マウント後に localStorage から復元する。
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME)

  useEffect(() => {
    setThemeState(readStoredTheme())
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
