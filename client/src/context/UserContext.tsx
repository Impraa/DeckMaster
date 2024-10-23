import { IUserContextValue } from "@/types/contextTypes";
import React, { createContext, useState } from "react";
import { IUser } from "../../../types/user";

export const UserContext = createContext<IUserContextValue | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const value = React.useMemo( () => ({ user, setUser }), [user] );

  return <UserContext.Provider value={value}> {children} </UserContext.Provider>;
};

export default UserProvider;