import { IUpdateUserData, IUser, LoginUser } from "../../../types/user";
import { ICard } from '../../../types/card';

export interface IUserContextValue{
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    error: string | null,
    logoutUser: () => void,
    updateUser: (id: number, formData: IUpdateUserData) => void,
    loginUser: (formData: LoginUser) => void,
    registerUser: (formData: Omit<IUser, 'id' | 'role'>) => void,
}

export interface ICardContextValue{
    cards: ICard[],
    card: ICard | null,
    isLoading: boolean,
    fetchCards: (offset: number) => void,
    setCardDetails: (id: number) => void,
}