import _ from "lodash";
import { requiredMessage } from "../../../constants/forms";
import { Yup } from "../../../exporter/packages";

export const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .max(100)
    .required(requiredMessage),
  
  sku: Yup.string()
    .max(8)
    .required(requiredMessage)
});

export const mapCreateProduct = (values: any) => {

  // let parent = _.get(values, 'parent._id');

  // let category = {
  //   name: _.get(values, 'name', ''),
  //   parent: parent ? parent : null,
  //   description: _.get(values, 'description', '')
  // }

  // return category;
}