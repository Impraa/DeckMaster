export interface Decklist {
    id: number,
    name:string,
}

export type createDecklist = Omit<Decklist, 'id'>;

export const isValidDecklist = (decklist: Decklist): decklist is Decklist => {
    return typeof decklist.name === 'string' && typeof decklist.id === 'number';
}