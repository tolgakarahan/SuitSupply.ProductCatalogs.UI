export class CreateProductCatalogCommand{
    constructor(public code:string, public name:string,
        public photo:string, public price:number){}
}