import _, { isArray } from "lodash";
import { requiredMessage } from "../../../constants/forms";
import { Yup } from "../../../exporter/packages";
import { Store } from "../../../models/Store";
import {
  MEDIA_BASE_URL,
  WEIGHT_UNITS,
} from "../../../constants/global";

export const CustomerSchema = Yup.object().shape({

  firstName: Yup.string().max(50).required(requiredMessage),
  lastName: Yup.string().max(50).required(requiredMessage),
  email: Yup.string().email().required(requiredMessage),

  group: Yup.mixed().required(requiredMessage).not(['']),

  dateOfBirth: Yup.string().max(11),
  gender: Yup.mixed(),
  

  // hasWeight: Yup.object({
  //   value: Yup.string(),
  //   unit: Yup.object()
  // }),

  // images: Yup.object({
  //   thumbnail: Yup.string().required(requiredMessage),
  //   images: Yup.string().required(requiredMessage)
  // })
  continueEdit: Yup.bool(),
});

export const mapFormDefaultValues = (
  // selected: Product | undefined,
  // stores: Store[],
  // categories: Category[],
  // defaultSku: string
) => {
  // return {
  //   name: selected && selected.name ? selected.name : "",
  //   sku: selected && selected.sku ? selected.sku : defaultSku,
  //   isActive: selected ? !!selected.isActive : true,
  //   description: selected ? selected.description : "",
  //   categories: selected
  //     ? mapCategoriesById(selected.categories, categories)
  //     : [],
  //   weightUnit:
  //     selected && selected.weight
  //       ? getDefaultWeightUnit(selected.weight.unit)
  //       : WEIGHT_UNITS[0],
  //   weightValue: selected && selected.weight ? selected.weight.value : "",

  //   prices: getDefaultStoreValues(stores, selected?.prices, "price"),
  //   stocks: getDefaultStoreValues(stores, selected?.stocks, "quantity"),
  //   minCartQty:
  //     selected && selected.minCartQty
  //       ? selected.minCartQty
  //       : GLOBAL_OVERRIDER_DEFAULT,
  //   maxCartQty:
  //     selected && selected.maxCartQty
  //       ? selected.maxCartQty
  //       : GLOBAL_OVERRIDER_DEFAULT,

  //   files: {
  //     thumbnail: {
  //       value: "",
  //       files: getDefaultImages(selected?.images, "thumbnail"),
  //     },
  //     views: {
  //       value: "",
  //       files: getDefaultImages(selected?.images, "views"),
  //     },
  //   },

  //   continueEdit: false,
  // };
};

export const getDefaultStoreValues = (
  stores: Store[],
  values: any,
  key: string
) => {
  let data: any = {};

  data.default = {};
  data.default.value = getValueByStore(values, "default", key);

  for (let store of stores) {
    if (store.code) {
      data[store.code] = {};
      data[store.code].value = getValueByStore(values, store.code, key);
      data[store.code].useDefault = getValueByStore(
        values,
        store.code,
        "useDefault"
      );
    }
  }

  return data;
};

export const getValueByStore = (values: any[], store: string, key: string) => {
  let value = 0;

  if (values) {
    let data = values.find(({ source }) => source == store);
    if (data) value = data[key];
  }

  return value;
};

export const getDefaultImages = (images: any, key: string) => {
  let value = [];

  if (images) {
    let media: any = images[key];

    if (media) {
      if (isArray(media)) {
        for (let item of media) {
          value.push(`${MEDIA_BASE_URL}/${item.path}`);
        }
      } else {
        value.push(`${MEDIA_BASE_URL}/${media.path}`);
      }
    }
  }

  return value;
};

export const getDefaultWeightUnit = (unit: string | undefined) => {
  if (unit) {
    let weightUnit = WEIGHT_UNITS.find((item) => item.value == unit);

    if (weightUnit) {
      return weightUnit;
    }
  }

  return WEIGHT_UNITS[0];
};
