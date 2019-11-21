import { ProductCatalog } from '../models/product-catalog.model';

export class ProductCatalogVm{
    constructor(public id:number,public code:string, public name:string,
        public photo:string, public price:number,public lastUpdate:Date ){}

}