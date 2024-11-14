import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

const Decklist = sequelize.define("decklists", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  partOfDeck: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Decklist;