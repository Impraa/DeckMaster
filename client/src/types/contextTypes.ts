import { IUpdateUserData, IUser, LoginUser } from "../../../types/user";
import { ICard } from '../../../types/card';
import { IAddCard, IDecklist } from '../../../types/decklist';
import React from "react";

export interface IUserContextValue{
    user: IUser | null,
    isLoading: boolean,
    error: string | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>
    isUserDeckOwner: (userId: number, deckId:number) => Promise<boolean>,
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
    getCard: (id: number) => void,
    setCardDetails: (id: number) => void,
    fetchCardsWithSearch: (offset: number, searchTerm: string) => void,
    uploadNewCard: (formData: FormData) => void,
    deleteCard: (cardId: number) => void,
    updateCard: (id:number, fromData:FormData) => void,
}

export interface IModalContextValue{
    isVisible: boolean,
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IDecklistContextValue{
    decklist: IDecklist | null,
    decklists: IDecklist[],
    isLoading: boolean,
    fetchAllCards: (id: number) => void,
    fetchAllUserDecklists: (userId: number) => void,
    fetchAllDecklists: () => void,
    addCardToDecklist: (fromData: IAddCard, cardId: number) => void,
    changeDeckName: (name: string) => void,
    clearDecklist: () => void,
    removeCardFromDecklist: (decklistId: number, cardId: number, partOfDeck: 'mainDeck' | 'sideDeck' | 'extraDeck') => void,
    removeDecklist: (decklistId: number) => void,
}