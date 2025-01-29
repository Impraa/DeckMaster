import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@components/Input";
import Link from "@components/Link";
import useCardContext from "@hooks/useCardContext";
import useModalContext from "@hooks/useModalContext";
import useDecklistContext from "@hooks/useDecklistContext";

const CardPool = () => {
    const cardContext = useCardContext();
    const modalContext = useModalContext();
    const deckContext = useDecklistContext();
    const [offset, setOffset] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const { removeCardFromDecklist, decklist, setError } = deckContext;
    const { fetchCards, fetchCardsWithSearch } = cardContext;

    useEffect(() => {
        if (!searchQuery) fetchCards(offset)
    }, [navigate, offset])

    useEffect(() => {
        if(searchQuery) fetchCardsWithSearch(offset, searchQuery);
    }, [searchQuery, navigate, offset])

    const handleScroll = () => {
        if (!containerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        
        if (scrollHeight - scrollTop <= clientHeight * 1.1 && !cardContext.isLoading) setOffset((prevOffset) => prevOffset + 1);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setSearchQuery(value);
        setOffset(0);
    }

    const handleDragStart = (e: React.DragEvent<HTMLImageElement>, cardId: number) => {
        e.dataTransfer.setData("cardId", cardId.toString());
    };

    const handleOnClick = (e: React.MouseEvent<HTMLImageElement>, cardId: number) => {
        cardContext.setCardDetails(cardId)
        modalContext.setIsVisible(true);
    }

    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        const parentContainer = e.dataTransfer.getData("parentContainer") as 'mainDeck' | 'sideDeck' | 'extraDeck';
        if (decklist) removeCardFromDecklist(decklist.id, +cardId, parentContainer);
        else setError('Failed to remove card');
    }

    return (
        <div onDrop={onDropHandler} onDragOver={onDragOverHandler} className="cardPool flex flex-col">
            {window.location.href.split('/')[3] === 'manage-cards' ? <Link URL="/card">Add a card</Link> : ''}
            <Input labelText="Search" inputName="search" inputType="text" handleChange={onChange} value={searchQuery} />
            <div className={`cardPool mt-4 grid grid-cols-4 ${window.location.href.split('/')[3] === 'manage-cards' && 'sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12'} gap-4 max-h-[80dvh] overflow-auto`} onScroll={handleScroll} ref={containerRef}>
                {
                    cardContext.cards.length > 0 ? cardContext.cards.map((card) => {
                        return (
                            <img
                                draggable
                                key={card.id}
                                onMouseEnter={() => cardContext.setCardDetails(card.id)}
                                onClick={(e) => handleOnClick(e, card.id)}
                                onDragStart={(e) => handleDragStart(e,card.id)}
                                src={`http://localhost:8000${card.cardImage}`} className="w-20 cursor-pointer" />
                        )
                    }) : (<p>Loading...</p>)
                }
            </div>
        </div>    
    )
}

export default CardPool;