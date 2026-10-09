import type { WorkItem } from '../data/works'

export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="flex flex-col justify-between rounded-lg border border-border bg-surface p-6 transition-shadow hover:shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-heading font-bold text-text-default">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-action-primary hover:underline transition-colors"
              >
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </h3>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex shrink-0 items-center gap-1 text-caption font-medium text-text-muted hover:text-action-primary transition-colors"
              aria-label={`${item.title}のサイトを開く`}
            >
              <span>サイトを見る</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h4a.75.75 0 0 1 0 1.5h-4Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 0 0 1.06 1.06l7.22-7.22v2.657a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.657l-7.22 7.22Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
        </div>
        <p className="mt-2 text-body text-text-muted">{item.summary}</p>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {item.techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-action-secondary px-3 py-1 text-caption text-text-default"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  )
}
