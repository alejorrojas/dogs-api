import { Response } from "express";
import * as service from "../../db/service/temps.service.js"

export const temperaments = async (_req, res: Response) => {
    const temps = await service.getTemperaments();
    if(!temps) res.status(500).json({message: "Sorry something went wrong with te Temperaments table"});
    
    res.status(200).json(temps);
  };