const ChangableDecklist = () => {

    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        if (cardId) 
        {
            console.log(`Dropped into decklist`);
        }
    }

    return (
        <div onDragOver={onDragOverHandler} onDrop={onDropHandler}>
            <div id="mainDeck"> </div>
            <div id="extraDeck"> </div>
            <div id="sideDeck"> </div>
        </div>)
}

export default ChangableDecklist;