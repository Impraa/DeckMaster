import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

dotenv.config({});


import { sequelize } from './utils/database';
import User from './routes/User';
import Card from './routes/Card';
import Utils from './routes/Utils';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';


const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors({ credentials: true, origin: ["http://127.0.0.1:5173", "http://localhost:5173"], }));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

app.use("/user", User);
app.use("/card", Card);
if (process.env.NODE_DEV === 'dev') app.use("/utils", Utils);

app.all("*", (req: Request, res: Response) => {
  res.status(404).send("Method not found");
});

app.listen(port, () => {
  sequelize
    .sync()
    .then(() => console.log('Connected to db successfuly'))
    .catch((e) => console.error(`Could not connect to db cause of ${e}`))
  console.log(`Server is Fire at http://localhost:${port}`);
});