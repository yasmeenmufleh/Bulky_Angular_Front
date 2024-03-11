import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MenubarModule,
    ToastModule,
    TableModule,
    ButtonModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
