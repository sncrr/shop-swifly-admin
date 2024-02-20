import moment from "moment";

export const parseDateToLocaleString = (stringDate: string):string => {

  if(stringDate) {
    try {
      return moment(stringDate).toDate().toISOString().replace('Z', '')
    } catch (error) {}
  }

  return '';
}