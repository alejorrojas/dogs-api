import { Model, DataTypes } from "sequelize"
import { DogAttributes, DogInput } from "../../types.js"
import sequelizeConnection from "../config.js"

class Dog extends Model<DogAttributes, DogInput> implements DogAttributes {
    public id!: string
    public name!: string
    public image!: string
    public height!: string
    public weight!: string
    public life_span!: string
    public createdInDb!: boolean
}

Dog.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    timestamps: false
  }
)

export default Dog