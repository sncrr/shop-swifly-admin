import _, { isArray, isNumber } from "lodash";
import { requiredMessage } from "../../../constants/forms";
import { Yup } from "../../../exporter/packages";
import { Product } from "../../../models/Product";
import { Store } from "../../../models/Store";
import {
  GLOBAL_OVERRIDER_DEFAULT,
  MEDIA_BASE_URL,
  WEIGHT_UNITS,
} from "../../../constants/global";
import { GlobalOverriderSchema } from "../../../models/Setting";
import { parseDateToLocaleString } from "../../../utils/dateUtils";

export const ProductSchema = Yup.object().shape({
  name: Yup.string().max(100).required(requiredMessage),

  sku: Yup.string().max(8).required(requiredMessage),

  isActive: Yup.bool().required(requiredMessage),
  // categories: Yup.array(Yup.string()).required(requiredMessage),

  // weightUnit: Yup.object(),
  // weightValue: Yup.string(),

  minCartQty: GlobalOverriderSchema,
  maxCartQty: GlobalOverriderSchema,

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
  selected: Product | undefined,
  stores: Store[],
  defaultSku: string
) => {
  return {
    name: selected && selected.name ? selected.name : "",
    sku: selected && selected.sku ? selected.sku : defaultSku,
    isActive: selected ? !!selected.isActive : true,
    description: selected ? selected.description : "",
    categories: selected ? selected.categories : new Array<string>(),
    
    // weightUnit:
    //   selected && selected.weight
    //     ? getDefaultWeightUnit(selected.weight.unit)
    //     : WEIGHT_UNITS[0],
    // weightValue: selected && selected.weight ? selected.weight.value : "",

    prices: getDefaultStorePriceValues(stores, selected?.prices),
    stocks: getDefaultStoreValues(stores, selected?.stocks, "quantity"),
    minCartQty:
      selected && selected.minCartQty
        ? selected.minCartQty
        : GLOBAL_OVERRIDER_DEFAULT,
    maxCartQty:
      selected && selected.maxCartQty
        ? selected.maxCartQty
        : GLOBAL_OVERRIDER_DEFAULT,

    files: {
      thumbnail: {
        value: "",
        files: getDefaultImages(selected?.images, "thumbnail"),
      },
      views: {
        value: "",
        files: getDefaultImages(selected?.images, "views"),
      },
    },

    continueEdit: false,
  };
};

export const getDefaultStorePriceValues = (
  stores: Store[],
  values: any,
) => {
  let data: any = {};

  data.default = {};
  data.default.value = getValueByStore(values, "default", "price", 0);
  let defaultSalePrice = getValueByStore(values, "default", "salePrice", -1);

  
  if(defaultSalePrice != -1) {
    data.default.salePrice = defaultSalePrice;

    let saleFrom = getValueByStore(values, "default", "saleFrom", '');
    let saleTo = getValueByStore(values, "default", "saleTo", '');

    data.default.saleFrom = parseDateToLocaleString(saleFrom);
    data.default.saleTo = parseDateToLocaleString(saleTo);
  }

  for (let store of stores) {
    if (store.code) {
      data[store.code] = {};
      data[store.code].value = getValueByStore(values, store.code, "price", 0);
      data[store.code].useDefault = getValueByStore(
        values,
        store.code,
        "useDefault",
        true
      );

      let salePrice = getValueByStore(values, store.code, "salePrice", 0);

      if(salePrice != 0) {
        let saleFrom = getValueByStore(values, store.code, "saleFrom", '');
        let saleTo = getValueByStore(values, store.code, "saleTo", '');

        data[store.code].salePrice = salePrice.toString();
        data[store.code].saleFrom = parseDateToLocaleString(saleFrom);
        data[store.code].saleTo = parseDateToLocaleString(saleTo);
      }
    }
  }

  return data;
};

export const getDefaultStoreValues = (
  stores: Store[],
  values: any,
  key: string
) => {
  let data: any = {};

  data.default = {};
  data.default.value = getValueByStore(values, "default", key, 0);

  for (let store of stores) {
    if (store.code) {
      data[store.code] = {};
      data[store.code].value = getValueByStore(values, store.code, key, 0);
      data[store.code].useDefault = getValueByStore(
        values,
        store.code,
        "useDefault",
        true
      );
    }
  }

  return data;
};

export const getValueByStore = (values: any[], store: string, key: string, defaultValue: any) => {
  let value = defaultValue;

  if (values) {
    let data = values.find(({ source }) => source == store);
    if (data) value = data[key];
  }

  return isNumber(value) ? value.toString() : value;
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
