import { useCreateUserMutation } from "@/hooks/users/usersMutatons"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

type Props = {
    page: number
}

const UsersCreateForm = ({page}: Props) => {
    const [username, setUsername] = useState<string>('')
    const [age, setAge] = useState<string>('')

    const createUserMutation = useCreateUserMutation()

    const createUser = async () => {
        if (!username || !age) return alert('fill all inputs')
            
        createUserMutation.mutate({data:  {username, age: +age }, page})
    }

    return (
        <div className="flex flex-col w-full gap-2 border-2 border-gray-300 p-4 rounded-md">
            <input
                type="text"
                placeholder="username"
                className="border-2 border-gray-300 p-2 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />

            <input
                type="number"
                placeholder="age"
                className="border-2 border-gray-300 p-2 rounded-md"
                value={age}
                onChange={(e) => setAge(e.target.value)} />

            <button onClick={createUser}
                className="bg-blue-500 text=white p-2 rounded-md">
                {createUserMutation.isPending ? 'Creating...': 'Create'}
            </button>
        </div>
    )
}

export default UsersCreateForm