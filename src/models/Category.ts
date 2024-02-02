
export class Category {

  readonly _id?: string;
  readonly name?: string;
  readonly description?: string;
  readonly parent?: Category;
  readonly children?: Category[]
  readonly isEnabled?: boolean;
  
  readonly createdAt?: string;
  readonly updatedAt?: string;
}