import { IUserContextValue } from "@/types/contextTypes";
import React, { createContext, useState } from "react";
import { IUpdateUserData, IUser } from "../../../types/user";
import { logoutUserAsync, updateUserAsync } from "@services/User";

export const UserContext = createContext<IUserContextValue | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const logoutUser = async () => {
    const response = await logoutUserAsync();
    if (!response.error) setUser(null);
  }

  const updateUser = async (id: number, formData: IUpdateUserData) => {
    const response = await updateUserAsync(id, formData);
    if (!response.error) setUser(response.data.user);
  }

  const value = React.useMemo( () => ({ user, setUser, logoutUser, updateUser }), [user] );

  return <UserContext.Provider value={value}> {children} </UserContext.Provider>;
};

export default UserProvider;