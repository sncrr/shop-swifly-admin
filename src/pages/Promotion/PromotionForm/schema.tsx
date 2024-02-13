import _ from "lodash";
import { requiredMessage } from "../../../constants/forms";
import { Yup } from "../../../exporter/packages";

export const PromotionSchema = Yup.object().shape({
  name: Yup.string()
    .max(50)
    .required(requiredMessage),
    
  code: Yup.string()
    .required(requiredMessage),

  isEnabled: Yup.boolean(),
  description: Yup.string()
    .max(200),

  startDate: Yup.string(),
  endDate: Yup.string(),
  
  continueEdit: Yup.bool(),
});

export const mapCreatePromotion = (values: any) => {

  // let parent = _.get(values, 'parent._id');

  let promotion = {
    name: _.get(values, 'name', ''),
    parent: values.parent ? values.parent : null,
    description: _.get(values, 'description', '')
  }

  return promotion;
}