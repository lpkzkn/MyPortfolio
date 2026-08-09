import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ThemeSwitcher } from '~/features/theme/ThemeSwitcher'

const NAV_ITEMS = [
  { to: '/', label: 'Top' },
  { to: '/resume', label: '経歴・実績' },
  { to: '/works', label: '制作物' },
  { to: '/catalog', label: 'デザインシステム' },
  { to: '/about-this-site', label: 'このサイトについて' },
] as const

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // ページ遷移時や画面サイズ変更時にメニューを閉じる・スクロールロック
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-heading font-bold text-text-default transition-opacity hover:opacity-80"
            onClick={() => setIsOpen(false)}
          >
            MyPortfolio
          </Link>

          {/* PC表示 (md以上) */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-body text-text-muted transition-colors hover:text-text-default"
                activeProps={{ className: 'text-text-default font-semibold' }}
              >
                {item.label}
              </Link>
            ))}
            <ThemeSwitcher />
          </nav>

          {/* モバイル表示時の右側エリア (md未満) - ハンバーガーボタンのみ */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={isOpen}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-text-default transition-colors hover:bg-action-secondary focus-visible:outline-2 focus-visible:outline-action-primary"
            >
              <svg
                className="h-6 w-6 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* モバイル サイドドロワーメニュー (document.body直下にPortalで描画) */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
              isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* 背景オーバーレイ */}
            <button
              type="button"
              tabIndex={-1}
              aria-label="背景をタップしてメニューを閉じる"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 transition-opacity duration-300"
            />

            {/* 左側からスライドインするメニュー本体（画面全体の高さ h-dvh） */}
            <aside
              aria-label="モバイルナビゲーション"
              className={`absolute top-0 bottom-0 left-0 flex h-dvh w-[80%] max-w-xs flex-col justify-between border-r border-border bg-surface p-6 shadow-2xl transition-transform duration-300 ease-out z-10 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="relative z-10">
                {/* ドロワーヘッダー */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="text-heading font-bold text-text-default"
                  >
                    MyPortfolio
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="メニューを閉じる"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-default hover:bg-action-secondary"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* メニューリンク一覧 */}
                <nav className="mt-6 flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center rounded-lg px-4 py-3 text-body font-medium text-text-muted transition-colors hover:bg-action-secondary hover:text-text-default"
                      activeProps={{
                        className: 'bg-action-secondary text-text-default font-bold',
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* ドロワーフッター：テーマ切り替え */}
              <div className="relative z-10 border-t border-border pt-4">
                <p className="mb-2 text-caption text-text-muted">テーマ設定</p>
                <div className="w-full">
                  <ThemeSwitcher />
                </div>
              </div>
            </aside>
          </div>,
          document.body,
        )}
    </>
  )
}
