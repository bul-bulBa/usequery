import PostDetails from '@/components/PostDetails'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const {id} = Route.useParams()

  return <PostDetails id={id} />
}
