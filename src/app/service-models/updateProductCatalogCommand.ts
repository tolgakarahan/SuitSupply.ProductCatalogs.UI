export class UpdateProductCatalogCommand{
    constructor(public id:number,public code:string, public name:string,
        public photo:string, public price:number){}
}