import UsersPage from "@/components/UsersPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/users/')({
    component: Users
})

function Users() {
    return <UsersPage page={1} />
}