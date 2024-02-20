import { Product } from "./Product";

export class Promotion {

  readonly _id: string = '';
  readonly name: string = '';
  readonly description: string = '';
  readonly code: string = '';
  readonly sortOrder: number = 1;
  readonly products: Product[] = new Array<Product>();
  readonly isEnabled: boolean = true;
  readonly startDate: string = '';
  readonly endDate: string = '';
  
  readonly createdAt: string = '';
  readonly updatedAt: string = '';
}