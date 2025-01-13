import { ICard, isValidMonster } from "../../../types/card";

const GeneralCardDetails:React.FC<{card: ICard}> = ({ card }) => {
    return (
        <div className="flex flex-col">
            <img key={card.id} src={`http://localhost:8000${card.cardImage}`} className="w-[50%] self-center"/>
            <h2 className="text-xl font-semibold">{card.name}</h2>
            <h3 className="text-lg">{card.attribute ? card.attribute + ' /' : ''} {card.race}</h3>
            {isValidMonster(card) && <h3 className="text-lg">ATK/DEF {card.atk}/{card.def}</h3>}
            <div>
                <h3 className="text-lg">Effect: </h3>
                <p className="text-md">{card.cardText}</p>
            </div>
        </div>
    )
};

export default GeneralCardDetails;