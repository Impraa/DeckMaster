import { IDecklistCard } from "@/types/propTypes";
import React from "react";
import Link from "./Link";

const DecklistCard: React.FC<IDecklistCard> = ({ link, decklist}) => {
    return (
        <div className="flex w-[85dvw] border border-black justify-between lg:h-[15dvh] p-5">
            <h2 className="text-l font-semibold">{decklist.name}</h2>
            <div className="flex flex-col justify-end">
                <Link URL={link}>Go to the deck</Link>
            </div>
        </div>
    )
}

export default DecklistCard;