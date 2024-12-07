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
        if (!name)
        {
            res.status(400).json('The name is missing in request');
            return;
        }
        const newDecklist = await Decklist.create({ name: name });
        res.status(201).json({ decklist: newDecklist.dataValues });
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

        res.status(200).json({ decklist: allDecklistCards });
    }
    catch(error)
    {
        res.status(500).json('Database error - ' + error);
    }
})

router.post('/add/:id', authenticateJWT, async (req: Request, res: Response) => {
    let reqDecklist:null | IDecklist = null;
    if (req.body.decklist)
    {
        reqDecklist = req.body.decklist;
    }
    if (!req.body.quantity || !req.body.partOfDeck)
    {
        res.status(400).json('You are missing quantity and part of deck propertyes from body');
        return;
    }

    if (!req.params.id)
    {
        res.status(400).json('Card id is missing');
        return;
    }

    try
    {
        const foundCard = await Card.findOne({ where: { id: req.params.id } });
        if (!foundCard)
        {
            res.status(404).json("Card dosen't exist");
            return;
        }

        let decklist:null | IDecklist = null;
        if (reqDecklist && isValidDecklist(reqDecklist as unknown as IDecklist))
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

        const foundCardInDecklist = await CardDecklist.findOne({ where: { cardId: foundCard.dataValues.id, decklistId: decklist.id } });
        if (!foundCardInDecklist)
        {
            const newDecklist = await CardDecklist.create({
                quantity: req.body.quantity, partOfDeck: req.body.partOfDeck, cardId: foundCard.dataValues.id,
                decklistId: decklist.id
            });
            res.status(201).json(newDecklist.dataValues);
        }
        else
        {
            if (foundCardInDecklist.dataValues.quantity === 3)
            {
                res.status(400).json('Max 3 cards');
                return;
            }
            await foundCardInDecklist.update({ quantity: foundCardInDecklist.dataValues.quantity + 1 },
                { where: { cardId: foundCard.dataValues.id, decklistId: decklist.id } });
            const updatedCardInDecklist = await CardDecklist.findOne({ where: { cardId: foundCard.dataValues.id, decklistId: decklist.id } });
            res.status(201).json(updatedCardInDecklist!.dataValues);
        }
    }
    catch (error)
    {
        res.status(500).json('Database error - ' + error);
    }
})

export default router;