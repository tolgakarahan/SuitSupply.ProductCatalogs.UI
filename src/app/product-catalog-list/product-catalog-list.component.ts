import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductCatalogService } from '../services/product-catalog.service';
import { ProductCatalog } from '../models/product-catalog.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-product-catalog-list',
  templateUrl: './product-catalog-list.component.html',
  styleUrls: ['./product-catalog-list.component.css']
})
export class ProductCatalogListComponent implements OnInit, OnDestroy {


  productCatalogList: ProductCatalog[] = [];
  isLoading:boolean;
  messages:string;

  getProductCatalogsSub:Subscription
  productCatalogListChangedSub:Subscription;
  
  constructor(private productCatalogService: ProductCatalogService, private router:Router, private activeRoute: ActivatedRoute) {

  }

  ngOnDestroy(): void {
    if(this.getProductCatalogsSub)
      this.getProductCatalogsSub.unsubscribe();
    if(this.productCatalogListChangedSub)
      this.productCatalogListChangedSub.unsubscribe();
  }

  ngOnInit() {
    this.isLoading = true;
   this.getProductCatalogsSub= this.productCatalogService.getProductCatalogs().subscribe(x=>{
      this.productCatalogList = x;
      this.isLoading = false;
    },
    (error)=>{
      this.isLoading = false;
      this.messages = error;
    },
    ()=>{
      this.isLoading = false;
    });

   this.productCatalogListChangedSub = this.productCatalogService.productCatalogListChanged.subscribe((x)=>{
      this.productCatalogList = x;
      this.isLoading = false;
    })
  }

  onProductCatalogClick(id: number){
    this.router.navigate(['/productcatalogdetail', id]);
  }

  onAlertClosed(){
    this.messages = null;
  }

}
