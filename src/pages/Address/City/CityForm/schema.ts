import _ from "lodash";
import { requiredMessage } from "../../../../constants/forms";
import { Yup } from "../../../../exporter/packages";

export const CitySchema = Yup.object().shape({
  name: Yup.string()
    .max(50)
    .required(requiredMessage),
  isEnabled: Yup.bool(),
  
  continueEdit: Yup.bool(),
});