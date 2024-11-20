import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import Decklist from "./Decklist";

const Card = sequelize.define("cards", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
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
},{
    indexes:[
        {unique:true, fields:['name']},
      ]
});

const CardDecklist = sequelize.define("card_decklist", {
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
    }
});

Card.belongsToMany(Decklist, { through: CardDecklist });
Decklist.belongsToMany(Card, { through: CardDecklist });


export default Card;