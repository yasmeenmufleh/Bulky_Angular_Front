import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppBreadcrumbService } from 'src/app/appBreadcrumb/app.breadcrumb.service';
import { Product } from '../../product/Models/product';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  product: Product = {};
  productSubscription: Subscription;
  count: any 

  constructor(private homeService: HomeService,private breadcrumbService: AppBreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Favourit' },
      { label: 'Home' }
    ]);
   }

  ngOnInit(): void {
    this.productSubscription = this.homeService.getProductSubject().subscribe(product => {
      this.product = product;
      console.log(product);
    });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }


  addToCart(){

  }


  goToHome(){

  }

  onSubmit(){

  }

}
