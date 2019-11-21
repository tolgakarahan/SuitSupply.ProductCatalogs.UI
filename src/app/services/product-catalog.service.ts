import { Injectable, Output, EventEmitter } from '@angular/core';
import { ProductCatalog } from '../models/product-catalog.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators'
import { ProductCatalogListVm } from '../service-models/productCatalogListVm';
import { throwError } from 'rxjs';
import { ProductCatalogVm } from '../service-models/productCatalogVm';
import { UpdateProductCatalogCommand } from '../service-models/updateProductCatalogCommand';
import { CreateProductCatalogCommand } from '../service-models/createProductCatalogCommand';
import { ExcelService } from './excel.service';

@Injectable({ providedIn:'root' })
export class ProductCatalogService{
    @Output() productCatalogListChanged = new EventEmitter<ProductCatalog[]>();

    productCatalogList:ProductCatalog[];
    apiUrl:string='https://localhost:44308/api/productcatalog';

    constructor(private http: HttpClient, private excelService:ExcelService) {
        
    }

    exportToExcelProductCatalogProducts(){
        
        var data = [];
        for (let index = 0; index < this.productCatalogList.length; index++) {
            const element = this.productCatalogList[index];
            data[index] = {
                id:element.id,
                code:element.code,
                name:element.name,
                price:element.price,
                photo:element.photo,
                lastUpdate:element.lastUpdate,
            }
        }
       
        console.log(data);
        this.excelService.exportAsExcelFile(data,'Product Catalogs','Product Catalog Sheet');
    }
    
    getProductCatalogs(){
        return this.http.get<ProductCatalogListVm>(this.apiUrl)
        .pipe(
            map(vm => {
                return vm.productCatalogs;
            }),
            catchError(this.handleError),
            tap(list=>{
                this.productCatalogList = list;
                this.productCatalogListChanged.emit(list);
            })
        );
      }

    getProductCatalog(id: number){
        return this.http.get<ProductCatalogVm>(this.apiUrl+ '/' + id)
        .pipe(
            map(vm => {
                return new ProductCatalog(vm.id, vm.code,vm.name,vm.photo,vm.price,vm.lastUpdate);
            }),
            catchError(this.handleError)
        );
    }

    updateProductCatalog(id: number, code:string,name:string,photo:string,price:number){
        var command = new UpdateProductCatalogCommand(id,code,name,photo,price);
        return this.http.put<UpdateProductCatalogCommand>(
            this.apiUrl+ '/' + id,
            command
        )
        .pipe(
            catchError(this.handleError)
        );
    }

    deleteProductCatalog(id: number){
        return this.http.delete(this.apiUrl+ '/' + id)
        .pipe(
            catchError(this.handleError)
        );
    }

    createProductCatalog(code:string,name:string,photo:string,price:number){
        var command = new CreateProductCatalogCommand(code,name,photo,price);
        return this.http.post<UpdateProductCatalogCommand>(
            this.apiUrl,
            command
        )
        .pipe(
            catchError(this.handleError)
        );
    }

    refreshProductCatalogData(){
        this.getProductCatalogs().subscribe();
    }

    searchProductCatalog(code:string, name:string){
        if(!code){
            code='';
        }
        if(!name){
            name ='';
        }

        if((code.trim() ==='' && name.trim() =='')){
            this.productCatalogListChanged.emit(this.productCatalogList.slice()); 
            return;
        }
 
        const searchResult = this.productCatalogList.slice().filter(x=>
                (code!='' && x.code.toLowerCase().indexOf(code.toLowerCase())>-1) 
                || 
                (name!='' && x.name.toLowerCase().indexOf(name.toLowerCase())>-1)
            );

        this.productCatalogListChanged.emit(searchResult);
    }
 

    private handleError(errorRes: HttpErrorResponse) {
         
        var list:any[] = [
            errorRes.error.Errors,
            errorRes.error.errors,
            errorRes.error]

        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            if(typeof element === 'string')
            {
                return throwError(element);
            }

            if(Array.isArray(element)){
                var typeOfArrayElement = typeof element[0];
                if(typeOfArrayElement === 'string'){
                    return throwError([element]);
                }
            }
        }

        return throwError(['An unknown error occurred!']);
    }

}