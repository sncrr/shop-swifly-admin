
export class Category {

  readonly _id?: string;
  readonly name?: string;
  readonly description?: string;
  readonly parent?: any
  readonly children?: Category[]
  
  readonly createdAt?: string;
  readonly updatedAt?: string;

  // constructor() {
  //   this._id = "";
  //   this.name = "";
  //   this.description = "";
  //   this.parent = null;
  //   this.children = [];
  //   this.createdAt = "";
  //   this.updatedAt = "";
  // }
}