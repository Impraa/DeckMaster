import { useContext } from "react";

function useCallContext<T>(value: React.Context<T>):T{
    const context = useContext(value);
    if (context === null) {
      throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export default useCallContext;