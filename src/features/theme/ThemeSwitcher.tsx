import { THEME_LABELS } from '~/lib/theme'
import { useTheme } from './ThemeProvider'

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-select" className="text-caption text-text-muted">
        Theme
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => {
          const value = e.target.value
          // themes は THEMES（Theme[]）由来なので、選択肢に存在しない値は来ない。
          setTheme(themes.find((t) => t === value) ?? theme)
        }}
        className="rounded border border-border bg-surface px-2 py-1 text-body text-text-default"
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {THEME_LABELS[t]}
          </option>
        ))}
      </select>
    </div>
  )
}
