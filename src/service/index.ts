import axios from "axios"
import Dog from "../db/models/Dog.js";
import Temperament from "../db/models/Temperament.js";
import { DogAPI, DogNormalize, DogOuput } from "../types.js";

const getApiInfo = async () => {
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

const getDbInfo = async () => {
    const dbInfo: DogOuput[] = await Dog.findAll({
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
};

export const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
  
    return [...dbInfo, ...apiInfo];
};