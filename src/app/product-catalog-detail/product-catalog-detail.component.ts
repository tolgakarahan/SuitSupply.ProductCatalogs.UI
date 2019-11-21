import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ProductCatalog } from '../models/product-catalog.model';
import { ProductCatalogService } from '../services/product-catalog.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-catalog-detail',
  templateUrl: './product-catalog-detail.component.html',
  styleUrls: ['./product-catalog-detail.component.css']
})
export class ProductCatalogDetailComponent implements OnInit, OnDestroy {
  
  

  id: number;
  editMode: boolean = false;
  productCatalogForm: FormGroup;
  messages: string[];
  isLoading = false;
  productCatalog: ProductCatalog;
  isConfirmationAlert: boolean = false;
  confirmingOperation: string = '';

  activeRouteSub: Subscription;
  getProductCatalogSub: Subscription;
  updateProductCatalogSub: Subscription;
  createProductCatalogSub: Subscription;
  deleteProductCatalogSub: Subscription

  constructor(private productCatalogService: ProductCatalogService, private router:Router, private activeRoute: ActivatedRoute) { }

  ngOnDestroy(): void {
    if(this.activeRouteSub)
      this.activeRouteSub.unsubscribe();
    if(this.getProductCatalogSub)
      this.getProductCatalogSub.unsubscribe();
    if(this.updateProductCatalogSub)
      this.updateProductCatalogSub.unsubscribe();
    if(this.createProductCatalogSub)
      this.createProductCatalogSub.unsubscribe();
    if(this.deleteProductCatalogSub)
    this.deleteProductCatalogSub.unsubscribe();
  }

  //Init Operations ↓↓↓
  ngOnInit() {

   this.activeRouteSub =  this.activeRoute.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    
  }

  private initForm(){

    this.productCatalogForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'code': new FormControl('', Validators.required),
      'price': new FormControl(0, Validators.required),
      'photo': new FormControl('')
    });

    if(this.editMode){
      this.isLoading = true;
      this.getProductCatalogSub = this.productCatalogService.getProductCatalog(this.id).subscribe(
        (x) => {

          this.previousPriceValue = x.price+'';

          this.productCatalogForm.setValue({
            'name':x.name,
            'code':x.code,
            'price':x.price,
            'photo':x.photo
          });
        },
        (error)=>{
            this.isLoading= false;
            this.messages = error;
        },
        ()=>{
          this.isLoading= false;
        }
      );
    }
  }
//Init Operations ↑↑↑
   
//Service Operations ↓↓↓

  onSubmitStart(){

    const price = +this.productCatalogForm.value['price'];
    if(price > 999){
      this.isConfirmationAlert = true;
      this.messages = ["The price is more than '999'. Whould you like to continue?"]
      this.confirmingOperation = 'Upsert';
    }
    else{
      this.isConfirmationAlert = false;
      this.messages = null;
      this.confirmingOperation = '';
      this.onSubmit();
    }
    
  }

  onSubmit(){

    this.isLoading = true;

    const code =this.productCatalogForm.value['code'];
    const name = this.productCatalogForm.value['name'];
    const photo = this.productCatalogForm.value['photo'];
    const price = +this.productCatalogForm.value['price'];

    if(this.editMode){
      this.updateProductCatalogSub = this.productCatalogService.updateProductCatalog(
        this.id, code, name, photo, price
      ).subscribe(
        (x)=>x,
        (error)=>{
          this.isLoading = false;
          this.messages = error;
        },
        ()=>{
          this.isLoading = false;
          this.navigateParent();
        }
      );
    }
    else{
     this.createProductCatalogSub = this.productCatalogService.createProductCatalog(
        code,name,photo,price
      ).subscribe(
        (x)=>x,
        (error)=>{
          this.isLoading = false;
          this.messages = error;
        },
        ()=>{
          this.isLoading = false;
          this.navigateParent();
        }
      );
    }
      
  }

  onDeleteStart(){
    this.isConfirmationAlert = true;
    this.messages = ['Are you sure to delete this Product Catalog?']
    this.confirmingOperation = 'Delete';
  }

  onDelete(){
    this.isLoading = true;
   this.deleteProductCatalogSub = this.productCatalogService.deleteProductCatalog(
      this.id
    ).subscribe(
      (x)=>x,
      (error)=>{
        this.isLoading = false;
        this.messages = error;
      },
      ()=>{
        this.isLoading = false;
        this.navigateParent();
      }
    );
  }
//Service Operations ↑↑↑

//Validation Operations ↓↓↓
previousPriceValue :string='';
priceValueChanged(newValue:string){
  if(newValue===''){
    this.previousPriceValue ='';
    return;
  }
  if(this.previousPriceValue === newValue){
    return;
  }
  const control = this.productCatalogForm.controls['price'];
  const value = control.value;
  const regex = new RegExp(/^\d+(\.\d{0,8})?$/);
  const result = regex.test(value);
  if(!result){
  
    control.setValue(this.previousPriceValue);
    return;
  }
  this.previousPriceValue = newValue;
}

priceValueChangeCompleted(){
  const control = this.productCatalogForm.controls['price'];
  if(+control.value === 0){
    control.setValue('');
  }
}


requiredValueChanged(controllerName:string){
  var control = this.productCatalogForm.controls[controllerName];
  var value = control.value+'';
  if(value===''){
    return;
  }
  if(value.trim() === ''){
    control.setValue('');
  }    
}
//Validation Operations ↑↑↑


  onCancel(){
    this.navigateParent();
  }

  navigateParent(){
    this.router.navigate(['']);
  }

  onAlertClosed(){
    this.messages = null;
  }

  onConfirmed(){
    if(this.confirmingOperation==='Delete'){
      this.onDelete();
    }
    else{
      this.onSubmit();
    }
  }

  onCanceled(){
    this.isConfirmationAlert = false;
    this.messages = null;
    this.confirmingOperation = '';
  }

}
