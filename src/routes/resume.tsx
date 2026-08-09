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
  head: ({ loaderData }) => {
    const resume = loaderData?.resume
    const techStack = loaderData?.techStack || []

    // 主要スキルの名前をフラットに抽出
    const extractSkills = (nodes: typeof techStack): string[] => {
      const list: string[] = []
      for (const n of nodes) {
        list.push(n.name)
        if (n.children) {
          list.push(...extractSkills(n.children))
        }
      }
      return list
    }

    const allSkillNames = extractSkills(techStack)

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Fujisaki Kazuhiko',
        jobTitle: 'Frontend Engineer',
        description: resume?.introduction,
        knowsAbout: allSkillNames,
        sameAs: ['https://github.com/lpkzkn'],
        alumniOf: resume?.companies.map((c) => ({
          '@type': 'OrganizationRole',
          roleName: c.role,
          startDate: c.period.split(' - ')[0] || '',
          endDate: c.period.includes('現在') ? undefined : c.period.split(' - ')[1],
          alumniOf: {
            '@type': 'Organization',
            name: c.name,
          },
        })),
      },
    }

    return {
      meta: [
        { title: '経歴・実績 | MyPortfolio' },
        {
          name: 'description',
          content:
            'フロントエンドエンジニアとしての職務経歴・実績・技術スタック（React, Next.js, React Native, TypeScript等）の一覧。',
        },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(jsonLd),
        },
      ],
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
      resetScroll: false,
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
