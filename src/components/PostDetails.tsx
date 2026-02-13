import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPostsById, type Post } from "./PostsPage"

const PostDetails = ({id}: {id: string}) => {
    const queryClient = useQueryClient()

    const {data: post} = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPostsById(id),
        placeholderData: () => {
            const posts = queryClient.getQueryData<Post[]>(['posts'])
            return posts?.find((post: Post) => post.id === id)
        }
    })

    return <div>{post?.id}.{post?.title}</div>
}

export default PostDetails