import { IUserContextValue } from "@/types/contextTypes";
import { UserContext } from "@context/UserContext";
import { useContext } from "react";

function useUserContext(): IUserContextValue
{
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be used within a UserProvider");
    return context;
};

export default useUserContext;