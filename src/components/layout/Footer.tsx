export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface-subtle">
      <div className="mx-auto max-w-5xl px-6 py-8 text-caption text-text-muted">
        © {year} MyPortfolio. Built with TanStack Start & Tailwind CSS.
      </div>
    </footer>
  )
}
