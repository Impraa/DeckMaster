import { IUser } from "../../../types/user";

export interface IUserContextValue{
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
}