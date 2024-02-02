import { Product } from "../../models/Product";
import { Category } from "../../models/Category";
import { get, isString } from "lodash";
import { MEDIA_BASE_URL } from "../../constants/global";

export const getThumbnailPath = (product: Product) => {
  if (product.images && product.images && product.images.thumbnail) {
    return `${MEDIA_BASE_URL}/${product.images.thumbnail.path}`;
  }

  return "";
};

export const mapToFormData = (values: any, event: any) => {
  let formData = new FormData();

  for (const key in values) {
    if (
      key != "files" &&
      key != "categories" &&
      key != "stocks" &&
      key != "prices"
    ) {
      if (values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    }
  }

  formData = appendFilesToFormData(formData, values, event, "thumbnail");
  formData = appendFilesToFormData(formData, values, event, "views", true);
  formData = mapCategoriesToFormData(formData, values.categories);

  formData = mapStringifyToFormData(formData, "prices", values.prices);
  formData = mapStringifyToFormData(formData, "stocks", values.stocks);
  formData = mapStringifyToFormData(
    formData,
    "weightUnit",
    values.weightUnit.value
  );
  formData = mapStringifyToFormData(formData, "minCartQty", values.minCartQty);
  formData = mapStringifyToFormData(formData, "maxCartQty", values.maxCartQty);

  return formData;
};

export const mapStringifyToFormData = (
  formData: FormData,
  key: string,
  value: any
) => {
  if (formData.get(key)) {
    formData.delete(key);
  }

  formData.append(key, isString(value) ? value : JSON.stringify(value));
  return formData;
};

export const mapCategoriesToFormData = (
  formData: FormData,
  categories: Category[]
) => {
  if (categories) {
    let ids = [];
    for (let item of categories) {
      ids.push(item._id);
    }
    formData.append("categories", JSON.stringify(ids));
  }

  return formData;
};

export const appendFilesToFormData = (
  formData: FormData,
  values: any,
  e: any,
  target: string,
  indexed?: boolean
) => {
  let input = e.target[`files.${target}.value`];

  if (input && input.files) {
    let changed = get(values, `files.${target}.changed`, false);

    if (changed) {
      for (let i = 0; i < input.files.length; i++) {
        let file = input.files[i];
        const fileNameSplit = file.name.split(".");
        const fileExt = fileNameSplit[fileNameSplit.length - 1];

        if (indexed) {
          formData.append("files", file, `${target}_${i}.${fileExt}`);
        } else {
          formData.append("files", file, `${target}.${fileExt}`);
        }
      }
    }
  }

  return formData;
};

export const mapCategoriesById = (ids: any, categories: Category[]) => {
  let map = [];

  if (ids && categories) {
    for (let id of ids) {
      let category = categories.find((item) => item._id == id);
      if (category) {
        map.push(category);
      }
    }
  }

  return map;
};
