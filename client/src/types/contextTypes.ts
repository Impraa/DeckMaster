import { IUpdateUserData, IUser, LoginUser } from "../../../types/user";
import { ICard } from '../../../types/card';

export interface IUserContextValue{
    user: IUser | null,
    isLoading: boolean,
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
    fetchCardsWithSearch: (offset: number, searchTerm: string) => void,
    uploadNewCard: (formData: FormData) => void,
}