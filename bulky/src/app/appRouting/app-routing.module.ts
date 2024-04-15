import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from '../demo/view/dashboardDemo/dashboarddemo.component';
import {FormLayoutDemoComponent} from '../demo/view/FormLayoutDemo/formlayoutdemo.component';
import {FloatLabelDemoComponent} from '../demo/view/floatLabelDemo/floatlabeldemo.component';
import {InvalidStateDemoComponent} from '../demo/view/invalidStateDemo/invalidstatedemo.component';
import {PanelsDemoComponent} from '../demo/view/panelsDemo/panelsdemo.component';
import {OverlaysDemoComponent} from '../demo/view/overlaysDemo/overlaysdemo.component';
import {MediaDemoComponent} from '../demo/view/mediaDemo/mediademo.component';
import {MessagesDemoComponent} from '../demo/view/messagesDemo/messagesdemo.component';
import {MiscDemoComponent} from '../demo/view/miscDemo/miscdemo.component';
import {EmptyDemoComponent} from '../demo/view/emptyDemo/emptydemo.component';
import {ChartsDemoComponent} from '../demo/view/chartsDemo/chartsdemo.component';
import {FileDemoComponent} from '../demo/view/FileDemo/filedemo.component';
import {DocumentationComponent} from '../demo/view/Documentation/documentation.component';
import {AppMainComponent} from '../main/app.main.component';
import {AppNotfoundComponent} from '../pages/appNotfound/app.notfound.component';
import {AppErrorComponent} from '../pages/appError/app.error.component';
import {AppAccessdeniedComponent} from '../pages/appAccessdenied/app.accessdenied.component';
import {AppLoginComponent} from '../pages/appLogin/app.login.component';
import {InputDemoComponent} from '../demo/view/inputDemo/inputdemo.component';
import {ButtonDemoComponent} from '../demo/view/bButtonDemo/buttondemo.component';
import {TableDemoComponent} from '../demo/view/tableDemo/tabledemo.component';
import {ListDemoComponent} from '../demo/view/ListDemo/listdemo.component';
import {TreeDemoComponent} from '../demo/view/treeDemo/treedemo.component';
import {IconsComponent} from '../utilities/icons.component';
import {AppCrudComponent} from '../pages/appCrud/app.crud.component';
import {AppCalendarComponent} from '../pages/appCalendar/app.calendar.component';
import {AppTimelineDemoComponent} from '../pages/appTimelineDemo/app.timelinedemo.component';
import {AppInvoiceComponent} from '../pages/appInvoice/app.invoice.component';
import {AppHelpComponent} from '../pages/appHelp/app.help.component';
import {BlocksComponent} from '../blocks/blocks/blocks.component';
import { CategoryComponent } from '../pages/category/category.component';
import { ProductComponent } from '../pages/product/product.component';
import { HomeComponent } from '../pages/home/home.component';
import { DetailsComponent } from '../pages/home/details/details.component';
import { AuthComponent } from '../auth/auth.component';
import { AuthGuardService } from '../auth/service/auth-guard.service';
import { CompanyComponent } from '../pages/company/company.component';
import { ShoppingCartComponent } from '../pages/shopping-cart/shopping-cart.component';
import { OrderSummaryComponent } from '../pages/shopping-cart/order-summary/order-summary.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: HomeComponent},
                    {path: 'Dashboard', component: DashboardDemoComponent},
                    {path: 'category', component: CategoryComponent,canActivate : [AuthGuardService]},
                    {path: 'product', component: ProductComponent,canActivate : [AuthGuardService]},
                    {path: 'productDetails', component: DetailsComponent},
                    {path: 'Company', component: CompanyComponent,canActivate : [AuthGuardService]},
                    {path: 'shoppingCart', component: ShoppingCartComponent,canActivate : [AuthGuardService]},
                    {path: 'orderSummary', component: OrderSummaryComponent,canActivate : [AuthGuardService]},
                    {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/menu', loadChildren: () => import('../demo/view/menus/menu/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/charts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'blocks', component: BlocksComponent},
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: 'auth', component: AuthComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
