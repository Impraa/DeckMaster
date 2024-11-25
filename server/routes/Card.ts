import dotenv from 'dotenv';

dotenv.config({});

import multer from "multer";
import path from "path";
import express, { Request, Response } from 'express';
import { isUserAdmin } from '../utils/middelware';
import fs from 'fs';
import { isValidNewCard, isValidNewMonster } from '../../types/card';
import Card from '../models/Card';
import { Op } from 'sequelize';
import { generateImageSlug } from '../utils/helperFunctions';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image/cardImages");
  },
  filename: (req, file, cb) => {
    cb(null, generateImageSlug(file.originalname.split('.')[0].trim()) + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(null, false);
  },
});

router.post('/new', isUserAdmin, upload.single('cardImage') , async (req:Request, res: Response) => {
    const { cardData } = req.body;
    const card = JSON.parse(cardData);

    if(!req.file)
    {
        res.status(400).json('There is no file uploded');
        return;
    } 

    if(!card)
    {
        res.status(400).json('There is no card in request');
        return;
    }

    card.cardImage = '/image/cardImages/' + req.file.filename;

    if (card.humanReadableCardType.includes('Monster') && !isValidNewMonster(card))
    {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Failed to delete file:", err);
      });
      res.status(400).json('Card is missing some manditory fields, please try again');
      return;
    }
    else if(!card.humanReadableCardType.includes('Monster') && !isValidNewCard(card))
    {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Failed to delete file:", err);
      });
      res.status(400).json('Card is missing some manditory fields, please try again');
      return;
    }

  try {
    const newCard = await Card.create({
      ...card, frameType: card.humanReadableCardType.includes('Monster') ? 'monster' :
        card.humanReadableCardType.includes('Spell') ? 'spell' : 'trap'
    });

    const newFilename = `${newCard.dataValues.id}.${req.file.originalname.split('.')[1]}`;
    const newFilePath = path.join(__dirname, '..', '/image/cardImages/', newFilename);

    fs.rename(req.file.path, newFilePath, async (err) => {
      if (err) {
        await newCard.destroy();
        res.status(500).json('Error saving the file');
        return;
      }
  
      newCard.dataValues.cardImage = newFilePath;
      await newCard.update({ cardImage: '/image/cardImages/' + newFilename }, { where: { id: newCard.dataValues.id } });
  
      res.status(201).json({ newCard: { ...newCard.dataValues } });
    });
    }
    catch (error)
    {
      fs.unlink(req.file.path, (err) => {
          if (err) console.error("Failed to delete file:", err);
      });
      res.status(500).json('Database error -' + error);
    }
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

router.delete('/delete/:id', isUserAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try
  {
    const card = await Card.findByPk(id);

    if (!card)
    {
        res.status(404).json('Card not found');
        return;
    }

    const fullPath = path.join(__dirname, '..', card.dataValues.cardImage);

    fs.unlink(fullPath, async (err) => {
      if (err)
      {
        res.status(500).json('Error deleteing image' + err);
        return;
      }

      await card.destroy();

      res.status(200).json({ card: card});
    });
  }
  catch (error)
  {
    res.status(500).json('Database error -' + error);  
  }
})

export default router;