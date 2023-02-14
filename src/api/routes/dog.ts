import { Router } from "express";

import * as controller from "../controllers/dog.controller.js";

const routerDogs = Router();

routerDogs.get("/", controller.dogs);

routerDogs.get("/:id", controller.dogsId);

routerDogs.post("/", controller.dogPost);

// router.delete("/deleted/:id", controller.delete);

// /* ENDPOINTS FILTRADOS PROPIOS*/
// router.get("/created", controller.filterCreated);

// router.get("/api", controller.filterApi);

export default routerDogs
