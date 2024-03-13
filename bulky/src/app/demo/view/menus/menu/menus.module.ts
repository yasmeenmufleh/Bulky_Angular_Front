import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PaymentComponent } from '../payment/payment.component';
import { SeatComponent } from '../seat.component';
import { PersonalComponent } from '../personal/personal.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MenusComponent } from './menus.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {path:'',component: MenusComponent, children:[
				{path:'', redirectTo: 'personal', pathMatch: 'full'},
				{path: 'personal', component: PersonalComponent},
				{path: 'confirmation', component: ConfirmationComponent},
				{path: 'seat', component: SeatComponent},
				{path: 'payment', component: PaymentComponent}
        ]}
    ])
  ],
  exports: [RouterModule]
})
export class MenusModule { }
