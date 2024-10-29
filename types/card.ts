export interface ICard {
    name: string,
    level: string,
    cardType: 'monster' | 'spell' | 'trap',
    type?: 'Aqua' | 'Beast' | 'Beast-Warrior' | 'Creator God' | 'Cyberse' | 'Dinosaur' | 'Divine-Beast' | 'Dragon' | 'Fairy'
    | 'Fiend' | 'Fish' | 'Insect' | 'Illusion' | 'Machine' | 'Plant' | 'Psychic' | 'Pyro' | 'Reptile' | 'Rock' | 'Sea Serpent' |
    'Spellcaster' | 'Thunder' | 'Warrior' | 'Winged Beast' | 'Wyrm' | 'Zombie',
    attribute?: "DARK" | "EARTH" | "FIRE" | "LIGHT" | "WATER" | "WIND" | "DIVINE",
    effect?: string,
    attack?: number,
    defense?: number,
}