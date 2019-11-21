import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { ProductCatalogService } from '../services/product-catalog.service';

@Component({
  selector: 'app-serch',
  templateUrl: './serch.component.html',
  styleUrls: ['./serch.component.css']
})
export class SerchComponent implements OnInit {

  code:string;
  name:string;

  constructor(private productCatalogService: ProductCatalogService) { }

  ngOnInit() {
  }

  onSearch(){
    this.productCatalogService.searchProductCatalog(this.code,this.name);
  }

}
