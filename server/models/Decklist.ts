import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import User from "./User";
import Card from "./Card";

const Decklist = sequelize.define("decklists", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Decklist.belongsToMany(User, { through: 'user_decklist' });
Decklist.belongsToMany(Card, { through: 'card_decklist' });

export default Decklist;