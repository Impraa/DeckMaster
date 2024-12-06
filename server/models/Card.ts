import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

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


export default Card;