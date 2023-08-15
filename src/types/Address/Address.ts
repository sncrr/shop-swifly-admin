
export class Address {
    
    readonly street: string[];
    readonly cityCode: string;
    readonly cityName: string;
    readonly provinceCode: string;
    readonly provinceName: string;
    readonly countryCode: string;
    readonly countryName: string;
    readonly zipCode: string;

    constructor() {
        this.street = []
        this.cityCode = ""
        this.cityName = ""
        this.provinceCode = ""
        this.provinceName = ""
        this.countryCode = ""
        this.countryName = ""
        this.zipCode = ""
    }
}