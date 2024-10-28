import { IUpdateUserData, IUser, LoginUser } from "../../../types/user";

export interface IUserContextValue{
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    logoutUser: () => void,
    updateUser: (id: number, formData: IUpdateUserData) => void,
    loginUser: (formData: LoginUser) => void,
    registerUser: (formData: Omit<IUser, 'id' | 'role'>) => void,
}