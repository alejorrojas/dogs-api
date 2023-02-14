import { Request, Response } from "express";
import Dog from "../../db/models/Dog.js";
import DogTemps from "../../db/models/DogTemps.js";
import Temperament from "../../db/models/Temperament.js";
import * as service from "../service/dog.service.js";
import validate from "../service/validation.service.js";


export const dogs = async (req: Request, res: Response) => {
    const query = req.query
    const name = query.name as string

    const allDogs = await service.getAllDogs();
  
    if (name) {
      const dogFind = allDogs.filter((dog) =>
        dog.name.toLowerCase().startsWith(name.toLowerCase())
      );
  
      dogFind.length
        ? res.status(200).send(dogFind)
        : res.status(400).send("Sorry, we couldn't find your dog :(");
    } else {
      res.status(200).send(allDogs);
    }
}

export const dogsId =async (req: Request, res: Response) => {
  const { id } = req.params;

  const allDogs = await service.getAllDogs();
  const dogFind = id && allDogs.find((dog) => String(dog.id) === id);
  dogFind
    ? res.status(200).json(dogFind)
    : res.status(400).send("Sorry, we couldn't find your dog :(");
}

export const dogPost = async (req: Request, res: Response) => {
  const dogInput = req.body;

  const errors = validate(req.body);
  if (Object.keys(errors).length)
    res.status(500).json(errors)

  else{
    const dogNormalize = service.normalize(dogInput)

    try {
      const tempDb = await Temperament.findAll({
        where: { name: dogInput.temperament },
      });

      if (!tempDb.length) {
        return res.status(400).json("Sorry, we could not find that temperament");
      } 

      else {
        const newDog = await Dog.create(dogNormalize);
        newDog.addTemperament(tempDb)
        res.send("Dog created! :)");
      }
    } catch (e) {
      res.json("Something is wrong :S");
    }
  }
}

export const dogDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const findDog = await Dog.findByPk(id);
    findDog.destroy();
    res.status(200).json("Dog deleted succesfully");
  } catch (e) {
    res.status(500).json({message: "Something is wrong :S", error: e});
  }
}

export const filterCreated = async (req: Request, res: Response) => {
  try {
    const dbInfo = await service.getDBInfo();
    res.status(200).send(dbInfo);
  } catch (e) {
    res.status(500).json({message: "Something is wrong :S", error: e});
  }
}

export const filterApi = async (req: Request, res: Response) => {
  try {
    const apiInfo = await service.getApiInfo()
    res.status(200).send(apiInfo);

  } catch (e) {
    res.status(500).json({message: "Something is wrong :S", error: e});
  }
};