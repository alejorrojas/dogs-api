import { Router } from "express";

import * as controller from "../controllers/dog.controller.js";

const routerDogs = Router();

routerDogs.get("/", controller.dogs);

routerDogs.post("/", controller.dogPost);

routerDogs.get("/:id", controller.dogsId);

routerDogs.delete("/delete/:id", controller.dogDelete);

routerDogs.get("/filter/created", controller.filterCreated);

routerDogs.get("/filter/api", controller.filterApi);

export default routerDogs
