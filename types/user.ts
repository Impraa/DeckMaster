export interface IUser{
    id: number,
    role: 'USER' | 'ADMIN',
    username: string,
    email: string,
    password:string,
}

export type LoginUser = Omit<IUser, 'id' | 'role'> & { rememberMe: boolean };

export const isValidUser = (user: IUser): user is IUser => {
    const { id, role, email, password, username } = user;
    return typeof id === 'number' && typeof email === 'string' && typeof password === 'string'
        && typeof username === 'string' && typeof role === 'string';
}

export const isValidRegisterUser = (user: Omit<IUser, 'id'>): user is IUser => {
    const { email, password, username } = user;
    return typeof email === 'string' && typeof password === 'string' && typeof username === 'string';
}

export const isValidLoginUser = (user: LoginUser): user is LoginUser => {
    const { email, username, password, rememberMe } = user;
    return (typeof email === 'string' || typeof username === 'string')
        && typeof password === 'string' && typeof rememberMe === 'boolean';
}