import { createFileRoute } from '@tanstack/react-router'
import { CareerCard } from '~/features/career/components/CareerCard'
import { careerItems } from '~/features/career/data/career'

export const Route = createFileRoute('/career')({
  component: CareerPage,
})

function CareerPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-display font-bold text-text-default">職務経歴</h1>
      <div className="mt-8 flex flex-col gap-6">
        {careerItems.map((item) => (
          <CareerCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
