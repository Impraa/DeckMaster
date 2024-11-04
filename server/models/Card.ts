import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import Decklist from "./Decklist";

const Card = sequelize.define("cards", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    humanReadableCardType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    frameType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cardText: {
        type: DataTypes.STRING(2048),
        allowNull: false,
    },
    race: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    archetype: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    attribute: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    atk: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    def: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    banTcg: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    banOcg: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    banGoat: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cardImage: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Card.belongsToMany(Decklist, { through: 'card_decklist' });

export default Card;