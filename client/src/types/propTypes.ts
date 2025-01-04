import React from "react";

export interface IInput {
    labelText: string,
    inputType: string,
    inputName: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined,
}