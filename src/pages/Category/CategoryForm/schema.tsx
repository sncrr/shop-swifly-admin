import _ from "lodash";
import { requiredMessage } from "../../../constants/forms";
import { Yup } from "../../../exporter/packages";

export const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .max(50)
    .required(requiredMessage),
  // parent: Yup.object(),
  isEnabled: Yup.bool(),
  description: Yup.string()
    .max(200),
  
  continueEdit: Yup.bool(),

});

export const mapCreateCategory = (values: any) => {

  let parent = _.get(values, 'parent._id');

  let category = {
    name: _.get(values, 'name', ''),
    parent: parent ? parent : null,
    description: _.get(values, 'description', '')
  }

  return category;
}