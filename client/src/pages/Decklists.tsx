import DecklistCard from "@components/DecklistCard";
import { useLayoutEffect, useMemo, useState } from "react";
import { IDecklist } from "../../../types/decklist";
import Input from "@components/Input";
import useDecklistContext from "@hooks/useDecklistContext";

const Decklists = () => {
    const deckContext = useDecklistContext();
    const [search, setSearch] = useState<string>("");

    const { fetchAllDecklists, decklists } = deckContext;

    useLayoutEffect(() => {
        fetchAllDecklists();
    }, [])

    const filteredDecklists = useMemo<IDecklist[]>(() => {
        return decklists.filter(decklist =>
            decklist.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [decklists, search]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
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