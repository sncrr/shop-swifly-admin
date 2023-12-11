import { SERVER_URL } from "../../constants/global-constant";
import { Product } from "../../types/Inventory/Product";

export const getThumbnailPath = (product: Product) => {

  if(product.images && product.images.length > 0) {
    for(let item of product.images) {
      if(item.type === "thumbnail") {
        return `${SERVER_URL}/${item.path}`;
      }
    }
  }

  return "";
}

const ProductHelper = {
  getThumbnailPath,
}

export default ProductHelper;