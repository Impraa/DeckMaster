export interface IUser{
    id: number,
    role: 'USER' | 'ADMIN',
    username: string,
    email: string,
    password:string,
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type LoginUser = Omit<IUser, 'id' | 'role'> & { rememberMe: boolean };

export type UpdateUser = IUser & { oldPassword?: string, newPassword?: string };

export const isValidUser = (user: IUser): user is IUser => {
    const { id, role, email, password, username } = user;
    return typeof id === 'number' && typeof email === 'string' && typeof password === 'string'
        && typeof username === 'string' && typeof role === 'string';
}

export const isValidUpdateUser = (user: UpdateUser): user is UpdateUser => {
    const { email, username } = user;
    return typeof email === 'string' && typeof username === 'string';
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