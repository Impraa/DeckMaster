import DecklistCard from "@components/DecklistCard";
import { DecklistContext } from "@context/DecklistContext";
import useCallContext from "@hooks/useCallContext";
import { useLayoutEffect, useState } from "react";
import { IDecklist } from "../../../types/decklist";
import Input from "@components/Input";

const Decklists = () => {
    const deckContext = useCallContext(DecklistContext);
    const [search, setSearch] = useState<string>("");
    const [filteredDecklists, setFilteredDecklists] = useState<IDecklist[]>([]);
    
    useLayoutEffect(() => {
        if (deckContext) deckContext.fetchAllDecklists();
    }, [])

    useLayoutEffect(() => {
        if (deckContext) setFilteredDecklists(deckContext.decklists);
    }, [deckContext?.decklists])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (deckContext)
        {
            const searchTerm = e.target.value.toLowerCase();
            setSearch(searchTerm);

            const filtered = deckContext.decklists.filter((decklist) =>
                decklist.name.toLowerCase().includes(searchTerm)
            );

            setFilteredDecklists(filtered);
        }    
    };

    return (
        <div className="flex flex-col w-full justify-center items-center space-y-5">
            <Input inputName="search" inputType="text" labelText="Search" value={search} handleChange={handleSearch} />
            {filteredDecklists && filteredDecklists.length > 0 ?
                filteredDecklists.map((decklist) => {
                    return <DecklistCard key={decklist.id} decklist={decklist} link={`/decklist/${decklist.id}`} />
            }) : <p>There are no decklists avaliable</p> }
        </div>
    )
}

export default Decklists;