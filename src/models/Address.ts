
export class Province {
  readonly _id?: string = '';
  readonly name?: string = '';
  readonly code?: number = 0;
}

export class City {
  readonly _id?: string = '';
  readonly name?: string = '';
  readonly code?: number = 0;
  readonly provinceCode?: number = 0;
}

export class Barangay {
  readonly _id?: string = '';
  readonly name?: string = '';
  readonly code?: number = 0;
  readonly provinceCode?: number = 0;
  readonly cityCode?: number = 0;
  readonly storeCode?: string = '';
  readonly tier?: string = '';
}