import { Product } from "../../models/Product";
import { Category } from "../../models/Category";
import { SERVER_URL } from "../../root/constants";
import { get, isString } from "lodash";

export const getThumbnailPath = (product: Product) => {

  if (product.images && product.images && product.images.thumbnail) {

    return `${SERVER_URL}/${product.images.thumbnail.path}`;

  }

  return "";
}

export const mapToFormData = (values: any) => {
  let formData = new FormData();

  // formData.append('name', values.name);
  // formData.append('sku', values.sku);
  // formData.append('isActive', values.isActive);
  // formData.append('description', values.description);
  // formData.append('prices', JSON.stringify(values.prices));
  // formData.append('stocks', JSON.stringify(values.stocks));
  // formData.append('minCartQty')

  for (const key in values) {

    if(
        key != 'files' && 
        key != 'categories' &&
        key != 'stocks' &&
        key != 'prices'
      ) {

      if(values[key] !== undefined) {
        formData.append(key, values[key]);
      }
    }

    // formData = mapCategoriesToFormData(formData, values.categories);
    // formData = appendImageToFormData(formData, values.categories);

    // formData.append('categories', JSON.stringify(ids));
  }

  return formData;
}

export const mapStringifyToFormData = (formData: FormData, key: string, value: any) => {
  
  if(formData.get(key)) {
    formData.delete(key);
  }

  formData.append(key, isString(value) ? value : JSON.stringify(value));
  return formData;
}

export const mapCategoriesToFormData = (formData: FormData, categories: Category[]) => {
  if(categories) {
    let ids = [];
    for(let item of categories) {
      ids.push(item._id);
    }
    formData.append('categories', JSON.stringify(ids));
  }

  return formData;
}

export const appendFilesToFormData = (formData: FormData, values: any, e: any, target: string, indexed?: boolean) => {

  let input = e.target[`files.${target}.value`];

  if(input && input.files) {
    let changed = get(values, `files.${target}.changed`, false);

    if(changed) {
      for(let i = 0; i < input.files.length; i++) {
        let file = input.files[i];
        const fileNameSplit = file.name.split('.');
        const fileExt = fileNameSplit[fileNameSplit.length - 1];

        if(indexed) {
          formData.append('files', file, `${target}_${i}.${fileExt}`);
        }
        else {
          formData.append('files', file, `${target}.${fileExt}`);
        }
      }
    }
  }

  return formData;
}


export const mapCategoriesById = (ids: any, categories: Category[]) => {

  let map = [];

  if(ids && categories) {
    for(let id of ids) {
      let category = categories.find((item) => item._id == id);
      if(category) {
        map.push(category);
      }
    }
  }

  return map;
}

const ProductHelper = {
  getThumbnailPath,
}

export default ProductHelper;