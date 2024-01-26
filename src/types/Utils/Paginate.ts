import { DEFAULT_ITEMS_COUNT } from "../../constants/global";

export class Paginate<T> {

    
    readonly data: T[];
    readonly itemsCount: number;
    readonly currentPage: number;
    readonly totalPages: number;

    constructor () {
        this.data = []
        this.itemsCount = DEFAULT_ITEMS_COUNT
        this.currentPage = 1
        this.totalPages = 1
    }

}

export interface LocalData {
    itemsCount: number;
    currentPage: number;
    search: string;
}