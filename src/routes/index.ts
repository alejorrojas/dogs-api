import { Router } from "express";

import * as controller from "../controllers/index.js";

const routerDogs = Router();

routerDogs.get("/", controller.dogs);

// router.get("/dogs/:id", controller.dogsId);

// router.get("/temperament", controller.temperaments);

// router.post("/dog", controller.dogPost);

// router.delete("/deleted/:id", controller.delete);

// /* ENDPOINTS FILTRADOS PROPIOS*/
// router.get("/created", controller.filterCreated);

// router.get("/api", controller.filterApi);

export default routerDogs
