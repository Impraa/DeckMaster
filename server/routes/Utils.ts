import dotenv from 'dotenv';

dotenv.config({});

import express, { Request, Response } from 'express';
import Card from '../models/Card';

const router = express.Router();

router.post('/migrate-cards', async (req: Request, res: Response) => {
    const fs = require("fs").promises;
    const download = require('image-downloader');
    
    async function downloadImageWithRetry(options: {url:string, dest:string}, retries = 3, delay = 2000) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const { filename } = await download.image(options);
                console.log('Saved to', filename);
                return filename;
            } catch (error) {
                console.error(`Download attempt ${attempt} failed for ${options.url}:`, error);
                if (attempt === retries) throw error; 
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    try
    {
        const data = await fs.readFile('./../server/allCards.json', "utf8")
        const cardsData = JSON.parse(data).data;

        for (let cardData of cardsData)
        {
            if (!cardData.card_images[0].image_url || cardData.card_images.length === 0) {
                console.warn(`Skipping card with ID ${cardData.id} as it has no images`);
                continue;
            }

            const options = {
                url: cardData.card_images[0].image_url,
                dest: `${__dirname}/../images/cardImages/`,
            };

            try
            {
                await downloadImageWithRetry(options);
            }
            catch (error)
            {
                console.log(`Failed to aquire image for ${cardData.name}`)
                continue;    
            }
            
            await Card.create({
                id: cardData.id,
                name: cardData.name,
                type: cardData.type,
                humanReadableCardType: cardData.humanReadableCardType,
                frameType: cardData.frameType,
                cardText: cardData.desc,
                race: cardData.race,
                archetype: cardData.archetype,
                atk: cardData.atk ?? null,
                def: cardData.def ?? null,
                level: cardData.level ?? null,
                attribute: cardData.attribute ?? null,
                banTcg: cardData.banlist_info ? cardData.banlist_info.ban_tcg : null,
                banOcg: cardData.banlist_info ? cardData.banlist_info.ban_ocg : null,
                banGoat: cardData.banlist_info ? cardData.banlist_info.ban_goat : null,
                cardImage: `/image/cardImages/${cardData.id}.jpg`
            });
        }
    }
    catch (error)
    {
        res.status(500).json('Error while migrating - '+ error)
        return;
    }
    res.status(201).json('Cards are in the database');
    return;
})

export default router;