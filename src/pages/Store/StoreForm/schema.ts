import { Yup } from "../../../exporter/packages";

export const StoreSchema = Yup.object().shape({

  name: Yup.string().required(),
  code: Yup.string().required(),
  isActive: Yup.boolean().required(),
  address: Yup.string().required(),

  timeOpen: Yup.string(),
  timeClose: Yup.string(),

  continueEdit: Yup.bool(),
})