import { Patient } from "../models/Patient";
import DogIcon from "../static/icons/dog_1887531.png";
import CatIcon from "../static/icons/cat_2203926.png";
import AnimalIcon from "../static/icons/pawprint_1887455.png";
import Patient001 from "../static/patients-images/patient-001-image.jpg";
import Patient002 from "../static/patients-images/patient-002-image.jpg";
import Patient003 from "../static/patients-images/patient-003-image.jpg";
import Patient004 from "../static/patients-images/patient-004-image.jpg";
import Patient005 from "../static/patients-images/patient-005-image.jpg";

export const makeProperNoun = (littleNoun: string) => {
  let firstLetter = littleNoun.slice(0, 1);
  return `${firstLetter.toUpperCase()}${littleNoun.slice(1)}`
};

export const formatPhoneNumber = (phone: string) => {
  // Assumes it's just the number with no symbols
  return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
};

const importPatientImage = (imgUrl: string) => {
  if (imgUrl.includes("001")) {
    return Patient001;
  } else if (imgUrl.includes("002")) {
    return Patient002;
  } else if (imgUrl.includes("003")) {
    return Patient003;
  } else if (imgUrl.includes("004")) {
    return Patient004;
  } else if (imgUrl.includes("005")) {
    return Patient005;
  } else {
    return "";
  }
}

export const getPatientImageSrcAlt = (patient: Patient) => {
  let imgSrc;
  let imgAlt;
  if (patient.image && patient.image !== "") {
    imgSrc =  importPatientImage(patient.image);
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