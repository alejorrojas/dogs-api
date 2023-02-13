import { DataTypes, Model } from "sequelize";
import { DogTempsAttributes, DogTempsInput } from "../../types.js";
import sequelizeConnection from "../config.js";

import { Dog, Temperament } from "./index.js";


//Tabla intermedia
class DogTemps extends Model<DogTempsAttributes, DogTempsInput> implements DogTempsAttributes {
    public id!: string
    public DogId!: string
    public TemperamentId!: string
}

DogTemps.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    DogId: {
        type: DataTypes.UUIDV4,
        references: {
            model: Dog,
            key: 'id'
        }
    },
    TemperamentId: {
        type: DataTypes.UUIDV4,
        references: {
            model: Temperament,
            key: 'id'
        }
    }
},
{
    sequelize: sequelizeConnection,
    timestamps: false
}
)

Dog.belongsToMany(Temperament, { through: DogTemps });
Temperament.belongsToMany(Dog, { through: DogTemps });


export default DogTemps
