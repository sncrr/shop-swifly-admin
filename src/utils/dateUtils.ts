import moment from "moment";

export const parseDateToLocaleString = (stringDate: string):string => {

  console.log(stringDate);
  if(stringDate) {
    return moment(stringDate).toDate().toISOString().replace('Z', '')
  }
  else {
    return '';
  }
}