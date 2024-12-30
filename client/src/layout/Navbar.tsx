import useCallContext from "@hooks/useCallContext";
import Link from "@components/Link";
import { UserContext } from "@context/UserContext";
import Hamburger from "@assets/Hambuger";
import { useState } from "react";

const Navbar = () => {
    const userContext = useCallContext(UserContext);
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <>
            <div className={`${showDrawer ? 'display' : 'hidden'} bg-white fixed top-0 left-0 min-h-[100vh] max-h-[100vh]
            flex flex-col space-y-4 w-[35vw]`}>
                <Link URL="/decklists">All decklists</Link>
                    {
                        userContext && userContext.user ? 
                            (
                                <>
                                    {userContext.user.role === 'ADMIN' && <Link URL="/manage-cards">Manage Cards</Link>}
                                    <Link URL="/manage-decklist">Manage Decklist</Link>
                                    <div className="flex flex-col space-y-4 items-start">
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
            <nav className="flex justify-between p-4">
                <div>
                    <Link URL="/">Home</Link>
                </div>
                <div>
                    <Hamburger className="hover: cursor-pointer" onClick={() => setShowDrawer(!showDrawer)}/>
                </div>
            </nav>
        </>
    );
}

export default Navbar;