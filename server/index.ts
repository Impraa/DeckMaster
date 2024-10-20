import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { sequelize } from './utils/database';
import User from './routes/User';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

app.use("/user", User);

app.listen(port, () => {
  sequelize
    .sync()
    .then(() => console.log('Connected to db successfuly'))
    .catch((e) => console.error(`Could not connect to db cause of ${e}`))
  console.log(`Server is Fire at http://localhost:${port}`);
});