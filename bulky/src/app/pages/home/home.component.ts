import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AppBreadcrumbService } from 'src/app/appBreadcrumb/app.breadcrumb.service';
import { ProductService } from '../product/services/product.service';
import { Product } from '../product/Models/product';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { HomeService } from './services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  cardsPerRow = 3;
  products: Product[] = [];
  productSub: Subscription
  rows: Product[][] = [];


  constructor(private productService: ProductService, private breadcrumbService: AppBreadcrumbService
    , private router: Router, private homeService: HomeService) {
    this.breadcrumbService.setItems([
      { label: 'Favourit' },
      { label: 'Home' }
    ]);
  }


  groupIntoRows(): void {
    this.rows = [];
    for (let i = 0; i < this.products.length; i += this.cardsPerRow) {
      this.rows.push(this.products.slice(i, i + this.cardsPerRow));
    }
  }

  ngOnInit(): void {
    this.productSub = this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.groupIntoRows();
    });
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }


  show(eventName: string) {
    console.log(eventName + " is performed")
  }


  details(product: any): void {
    this.homeService.updateProducts(product);
    this.router.navigate(['productDetails']);
  }

}
