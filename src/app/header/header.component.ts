import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductCatalogService } from '../services/product-catalog.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private productCatalogService:ProductCatalogService) { }

  ngOnInit() {
  }

  onNewClick(){
    this.router.navigate(['/productcatalogcreate']);
  }

  onRefresh(){
    this.productCatalogService.refreshProductCatalogData();
  }

  onExport(){
    this.productCatalogService.exportToExcelProductCatalogProducts();
  }

}
