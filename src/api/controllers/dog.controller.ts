import { Request, Response } from "express";
import Dog from "../../db/models/Dog.js";
import DogTemps from "../../db/models/DogTemps.js";
import Temperament from "../../db/models/Temperament.js";
import * as service from "../../db/service/dog.service.js";
import validate from "../../db/service/validation.service.js";


export const dogs = async (req: Request, res: Response) => {
    const query = req.query
    const name = query.name as string

    const allDogs = await service.getAllDogs();
  
    if (name) {
      const dogFind = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
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
  const {
    name,
    weight_min,
    weight_max,
    height_min,
    height_max,
    life_span,
    temperament,
    image,
  } = req.body;

  const errors = validate(req.body);
  if (Object.keys(errors).length)
    res.status(500).json(errors)

  else{
    const dogFormat = {
      name,
      height: `${height_min} - ${height_max}`,
      weight: `${weight_min} - ${weight_max}`,
      life_span,
      image,
    };

    try {
      const tempDb = await Temperament.findAll({
        where: { name: temperament },
      });

      if (!tempDb.length) {
        return res.status(400).json("Sorry, we could not find that temperament");
      } 

      else {
        const newDog = await Dog.create(dogFormat);
        tempDb.forEach(temp => DogTemps.create({DogId: newDog.id, TemperamentId: temp.id}))
        res.send("Dog created! :)");
      }
    } catch (e) {
      res.json("Something is wrong :S");
    }
  }
}