import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ProductCatalogListComponent } from './product-catalog-list/product-catalog-list.component';
import { ProductCatalogDetailComponent } from './product-catalog-detail/product-catalog-detail.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/productcatalogs', pathMatch: 'full' },
  { path: 'productcatalogs',component:ProductCatalogListComponent },
  { path: 'productcatalogcreate',component:ProductCatalogDetailComponent },
  { path: 'productcatalogdetail/:id',component:ProductCatalogDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
