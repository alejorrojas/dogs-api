import { Router } from "express";
import routerDogs from "./dog.router.js";
import routerTemps from "./temperaments.router.js";

const router = Router()

router.use("/dogs", routerDogs)
router.use("/temperaments", routerTemps)

export default router