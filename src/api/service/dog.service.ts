import axios from "axios"
import { DogAPI, DogCreate, DogInput, DogNormalize, DogOutput } from "../../types.js";
import Dog from "../../db/models/Dog.js";
import Temperament from "../../db/models/Temperament.js";

export const getApiInfo = async () => {
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiInfo: DogNormalize[] = apiUrl.data.map((dog: DogAPI) => {
      return {
        id: dog.id,
        name: dog.name,
        temperament: dog.temperament?.split(", "),
        image: dog.image.url,
        weight: dog.weight.metric,
        life_span: dog.life_span,
        height: dog.height.metric,
      };
    });

    return apiInfo;
};

export const getDBInfo = async (): Promise<DogNormalize[]> => {
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
  
export const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo()
  
    return [...dbInfo, ...apiInfo];
};

export const normalize = (dog: DogCreate)=> {
  return {
    name: dog.name,
    height: `${dog.height_min} - ${dog.height_max}`,
    weight: `${dog.weight_min} - ${dog.weight_max}`,
    life_span: dog.life_span,
    image: dog.image,
  }

}


