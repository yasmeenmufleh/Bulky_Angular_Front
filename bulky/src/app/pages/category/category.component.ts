import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Category } from './Model/category';
import { CategoryService } from './services/category.service';
import { AppBreadcrumbService } from 'src/app/appBreadcrumb/app.breadcrumb.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];

  category: Category = {}

  createDialoge = false;

  submitted: boolean = false;


  constructor(private categoryService: CategoryService, private breadcrumbService: AppBreadcrumbService,private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Favourit' },
      { label: 'Category' }
    ]);
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }


  openNew() {
    this.category = {};
    this.submitted = false;
    this.createDialoge = true;
}

hideDialog() {
  this.createDialoge = false;
  this.submitted = false;
}

saveCategory() {
  this.submitted = true;

  if (this.category.name?.trim()) {
      if (this.category.id) {
          // @ts-ignore
          // this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
          // this.products[this.findIndexById(this.product.id)] = this.product;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {

         const categoryData : Category = {
          name : this.category.name,
          displayOrder : this.category.displayOrder
         }

          this.categoryService.createCategory(categoryData).subscribe(
            response => {
              this.categoryService.getCategories().subscribe(categories => {
                this.categories = categories;
                this.createDialoge = false;
              this.category = {};
              });  
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Could not be created', life: 3000 });
            }
          );
      }

          
      
  }
}

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
