import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/users/')({
    component: Users
})

function Users() {
    return (
        <div>
            Hello from users!
        </div>
    )
}