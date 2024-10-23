export interface IUser{
    id: number,
    username: string,
    email: string,
    password:string,
}

export type LoginUser = Omit<IUser, 'id'> & { rememberMe: boolean };

export const isValidRegisterUser = (user: Omit<IUser, 'id'>): user is IUser => {
    const { email, password, username } = user;
    return typeof email === 'string' && typeof password === 'string' && typeof username === 'string';
}

export const isValidLoginUser = (user: LoginUser): user is LoginUser => {
    const { email, username, password, rememberMe } = user;
    return (typeof email === 'string' || typeof username === 'string')
        && typeof password === 'string' && typeof rememberMe === 'boolean';
}