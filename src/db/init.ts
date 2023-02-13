import Dog from "./models/Dog.js"
import { DogTemps } from "./models/index.js"
import Temperament from "./models/Temperament.js"

const dbInit = ()=>{
    Dog.sync({alter: true}),
    Temperament.sync({alter: true}),
    DogTemps.sync({alter: true})
}

export default dbInit