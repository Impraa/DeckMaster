import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { isValidUser, IUser } from "../../types/user";

dotenv.config({});

export const authenticateJWT = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies['USER_TOKEN'];
  
    if (!token) 
    {
      res.status(403).json('No token present');
      return;
    }
    try 
    {
      const user = jwt.verify(token, process.env.SECRET || "tajna");
      if (typeof user === 'object' && user !== null)
      {
        req.body.user = user;
      }
    } 
    catch (error) 
    {
        res.clearCookie('USER_TOKEN').status(400).json('Invalid token');
        return;
    }
    next();
  };

export const isUserAdmin = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies['USER_TOKEN'];
  
    if (!token) 
    {
      res.status(403).json('No user present');
      return;
    }
    try 
    {
       const user = jwt.verify(token, process.env.SECRET || "tajna");
      
       if (typeof user === 'object' && user !== null) 
      {
        const validUser = user as IUser;

        if (validUser.role !== 'ADMIN') 
        {
          res.status(403).send('You are not an admin');
          return;
        }
      } 
      else 
      {
        res.status(400).json('Invalid token payload');
        return;
      }
    } 
    catch (error) 
    {
        res.clearCookie('USER_TOKEN').status(400).json('Invalid token');
        return;
    }
    next();
}