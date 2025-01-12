import React, { ReactNode } from "react";
import { IUser, IUpdateUserData } from "../../../types/user";
import { IDecklist } from "../../../types/decklist";

export interface IInput {
    labelText: string,
    inputType: string,
    inputName: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined,
}

export interface IButton {
    children: ReactNode,
    type: 'button' | 'submit',
    style: 'normal' | 'inverted' | 'danger' | 'success',
    onClick?: () => void,
}

export interface IEditProfileForm {
    user: IUser | null,
    updateUser: (id: number, formData: IUpdateUserData) => void,
    setError: (error: string) => void,
    error: string | null
}

export interface IDecklistCard {
    link: string,
    decklist: IDecklist
}