import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({});

export const authenticateJWT = (req: Request, res:Response, next:NextFunction) => {
    const token = req.cookies['USER_TOKEN'];
  
    if (!token) 
    {
      res.status(403).json('No token present');
      return;
    }
    try 
    {
        jwt.verify(token, process.env.SECRET || "tajna");
    } 
    catch (error) 
    {
        res.clearCookie('USER_TOKEN').status(400).json('Invalid token');
        return;
    }
    next();
  };