import type { User } from "@/api/usersApi"
import { useDeleteUserMutation } from "@/hooks/users/usersMutatons"
import { useUsersQuery } from "@/hooks/users/usersQuery"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

const UserItem = ({user, page}: {user: User, page: number}) => {

    const deleteUserMutation = useDeleteUserMutation()

    const deleteHandler = (id: string) => {
        deleteUserMutation.mutate({id, page})
    }

    return (
        <div key={user.id} className="flex gap-2 border p-3">
            <span>{user.id}</span>
            <span>{user.username}</span>
            <span>{user.age}</span>
            
            <button onClick={() => deleteHandler(user.id)}>
                {deleteUserMutation.isPending ? 'Deleting...' : 'delete'}
            </button>
        </div>
    )
}

const UsersList = ({startPage}: {startPage: number}) => {
    const navigate = useNavigate()
    const [page, setPage] = useState(startPage)
    const limit = 3
    const { data: usersData} = useUsersQuery({page, limit})

    const handlePage = (page: number) => {
        navigate({
            to: '/users/$page',
            params: { page: String(page)}
        })
        setPage(page)
    }

    const total = usersData?.total ?? 0
    const users = usersData?.data
    
    return (
        <div className="flex flex-col gap-4">
            <h1>All users: {total}</h1>
            <h2>page: {page}</h2>
            {users?.map(u => (
                <UserItem key={u.id} user={u} page={page} />
            ))}
            
            <div className="flex gap-2">
                <button onClick={() => handlePage(page - 1)}>Prev</button>

                {new Array(Math.ceil(total / limit)).fill(0).map((_, index) => (
                    <button key={index} onClick={() => handlePage(index + 1)}>
                        {index + 1}
                    </button>
                ))}

                <button onClick={() => handlePage(page + 1)}>Next</button>
            </div>
        </div>
    )
}

export default UsersList