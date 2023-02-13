export interface DogAttributes {
    id: string,
    name: string,
    height: string,
    weight: string,
    image: string,
    life_span: string,
    createdInDb?: boolean
 }
 
export interface DogInput extends Omit<DogAttributes, "id"> {}
export interface DogOuput extends Required<DogAttributes> {
    Temperaments?: TemperamentAttributes[]
}

export interface TemperamentAttributes {
    id: string
    name: string
}

export interface TemperamentInput extends Omit<TemperamentAttributes, "id"> {}
export interface TemperamentOutput extends Required<TemperamentAttributes> {}

export interface DogTempsAttributes {
    id: string,
    DogId: string,
    TemperamentId: string
}

export interface DogTempsInput extends Omit<DogTempsAttributes, "id"> {}
export interface DogTempsOutput extends Required<DogTempsAttributes> {}





export interface DogAPI extends Omit<DogAttributes, "createdInDb" | "image"| "weight"| "height" > {
    temperament: string,
    image: {
        url: string
    },
    weight: {
        metric: string
    },
    height: {
        metric: string
    },
}

export interface DogNormalize extends DogAttributes{
    temperament: string[]
}