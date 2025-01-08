import React, { ReactNode } from "react";

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