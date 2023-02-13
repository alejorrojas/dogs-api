import { Request, Response } from "express";
import { getAllDogs } from "../service/index.js";


export const dogs = async (req: Request, res: Response) => {
    const query = req.query
    const name = query.name as string

    const allDogs = await getAllDogs();
  
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