import dotenv from 'dotenv';

dotenv.config({});

import express, { Request, Response } from 'express';
import Decklist from '../models/Decklist';

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

export default router;