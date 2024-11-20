import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import Decklist from "./Decklist";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'USER'
  }
},  {
  indexes: [
    {unique:true, fields:['email']},
    {unique:true, fields:['username']},
  ]
});

User.belongsToMany(Decklist, { through: 'user_decklist' });
Decklist.belongsToMany(User, { through: 'user_decklist' });

export default User;