import useCallContext from "@hooks/useCallContext";
import Link from "@components/Link";
import { UserContext } from "@context/UserContext";

const Navbar = () => {
    const userContext = useCallContext(UserContext);

    return(
        <nav className="flex justify-between p-4">
            <div>
                <Link URL="/">Home</Link>
            </div>
            <div className="space-x-4 flex justify-between">
                {
                    userContext && userContext.user ? 
                        (
                            <>
                                <Link URL="/create-decklist">Create Decklist</Link>
                                <div className="flex space-x-4">
                                    <p>Hello, <Link URL={`/profile/${userContext.user.id}`} >{userContext.user.username}</Link></p>
                                    <button onClick={() => {userContext.logoutUser()}}>Logout</button>
                                </div>
                            </>
                        ) :
                        (
                            <>
                                <Link URL="/login">Login</Link>
                                <Link URL="/register">Register</Link>
                            </>
                        )
                }
                
            </div>
        </nav>
    );
}

export default Navbar;