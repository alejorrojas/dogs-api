import {Model, DataTypes } from "sequelize"
import { TemperamentAttributes, TemperamentInput } from "../../types.js";
import sequelizeConnection from "../config.js";
import Dog from "./Dog.js";

class Temperament extends Model<TemperamentAttributes, TemperamentInput> implements TemperamentAttributes{
    public id!: string
    public name!: string
}

Temperament.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
},
{
    sequelize: sequelizeConnection,
    timestamps: false
})

export default Temperament