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
export interface DogOutput extends Required<DogAttributes> {
    Temperaments?: TemperamentAttributes[]
}

export interface TemperamentAttributes {
    id: number
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

export interface DogCreate extends Omit<DogAttributes, "createdInDb" | "weight" | "height"> {
    name: string,
    weight_min: string,
    weight_max: string,
    height_min: string,
    height_max: string,
    life_span: string,
    temperament: string[],
    image: string
}

export interface Errors {
    url: string,
    tooOld: string,
    tooTall: string,
    tooHeavy: string,
    zero: string,
    height: string,
    weight: string,
    negatives: string,
    name: string,
    allFields: string,

}