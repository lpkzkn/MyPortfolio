import type { CareerItem } from '../data/career'

export function CareerCard({ item }: { item: CareerItem }) {
  return (
    <article className="rounded-lg border border-border bg-surface p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-heading font-bold text-text-default">{item.company}</h3>
        <span className="text-caption text-text-muted">{item.period}</span>
      </div>
      <p className="mt-1 text-body text-text-muted">{item.role}</p>
      <p className="mt-4 text-body text-text-default">{item.description}</p>
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
