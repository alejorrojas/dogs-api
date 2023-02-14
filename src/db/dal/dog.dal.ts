import Dog from '../models/Dog.js'
import { DogInput, DogNormalize, DogOutput } from '../../types.js'
import Temperament from '../models/Temperament.js'


export const create = async (payload: DogInput): Promise<DogOutput> => {
    const dog = await Dog.create(payload)

    return dog
}

export const deleteById = async (id: number): Promise<boolean> => {
    
    const deletedDog = await Dog.destroy({
        where: {id}
    })

    return !!deletedDog
}

export const getAll = async (): Promise<DogNormalize[]> => {
    const dbInfo: DogOutput[] = await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      const dbFormat: DogNormalize[] = dbInfo.map((dog) => {
        const {
          id,
          name,
          Temperaments,
          image,
          weight,
          height,
          life_span,
          createdInDb,
        } = dog;
        const dogFormat = {
          id,
          name,
          temperament: Temperaments.map((t) => t.name),
          image,
          weight,
          height,
          life_span,
          createdInDb,
        };
        return dogFormat;
      });
      return dbFormat;
}

