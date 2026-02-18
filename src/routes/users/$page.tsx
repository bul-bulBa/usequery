import UsersPage from '@/components/UsersPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$page')({
  component: RouteComponent,
})

function RouteComponent() {
  const {page} = Route.useParams()

  return <UsersPage page={+page} />
}
