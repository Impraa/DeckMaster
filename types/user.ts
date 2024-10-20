export interface IUser{
    id: number,
    username: string,
    email: string,
    password:string,
}

export const isValidUser = (user: Omit<IUser,'id'>): user is IUser => {
    return typeof user.email === 'string' && typeof user.password === 'string' && typeof user.username === 'string'
}