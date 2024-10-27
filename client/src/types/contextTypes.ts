import { IUpdateUserData, IUser } from "../../../types/user";

export interface IUserContextValue{
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    logoutUser: () => void,
    updateUser: (id: number, formData: IUpdateUserData) => void,
}