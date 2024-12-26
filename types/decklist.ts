import { ICard, IMonsterCard } from './card';

export interface IDecklist {
    id: number,
    name: string,
    mainDeck: Array<ICard | IMonsterCard>,
    extraDeck: Array<ICard | IMonsterCard>,
    sideDeck: Array<ICard | IMonsterCard>,
}

export interface IAddCard {
    decklist: IDecklist | null,
    quantity: number,
    partOfDeck: 'extraDeck' | 'mainDeck' | 'sideDeck'
}

export type createDecklist = Omit<IDecklist, 'id'>;

export const isValidDecklist = (decklist: IDecklist): decklist is IDecklist => {
    return typeof decklist.name === 'string' && typeof decklist.id === 'number' && Array.isArray(decklist.mainDeck)
        && Array.isArray(decklist.extraDeck) && Array.isArray(decklist.sideDeck);
}