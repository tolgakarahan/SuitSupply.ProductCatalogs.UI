import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductCatalogListComponent } from './product-catalog-list/product-catalog-list.component';
import { ProductCatalogService } from './services/product-catalog.service';
import { ProductCatalogDetailComponent } from './product-catalog-detail/product-catalog-detail.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { SerchComponent } from './serch/serch.component';
import { ExcelService } from './services/excel.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductCatalogListComponent,
    ProductCatalogDetailComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    SerchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [ProductCatalogService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
