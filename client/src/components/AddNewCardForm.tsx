import { useEffect, useState } from "react";
import { AttributeTypes, CardTypes, ICard, IMonsterCard, RaceTypes } from "../../../types/card";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const AddNewCardForm = () => {
    const [typeOfCard, setTypeOfCard] = useState<null | 'monster' | 'spell' | 'trap'>(null);
    const [formData, setFormData] = useState<null | ICard | IMonsterCard>(null);
    const [humanReadbleTypes, setHumanReadableTypes] = useState<string[]>([]);
    const [cardRaces, setCardRaces] = useState<string[]>([]);
    const [attributeTypes] = useState<string[]>(AttributeTypes);

    useEffect(() => {
        if (typeOfCard)
        {
            setHumanReadableTypes(() => CardTypes.filter((item) => item.toLocaleLowerCase().includes(typeOfCard)))
            if (typeOfCard === 'monster')
            {
                setCardRaces(RaceTypes.filter((item) => 
                    !['counter', 'field', 'quick', 'continuous', 'equip'].includes(item.toLocaleLowerCase())
                ))
            }
        }
    }, [typeOfCard])

    return (
        <div className="flex flex-col items-center w-full">
            <select onChange={e => setTypeOfCard(e.currentTarget.value as 'monster' | 'spell' | 'trap')}>
                <option hidden>Please select a card type</option>
                <option value="monster">Monster card</option>
                <option value="spell">Spell card</option>
                <option value="trap">Trap card</option>    
            </select>
            { typeOfCard && (
                <form className="flex flex-col w-[75vw]" encType="multipart/form-data">
                    <input type="text" placeholder="Card Name" name="name" />
                    <textarea placeholder="Card text" name="cardText"></textarea>
                    <label htmlFor="cardImage">Card Image upload</label>
                    <input type="file" id="cardImage" className="hidden"/>
                    <Dropdown options={humanReadbleTypes} />
                    {typeOfCard === 'monster' ?
                        <>
                            <Dropdown options={cardRaces} />
                            <Dropdown options={attributeTypes} />
                            <input type="number" min={0} max={12} placeholder="Level" />
                            <input type="number" min={0} placeholder="ATK" />
                            <input type="number" min={0} placeholder="DEF" />
                        </> : <></>}
                </form>      
            )}
        </div>
    )
}

export default AddNewCardForm;