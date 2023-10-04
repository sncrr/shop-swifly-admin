import { Category } from "./Category";

export class Product {

  readonly _id?: string;
  readonly name?: string;
  readonly description?: string;
  readonly prices?: Price[]
  readonly stocks?: Stock[]
  readonly categories?: Category[]
  
  readonly createdAt?: string;
  readonly updatedAt?: string;
}


class Price {
  source? : string
  price? : Number
  specialPrice? : Number
  useDefault? : boolean
  specialPriceFrom? : Date
  specialPriceTo? : Date
}

class Stock {
  source? : string
  quantity? : Number
  useDefault? : boolean
}