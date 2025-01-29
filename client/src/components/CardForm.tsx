import { useEffect, useState } from "react";
import { AttributeTypes, CardTypes, ICard, IMonsterCard, RaceType, RaceTypes } from "../../../types/card";
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import { useParams } from "react-router-dom";
import { DisplayErrorMessage } from "@/utils/helperFunctions";
import Input from "./Input";
import Button from "./Button";
import useCardContext from "@hooks/useCardContext";

const CardForm = () => {
    const { id } = useParams();
    const cardContext = useCardContext();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [typeOfCard, setTypeOfCard] = useState<null | 'monster' | 'spell' | 'trap'>(null);
    const [formData, setFormData] = useState<null | ICard | IMonsterCard>(null);
    const [humanReadbleTypes, setHumanReadableTypes] = useState<string[]>([]);
    const [cardRaces, setCardRaces] = useState<string[]>([]);
    const [attributeTypes] = useState<string[]>(AttributeTypes);
    const [cardImage, setCardImage] = useState<File | null>(null);

    const { getCard, setCard, card, uploadNewCard, updateCard, error } = cardContext;

    useEffect(() => {
        if (id && !isNaN(+id))
        {
            getCard(+id);
            setIsUpdate(true);
        }
        else if (!id) setCard(null);
    }, [id])

    useEffect(() => {
        if (card && id)
        {
            const cardType = card.humanReadableCardType.split(' ')[--card.humanReadableCardType.split(' ').length].toLocaleLowerCase() as 'spell' | 'trap' | 'monster';
            setTypeOfCard(cardType);
            setFormData(card);
        }
    }, [card, id])

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
            const submissionData = new FormData();
            if(cardImage) submissionData.append('cardImage', cardImage);
            submissionData.append('cardData', JSON.stringify(formData));
            if (isUpdate && id) updateCard(+id, submissionData);
            else if(cardImage) uploadNewCard(submissionData);
        }
    }

    return (
        <div className="flex flex-col items-start space-y-1 mt-4">
            {error && <DisplayErrorMessage error={error} />}
            <div className="flex">
                <h2 className="text-primary text-md font-semibold">Select card type:</h2>
                <select onChange={e => setTypeOfCard(e.currentTarget.value as 'monster' | 'spell' | 'trap')} value={typeOfCard as string ?? ''}>
                <option hidden>Please select a card type</option>
                <option value="monster">Monster card</option>
                <option value="spell">Spell card</option>
                <option value="trap">Trap card</option>    
                </select>
            </div>
            { typeOfCard && (
                <form className="flex flex-col items-start space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
                    <Input inputType="text" labelText="Card name" inputName="name" handleChange={handleFormChange} value={formData?.name} />
                    <div className="flex flex-col">
                        <label className="text-md text-primary font-semibold">Card flavour text/effect</label>
                        <textarea cols={50} placeholder="Card text" name="cardText" onChange={handleFormChange} value={formData?.cardText ?? ''}></textarea>
                    </div>
                    <div className="flex">
                        <label htmlFor="cardImage" className="text-primary text-md font-semibold cursor-pointer">Card Image upload: </label>
                        <input type="file" id="cardImage" name="cardImage" className="hidden" onChange={handleImageUpload}/>
                        {cardImage && <h2 className="text-primary text-md font-semibold">Uploaded-{cardImage.name}</h2>}
                    </div>
                    <div className="flex">
                        <label className="text-md font-semibold text-primary">Choose type of card:</label>
                        <Dropdown onChange={(e) => {handleDropdownChange(e, 'humanReadableCardType')}} options={humanReadbleTypes} value={formData?.humanReadableCardType ?? ''} />
                    </div>
                    {typeOfCard === 'monster' ?
                        <>
                            <div className="flex">
                                <label className="text-md text-primary font-semibold">Choose monster type:</label>
                                <Dropdown options={cardRaces} onChange={(e) => {handleDropdownChange(e, 'race')}} value={formData?.race ?? ''} />
                            </div>
                            <div className="flex">
                                <label className="text-md text-primary font-semibold">Choose monster attribute:</label>
                                <Dropdown options={attributeTypes} onChange={(e) => { handleDropdownChange(e, 'attribute') }} value={formData?.attribute ?? ''} />
                            </div>
                            <Input inputType="number" inputName="level" handleChange={handleFormChange} value={formData?.level} labelText="Card level" />
                            <Input inputType="number" inputName="atk" handleChange={handleFormChange} value={formData?.atk?.toString()} labelText="Card ATK" />
                            <Input inputType="number" inputName="def" handleChange={handleFormChange} value={formData?.def?.toString()} labelText="Card DEF" />

                        </> : <></>}
                    <Button type="submit" style="normal">Save</Button>
                </form>      
            )}
        </div>
    )
}

export default CardForm;