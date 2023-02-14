import { Errors } from "../../types.js";

const checkUndefined = (input) => {
    if (!input.temperament.length) return true;
    for (let el in input) {
      if (input[el] === undefined) {
        return true;
      }
      return false;
    }
  };
  
  const checkLimit = (arr, limit) => {
    return arr.filter((el) => el > limit).length;
  };
  
  const checkNaN = (arr) => {
    return arr.filter((el) => isNaN(Number(el))).length;
  };
  
  const checkMinMax = (min, max) => {
    const nMax = Number(max);
    const nMin = Number(min);
    if (nMin > nMax || nMin === nMax) return false;
    return true;
  };
  const checkZero = (arr) => {
    return arr.filter((el) => Number(el) === 0).length;
  };
  
  const checkNegatives = (arr) => {
    return arr.filter((el) => Number(el) < 0).length;
  };
  
  const validate = (input) => {
    const regexUrl =
      /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
    const regexName = /^[a-zA-Z ]+$/;
    const {
      life_span,
      height_max,
      height_min,
      weight_max,
      weight_min,
      name,
      image,
    } = input;
    const numbers = [
      height_max,
      height_min,
      weight_max,
      weight_min,
      life_span,
      image,
    ];

    const errors = {} as Errors;
  
    //check undefined
    if (checkUndefined(input)) {
      errors.allFields = "All fields are required";
    }
    //check name
    if (!regexName.test(name)) {
      errors.name = "Invalid name format";
    }
    //check negatives
    if (checkNegatives(numbers)) {
      errors.negatives = "Negative numbers are not valid";
    }
    //check min-max
    if (!checkMinMax(weight_min, weight_max)) {
      errors.weight = "The max must be greater than the min";
    }
    if (!checkMinMax(height_min, height_max)) {
      errors.height = "The max must be greater than the min";
    }
    //check number type
    //check min
    if (checkZero(numbers)) {
      errors.zero = "The value must be greater than zero";
    }
    //check max
    if (checkLimit([weight_min, weight_max], 200)) {
      errors.tooHeavy = "The weight can't be more than 200Kg";
    }
    if (checkLimit([height_min, height_max], 2)) {
      errors.tooTall = "The height can't be more than 2m";
    }
    if (checkLimit([life_span], 30)) {
      errors.tooOld = "The life span can't be more than 30 years";
    }
    if (!regexUrl.test(image)) {
      errors.url = "Only jpg, jpeg, and png urls are allowed";
    }
    return errors;
  };

export default validate