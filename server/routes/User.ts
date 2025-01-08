import dotenv from 'dotenv';

dotenv.config({});

import express, { Request, Response } from 'express';
import { isValidLoginUser, isValidRegisterUser, isValidUpdateUser, isValidUser, IUpdateUserData, IUser, LoginUser, Optional } from '../../types/user';
import bcrypt from 'bcrypt';
import User from '../models/User';
import Jwt from "jsonwebtoken";
import { Model } from 'sequelize';
import { authenticateJWT } from '../utils/middelware';
import UserDecklist from '../models/UserDecklist';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try
    {
        if (!isValidRegisterUser(req.body))
        {
            res.status(400).json('Some required fields are not filled, check and try again.');    
            return;
        }

        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const userData: Omit<LoginUser,'rememberMe'> = {
            username: username,
            password: hashedPassword,
            email: email
        };

        const user = await User.create(userData);
        const token = Jwt.sign(user.dataValues, process.env.SECRET || "tajna", { expiresIn: "24h" });

        res.status(201).cookie("USER_TOKEN", token, { secure: true, httpOnly: true, maxAge: 86_400_000 }).json(user.dataValues);
    } 
    catch (error) 
    {
        res.status(500).json('Email or username already exists, please try again.')
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try
    {
        if (!isValidLoginUser(req.body))
        {
            res.status(400).json('Some required fields are not filled, check and try again.');    
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
    } 
    catch (error) 
    {
        res.status(500).json('Email or password incorrect, please try again.');
    }
})

router.post('/refresh', authenticateJWT, (req: Request, res: Response) => {
    const userData = Jwt.verify(req.cookies['USER_TOKEN'], process.env.SECRET || "tajna");

    res.status(200).json({"message" : "User verified successfully", "user" : userData});
})

router.delete('/logout', authenticateJWT, async (req: Request, res: Response) => {
    res.clearCookie('USER_TOKEN').status(200).json('User has been logged out');
})

router.get('/:userId/deck/:deckId', async (req: Request, res: Response) => {
    const { userId, deckId } = req.params;
    if (!userId || !deckId)
    {
        res.status(400).json('Ids have not been provided');
        return;
    }

    try
    {
        const userDecklist = (await UserDecklist.findOne({ where: { userId: userId, decklistId: deckId } })) as Model<IUser>;
        
        res.status(200).json(userDecklist.dataValues);
    }
    catch (error) {
        res.status(400).json('Deck is nonexistant, please try again.');
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id)
    {
        res.status(400).json('Id has not been provided');
        return;
    }

    try
    {
        const user = (await User.findOne({ where: { id: id } })) as Model<IUser>;
        
        res.status(200).json(user.dataValues);
    }
    catch (error) {
        res.status(400).json('User is nonexistant, please try again.');
    }
}) 

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id)
    {
        res.status(400).json('Id has not been provided');
        return;
    }

    try
    {
        if (!isValidUpdateUser(req.body))
        {
            res.status(400).json('Some required fields are not filled, check and try again.');    
            return;
        }

        const { username, email, oldPassword, newPassword } = req.body;
        const userData: IUpdateUserData = {
            username: username,
            email: email,
        };

        if (oldPassword && newPassword)
        {
            const user = (await User.findOne({ where: { email: email }})) as Model<IUser>;

            if (!bcrypt.compareSync(oldPassword, user.dataValues.password))
            {
                res.status(404).json("Email or password incorrect");
                return;
            }

            const newHashedPassword = bcrypt.hashSync(newPassword, 10);

            userData.password = newHashedPassword;
        }
        
        await User.update(userData, { where: { id: id } });

        const user = (await User.findOne({ where: { email: email }})) as Model<IUser>;

        const token = Jwt.sign(user.dataValues, process.env.SECRET || "tajna", { expiresIn: "24h" });

        res.status(200).cookie("USER_TOKEN", token, { secure: true, httpOnly: true, maxAge: 86_400_000 }).json(user.dataValues);
    } 
    catch (error) 
    {
        res.status(500).json('Email or password incorrect, please try again.')
    }
})

export default router;