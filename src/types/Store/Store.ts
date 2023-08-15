import { Address } from "../Address/Address";

export class Store {
    
    readonly _id: string;
    readonly name: string;
    readonly hasPhysical: boolean;
    readonly location: Address

    constructor() {
        this._id = ""
        this.name = ""
        this.hasPhysical = false
        this.location = new Address()
    }
}