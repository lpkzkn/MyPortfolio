import { Link } from '@tanstack/react-router'
import { ThemeSwitcher } from '~/features/theme/ThemeSwitcher'

const NAV_ITEMS = [
  { to: '/', label: 'Top' },
  { to: '/resume', label: '経歴・実績' },
  { to: '/works', label: '制作物' },
  { to: '/catalog', label: 'デザインシステム' },
  { to: '/about-this-site', label: 'このサイトについて' },
] as const

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-heading font-bold text-text-default">
          MyPortfolio
        </Link>
        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-body text-text-muted hover:text-text-default"
              activeProps={{ className: 'text-text-default font-medium' }}
            >
              {item.label}
            </Link>
          ))}
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  )
}
