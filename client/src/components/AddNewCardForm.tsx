import { useEffect, useState } from "react";
import { CardTypes, ICard, IMonsterCard } from "../../../types/card";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const AddNewCardForm = () => {
    const [typeOfCard, setTypeOfCard] = useState<null | 'monster' | 'spell' | 'trap'>(null);
    const [formData, setFormData] = useState<null | ICard | IMonsterCard>(null);
    const [humanReadbleTypes, setHumanReadableTypes] = useState<string[]>([]);

    useEffect(() => {
        if (typeOfCard)
        {
            setHumanReadableTypes(() => CardTypes.filter((item) => item.toLocaleLowerCase().includes(typeOfCard)))
        }
    }, [typeOfCard])

    return (
        <>
            <select onChange={e => setTypeOfCard(e.currentTarget.value as 'monster' | 'spell' | 'trap')}>
                <option hidden>Please select a card type</option>
                <option value="monster">Monster card</option>
                <option value="spell">Spell card</option>
                <option value="trap">Trap card</option>    
            </select>
            { typeOfCard && (
                <form>
                    <input type="text" placeholder="name" name="name" />
                    <Dropdown options={humanReadbleTypes} />
                </form>      
            )}
        </>
    )
}

export default AddNewCardForm;