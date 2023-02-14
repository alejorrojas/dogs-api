import Dog from "./models/Dog.js"
import DogTemps from "./models/DogTemps.js"
import Temperament from "./models/Temperament.js"

const dbInit = ()=>{
    Dog.sync({alter: false}),
    Temperament.sync({alter: false}),
    DogTemps.sync({alter: false})
}

export default dbInit