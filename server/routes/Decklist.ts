import dotenv from 'dotenv';

dotenv.config({});

import express, { Request, Response } from 'express';
import { IDecklist, isValidDecklist } from '../../types/decklist';
import Decklist from '../models/Decklist';
import Card from '../models/Card';
import CardDecklist from '../models/CardDecklist';
import { QueryTypes } from 'sequelize';
import { authenticateJWT } from '../utils/middelware';
import UserDecklist from '../models/UserDecklist';
import { sequelize } from '../utils/database';

const router = express.Router();

router.post('/new', async (req: Request, res: Response) => {
    const { name } = req.body;
    try
    {
        const newDecklist = await Decklist.create({ name: name ?? 'My decklist' });
        res.status(201).json({ decklist: newDecklist.dataValues });
    }
    catch (error)
    {
        res.status(500).json('Database error - ' + error);
    }
})

router.get('/all', async (req: Request, res: Response) => {
    try
    {
        const allDecklists = await sequelize.query(
            `SELECT d.*
             FROM user_decklist ud
             JOIN decklists d ON d.id = ud.decklistId;`,
            {
                type: QueryTypes.SELECT
            }
        );

        if (allDecklists.length < 1)
        {
                res.status(404).json('There are no decklists');
                return;
        }

        res.status(200).json({ decklists: allDecklists });
    }
    catch (error)
    {
        res.status(500).json('Database error - ' + error);    
    }
})

router.get('/all/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id)
    {
        res.status(400).json("User id is not included");
        return;
    }
    
    try
    {
        const allDecklists = await sequelize.query(
            `SELECT d.*
             FROM user_decklist ud
             JOIN decklists d ON d.id = ud.decklistId
             WHERE ud.userId = :userId;`,
            {
                replacements: { userId: id },
                type: QueryTypes.SELECT
            }
        );

        if (allDecklists.length < 1)
        {
                res.status(404).json('There are no decklists');
                return;
        }

        res.status(200).json({ decklists: allDecklists });
    }
    catch (error)
    {
        res.status(500).json('Database error - ' + error);    
    }
})

router.get("/allCards/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id)
    {
        res.status(400).json('The decklist id must be included');
        return;
    }

    try
    {
        const decklist = await Decklist.findOne({ where: { id: id } });
        if (!decklist)
        {
            res.status(404).json("Decklist dosen't exist");
            return;
        }

        const allDecklistCards = await sequelize.query(
            `SELECT c.*, cd.quantity, cd.partOfDeck
             FROM card_decklist cd
             JOIN cards c ON cd.cardId = c.id
             WHERE cd.decklistId = :decklistId`,
            {
                replacements: { decklistId: id },
                type: QueryTypes.SELECT
            }
        );
        if (allDecklistCards.length < 1)
        {
            res.status(404).json('Decklist has no cards');
            return;
        }

        res.status(200).json({ decklist: { id:decklist.dataValues.id, name:decklist.dataValues.name,  allCards: allDecklistCards} });
    }
    catch(error)
    {
        res.status(500).json('Database error - ' + error);
    }
})

router.post('/card/:id', authenticateJWT, async (req: Request, res: Response) => {
    let reqDecklist: null | IDecklist = null;
    const { quantity, partOfDeck } = req.body;
    const { id } = req.params;  
    console.log(partOfDeck);
    if (req.body.decklist)
    {
        reqDecklist = req.body.decklist;
    }
    if ((!quantity && quantity !== 0 ) || !partOfDeck)
    {
        res.status(400).json('You are missing quantity and part of deck propertyes from body');
        return;
    }

    if (!id)
    {
        res.status(400).json('Card id is missing');
        return;
    }

    try
    {
        const foundCard = await Card.findOne({ where: { id: id } });
        if (!foundCard)
        {
            res.status(404).json("Card dosen't exist");
            return;
        }

        let decklist:null | IDecklist = null;
        if (reqDecklist && isValidDecklist(reqDecklist))
        {   
            const foundDecklist = await Decklist.findOne({ where: { id: reqDecklist.id } })
            if (!foundDecklist)
            {
                res.status(404).json('Decklist could not be found')
                return;
            }
            decklist = foundDecklist.dataValues;
        }
        else
        {
            const newDecklist = await Decklist.create({ name: 'My decklist' });
            await UserDecklist.create({ userId: req.body.user.id, decklistId: newDecklist.dataValues.id });
            decklist = newDecklist.dataValues;
        }

        if (!decklist)
        {
            res.status(500).json('Decklist was not created successfully');
            return;
        }

        const foundCardsInDecklist = (await sequelize.query(
            `SELECT cd.cardId, cd.quantity, cd.partOfDeck
                FROM card_decklist cd 
                WHERE cd.cardId = :cardId AND cd.decklistId = :decklistId;`,
            {
                replacements: { cardId: foundCard.dataValues.id, decklistId: decklist.id },
                type: QueryTypes.SELECT
            }
        )) as { quantity: number, cardId: number, partOfDeck: string }[];
        if (foundCardsInDecklist.length < 1) {
            const newCardInDecklist = await CardDecklist.create({
                quantity: req.body.quantity, partOfDeck: req.body.partOfDeck, cardId: foundCard.dataValues.id,
                decklistId: decklist.id
            });
            res.status(201).json({ decklist: { ...newCardInDecklist.dataValues, name: decklist.name }, card: foundCard });
        }
        else {
            const totalQuantity = foundCardsInDecklist.reduce((sum, current) => sum + current.quantity, 0);
            if (totalQuantity === 3)
            {
                res.status(400).json('Max 3 cards');
                return;
            }

            let wasCardFound = false;
            for (const cardInDeck of foundCardsInDecklist)
            {
                if (cardInDeck.partOfDeck.includes(partOfDeck))
                {
                        await CardDecklist.update({ quantity: +cardInDeck.quantity + 1 },
                            { where: { cardId: foundCard.dataValues.id, decklistId: decklist.id, partOfDeck: partOfDeck } });
                        const updatedCardInDecklist = await CardDecklist.findOne({ where: { cardId: foundCard.dataValues.id, decklistId: decklist.id, partOfDeck: partOfDeck } });
                        wasCardFound = true;
                        res.status(200).json({ decklist: { ...updatedCardInDecklist!.dataValues, name: decklist.name }, card: foundCard });
                        return;
                }
            }

            if(!wasCardFound)
            {
                const newCardInDecklist = await CardDecklist.create({
                    quantity: 1, partOfDeck: req.body.partOfDeck, cardId: foundCard.dataValues.id,
                    decklistId: decklist.id
                });
                res.status(201).json({ decklist: { ...newCardInDecklist.dataValues, name: decklist.name }, card: foundCard });
            }
        }
    }
    catch (error)
    {
        res.status(500).json('Database error - ' + error);
    }
})

router.delete('/:decklistId/:partOfDeck/card/:cardId', authenticateJWT, async (req: Request, res: Response) => {
    const { decklistId, cardId, partOfDeck } = req.params;
    if (!decklistId || !cardId || !partOfDeck)
    {
        res.status(400).json('Decklist Id, Card Id and partOfDeck must be included');
        return;
    }

    try
    {
         const isUserPremitted = await sequelize.query(
            `SELECT ud.decklistId
                FROM user_decklist ud
                JOIN users u ON u.id = ud.userId
                WHERE (u.role LIKE :userRole OR ud.userId = :userId) AND ud.decklistId = :decklistId ;`,
            {
                replacements: { decklistId: decklistId, userId: req.body.user.id, userRole: req.body.user.role },
                type: QueryTypes.SELECT
            }
        );

        if (isUserPremitted.length < 1)
        {
            res.status(403).json('You are not premitted to change this deck');
            return;
        }

        const foundCardInDecklist = await CardDecklist.findOne({ where: { cardId: cardId, decklistId: decklistId, partOfDeck: partOfDeck } });
        if (!foundCardInDecklist)
        {
            res.status(404).json('Card is not in the decklist');
            return;
        }
        if (foundCardInDecklist.dataValues.quantity > 1)
        {
            const cardInDeck = await foundCardInDecklist.update({ quantity: foundCardInDecklist.dataValues.quantity - 1 },
                { where: { cardId: cardId, decklistId: decklistId } });
            res.status(200).json(cardInDeck.dataValues);
        }
        else
        {
            await foundCardInDecklist.destroy();
            res.status(200).json({partOfDeck: foundCardInDecklist.dataValues.partOfDeck, cardId: foundCardInDecklist.dataValues.cardId});
        }
    }
    catch (error)
    {
        res.status(500).json('Database error - '+ error);   
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!id || !name) 
    {
        res.status(400).send('Id and name is required');
    }
    try
    {
        await Decklist.update({ name: name }, { where: { id: id } });
        const decklist = await Decklist.findByPk(id);
        res.status(200).json(decklist);
    }
    catch (error)
    {
        res.status(500).json('Database error - ' + error);    
    }
})

export default router;