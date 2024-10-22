export interface IUser{
    id: number,
    username: string,
    email: string,
    password:string,
}

export const isValidRegisterUser = (user: Omit<IUser, 'id'>): user is IUser => {
    const { email, password, username } = user;
    return typeof email === 'string' && typeof password === 'string' && typeof username === 'string';
}

export const isValidLoginUser = (user: Omit<IUser, 'id'> & { rememberMe: boolean }): user is IUser & { rememberMe: boolean } => {
    const { email, username, password, rememberMe } = user;
    return (typeof email === 'string' || typeof username === 'string')
        && typeof password === 'string' && typeof rememberMe === 'boolean';
}