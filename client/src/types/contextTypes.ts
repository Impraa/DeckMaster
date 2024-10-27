import { IUpdateUserData, IUser } from "../../../types/user";

export interface IUserContextValue{
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    logoutUser: () => void,
    updateUser: (id: number, formData: IUpdateUserData) => void,
}