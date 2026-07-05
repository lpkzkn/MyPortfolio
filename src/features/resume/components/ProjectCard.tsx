import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-surface border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between gap-4 mb-3">
          <h3 className="text-heading font-bold text-text-default group-hover:text-action-primary transition-colors">
            {project.title}
          </h3>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-action-primary transition-colors"
              aria-label={`${project.title} GitHub repository`}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>GitHub</title>
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          )}
        </div>
        <p className="text-body text-text-muted mb-6 leading-relaxed">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="text-caption font-medium px-2.5 py-0.5 bg-surface-subtle text-text-default border border-border rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
