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
            <div id="mainDeck" className="h-[50vh]"> 
                <h2>Main deck</h2>
                <hr/>
            </div>
            <div id="extraDeck" className="h-[15vh]"> 
                <h2>Extra deck</h2>
                <hr/>
            </div>
            <div id="sideDeck" className="h-[15vh]"> 
                <h2>Side deck</h2>
                <hr/>
            </div>
        </div>)
}

export default ChangableDecklist;