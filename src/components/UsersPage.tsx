import UsersCreateForm from "./UsersCreateForm"
import UsersList from "./UsersList"

type Props = {
    page: number
}

const UsersPage = ({page}: Props) => {

    return (
        <div className="flex flex-col gap-4">
            <UsersCreateForm page={page} />
            <UsersList startPage={page} />
        </div>
    )
}

export default UsersPage