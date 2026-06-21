import type { WorkItem } from '../data/works'

export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="rounded-lg border border-border bg-surface p-6">
      <h3 className="text-heading font-bold text-text-default">{item.title}</h3>
      <p className="mt-2 text-body text-text-muted">{item.summary}</p>
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
