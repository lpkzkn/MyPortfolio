import type { Company } from '../types'

interface TimelineProps {
  companies: Company[]
}

export function Timeline({ companies }: TimelineProps) {
  return (
    <div className="relative border-l-2 border-border ml-4 md:ml-6 pl-6 md:pl-8 space-y-12">
      {companies.map((company) => (
        <div key={company.name} className="relative group">
          {/* Timeline bullet */}
          <div className="absolute -left-[35px] md:-left-[43px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-surface border-2 border-action-primary group-hover:border-action-primary-hover transition-colors shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-action-primary group-hover:bg-action-primary-hover transition-colors" />
          </div>

          {/* Content Card */}
          <div className="bg-surface border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-caption font-semibold tracking-wider text-action-primary uppercase bg-surface-subtle border border-border px-2 py-0.5 rounded-md">
                  {company.role}
                </span>
                <h3 className="text-heading font-bold text-text-default mt-2">{company.name}</h3>
              </div>
              <span className="text-caption text-text-muted font-medium bg-surface-subtle px-3 py-1 rounded-full border border-border self-start md:self-auto">
                {company.period}
              </span>
            </div>

            <ul className="space-y-2 list-disc list-inside text-body text-text-muted">
              {company.details.map((detail) => (
                <li key={detail} className="leading-relaxed pl-1 marker:text-action-primary">
                  <span className="text-text-default">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
