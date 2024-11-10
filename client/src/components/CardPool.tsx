import { CardContext } from "@context/CardContext";
import useCallContext from "@hooks/useCallContext";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const CardPool = () => {
    const cardContext = useCallContext(CardContext);
    const [offset, setOffset] = useState<number>(0);
    const navigate = useNavigate();
    const containerRef = useRef(null);

    useEffect(() => {
        if (!cardContext) return navigate('/');
        cardContext.fetchCards(offset)
    }, [cardContext, navigate, offset])

    if (!cardContext) return <Navigate to={'/'} />;
    
    const handleScroll = () => {
        if (!containerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        
        if (scrollHeight - scrollTop <= clientHeight * 1.1 && !cardContext.isLoading)
        {
            setOffset((prevOffset) => prevOffset + 1);
        }
    };

    return (
        <div className="grid grid-cols-4 gap-4 h-[85vh] overflow-auto" onScroll={handleScroll} ref={containerRef}>
            {
                cardContext.cards.length > 1 ? cardContext.cards.map((card) => {
                    return (
                        <img
                            key={card.id}
                            onMouseEnter={() => cardContext.setCardDetails(card.id)}
                            src={`http://localhost:8000${card.cardImage}`} className=" w-20" />
                    )
                }) : (<p>Loading...</p>)
            }
        </div>
    )
}

export default CardPool;