import { createFileRoute } from '@tanstack/react-router'
import { CatalogView } from '~/features/catalog/components/CatalogView'

export const Route = createFileRoute('/catalog')({
  component: CatalogPage,
})

function CatalogPage() {
  return <CatalogView />
}
