import { isValidMagic, isValidMonster } from "../../../types/card";
import GeneralCardDetails from "@components/GeneralCardDetails";
import useCardContext from "@hooks/useCardContext";

const CardDetails = () => {
    const cardContext = useCardContext();

    const { card } = cardContext;

    return (
        <div className="hidden lg:block">
            {card && (isValidMonster(card) || isValidMagic(card))?
                <GeneralCardDetails card={card}/>
                : ''
            }
        </div>
    )
}

export default CardDetails;