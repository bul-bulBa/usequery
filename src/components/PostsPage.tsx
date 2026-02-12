import { api } from '@/api/api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Post = {
    id: string,
    title: string,

}

function getPosts() {
    return api.get<Post[]>('/posts')
        .then(res => res.data)
}

export const PostsPage = () => {
    const { data: posts, isLoading, isPending, isFetched } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts
    })

    console.log(posts)

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {isPending && <div>isPending...</div>}
            {isFetched && <div>isFetched...</div>}
            {posts?.map(p => (
                <div key={p.id}>
                    {p.title}
                </div>
            ))}
        </div>
    )
}