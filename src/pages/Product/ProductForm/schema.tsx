import _ from "lodash";
import { requiredMessage } from "../../../constants/forms";
import { Yup } from "../../../exporter/packages";

export const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .max(100)
    .required(requiredMessage),
  
  sku: Yup.string()
    .max(8)
    .required(requiredMessage),

  isActive: Yup.boolean()
    .required(requiredMessage),
  
  hasWeight: Yup.object({
    value: Yup.string(),
    unit: Yup.object()
  }),
  
  images: Yup.object({
    thumbnail: Yup.string().required(requiredMessage),
    images: Yup.string().required(requiredMessage)
  })
});

export const productDefaultValues = {
  name: "",
  sku: "",
  isActive: false,
  categories: [],
  prices: {
    default: {
      value: 0,
    }
  },
  stocks: {
    default: {
      value: 0,
    }
  }
}

export const mapCreateProduct = (values: any) => {

  // let parent = _.get(values, 'parent._id');

  // let category = {
  //   name: _.get(values, 'name', ''),
  //   parent: parent ? parent : null,
  //   description: _.get(values, 'description', '')
  // }

  // return category;
}