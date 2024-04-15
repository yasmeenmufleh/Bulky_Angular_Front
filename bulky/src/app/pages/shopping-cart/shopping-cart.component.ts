import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from './service/shopping-cart.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppBreadcrumbService } from 'src/app/appBreadcrumb/app.breadcrumb.service';
import { ShoppingCartVM } from './models/shopping-carts';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../home/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {


  cartOrders: ShoppingCartVM = {}
  shoppingCartSubscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService, private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService, private router: Router) {
    this.breadcrumbService.setItems([
      { label: 'Favourit' },
      { label: 'Shopping Cart' }
    ]);
  }
  ngOnInit(): void {
    this.shoppingCartSubscription = this.shoppingCartService.getCartOrders().subscribe(cartOrders => {
      this.cartOrders = cartOrders;
    });
  }
  ngOnDestroy(): void {
    this.shoppingCartSubscription.unsubscribe();
  }


  plus(cartItem: ShoppingCart) {
    this.shoppingCartService.plus(cartItem.id).subscribe(response => {
      this.shoppingCartService.getCartOrders().subscribe(cartOrders => {
        this.cartOrders = cartOrders;
      });
      //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'OOPS !!,Something happend ' + error, life: 3000 });
      });
  }

  minus(cartItem: ShoppingCart) {
    this.shoppingCartService.minus(cartItem.id).subscribe(response => {
      this.shoppingCartService.getCartOrders().subscribe(cartOrders => {
        this.cartOrders = cartOrders;
      });
      //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'OOPS !!,Something happend ' + error, life: 3000 });
      });
  }


  deleteCartItem(cartItem: ShoppingCart) {
    this.shoppingCartService.deleteCartItem(cartItem.id).subscribe(response => {
      this.shoppingCartService.getCartOrders().subscribe(cartOrders => {
        this.cartOrders = cartOrders;
      });
      //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'OOPS !!,Something happend ' + error, life: 3000 });
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  summary(){
    this.router.navigate(['/orderSummary'])
  }

}
