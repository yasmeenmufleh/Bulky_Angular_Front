import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Category } from './Models/category';
import { CategoryService } from './services/category.service';
import { AppBreadcrumbService } from 'src/app/appBreadcrumb/app.breadcrumb.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit,OnDestroy {

  categories: Category[] = [];

  category: Category = {}

  categoryDialoge = false;

  submitted: boolean = false;

  viewFlag: boolean = false;
  
  deleteCategoryDialog: boolean = false;

  categorySub : Subscription


  constructor(private categoryService: CategoryService, private breadcrumbService: AppBreadcrumbService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Favourit' },
      { label: 'Category' }
    ]);
  }
  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  ngOnInit(): void {
    this.categorySub = this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }


  openNew() {
    this.category = {};
    this.submitted = false;
    this.categoryDialoge = true;
    this.viewFlag = false;
  }

  hideDialog() {
    this.categoryDialoge = false;
    this.submitted = false;
  }


  editCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialoge = true;
    this.viewFlag = false;
  }

  viewCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialoge = true;
    this.viewFlag = true;
  }

  deleteCategory(category: Category) {
    this.deleteCategoryDialog = true;
    this.category = { ...category };
}

  saveCategory() {
    this.submitted = true;

    if (this.category.name?.trim()) {
      if (this.category.id) {

        const categoryData: Category = {
          id: this.category.id,
          name: this.category.name,
          displayOrder: this.category.displayOrder
        }

        this.categoryService.updateCategory(categoryData).subscribe(
          response => {
            this.categoryService.getCategories().subscribe(categories => {
              this.categories = categories;
              this.categoryDialoge = false;
              this.category = {};
            });
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category Could not be Updated', life: 3000 });
          }
        );

      } else {

        const categoryData: Category = {
          name: this.category.name,
          displayOrder: this.category.displayOrder
        }

        this.categoryService.createCategory(categoryData).subscribe(
          response => {
            this.categoryService.getCategories().subscribe(categories => {
              this.categories = categories;
              this.categoryDialoge = false;
              this.category = {};
            });
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category Could not be created', life: 3000 });
          }
        );
      }



    }
  }

  confirmDelete() {
    this.deleteCategoryDialog = false;
    this.categoryService.deleteCategory(this.category.id).subscribe(response => {
      this.categoryService.getCategories().subscribe(categories => {
        this.categories = categories;
        this.categoryDialoge = false;
        this.category = {};
      });
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });

    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category Could not be Deleted', life: 3000 });
    });
}


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
