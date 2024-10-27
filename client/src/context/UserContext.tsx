import { IUserContextValue } from "@/types/contextTypes";
import React, { createContext, useLayoutEffect, useState } from "react";
import { isValidUser, IUpdateUserData, IUser } from "../../../types/user";
import { logoutUserAsync, refreshUserAsync, updateUserAsync } from "@services/User";

export const UserContext = createContext<IUserContextValue | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    //refresh user
    if(!user)
    {
      const fetchUserData = async () => {
          setIsLoading(true);
          const response = await refreshUserAsync();
          const { error, data } = response;
        if (!error && isValidUser(data.user))
        {
          setUser(data.user);
          setIsLoading(false);
        }
      };
    
      fetchUserData();
    }
  }, [user])

  const logoutUser = async () => {
    setIsLoading(true);
    const response = await logoutUserAsync();
    if (!response.error)
    {
      setIsLoading(false);
      setUser(null);
    }
  }

  const updateUser = async (id: number, formData: IUpdateUserData) => {
    setIsLoading(true);
    const response = await updateUserAsync(id, formData);
    if (!response.error) setUser(response.data.user);
    setIsLoading(false)
  }

  const value = React.useMemo( () => ({ user, setUser, isLoading, setIsLoading, logoutUser, updateUser }), [user, isLoading] );

  return <UserContext.Provider value={value}> {children} </UserContext.Provider>;
};

export default UserProvider;