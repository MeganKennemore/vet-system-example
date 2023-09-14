import { Patient } from "../models/Patient";
import DogIcon from "../static/icons/dog_1887531.png";
import CatIcon from "../static/icons/cat_2203926.png";
import AnimalIcon from "../static/icons/pawprint_1887455.png";

export const makeProperNoun = (littleNoun: string) => {
  let firstLetter = littleNoun.slice(0, 1);
  return `${firstLetter.toUpperCase()}${littleNoun.slice(1)}`
};

export const formatPhoneNumber = (phone: string) => {
  // Assumes it's just the number with no symbols
  return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
};

export const getPatientImageSrcAlt = (patient: Patient) => {
  let imgSrc;
  let imgAlt;
  if (patient.image && patient.image !== "") {
    imgSrc = patient.image;
    imgAlt = `${patient.patient_name} image`;
  } else if (patient.species.toLowerCase() === "dog") {
    imgSrc = DogIcon;
    // <a href="https://www.freepik.com/icon/dog_1887531">Icon by Freepik</a>
    imgAlt = "Dog Generic Icon (by Freepik)"; 
  } else if (patient.species.toLowerCase() === "cat") {
    imgSrc = CatIcon;
    // <a href="https://www.freepik.com/icon/cat_2203926">Icon by Freepik</a>
    imgAlt = "Cat Generic Icon (by Freepik)";
  } else {
    imgSrc = AnimalIcon;
    // <a href="https://www.freepik.com/icon/pawprint_1887455#fromView=resource_detail&position=33">Icon by Freepik</a>
    imgAlt = "Paw Generic Icon (by Freepik)";
  }
  return {src: imgSrc, alt: imgAlt};
};