const pageTitles = {
  "/home": "Home",
  "/patient-records": "Patient Records", 
  "/patient-records/patient/[0-9]+$": "Patient ",
  "/appointments": "Appointments", 
  "/settings": "Settings"
} as any;

export const getPageTitle = (location: string) => {
  let keys = Object.keys(pageTitles);
  let hasId = false;
  let header = keys.find((key) => {
    if (key === location) {
      return key;
    } else {
      let keyReg = new RegExp(key);
      let matches = location.match(keyReg);
      if (matches && matches.length === 1 && matches[0] === location) {
        hasId = true;
        return true;
      }
      return false;
    }
  });
  if (header && hasId) {
    let ids = location.match(/[0-9]+$/);
    if (ids && ids.length > 0) {
      return pageTitles[header] + ids[ids.length - 1];
    }
  } else if (header) {
    return pageTitles[header];
  }
  return "Unknown Page";
};