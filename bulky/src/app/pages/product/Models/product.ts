import { Category } from "../../category/Models/category";

export interface Product {
    id?: number;
    title?: string;
    description?: string;
    isbn?: string;
    author?: string;
    listPrice?: number;
    price?: number;
    price50?: number;
    price100?: number;
    categoryId?: number;
    category?: Category;
    imageUrl?: string;
  }