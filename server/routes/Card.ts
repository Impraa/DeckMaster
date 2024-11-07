import dotenv from 'dotenv';

dotenv.config({});

import multer from "multer";
import path from "path";
import express, { Request, Response } from 'express';
import { isUserAdmin } from '../utils/middelware';
import { isValidCard } from '../../types/card';
import Card from '../models/Card';
import { Op } from 'sequelize';

const router = express.Router();

const upload = multer({
  dest: "images/cardImages",
  limits: {
    fileSize: 20 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(null, false);
  },
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.post('/new', isUserAdmin, upload.single("cardImage") , async (req:Request, res: Response) => {
    const { card, user } = req.body;

    /*if(!req.file)
    {
        res.status(400).json('There is no file uploded');
        return;
    } */

    if(!card)
    {
        res.status(400).send('There is no card in request');
        return;
    }

    card.id = Date.now();
    card.cardImage = Date.now().toString();

    if(!isValidCard(card))
    {
        res.status(400).send('Card is missing some manditory fields, please try again');
        return;
    }
    

    res.status(201).send('New card was created');
})

router.post('/cards', async (req: Request, res: Response) => {
  if (!req.body.offset && req.body.offset !== 0)
  {
    res.status(400).json('Offset is not defined');
    return;
  }

  const { offset, searchTerm } = req.body;

  let whereClause: { name?: { [Op.like]? : string }} = {};

  if (searchTerm)
  {
    whereClause = { name: { [Op.like]: `%${searchTerm}%` } };
  }

  try
  {
    const cards = await Card.findAll({ offset: offset, limit: 500, order: [['name', 'ASC']], where: whereClause });

    res.status(200).json(cards);
  }
  catch (error)
  {
    res.status(500).json('Database error -' + error);
  }
})

export default router;