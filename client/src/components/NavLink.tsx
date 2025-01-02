import { ReactNode } from "react";
import { Link as ReactLink } from "react-router-dom";

const NavLink:React.FC<{children:ReactNode, URL:string}> = ({children, URL}) => {
    return(
        <ReactLink className="text-primary font-semibold underline hover:no-underline hover:text-black transition-all" to={URL}>{children}</ReactLink>
    )
}

export default NavLink;