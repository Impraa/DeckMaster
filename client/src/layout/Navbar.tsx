import useCallContext from "@hooks/useCallContext";
import NavLink from "@components/NavLink";
import { UserContext } from "@context/UserContext";
import Hamburger from "@assets/Hambuger";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const userContext = useCallContext(UserContext);
    const [showDrawer, setShowDrawer] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setShowDrawer(false);
    }, [location]);
    
    return (
        <>
            <div className={`transform ${showDrawer ? 'animate-slide-in' : 'translate-x-[-100%] animate-slide-out'} bg-white fixed top-0 left-0 min-h-[100vh] max-h-[100vh]
            flex flex-col space-y-4 w-[35vw] justify-center p-5 shadow-2xl z-50`}>
                <NavLink URL="/"> Home </NavLink>
                <NavLink URL="/decklists">All decklists</NavLink>
                    {
                        userContext && userContext.user ? 
                            (
                                <>
                                    {userContext.user.role === 'ADMIN' && <NavLink URL="/manage-cards">Manage Cards</NavLink>}
                                    <NavLink URL="/manage-decklist">Manage Decklist</NavLink>
                                    <div className="flex flex-col space-y-4 items-start">
                                        <p>Hello, <NavLink URL={`/profile/${userContext.user.id}`} >{userContext.user.username}</NavLink></p>
                                        <button onClick={() => {userContext.logoutUser()}}>Logout</button>
                                    </div>
                                </>
                            ) :
                            (
                                <>
                                    <NavLink URL="/login">Login</NavLink>
                                    <NavLink URL="/register">Register</NavLink>
                                </>
                            )
                    }
            </div>
            <nav className="flex justify-between p-4">
                <div>
                    <NavLink URL="/">Deck Master</NavLink>
                </div>
                <div>
                    <Hamburger className="hover: cursor-pointer" onClick={() => setShowDrawer(!showDrawer)}/>
                </div>
            </nav>
        </>
    );
}

export default Navbar;