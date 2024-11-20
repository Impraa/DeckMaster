import { useEffect, useState } from "react";
import { AttributeTypes, CardTypes, ICard, IMonsterCard, RaceType, RaceTypes } from "../../../types/card";
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import useCallContext from "@hooks/useCallContext";
import { CardContext } from "@context/CardContext";
import { Navigate } from "react-router-dom";

const AddNewCardForm = () => {
    const cardContext = useCallContext(CardContext);
    const [typeOfCard, setTypeOfCard] = useState<null | 'monster' | 'spell' | 'trap'>(null);
    const [formData, setFormData] = useState<null | ICard | IMonsterCard>(null);
    const [humanReadbleTypes, setHumanReadableTypes] = useState<string[]>([]);
    const [cardRaces, setCardRaces] = useState<string[]>([]);
    const [attributeTypes] = useState<string[]>(AttributeTypes);
    const [cardImage, setCardImage] = useState<File | null>(null);

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

    if(!cardContext || !cardContext.uploadNewCard) return <Navigate to={'/'} />

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0])
        {
            setCardImage(e.target.files[0]);
            handleFormChange(e);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {value, name} = e.currentTarget;
        setFormData((oldFormData) => ({...oldFormData, [name] : value}) as IMonsterCard | ICard);
    }

    const handleDropdownChange = (e: Option, name: string) => {
        setFormData((oldFormData) => ({ ...oldFormData, [name]: e.value }) as IMonsterCard | ICard);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(formData && typeOfCard)
        {
            if(!formData.race) formData.race = formData.humanReadableCardType.split(typeOfCard[0].toLocaleUpperCase() + typeOfCard.slice(1))[0].trim() as RaceType;
            if(cardImage)
            {
                const submissionData = new FormData();
                submissionData.append('cardImage', cardImage);
                submissionData.append('cardData', JSON.stringify(formData));
                cardContext.uploadNewCard(submissionData);
            }
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            <select onChange={e => setTypeOfCard(e.currentTarget.value as 'monster' | 'spell' | 'trap')}>
                <option hidden>Please select a card type</option>
                <option value="monster">Monster card</option>
                <option value="spell">Spell card</option>
                <option value="trap">Trap card</option>    
            </select>
            { typeOfCard && (
                <form className="flex flex-col w-[75vw]" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" placeholder="Card Name" name="name" onChange={handleFormChange} />
                    <textarea placeholder="Card text" name="cardText" onChange={handleFormChange}></textarea>
                    <label htmlFor="cardImage">Card Image upload</label>
                    <input type="file" id="cardImage" name="cardImage" className="hidden" onChange={handleImageUpload}/>
                    {cardImage && <p>Uploaded: {cardImage.name}</p>}
                    <Dropdown onChange={(e) => {handleDropdownChange(e, 'humanReadableCardType')}} options={humanReadbleTypes} />
                    {typeOfCard === 'monster' ?
                        <>
                            <Dropdown options={cardRaces} onChange={(e) => {handleDropdownChange(e, 'race')}} />
                            <Dropdown options={attributeTypes} onChange={(e) => {handleDropdownChange(e, 'attribute')}}/>
                            <input type="number" min={0} max={12} placeholder="Level" name="level" onChange={handleFormChange} />
                            <input type="number" min={0} placeholder="ATK" name="atk" onChange={handleFormChange} />
                            <input type="number" min={0} placeholder="DEF" name="def" onChange={handleFormChange} />
                        </> : <></>}
                    <button type="submit">Save</button>
                </form>      
            )}
        </div>
    )
}

export default AddNewCardForm;