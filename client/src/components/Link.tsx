import { ReactNode } from "react";
import { Link as ReactLink } from "react-router-dom";

const Link:React.FC<{children:ReactNode, URL:string}> = ({children, URL}) => {
    return(
        <ReactLink to={URL}>{children}</ReactLink>
    )
}

export default Link;