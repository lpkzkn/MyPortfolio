import { useEffect, useState } from 'react'
import { ComponentSection } from './ComponentSection'
import { TokenSection } from './TokenSection'

interface NavLink {
  id: string
  label: string
  subLinks?: { id: string; label: string }[]
}

const NAV_LINKS: NavLink[] = [
  {
    id: 'design-tokens',
    label: 'デザインシステム基盤',
    subLinks: [
      { id: 'tokens-color', label: 'カラーパレット' },
      { id: 'tokens-typography', label: 'タイポグラフィ' },
      { id: 'tokens-layout', label: '余白・角丸規約' },
      { id: 'tokens-accessibility', label: 'アクセシビリティ・アイコン' },
    ],
  },
  {
    id: 'SimpleButton',
    label: '共通コンポーネント',
    subLinks: [
      { id: 'SimpleButton', label: 'SimpleButton' },
      { id: 'RoundButton', label: 'RoundButton' },
      { id: 'Badge', label: 'Badge' },
      { id: 'Card', label: 'Card' },
    ],
  },
]

export function CatalogView() {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )

    // Observe all scroll target elements
    const ids = [
      'design-tokens',
      'tokens-color',
      'tokens-typography',
      'tokens-layout',
      'tokens-accessibility',
      'SimpleButton',
      'RoundButton',
      'Badge',
      'Card',
    ]

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 flex flex-col md:flex-row gap-10">
      {/* Sidebar */}
      <aside className="md:w-64 md:sticky md:top-24 self-start border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6 shrink-0">
        <nav className="space-y-6">
          {NAV_LINKS.map((section) => (
            <div key={section.id} className="space-y-2">
              <a
                href={`#${section.id}`}
                className={`text-body font-bold block hover:text-action-primary transition-colors ${
                  activeId === section.id ? 'text-action-primary' : 'text-text-default'
                }`}
              >
                {section.label}
              </a>
              {section.subLinks && (
                <ul className="pl-4 border-l border-border space-y-1.5">
                  {section.subLinks.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={`#${sub.id}`}
                        className={`text-caption block hover:text-action-primary transition-colors ${
                          activeId === sub.id
                            ? 'text-action-primary font-semibold'
                            : 'text-text-muted'
                        }`}
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-24">
        <TokenSection />
        <hr className="border-border" />
        <ComponentSection />
      </div>
    </div>
  )
}
