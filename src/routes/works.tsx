import { createFileRoute } from '@tanstack/react-router'
import { WorkCard } from '~/features/works/components/WorkCard'
import { workItems } from '~/features/works/data/works'

export const Route = createFileRoute('/works')({
  component: WorksPage,
})

function WorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-display font-bold text-text-default">制作物</h1>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {workItems.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  )
}
