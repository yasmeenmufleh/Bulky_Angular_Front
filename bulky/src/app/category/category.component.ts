import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Category } from '../Models/category';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories : Category[] = [];

  category : Category = {}

  constructor(private categoryService : CategoryService){}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
