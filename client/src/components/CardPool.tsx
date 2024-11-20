import { CardContext } from "@context/CardContext";
import useCallContext from "@hooks/useCallContext";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const CardPool = () => {
    const cardContext = useCallContext(CardContext);
    const [offset, setOffset] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();
    const containerRef = useRef(null);

    useEffect(() => {
        if (!cardContext) return navigate('/');
        if (!searchQuery) cardContext.fetchCards(offset)
    }, [cardContext, navigate, offset])

    useEffect(() => {
        if (!cardContext) return navigate('/');
        if(searchQuery) cardContext.fetchCardsWithSearch(offset, searchQuery);
    }, [searchQuery, navigate, offset])

    if (!cardContext) return <Navigate to={'/'} />;

    const handleScroll = () => {
        if (!containerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        
        if (scrollHeight - scrollTop <= clientHeight * 1.1 && !cardContext.isLoading)
        {
            setOffset((prevOffset) => prevOffset + 1);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setSearchQuery(value);
        setOffset(0);
    }

    const handleDragStart = (e: React.DragEvent<HTMLImageElement>, cardId: number) => {
        e.dataTransfer.setData("cardId", cardId.toString());
    };

    return (
        <div className="flex flex-col">
            <input placeholder="Search..." onChange={onChange} />
            <div className="grid grid-cols-4 gap-4 max-h-[85vh] overflow-auto" onScroll={handleScroll} ref={containerRef}>
                {
                    cardContext.cards.length > 0 ? cardContext.cards.map((card) => {
                        return (
                            <img
                                draggable
                                key={card.id}
                                onMouseEnter={() => cardContext.setCardDetails(card.id)}
                                onClick={() => console.log('kliktanje')}
                                onDragStart={(e) => handleDragStart(e,card.id)}
                                src={`http://localhost:8000${card.cardImage}`} className=" w-20" />
                        )
                    }) : (<p>Loading...</p>)
                }
            </div>
        </div>    
    )
}

export default CardPool;