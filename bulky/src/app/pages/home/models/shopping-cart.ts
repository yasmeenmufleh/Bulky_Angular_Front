import { Product } from "../../product/Models/product";

export interface ShoppingCart {
    id?: number;
    productId?: number;
    product?: Product;
    count?: number;
    applicationUserId?: string;
    price?: number;
}