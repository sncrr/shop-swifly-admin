import { GlobalOverrider } from "./Setting";

export class Product {

  readonly _id: string = '';
  readonly name: string = '';
  readonly sku: string = '';
  readonly isActive: boolean = true;
  readonly description: string = '';
  readonly categories: any = new Array<string>();
  readonly weight: ProductWeight = new ProductWeight();

  readonly prices: ProductPrice[] = new Array<ProductPrice>();
  readonly stocks: ProductStock[] = new Array<ProductStock>();
  readonly minCartQty: GlobalOverrider = new GlobalOverrider();
  readonly maxCartQty: GlobalOverrider = new GlobalOverrider();
  
  readonly images?: Media

  readonly createdAt?: string;
  readonly updatedAt?: string;

  static populateCategory(query: string) {
    return query + '&populate=category';
  }

  static sortByName(query: string) {
    return query + '&sort=name';
  }

  saveProduct = async () => {
    
  }
}

export class ProductImage {
  type? : string
  path? : string
}

export class Media {
  thumbnail?: ProductImage
  views?: ProductImage[]
}


export class ProductPrice {
  source? : string
  price? : Number
  specialPrice? : Number
  useDefault? : boolean
  specialPriceFrom? : Date
  specialPriceTo? : Date
}

export class ProductStock {
  source? : string
  quantity? : Number
  useDefault? : boolean
}

export class ProductWeight {
  unit?: string
  value?: string
}