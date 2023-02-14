import { Router } from "express";
import * as controller from "../controllers/temps.controller.js"

const routerTemps = Router();

routerTemps.get("/", controller.temperaments);

export default routerTemps