import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './services/product.service';
import { AppBreadcrumbService } from 'test/src/app/app-breadcrumb/app-breadcrumb.service';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Product } from './Models/product';
import { Category } from '../category/Models/category';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoryService } from '../category/services/category.service';
import { UploadEvent } from './Models/upload';
import { Table } from 'primeng/table';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit,OnDestroy {

  products: Product[] = [];

  product: Product = {}

  categories: Category[] = []

  productDialoge = false;

  submitted: boolean = false;

  viewFlag: boolean = false;

  deleteProductDialog: boolean = false;

  productSub : Subscription

  categorySub : Subscription

  uploadedFile : File


  @ViewChild('productForm', { static: false }) productForm!: NgForm;


  constructor(private categoryService: CategoryService,private productService: ProductService,
     private breadcrumbService: AppBreadcrumbService, private messageService: MessageService,
      private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Favourit' },
      { label: 'Product' }
    ]);
  }
  ngOnDestroy(): void {
    this.productSub.unsubscribe();
    this.categorySub.unsubscribe();
  }

  ngOnInit(): void {
    this.productSub = this.productService.getProducts().subscribe(products => {
      this.products = products;
    });


    this.categorySub = this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }


  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialoge = true;
    this.viewFlag = false;
  }

  hideDialog() {
    this.productDialoge = false;
    this.submitted = false;
  }


  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialoge = true;
    this.viewFlag = false;
  }

  viewProduct(product: Product) {
    this.product = { ...product };
    this.productDialoge = true;
    this.viewFlag = true;
  }

  deleteProduct(product: Product) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }

  onBasicUploadAuto(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File ' + event.files[0].name +  ' Uploaded' });
    this.uploadedFile = event.files[0];
  }

  saveProduct() {
    this.submitted = true;
    if (this.product.id) {

      const productData: Product = {
        id: this.product.id,
        title: this.product.title,
        description: this.product.description,
        isbn: this.product.isbn,
        author: this.product.author,
        listPrice: this.product.listPrice,
        price: this.product.price,
        price50: this.product.price50,
        price100: this.product.price100,
        categoryId: this.product.category.id,
        category: this.product.category,
        imageUrl : this.product.imageUrl
      }
      const formData = new FormData();
      formData.append('file', this.uploadedFile);
      for (const key of Object.keys(productData)) {
        formData.append(key, productData[key]);
      }

      this.productService.updateProduct(formData).subscribe(
        response => {
          this.productService.getProducts().subscribe(products => {
            this.products = products;
            this.productDialoge = false;
            this.product = {};
            this.productForm.resetForm();
            this.uploadedFile = null;

          });
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Could not be Updated', life: 3000 });
        }
      );

    } else {
      const productData: Product = {
        id: 0,
        title: this.product.title,
        description: this.product.description,
        isbn: this.product.isbn,
        author: this.product.author,
        listPrice: this.product.listPrice,
        price: this.product.price,
        price50: this.product.price50,
        price100: this.product.price100,
        categoryId: this.product.category.id,
        category: this.product.category,
      }
      const formData = new FormData();
      formData.append('file', this.uploadedFile);
      for (const key of Object.keys(productData)) {
        formData.append(key, productData[key]);
      }

      this.productService.createProduct(formData).subscribe(
        response => {
          this.productService.getProducts().subscribe(products => {
            this.products = products;
            this.productDialoge = false;
            this.product = {};
            this.productForm.resetForm();
            this.uploadedFile = null;
          });
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Could not be created', life: 3000 });
        }
      );
    }
    
  }

  confirmDelete() {
    this.productService.deleteProduct(this.product.id).subscribe(response => {
      this.productService.getProducts().subscribe(products => {
        this.products = products;
        this.deleteProductDialog = false;
        this.product = {};
      });
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Could not be Deleted', life: 3000 });
    });
}


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
