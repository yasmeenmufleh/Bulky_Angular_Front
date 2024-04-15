import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppBreadcrumbService } from 'src/app/appBreadcrumb/app.breadcrumb.service';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {

  constructor(private shoppingCartService: ShoppingCartService, private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService, private router: Router) {
    this.breadcrumbService.setItems([
      { label: 'Favourit' },
      { label: 'Order Summary' }
    ]);
  }


  goBack(){
    this.router.navigate(['/shoppingCart']);
  }

}
