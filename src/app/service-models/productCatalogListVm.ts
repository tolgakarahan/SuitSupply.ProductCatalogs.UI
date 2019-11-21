import { ProductCatalog } from '../models/product-catalog.model';

export class ProductCatalogListVm{
    constructor(public productCatalogs: ProductCatalog[]){}
}