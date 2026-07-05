import type { ResumeData } from '../types'
import { ProjectCard } from './ProjectCard'
import { Timeline } from './Timeline'

interface ResumeViewProps {
  data: ResumeData
}

export function ResumeView({ data }: ResumeViewProps) {
  return (
    <div className="space-y-16">
      {/* Intro Section */}
      <section className="bg-surface-subtle border border-border rounded-2xl p-8 md:p-12 shadow-sm">
        <h2 className="text-heading font-bold text-text-default mb-4">自己紹介</h2>
        <p className="text-body text-text-default leading-relaxed whitespace-pre-wrap">
          {data.introduction}
        </p>
      </section>

      {/* Timeline Section */}
      <section>
        <h2 className="text-heading font-bold text-text-default mb-8 pl-2 border-l-4 border-action-primary">
          職務経歴
        </h2>
        <Timeline companies={data.companies} />
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="text-heading font-bold text-text-default mb-8 pl-2 border-l-4 border-action-primary">
          プロジェクト実績
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
