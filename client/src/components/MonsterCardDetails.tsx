import { IMonsterCard } from "../../../types/card";

const MonsterCardDetails:React.FC<{monsterCard: IMonsterCard}> = ({ monsterCard }) => {
    return (
        <div>
            <img key={monsterCard.id} src={`http://localhost:8000${monsterCard.cardImage}`} />
            <h2>{ monsterCard.name }</h2>
        </div>
    )
};

export default MonsterCardDetails;