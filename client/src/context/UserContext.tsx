import { IUserContextValue } from "@/types/contextTypes";
import React, { createContext, useLayoutEffect, useState } from "react";
import { isValidUser, IUpdateUserData, IUser, LoginUser } from "../../../types/user";
import { isUserDeckOwnerAsync, loginUserAsync, logoutUserAsync, refreshUserAsync, registerUserAsync, updateUserAsync } from "@services/User";

export const UserContext = createContext<IUserContextValue | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    //refresh user
    if(!user)
    {
      const fetchUserData = async () => {
          setIsLoading(true);
          const response = await refreshUserAsync();
          const { error, data } = response;
        if (!error && isValidUser(data.user)) {
          setUser(data.user);
          setError(null);
        }
        else
        {
          if(data !== "No token present" ) setError(data);
        }
      };
    
      fetchUserData();
    }

    if (isLoading && (user || error)) {
      setIsLoading(false);
    }
  }, [user])

  const loginUser = async (formData: LoginUser) => {
    setIsLoading(true);
    const response = await loginUserAsync(formData);
    if (!response.error)
    {
      setUser(response.data.user);
      setError(null);
    }
    else setError(response.data);
    setIsLoading(false);
  }

  const registerUser = async (formData: Omit<IUser, 'id' | 'role'>) => {
    setIsLoading(true);
    const response = await registerUserAsync(formData);
    if (!response.error)
    {
      setUser(response.data.user);
      setError(null);
    }
    else setError(response.data);
    setIsLoading(false);
  }

  const logoutUser = async () => {
    setIsLoading(true);
    const response = await logoutUserAsync();
    if (!response.error)
    {
      setUser(null);
      setError(null);
    }
    else setError(response.data);
    setIsLoading(false);
  }

  const updateUser = async (id: number, formData: IUpdateUserData) => {
    setIsLoading(true);
    const response = await updateUserAsync(id, formData);
    if (!response.error)
    {
      setUser(response.data.user);
      setError(null);
    }
    else setError(response.data);
    setIsLoading(false)
  }

  const isUserDeckOwner = async (userId: number, deckId: number) => {
    setIsLoading(true);
    const response = await isUserDeckOwnerAsync(userId, deckId);
    if (!response.error)
    {
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  }

  const value = React.useMemo(() => ({
    user, isLoading, error,
    logoutUser, updateUser, loginUser, registerUser, isUserDeckOwner
  }), [user, isLoading, error]);

  return <UserContext.Provider value={value}> {children} </UserContext.Provider>;
};

export default UserProvider;