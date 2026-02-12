import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const RootLayout = () => (
    <>
        <div className="flex gap-2 items-center m-5">
            <Link to={'/'}>
                Home
            </Link>
            <Link to={'/users'}>
                Users
            </Link>
            <Link to={'/posts'}>
                Posts
            </Link>
        </div>
        <div className='m-10'>
            <Outlet />
        </div>
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools initialIsOpen={false} />
    </>
)

export const Route = createRootRoute({ component: RootLayout })