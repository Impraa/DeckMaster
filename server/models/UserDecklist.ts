import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import Decklist from "./Decklist";
import User from "./User";

const UserDecklist = sequelize.define("user_decklist", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      decklistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: Decklist,
          key: "id",
        },
      },
} , {
  tableName: "user_decklist",
});

User.belongsToMany(Decklist, { through: UserDecklist });
Decklist.belongsToMany(User, { through: UserDecklist });

export default UserDecklist;