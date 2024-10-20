import dotenv from 'dotenv';

dotenv.config({});

import express, { Request, Response } from 'express';
import { isValidUser, IUser } from '../../types/user';
import bcrypt from 'bcrypt';
import User from '../models/User';
import Jwt from "jsonwebtoken";

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        if (!isValidUser(req.body))
        {
            res.status(400).send('User is missing some manditory fields check and try again');    
            return;
        }
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const userData: Omit<IUser, 'id'> = {
            username: username,
            password: hashedPassword,
            email: email
        };
        const user = await User.create(userData);
        const token = Jwt.sign(user.dataValues, process.env.SECRET || "tajna", { expiresIn: "1h" }).toString();
        res.status(200).cookie("USER_TOKEN", token, { secure: true, httpOnly: true, maxAge: 86_400_000 }).json(user.dataValues);
    } catch (error) {
        res.status(500).send(`Server error - ${error}`)
    }
});

export default router;