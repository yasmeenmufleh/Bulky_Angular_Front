import { ShoppingCart } from "../../home/models/shopping-cart";

export interface ShoppingCartVM {
    shoppingCartList?: ShoppingCart[];
    orderTotal?: number;
}