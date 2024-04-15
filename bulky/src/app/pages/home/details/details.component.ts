import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppBreadcrumbService } from 'src/app/appBreadcrumb/app.breadcrumb.service';
import { Product } from '../../product/Models/product';
import { HomeService } from '../services/home.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { flexibleCompare } from '@fullcalendar/core/internal';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  product: Product = {};
  productSubscription: Subscription;
  count: number = 0; 
  invalid : boolean = false;
  isLoggedInFlag : boolean;

  isLoggedIn : Subscription;

  constructor(private homeService: HomeService,private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService,private router: Router,private authService : AuthService) {
    this.breadcrumbService.setItems([
      { label: 'Favourit' },
      { label: 'Home' }
    ]);
   }

  ngOnInit(): void {
    this.productSubscription = this.homeService.getProductSubject().subscribe(product => {
      this.product = product;
      console.log(product);
      if(!product || Object.keys(product).length === 0){
        this.router.navigate(['/']);
      }
    });

    this.isLoggedIn = this.authService.isLoggedIn.subscribe(flag => {
      this.isLoggedInFlag = flag;
  });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }


  addToCart(){
    if(this.isLoggedInFlag){
      if(this.count > 0){

        const cartData : ShoppingCart = {
          productId : this.product.id,
          count : this.count,
          applicationUserId : '2'
        }
  
        this.homeService.addToCart(cartData).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cart Updated Successfully', life: 3000 });
          
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);      },
        error => {
          console.log('add to cart error : ' + JSON.stringify(error));
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category Could not be Deleted', life: 3000 });
        });
  
        this.invalid = false;
      }else{
        this.invalid = true;
      }
    }else{
      this.router.navigate(['/auth']);
    }
  }


  goToHome(){
    this.router.navigate(['/']);
  }

}
