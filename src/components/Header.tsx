import { useIsFetching } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"


const Header = () => {
    const isFetching = useIsFetching()

    return (
        <div className="bg-stone-200 flex justify-center items-center">
            {isFetching > 0 && <div className="bg-red-400 h-5 w-full absolute top-0 left-0"></div>}
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
        </div>
    )
}

export default Header