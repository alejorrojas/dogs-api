import Temperament from "../models/Temperament.js";
import { getApiInfo } from "./dog.service.js";

export const getTemperaments = async () => {
    const allDogs = await getApiInfo();
    const tempsArray = allDogs.map((dog) => dog.temperament);
    const tempsFiltered = [...new Set(tempsArray.flat())].filter(
      (t) => t !== undefined
    );
  
    tempsFiltered.forEach((temp) => {
      Temperament.findOrCreate({
        where: { name: temp },
      });
    });
  
    const allTemps = await Temperament.findAll();
    return allTemps;
  };