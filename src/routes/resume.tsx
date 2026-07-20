import { createFileRoute } from '@tanstack/react-router'
import resumeDataJson from '~/content/resume.json'
import { getTechStack } from '~/features/resume/api/tech-stack-query'
import { ResumeView } from '~/features/resume/components/ResumeView'
import type { ResumeData } from '~/features/resume/types'

const resumeData = resumeDataJson as ResumeData

type ResumeSearch = {
  tech?: string
}

export const Route = createFileRoute('/resume')({
  validateSearch: (search: Record<string, unknown>): ResumeSearch => {
    return {
      tech: typeof search.tech === 'string' ? search.tech : undefined,
    }
  },
  loader: async () => {
    const techStack = await getTechStack()
    return {
      resume: resumeData,
      techStack,
    }
  },
  component: ResumePage,
})

function ResumePage() {
  const { resume, techStack } = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const handleTechChange = (id: string | undefined) => {
    navigate({
      search: (prev) => ({ ...prev, tech: id || undefined }),
    })
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-display font-bold text-text-default mb-12">経歴・実績</h1>
      <ResumeView
        data={resume}
        techStack={techStack}
        activeNodeId={search.tech}
        onChangeActiveNodeId={handleTechChange}
      />
    </div>
  )
}
