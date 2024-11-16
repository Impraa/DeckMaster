import { ICard } from "../../../types/card";

const GeneralCardDetails:React.FC<{card: ICard}> = ({ card }) => {
    return (
        <div>
            <img key={card.id} src={`http://localhost:8000${card.cardImage}`} className="w-[50%]"/>
            <h2>{card.name}</h2>
            <h3>{card.race}</h3>
        </div>
    )
};

export default GeneralCardDetails;