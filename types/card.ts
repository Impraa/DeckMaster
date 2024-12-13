type CardType = 
    'Effect Monster' | 'Continuous Trap' | 'Normal Monster' | 'Pendulum Effect Monster' | 'Normal Trap' | 
    'Fusion Effect Monster' | 'Flip Effect Monster' | 'Normal Spell' | 'Synchro Effect Monster' | 'Quick-Play Spell' | 
    'Tuner Effect Monster' | 'Link Effect Monster' | 'Token' | 'Equip Spell' | 'Field Spell' | 'Xyz Effect Monster' | 
    'Continuous Spell' | 'Tuner Normal Monster' | 'Counter Trap' | 'Synchro Tuner Effect Monster' | 
    'Fusion Monster' | 'Spirit Effect Monster' | 'Pendulum Tuner Effect Monster' | 'Union Effect Monster' | 
    'Fusion Tuner Monster' | 'Xyz Pendulum Effect Monster' | 'Ritual Monster' | 'Ritual Effect Monster' | 
    'Gemini Effect Monster' | 'Link Monster' | 'Fusion Pendulum Effect Monster' | 'Toon Effect Monster' | 
    'Pendulum Normal Monster' | 'Ritual Spell' | 'Xyz Monster' | 'Synchro Monster' | 'Pendulum Flip Effect Monster' | 
    'Trap' | 'Synchro Pendulum Effect Monster' | 'Flip Tuner Effect Monster' | 'Pendulum Tuner Normal Monster' | 
    'Ritual Pendulum Effect Monster' | 
    'Skill - Bonz' | 'Skill - Yugi' | 'Skill - Ishizu' | 'Skill - Mako' | 'Skill - Joey' | 'Skill - Kaiba' | 
    'Skill - Keith' | 'Skill - Rex' | 'Skill - Weevil' | 'Skill - Pegasus' | 'Skill - Mai' | 'Skill - Yami Yugi' | 
    'Skill - Yami Bakura' | 'Skill - Yami Marik' | 'Skill - Christine' | 'Skill - Emma' | 'Skill - Andrew' | 
    'Skill - David' | 'Skill - Odion' | 'Skill - Joey Wheeler' | 'Skill - Espa Roba' | 'Skill - Seto Kaiba' | 
    'Skill - Arkana' | 'Skill - Mai Valentine' | 'Skill - Tea Gardner' | 'Skill - Ishizu Ishtar' | 'Skill - Lumis Umbra' | 
    'Skill - Dr. Vellian C' | 'Skill - Chazz Princet' | 'Skill - Axel Brodie' | 'Skill - Yubel' | 
    'Skill - Jesse Anderso' | 'Skill - Alexis Rhodes' | 'Skill - Zane Truesdal' | 'Skill - Bastion Misaw' | 
    'Skill - Jaden Yuki' | 'Skill - Tyranno Hassl' | 'Skill - Aster Phoenix' | 'Skill - Syrus Truesda' | 
    'Skill - Paradox Broth' | 'Skill - Chumley Huffi' | 'Skill - Lumis and Umb' | 'Skill - Abidos the Th' | 
    'Skill - Titan' | 'Skill - Adrian Gecko' | 'Skill - Thelonious Vi' | 'Skill - The Supreme K' | 
    'Skill - Camula' | 'Skill - Nightshroud' | 'Skill - Don Zaloog' | 'Skill - Tania' | 'Skill - Amnael' | 'Skill - Kagemaru';
  
export type RaceType = 
    'Fiend' | 'Dragon' | 'Continuous' | 'Zombie' | 'Beast-Warrior' | 'Normal' | 'Fairy' | 'Warrior' | 'Quick-Play' | 
    'Rock' | 'Spellcaster' | 'Winged Beast' | 'Plant' | 'Beast' | 'Machine' | 'Cyberse' | 'Equip' | 'Field' | 
    'Fish' | 'Thunder' | 'Pyro' | 'Sea Serpent' | 'Aqua' | 'Reptile' | 'Counter' | 'Psychic' | 'Insect' | 
    'Illusion' | 'Dinosaur' | 'Wyrm' | 'Ritual' | 'Divine-Beast' | 'Creator God' | 

    'Bonz' | 'Yugi' | 'Ishizu' | 'Mako' | 'Joey' | 'Kaiba' | 'Keith' | 'Rex' | 'Weevil' | 'Pegasus' | 'Mai' | 
    'Yami Yugi' | 'Yami Bakura' | 'Yami Marik' | 'Christine' | 'Emma' | 'Andrew' | 'David' | 'Odion' | 'Joey Wheeler' | 
    'Espa Roba' | 'Seto Kaiba' | 'Arkana' | 'Mai Valentine' | 'Tea Gardner' | 'Ishizu Ishtar' | 'Lumis Umbra' | 

    'Dr. Vellian C' | 'Chazz Princet' | 'Axel Brodie' | 'Yubel' | 'Jesse Anderso' | 'Alexis Rhodes' | 'Zane Truesdal' | 
    'Bastion Misaw' | 'Jaden Yuki' | 'Tyranno Hassl' | 'Aster Phoenix' | 'Syrus Truesda' | 'Paradox Broth' | 
    'Chumley Huffi' | 'Lumis and Umb' | 'Abidos the Th' | 'Titan' | 'Adrian Gecko' | 'Thelonious Vi' | 'The Supreme K' | 
    'Camula' | 'Nightshroud' | 'Don Zaloog' | 'Tania' | 'Amnael' | 'Kagemaru';

type ArchetypeType = 
    'Labrynth' | 'SPYRAL' | 'D/D' | 'Gem-' | 'Starry Knight' | 'Ancient Gear' | 'Cipher' | 'D.D.' | 'Dark Magician' | 
    'Performapal' | 'Laval' | 'Rikka' | 'Train' | 'Vylon' | 'Koa\'ki Meiru' | 'Elemental HERO' | 'Exosister' | 
    'Inzektor' | 'Shinobird' | 'Mermail' | 'Dual Avatar' | 'Majestic' | 'T.G.' | 'Umi' | 'Trickstar' | 
    'Flame Swordsman' | 'Magistus' | 'Gusto' | 'Lswarm' | 'Stardust' | 'Dinomist' | 'Gagaga' | 'Exodd' | 
    'Watt' | 'Possessed' | 'Greed' | 'Invoked' | 'Edge Imp' | 'Superheavy' | 'Tearlaments' | 'PSY-Frame' | 'Kuriboh' |
  
    'Malefic' | 'Burning Abyss' | 'Gladiator Beast' | 'Gadget' | 'Majespecter' | 'Alien' | 'Synchro' | 'Zoodiac' | 
    'Lightsworn' | 'Orcust' | 'Atlantean' | 'Amazoness' | 'Generaider' | 'Charmer' | 'Spellbook' | 'Shiranui' | 
    'Black Luster Soldier' | 'Flamvell' | 'Visas' | 'Rose' | 'Galaxy' | 'Dragunity' | 'Golden Castle of Stromberg' | 
    'Mecha Phantom Beast' | 'Geargia' | 'Boot-Up' | 'Traptrix' | 'B.E.S.' | 'Armed Dragon' | 'Roid' | 'Junk' | 'Hole' | 
    'Branded' | 'Tellarknight' | 'Dream Mirror' | 'Scrap' | 'F.A.' | 'Guardian' | 'Cyber Dragon' | 'Subterror' | 
    'Paleozoic' | 'Cyberdark' | 'Millennium' | 'Drytron' | 'Phantasm Spiral' | 'Cubic' | 'Herald' | 'Utopic' |
  
    'Kozmo' | 'Salamangreat' | 'Icejade' | 'Vaalmonica' | 'Magician' | 'Frog' | 'Photon' | 'Koala' | 'Hazy' | 
    'Chaos' | 'Six Samurai' | 'Altergeist' | 'Odd-Eyes' | 'Fur Hire' | 'Genex' | 'Neo-Spacian' | 'Rose Dragon' | 
    'ABC' | 'Ninja' | 'Fire Fist' | 'Power Tool' | 'Beetrooper' | 'Wind-Up' | 'Assault Mode' | 'Chimera' | 
    'Super Quant' | 'Heroic' | 'Vendread' | 'Bujin' | 'Code Talker' | 'Morphtronic' | 'Gimmick Puppet' | 
    'Silent Swordsman' | 'Sinful Spoils' | 'Blackwing' | 'Worm' | 'Chronomaly' | 'Constellar' | 'Yang Zing' | 
    'Gaia The Fierce Knight' | 'Blue-Eyes' | 'Meklord' | 'X-Saber' | 'Valkyrie' | 'Book of' | 'Spright' | 'Nordic' | 
  
    'Gandora' | 'Mayakashi' | 'Abyss Actor' | 'Ojama' | 'Ghoti' | 'Heraldry' | 'Fiendsmith' | 'Fire King' | 
    'Archfiend' | 'Adventurer Token' | 'Destruction Sword' | 'Utopia' | 'ARG☆S' | 'Fluffal' | 'Crystron' | 
    'Graydle' | 'Ancient Warriors' | 'Nimble' | 'Knightmare' | 'Zexal' | 'Karakuri' | 'Mekk-Knight' | 'Gogogo' | 
    'Naturia' | 'Ashened' | 'Legendary Knight' | 'Dark World' | 'Evolsaur' | 'Hieratic' | 'Phantom Knights' | 
    'Alligator' | 'Arcana Force' | 'Gravekeeper\'s' | 'Melodious' | 'Appliancer' | 'Dice' | 'Duston' | 'Crystal' | 
  
    'Noble Knight' | 'Evil HERO' | 'Endymion' | 'Cyber Angel' | 'Ally of Justice' | 'CXyz' | 'Shaddoll' | 'Djinn' | 
    'Magician Girl' | 'Slime' | 'Flower Cardian' | 'Numeron' | 'Blaze Accelerator' | 'Fortune Fairy' | 
    'Performage' | '"C"' | 'Centur-Ion' | 'Darklord' | 'Mist Valley' | 'Qli' | 'Venom' | 'Battlin\' Boxer' | 
    'Infernity' | 'Magnet Warrior' | 'Metalfoes' | 'World Chalice' | 'Bugroth' | 'Yubel' | 'Ragnaraika' | 'Vampire' |
  
    'Kashtira' | 'Monarch' | 'Harpie' | 'Exodia' | 'Prediction Princess' | 'Tenyi' | 'Aroma' | 'Gladiator' | 
    'Rokket' | 'Swordsoul' | 'Superheavy Samurai' | 'Red-Eyes' | 'Infinitrack' | 'Thunder Dragon' | 
    'Magical Musket' | 'Egyptian God' | 'Zefra' | 'Predaplant' | 'Earthbound' | 'Symphonic Warrior' | 'Myutant' | 
    'Jurrac' | 'Marincess' | 'Machina' | 'Battleguard' | 'White' | 'Penguin' | 'Hi-Speedroid' | 'Resonator' | 
    'Shining Sarcophagus' | 'Toon' | 'Raidraptor' | 'Scareclaw' | 'Sacred Beast' | 'Bonding' | 'Ice Barrier' | 'Frightfur' | 
  
    'Clear' | 'Swarm of' | 'Wight' | 'Knight' | 'Shark' | 'Parasite' | 'Borrel' | 'Amorphage' | 'Mikanko' | 
    'A-to-Z' | 'Amazement' | 'Evil Eye' | 'A.I.' | 'Glacial Beast' | 'Secret Six Samurai' | 'Dododo' | 'P.U.N.K.' | 
    'Timelord' | 'Bystial' | 'Nemeses' | 'Ryzeal' | 'Despia' | 'Dark Scorpion' | 'Guardragon' | 'Crystal Beast' | 
    'Dracoverlord' | 'Umbral Horror' | 'Vernusylph' | 'Dinomorphia' | 'Void' | 'Wicked God' | 'Fusion' | 'Seventh' | 
    'Artifact' | 'Springans' | 'Gouki' | 'Ghostrick' | 'Number' | 'Tri-Brigade' | 'Ancient Treasure' | 'Sunavalon' | 
  
    'Galaxy-Eyes' | 'Live☆Twin' | 'Super Defense Robot' | 'Corn' | 'Elemental Lord' | 'Demise' | 'Lyrilusc' | 
    'Fabled' | 'Ritual Beast' | 'Infernoid' | 'Nephthys' | 'Jester' | 'Sky Striker' | 'Deep Sea' | 'Gate Guardian' | 
    'Reptilianne' | 'Evoltile' | 'Destiny HERO' | 'Virtual World' | 'Maju' | 'Star Seraph' | 'Vanquish Soul' | 
    'Evil★Twin' | 'Gishki' | 'Horus the Black Flame Dragon' | 'Stellarknight' | 'Adamancipator' | 'Ogdoadic' | 
    'Jinzo' | 'Abyss-' | 'U.A.' | 'Tindangle' | 'Ninjitsu Art' | 'Witchcrafter' | 'Crusadia' | 'Snake-Eye' |
  
    'Gaia Knight' | 'Azamina' | 'Triamid' | 'Fossil' | 'Deskbot' | 'Fleur' | 'Danger!' | 'Sylvan' | '@Ignister' | 
    'War Rock' | 'Fishborg' | 'Therion' | 'Yosenju' | 'Trap Monster' | 'Krawler' | 'Fire Formation' | 'Purrely' | 
    'Voiceless Voice' | 'Time Thief' | 'Masked HERO' | 'Rainbow Bridge' | 'Kaiju' | 'Elementsaber' | 'Lunalight' | 
    'Horus' | 'Simorgh' | 'Madoor' | 'Volcanic' | 'Mimighoul' | 'Dinowrestler' | 'Madolche' | 'Speedroid' | 'Metaphys' | 
  
    'Tistina' | 'Parshath' | 'Digital Bug' | 'Mask' | 'World Legacy' | 'True Draco' | 'Dragonmaid' | 'Vaylantz' | 
    'Gizmek' | 'Supreme King' | 'Cloudian' | 'Impcantation' | 'Dogmatika' | 'Mathmech' | '-Eyes Dragon' | 'Recipe' | 
    'White Forest' | 'Spirit Message' | 'Libromancer' | 'Lady of Lament' | 'Memento' | 'Grepher' | 'Windwitch' | 
    'Dracoslayer' | 'Nekroz' | 'Ursarctic' | 'Puppet' | 'Nouvelles' | 'Sphinx' | 'Goblin' | 'Evol' | 'Eyes Restrict' | 
  
    'Metalmorph' | 'Aesir' | 'Synchron' | 'Starliege' | 'Prank-Kids' | 'Noble Arms' | 'Sky Scourge' | 'Magikey' | 
    'Potan' | 'Contact' | 'Chrysalis' | 'Solemn' | 'Butterspy' | 'The Weather' | 'Nemleria' | 'Xyz' | 'Fairy' | 
    'Materiactor' | 'Plunder Patroll' | 'Bounzer' | 'Mannadium' | 'Heraldic' | 'Nemurelia' | 'Predap' | 'Floowandereeze' | 
    'Pendulum' | 'Wedju' | 'Vision HERO' | 'Doll Monster' | 'Evolzar' | 'Infestation' | 'Advanced Crystal Beast' | 'Sangen' | 
  
    'Chemicritter' | 'Barbaros' | 'Batteryman' | 'Battlin\' Boxing' | 'Light and Darkness Dragon' | 'Iron Chain' | 
    'Melffy' | 'Fortune Lady' | 'Anti' | 'Apoqliphort' | 'Firewall' | 'S-Force' | 'Golden Land' | 'Eldlich' | 'Runick' | 
    'Maliss' | 'Ryu-Ge' | 'Circular' | 'Gunkan' | 'Gold Pride' | 'Cupid' | 'Steelswarm' | 'Skull Servant' | 
    'Vassal' | 'Igknight' | 'Tenpai Dragon' | 'Indestructible Insect' | 'Allure Queen' | 'Kairyu-Shin' | 'Doriado' |
  
    'Mystical Beast of the Forest' | 'HERO' | 'G Golem' | 'Unchained' | 'Forbidden' | 'Toy' | 'Exchange of the Spirit' | 
    'Battlewasp' | 'Star' | 'Megalith' | 'Rescue-ACE' | 'Patissciel' | 'The Agent' | 'Signature move' | 'Mythical Beast' | 
    'Sunseed' | 'Primite' | 'Field Searcher' | 'Priestess' | 'Solfachord' | 'Sunvine' | 'Heart' | 'Six Strike' | 
    'Aquaactress' | 'Empower' | 'Polymerization' | 'Uniform Nomenclature' | 'Empowered Warrior' | 'Attraction' | 
  
    'Transcendosaurus' | 'Barian\'s' | 'Doodle Beast' | 'Neos' | 'Counter Fairy' | 'Rank-Up-Magic' | 'Saber' | 
    'Cyber' | 'Divine Dragon' | 'Abyss Script' | 'Bamboo Sword' | 'Dark Contract' | 'Spider' | 'Labyrinth Wall' | 
    'Malicevorous' | 'with Eyes of Blue' | 'Gorgonic' | 'Cosmic Synchro Monster' | 'Spiritual Art' | 'Albaz Dragon' | 
    'Prophecy' | 'Diabell' | 'Martial Art Spirit' | 'Veda' | 'Silent Magician' | 'Mulcharmy' | 'Chaos Phantom' | 
  
    'Doll' | 'Risebell' | 'Zera' | 'Celtic Guard' | 'Gem Dragon' | 'Codebreaker' | 'Rescue Squad' | 'Mirror Trap' | 
    'Phantasm' | 'Infernoble Knight' | 'Aether' | 'Ki-sikil' | 'Roland' | 'Cynet' | 'Clear Wing' | 'Sea Stealth' | 
    'Underworld' | 'Emblema' | 'Test' | 'Salamandra' | 'Dark counterpart' | 'Relinquished' | 'Cataclysmic' | 'Anotherverse' | 
  
    'Hyperion' | 'Felgrand' | 'Fairy Tail' | 'Jar' | 'Overlay' | 'Draconia' | 'Butterfly' | 'From the Underworld' | 
    'Broken World' | 'Curse of Dragon' | 'Lil-la' | 'Diabellstar' | 'Pendulum Dragon' | 'Aquamirror' | 'Man-Eater Bug' | 
    'Tachyon' | 'Thunder' | 'Trap Hole' | 'Paladins of Dragons' | 'Schoolwork' | 'Neo Space' | 'Morganite' | 
    'GranSolfachord' | 'Onomat' | 'Scrap-Iron' | 'Favorite' | 'Skilled Magician' | 'The Sanctuary in the Sky' |
  
    'Holy Knight' | 'Zombie counterpart' | 'Doodlebook' | 'Stealth Kragen' | 'Attribute Summoner' | 'Infernoble Arms' | 
    'Blue Tears' | 'Mokey Mokey' | 'Raizeol' | 'Celebration' | 'Machine Angel';  

type AttributeType = "DARK" | "EARTH" | "FIRE" | "LIGHT" | "WATER" | "WIND" | "DIVINE";

type BanType = 'Limited' | 'Forbidden' | 'Semi-Limited';

export const CardTypes: CardType[] = [
    'Effect Monster', 'Continuous Trap', 'Normal Monster', 'Pendulum Effect Monster', 'Normal Trap',
    'Fusion Effect Monster', 'Flip Effect Monster', 'Normal Spell', 'Synchro Effect Monster', 'Quick-Play Spell',
    'Tuner Effect Monster', 'Link Effect Monster', 'Token', 'Equip Spell', 'Field Spell', 'Xyz Effect Monster',
    'Continuous Spell', 'Tuner Normal Monster', 'Counter Trap', 'Synchro Tuner Effect Monster',
    'Fusion Monster', 'Spirit Effect Monster', 'Pendulum Tuner Effect Monster', 'Union Effect Monster',
    'Fusion Tuner Monster', 'Xyz Pendulum Effect Monster', 'Ritual Monster', 'Ritual Effect Monster',
    'Gemini Effect Monster', 'Link Monster', 'Fusion Pendulum Effect Monster', 'Toon Effect Monster',
    'Pendulum Normal Monster', 'Ritual Spell', 'Xyz Monster', 'Synchro Monster', 'Pendulum Flip Effect Monster',
    'Trap', 'Synchro Pendulum Effect Monster', 'Flip Tuner Effect Monster', 'Pendulum Tuner Normal Monster',
    'Ritual Pendulum Effect Monster', 'Skill - Bonz', 'Skill - Yugi', 'Skill - Ishizu', 'Skill - Mako', 'Skill - Joey',
    'Skill - Kaiba', 'Skill - Keith', 'Skill - Rex', 'Skill - Weevil', 'Skill - Pegasus', 'Skill - Mai', 'Skill - Yami Yugi',
    'Skill - Yami Bakura', 'Skill - Yami Marik', 'Skill - Christine', 'Skill - Emma', 'Skill - Andrew',
    'Skill - David', 'Skill - Odion', 'Skill - Joey Wheeler', 'Skill - Espa Roba', 'Skill - Seto Kaiba',
    'Skill - Arkana', 'Skill - Mai Valentine', 'Skill - Tea Gardner', 'Skill - Ishizu Ishtar', 'Skill - Lumis Umbra',
    'Skill - Dr. Vellian C', 'Skill - Chazz Princet', 'Skill - Axel Brodie', 'Skill - Yubel',
    'Skill - Jesse Anderso', 'Skill - Alexis Rhodes', 'Skill - Zane Truesdal', 'Skill - Bastion Misaw',
    'Skill - Jaden Yuki', 'Skill - Tyranno Hassl', 'Skill - Aster Phoenix', 'Skill - Syrus Truesda',
    'Skill - Paradox Broth', 'Skill - Chumley Huffi', 'Skill - Lumis and Umb', 'Skill - Abidos the Th',
    'Skill - Titan', 'Skill - Adrian Gecko', 'Skill - Thelonious Vi', 'Skill - The Supreme K',
    'Skill - Camula', 'Skill - Nightshroud', 'Skill - Don Zaloog', 'Skill - Tania', 'Skill - Amnael', 'Skill - Kagemaru'
];

export const RaceTypes: RaceType[] = [
    'Fiend', 'Dragon', 'Continuous', 'Zombie', 'Beast-Warrior', 'Normal', 'Fairy', 'Warrior', 'Quick-Play',
    'Rock', 'Spellcaster', 'Winged Beast', 'Plant', 'Beast', 'Machine', 'Cyberse', 'Equip', 'Field',
    'Fish', 'Thunder', 'Pyro', 'Sea Serpent', 'Aqua', 'Reptile', 'Counter', 'Psychic', 'Insect',
    'Illusion', 'Dinosaur', 'Wyrm', 'Ritual', 'Divine-Beast', 'Creator God',
    'Bonz', 'Yugi', 'Ishizu', 'Mako', 'Joey', 'Kaiba', 'Keith', 'Rex', 'Weevil', 'Pegasus', 'Mai',
    'Yami Yugi', 'Yami Bakura', 'Yami Marik', 'Christine', 'Emma', 'Andrew', 'David', 'Odion', 'Joey Wheeler',
    'Espa Roba', 'Seto Kaiba', 'Arkana', 'Mai Valentine', 'Tea Gardner', 'Ishizu Ishtar', 'Lumis Umbra',
    'Dr. Vellian C', 'Chazz Princet', 'Axel Brodie', 'Yubel', 'Jesse Anderso', 'Alexis Rhodes', 'Zane Truesdal',
    'Bastion Misaw', 'Jaden Yuki', 'Tyranno Hassl', 'Aster Phoenix', 'Syrus Truesda', 'Paradox Broth',
    'Chumley Huffi', 'Lumis and Umb', 'Abidos the Th', 'Titan', 'Adrian Gecko', 'Thelonious Vi', 'The Supreme K',
    'Camula', 'Nightshroud', 'Don Zaloog', 'Tania', 'Amnael', 'Kagemaru'
];

const ArchetypeTypes: ArchetypeType[] = [
    'Labrynth' , 'SPYRAL' , 'D/D' , 'Gem-' , 'Starry Knight' , 'Ancient Gear' , 'Cipher' , 'D.D.' , 'Dark Magician' , 
    'Performapal' , 'Laval' , 'Rikka' , 'Train' , 'Vylon' , 'Koa\'ki Meiru' , 'Elemental HERO' , 'Exosister' , 
    'Inzektor' , 'Shinobird' , 'Mermail' , 'Dual Avatar' , 'Majestic' , 'T.G.' , 'Umi' , 'Trickstar' , 
    'Flame Swordsman' , 'Magistus' , 'Gusto' , 'Lswarm' , 'Stardust' , 'Dinomist' , 'Gagaga' , 'Exodd' , 
    'Watt' , 'Possessed' , 'Greed' , 'Invoked' , 'Edge Imp' , 'Superheavy' , 'Tearlaments' , 'PSY-Frame' , 'Kuriboh' ,
    'Malefic' , 'Burning Abyss' , 'Gladiator Beast' , 'Gadget' , 'Majespecter' , 'Alien' , 'Synchro' , 'Zoodiac' , 
    'Lightsworn' , 'Orcust' , 'Atlantean' , 'Amazoness' , 'Generaider' , 'Charmer' , 'Spellbook' , 'Shiranui' , 
    'Black Luster Soldier' , 'Flamvell' , 'Visas' , 'Rose' , 'Galaxy' , 'Dragunity' , 'Golden Castle of Stromberg' , 
    'Mecha Phantom Beast' , 'Geargia' , 'Boot-Up' , 'Traptrix' , 'B.E.S.' , 'Armed Dragon' , 'Roid' , 'Junk' , 'Hole' , 
    'Branded' , 'Tellarknight' , 'Dream Mirror' , 'Scrap' , 'F.A.' , 'Guardian' , 'Cyber Dragon' , 'Subterror' , 
    'Paleozoic' , 'Cyberdark' , 'Millennium' , 'Drytron' , 'Phantasm Spiral' , 'Cubic' , 'Herald' , 'Utopic' ,
    'Kozmo' , 'Salamangreat' , 'Icejade' , 'Vaalmonica' , 'Magician' , 'Frog' , 'Photon' , 'Koala' , 'Hazy' , 
    'Chaos' , 'Six Samurai' , 'Altergeist' , 'Odd-Eyes' , 'Fur Hire' , 'Genex' , 'Neo-Spacian' , 'Rose Dragon' , 
    'ABC' , 'Ninja' , 'Fire Fist' , 'Power Tool' , 'Beetrooper' , 'Wind-Up' , 'Assault Mode' , 'Chimera' , 
    'Super Quant' , 'Heroic' , 'Vendread' , 'Bujin' , 'Code Talker' , 'Morphtronic' , 'Gimmick Puppet' , 
    'Silent Swordsman' , 'Sinful Spoils' , 'Blackwing' , 'Worm' , 'Chronomaly' , 'Constellar' , 'Yang Zing' , 
    'Gaia The Fierce Knight' , 'Blue-Eyes' , 'Meklord' , 'X-Saber' , 'Valkyrie' , 'Book of' , 'Spright' , 'Nordic' , 
    'Gandora' , 'Mayakashi' , 'Abyss Actor' , 'Ojama' , 'Ghoti' , 'Heraldry' , 'Fiendsmith' , 'Fire King' , 
    'Archfiend' , 'Adventurer Token' , 'Destruction Sword' , 'Utopia' , 'ARG☆S' , 'Fluffal' , 'Crystron' , 
    'Graydle' , 'Ancient Warriors' , 'Nimble' , 'Knightmare' , 'Zexal' , 'Karakuri' , 'Mekk-Knight' , 'Gogogo' , 
    'Naturia' , 'Ashened' , 'Legendary Knight' , 'Dark World' , 'Evolsaur' , 'Hieratic' , 'Phantom Knights' , 
    'Alligator' , 'Arcana Force' , 'Gravekeeper\'s' , 'Melodious' , 'Appliancer' , 'Dice' , 'Duston' , 'Crystal' , 
    'Noble Knight' , 'Evil HERO' , 'Endymion' , 'Cyber Angel' , 'Ally of Justice' , 'CXyz' , 'Shaddoll' , 'Djinn' , 
    'Magician Girl' , 'Slime' , 'Flower Cardian' , 'Numeron' , 'Blaze Accelerator' , 'Fortune Fairy' , 
    'Performage' , '"C"' , 'Centur-Ion' , 'Darklord' , 'Mist Valley' , 'Qli' , 'Venom' , 'Battlin\' Boxer' , 
    'Infernity' , 'Magnet Warrior' , 'Metalfoes' , 'World Chalice' , 'Bugroth' , 'Yubel' , 'Ragnaraika' , 'Vampire' ,
    'Kashtira' , 'Monarch' , 'Harpie' , 'Exodia' , 'Prediction Princess' , 'Tenyi' , 'Aroma' , 'Gladiator' , 
    'Rokket' , 'Swordsoul' , 'Superheavy Samurai' , 'Red-Eyes' , 'Infinitrack' , 'Thunder Dragon' , 
    'Magical Musket' , 'Egyptian God' , 'Zefra' , 'Predaplant' , 'Earthbound' , 'Symphonic Warrior' , 'Myutant' , 
    'Jurrac' , 'Marincess' , 'Machina' , 'Battleguard' , 'White' , 'Penguin' , 'Hi-Speedroid' , 'Resonator' , 
    'Shining Sarcophagus' , 'Toon' , 'Raidraptor' , 'Scareclaw' , 'Sacred Beast' , 'Bonding' , 'Ice Barrier' , 'Frightfur' , 
    'Clear' , 'Swarm of' , 'Wight' , 'Knight' , 'Shark' , 'Parasite' , 'Borrel' , 'Amorphage' , 'Mikanko' , 
    'A-to-Z' , 'Amazement' , 'Evil Eye' , 'A.I.' , 'Glacial Beast' , 'Secret Six Samurai' , 'Dododo' , 'P.U.N.K.' , 
    'Timelord' , 'Bystial' , 'Nemeses' , 'Ryzeal' , 'Despia' , 'Dark Scorpion' , 'Guardragon' , 'Crystal Beast' , 
    'Dracoverlord' , 'Umbral Horror' , 'Vernusylph' , 'Dinomorphia' , 'Void' , 'Wicked God' , 'Fusion' , 'Seventh' , 
    'Artifact' , 'Springans' , 'Gouki' , 'Ghostrick' , 'Number' , 'Tri-Brigade' , 'Ancient Treasure' , 'Sunavalon' , 
    'Galaxy-Eyes' , 'Live☆Twin' , 'Super Defense Robot' , 'Corn' , 'Elemental Lord' , 'Demise' , 'Lyrilusc' , 
    'Fabled' , 'Ritual Beast' , 'Infernoid' , 'Nephthys' , 'Jester' , 'Sky Striker' , 'Deep Sea' , 'Gate Guardian' , 
    'Reptilianne' , 'Evoltile' , 'Destiny HERO' , 'Virtual World' , 'Maju' , 'Star Seraph' , 'Vanquish Soul' , 
    'Evil★Twin' , 'Gishki' , 'Horus the Black Flame Dragon' , 'Stellarknight' , 'Adamancipator' , 'Ogdoadic' , 
    'Jinzo' , 'Abyss-' , 'U.A.' , 'Tindangle' , 'Ninjitsu Art' , 'Witchcrafter' , 'Crusadia' , 'Snake-Eye' ,
    'Gaia Knight' , 'Azamina' , 'Triamid' , 'Fossil' , 'Deskbot' , 'Fleur' , 'Danger!' , 'Sylvan' , '@Ignister' , 
    'War Rock' , 'Fishborg' , 'Therion' , 'Yosenju' , 'Trap Monster' , 'Krawler' , 'Fire Formation' , 'Purrely' , 
    'Voiceless Voice' , 'Time Thief' , 'Masked HERO' , 'Rainbow Bridge' , 'Kaiju' , 'Elementsaber' , 'Lunalight' , 
    'Horus' , 'Simorgh' , 'Madoor' , 'Volcanic' , 'Mimighoul' , 'Dinowrestler' , 'Madolche' , 'Speedroid' , 'Metaphys' , 
    'Tistina' , 'Parshath' , 'Digital Bug' , 'Mask' , 'World Legacy' , 'True Draco' , 'Dragonmaid' , 'Vaylantz' , 
    'Gizmek' , 'Supreme King' , 'Cloudian' , 'Impcantation' , 'Dogmatika' , 'Mathmech' , '-Eyes Dragon' , 'Recipe' , 
    'White Forest' , 'Spirit Message' , 'Libromancer' , 'Lady of Lament' , 'Memento' , 'Grepher' , 'Windwitch' , 
    'Dracoslayer' , 'Nekroz' , 'Ursarctic' , 'Puppet' , 'Nouvelles' , 'Sphinx' , 'Goblin' , 'Evol' , 'Eyes Restrict' , 
    'Metalmorph' , 'Aesir' , 'Synchron' , 'Starliege' , 'Prank-Kids' , 'Noble Arms' , 'Sky Scourge' , 'Magikey' , 
    'Potan' , 'Contact' , 'Chrysalis' , 'Solemn' , 'Butterspy' , 'The Weather' , 'Nemleria' , 'Xyz' , 'Fairy' , 
    'Materiactor' , 'Plunder Patroll' , 'Bounzer' , 'Mannadium' , 'Heraldic' , 'Nemurelia' , 'Predap' , 'Floowandereeze' , 
    'Pendulum' , 'Wedju' , 'Vision HERO' , 'Doll Monster' , 'Evolzar' , 'Infestation' , 'Advanced Crystal Beast' , 'Sangen' , 
    'Chemicritter' , 'Barbaros' , 'Batteryman' , 'Battlin\' Boxing' , 'Light and Darkness Dragon' , 'Iron Chain' , 
    'Melffy' , 'Fortune Lady' , 'Anti' , 'Apoqliphort' , 'Firewall' , 'S-Force' , 'Golden Land' , 'Eldlich' , 'Runick' , 
    'Maliss' , 'Ryu-Ge' , 'Circular' , 'Gunkan' , 'Gold Pride' , 'Cupid' , 'Steelswarm' , 'Skull Servant' , 
    'Vassal' , 'Igknight' , 'Tenpai Dragon' , 'Indestructible Insect' , 'Allure Queen' , 'Kairyu-Shin' , 'Doriado' ,
    'Mystical Beast of the Forest' , 'HERO' , 'G Golem' , 'Unchained' , 'Forbidden' , 'Toy' , 'Exchange of the Spirit' , 
    'Battlewasp' , 'Star' , 'Megalith' , 'Rescue-ACE' , 'Patissciel' , 'The Agent' , 'Signature move' , 'Mythical Beast' , 
    'Sunseed' , 'Primite' , 'Field Searcher' , 'Priestess' , 'Solfachord' , 'Sunvine' , 'Heart' , 'Six Strike' , 
    'Aquaactress' , 'Empower' , 'Polymerization' , 'Uniform Nomenclature' , 'Empowered Warrior' , 'Attraction' , 
    'Transcendosaurus' , 'Barian\'s' , 'Doodle Beast' , 'Neos' , 'Counter Fairy' , 'Rank-Up-Magic' , 'Saber' , 
    'Cyber' , 'Divine Dragon' , 'Abyss Script' , 'Bamboo Sword' , 'Dark Contract' , 'Spider' , 'Labyrinth Wall' , 
    'Malicevorous' , 'with Eyes of Blue' , 'Gorgonic' , 'Cosmic Synchro Monster' , 'Spiritual Art' , 'Albaz Dragon' , 
    'Prophecy' , 'Diabell' , 'Martial Art Spirit' , 'Veda' , 'Silent Magician' , 'Mulcharmy' , 'Chaos Phantom' , 
    'Doll' , 'Risebell' , 'Zera' , 'Celtic Guard' , 'Gem Dragon' , 'Codebreaker' , 'Rescue Squad' , 'Mirror Trap' , 
    'Phantasm' , 'Infernoble Knight' , 'Aether' , 'Ki-sikil' , 'Roland' , 'Cynet' , 'Clear Wing' , 'Sea Stealth' , 
    'Underworld' , 'Emblema' , 'Test' , 'Salamandra' , 'Dark counterpart' , 'Relinquished' , 'Cataclysmic' , 'Anotherverse' , 
    'Hyperion' , 'Felgrand' , 'Fairy Tail' , 'Jar' , 'Overlay' , 'Draconia' , 'Butterfly' , 'From the Underworld' , 
    'Broken World' , 'Curse of Dragon' , 'Lil-la' , 'Diabellstar' , 'Pendulum Dragon' , 'Aquamirror' , 'Man-Eater Bug' , 
    'Tachyon' , 'Thunder' , 'Trap Hole' , 'Paladins of Dragons' , 'Schoolwork' , 'Neo Space' , 'Morganite' , 
    'GranSolfachord' , 'Onomat' , 'Scrap-Iron' , 'Favorite' , 'Skilled Magician' , 'The Sanctuary in the Sky' ,
    'Holy Knight' , 'Zombie counterpart' , 'Doodlebook' , 'Stealth Kragen' , 'Attribute Summoner' , 'Infernoble Arms' , 
    'Blue Tears' , 'Mokey Mokey' , 'Raizeol' , 'Celebration' , 'Machine Angel'
];

export const AttributeTypes: AttributeType[] = [
    "DARK", "EARTH", "FIRE", "LIGHT", "WATER", "WIND", "DIVINE"
];

const BanTypes: BanType[] = [
    'Limited', 'Forbidden', 'Semi-Limited'
];


export interface ICard {
    id: number,
    name: string,
    humanReadableCardType: CardType,
    cardText: string,
    cardImage: string,
    race: RaceType,
    quantity?: number,
    partOfDeck?: 'extraDeck' | 'mainDeck' | 'sideDeck',
    banOcg?: BanType,
    banTcg?: BanType,
    banGoat?: BanType,
    level?: string,
    archetype?: ArchetypeType,
    attribute?: AttributeType,
    atk?: number,
    def?: number,
}

export interface IMonsterCard extends ICard{
    level: string,
    archetype?: ArchetypeType,
    attribute: AttributeType,
    atk: number,
    def: number,
}

const isValidCardType = (cardType: CardType): cardType is CardType => {
    return CardTypes.includes(cardType);
}

const isValidRaceType = (cardRace: RaceType): cardRace is RaceType => {
    return RaceTypes.includes(cardRace);
}

const isValidAttributeType = (cardAttribute: AttributeType): cardAttribute is AttributeType => {
    return AttributeTypes.includes(cardAttribute);
}

export const isValidCard = (card: ICard): card is ICard => {
    const { id, name, cardText, race, cardImage, humanReadableCardType } = card;
    return typeof id === 'number' && typeof name === 'string' && isValidCardType(humanReadableCardType)
    && typeof cardText === 'string' && typeof cardImage === 'string' && isValidRaceType(race)
} 

export const isValidNewCard = (card: ICard): card is ICard => {
    const { name, cardText, race, cardImage, humanReadableCardType } = card;
    return typeof name === 'string' && isValidCardType(humanReadableCardType)
    && typeof cardText === 'string' && typeof cardImage === 'string' && isValidRaceType(race)
} 

export const isValidMonster = (monsterCard: ICard): monsterCard is IMonsterCard => {
    return isValidCard(monsterCard) && typeof monsterCard.level === 'string' && !Number.isNaN(Number(monsterCard.atk))
        && !Number.isNaN(Number(monsterCard.def)) && ( monsterCard.attribute ? isValidAttributeType(monsterCard.attribute) : false);
}

export const isValidNewMonster = (monsterCard: ICard): monsterCard is ICard => {
    return isValidNewCard(monsterCard) && typeof monsterCard.level === 'string' && !Number.isNaN(Number(monsterCard.atk))
    && !Number.isNaN(Number(monsterCard.def)) && ( monsterCard.attribute ? isValidAttributeType(monsterCard.attribute) : false);
}

export const isValidMagic = (magicCards: ICard): magicCards is ICard => {
    return isValidCard(magicCards) &&
        (magicCards.humanReadableCardType.toLocaleLowerCase().includes('spell') ||
        magicCards.humanReadableCardType.toLocaleLowerCase().includes('trap'));
}