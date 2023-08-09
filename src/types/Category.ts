
// export interface Category {
//   readonly _id?: string;
//   readonly name?: string;
//   readonly description?: string;
//   readonly parent?: Category
  
//   readonly created_at?: Date;
//   readonly updated_at?: Date;
// }

export class Category {
  readonly _id: string;
  readonly name?: string;
  readonly description?: string;
  readonly parent?: any
  readonly children?: Category[]
  
  readonly created_at?: string;
  readonly updated_at?: string;

  constructor() {
    this._id = "";
    this.name = "";
    this.description = "";
    this.parent = null;
    this.children = [];
    this.created_at = "";
    this.updated_at = "";
  }
}