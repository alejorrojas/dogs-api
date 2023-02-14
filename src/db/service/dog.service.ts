import axios from "axios"
import { DogAPI, DogNormalize } from "../../types.js";
import * as DogDal from "../dal/dog.dal.js"

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

  
export const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await DogDal.getAll()
  
    return [...dbInfo, ...apiInfo];
};


