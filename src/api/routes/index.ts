import { Router } from "express";
import routerDogs from "./dog.js";
import routerTemps from "./temperaments.js";

const router = Router()

router.use("/dogs", routerDogs)
router.use("/temperaments", routerTemps)

export default router