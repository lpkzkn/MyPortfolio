import { createFileRoute } from '@tanstack/react-router'
import resumeDataJson from '~/content/resume.json'
import { ResumeView } from '~/features/resume/components/ResumeView'
import type { ResumeData } from '~/features/resume/types'

const resumeData = resumeDataJson as ResumeData

export const Route = createFileRoute('/resume')({
  loader: () => resumeData,
  component: ResumePage,
})

function ResumePage() {
  const data = Route.useLoaderData()
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-display font-bold text-text-default mb-12">経歴・実績</h1>
      <ResumeView data={data} />
    </div>
  )
}
