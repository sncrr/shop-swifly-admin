import { requiredMessage } from "../../constants/forms";
import { Yup } from "../../exporter/packages";

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(8)
    .max(16)
    .required(requiredMessage),
  
  password: Yup.string()
    .min(8)
    .max(16)
    .required(requiredMessage)
});