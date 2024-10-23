import dotenv from 'dotenv';

dotenv.config({});

import express, { Request, Response } from 'express';
import { isValidLoginUser, isValidRegisterUser, IUser } from '../../types/user';
import bcrypt from 'bcrypt';
import User from '../models/User';
import Jwt from "jsonwebtoken";
import { Model } from 'sequelize';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        if (!isValidRegisterUser(req.body))
        {
            res.status(400).json('User is missing some manditory fields check and try again');    
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
        const token = Jwt.sign(user.dataValues, process.env.SECRET || "tajna", { expiresIn: "24h" });
        res.status(201).cookie("USER_TOKEN", token, { secure: true, httpOnly: true, maxAge: 86_400_000 }).json(user.dataValues);
    } catch (error) {
        res.status(500).json(`Server error - ${error}`)
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        if (!isValidLoginUser(req.body))
        {
            res.status(400).json('User is missing some manditory fields check and try again');    
            return;
        }
        const { email, username, password, rememberMe } = req.body;
        const user = (await User.findOne({ where: email ? { email: email } : { username: username } })) as Model<IUser>;
        if (!bcrypt.compareSync(password, user.dataValues.password))
        {
            res.status(404).json("Email or password incorrect");
            return;
        }
        const token = Jwt.sign(user.dataValues, process.env.SECRET || "tajna", { expiresIn: !rememberMe ? "24h" : "1week"});
        res.status(200).cookie("USER_TOKEN", token,
            { secure: true, httpOnly: true, maxAge: !rememberMe ? 86_400_000 : 7 * 86_400_000 }).json(user.dataValues);
    } catch (error) {
        res.status(500).json(`Server error - ${error}`)
    }
})

export default router;