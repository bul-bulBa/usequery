import { api } from '@/api/api'
import { QueryClient, useQueries, useQuery, useQueryClient, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import axios from 'axios'
import { Suspense } from 'react'

export type Post = {
    id: string,
    title: string,

}

function getPosts() {
    return api.get<Post[]>('/posts')
        .then(res => res.data)
}

export function getPostsById(id: string) {
    return api.get<Post>(`/posts/${id}`)
        .then(res => res.data)
}


function PostsList() {

    const {
        data: posts,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    })


    return (
        <div>
            {posts?.map(p => (
                <div key={p.id}>
                    <Link to='/posts/$id' params={{ id: p.id}}>
                        {p.title}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export const PostsPage = () => {
    return (
        <div>
            <PostsList />
        </div>
    )
}