import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import Decklist from "./Decklist";
import Card from "./Card";

const CardDecklist = sequelize.define("card_decklist", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            max: 3,
            min: 1,
        },
    },
    partOfDeck: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Card,
          key: "id",
        },
        onDelete: 'cascade',
      },
      decklistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Decklist,
          key: "id",
          },
        onDelete: 'cascade',
      },
});

Card.belongsToMany(Decklist, { through: CardDecklist });
Decklist.belongsToMany(Card, { through: CardDecklist });

export default CardDecklist;