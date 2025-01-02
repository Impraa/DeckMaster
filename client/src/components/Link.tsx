import { ReactNode } from "react";
import { Link as ReactLink } from "react-router-dom";

const Link:React.FC<{children:ReactNode, URL:string}> = ({children, URL}) => {
    return(
        <ReactLink className="bg-primary self-start px-5 py-2 text-white rounded-lg border-2 border-primary hover:bg-transparent hover:text-black transition-all" to={URL}>{children}</ReactLink>
    )
}

export default Link;