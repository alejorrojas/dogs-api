import {Model, DataTypes } from "sequelize"
import { TemperamentAttributes, TemperamentInput } from "../../types.js";
import sequelizeConnection from "../config.js";

class Temperament extends Model<TemperamentAttributes, TemperamentInput> implements TemperamentAttributes{
    public id!: number
    public name!: string
}

Temperament.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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