
export class Category {

  readonly _id: string = '';
  readonly name: string = '';
  readonly slug: string = '';
  readonly description: string = '';
  readonly parent: any = '';
  readonly children: Category[] = new Array<Category>();
  readonly isEnabled: boolean = true;

  readonly productCount?: number;
  
  readonly createdAt: string = '';
  readonly updatedAt: string = '';
}