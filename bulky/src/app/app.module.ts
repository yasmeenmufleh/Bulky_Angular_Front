import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {GalleriaModule} from 'primeng/galleria';
import {ImageModule} from 'primeng/image';
import {InplaceModule} from 'primeng/inplace';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KnobModule} from 'primeng/knob';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from 'primeng/tag';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {FullCalendarModule} from '@fullcalendar/angular';

import {AppCodeModule} from './blocks/app-code/app.code.component';

import {BlockViewer} from './blocks/blockviewer/blockviewer.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';

import {CountryService} from './demo/service/countryservice';
import {CustomerService} from './demo/service/customerservice';
import {EventService} from './demo/service/eventservice';
import {IconService} from './demo/service/iconservice';
import {NodeService} from './demo/service/nodeservice';
import {PhotoService} from './demo/service/photoservice';
import {ProductService} from './demo/service/productservice';
import {ConfigService} from './demo/service/app.config.service';
import { AppRoutingModule } from './appRouting/app-routing.module';
import { AppMenuComponent } from './AppMenu/app.menu.component';
import { MenuService } from './AppMenu/app.menu.service';
import { AppComponent } from './app.component';
import { AppBreadcrumbComponent } from './appBreadcrumb/app.breadcrumb.component';
import { AppBreadcrumbService } from './appBreadcrumb/app.breadcrumb.service';
import { AppConfigComponent } from './appConfig/app.config.component';
import { AppFooterComponent } from './appFooter/app.footer.component';
import { AppMenuitemComponent } from './appMenuitem/app.menuitem.component';
import { AppRightPanelComponent } from './appRightPanel/app.rightpanel.component';
import { AppTopBarComponent } from './appTopBar/app.topbar.component';
import { DocumentationComponent } from './demo/view/Documentation/documentation.component';
import { FileDemoComponent } from './demo/view/FileDemo/filedemo.component';
import { FormLayoutDemoComponent } from './demo/view/FormLayoutDemo/formlayoutdemo.component';
import { ListDemoComponent } from './demo/view/ListDemo/listdemo.component';
import { ButtonDemoComponent } from './demo/view/bButtonDemo/buttondemo.component';
import { ChartsDemoComponent } from './demo/view/chartsDemo/chartsdemo.component';
import { DashboardDemoComponent } from './demo/view/dashboardDemo/dashboarddemo.component';
import { EmptyDemoComponent } from './demo/view/emptyDemo/emptydemo.component';
import { FloatLabelDemoComponent } from './demo/view/floatLabelDemo/floatlabeldemo.component';
import { InputDemoComponent } from './demo/view/inputDemo/inputdemo.component';
import { InvalidStateDemoComponent } from './demo/view/invalidStateDemo/invalidstatedemo.component';
import { MediaDemoComponent } from './demo/view/mediaDemo/mediademo.component';
import { MenusComponent } from './demo/view/menus/menu/menus.component';
import { MessagesDemoComponent } from './demo/view/messagesDemo/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscDemo/miscdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysDemo/overlaysdemo.component';
import { PanelsDemoComponent } from './demo/view/panelsDemo/panelsdemo.component';
import { TableDemoComponent } from './demo/view/tableDemo/tabledemo.component';
import { TreeDemoComponent } from './demo/view/treeDemo/treedemo.component';
import { AppMainComponent } from './main/app.main.component';
import { AppAccessdeniedComponent } from './pages/appAccessdenied/app.accessdenied.component';
import { AppCalendarComponent } from './pages/appCalendar/app.calendar.component';
import { AppCrudComponent } from './pages/appCrud/app.crud.component';
import { AppErrorComponent } from './pages/appError/app.error.component';
import { AppHelpComponent } from './pages/appHelp/app.help.component';
import { AppInvoiceComponent } from './pages/appInvoice/app.invoice.component';
import { AppLoginComponent } from './pages/appLogin/app.login.component';
import { AppNotfoundComponent } from './pages/appNotfound/app.notfound.component';
import { AppTimelineDemoComponent } from './pages/appTimelineDemo/app.timelinedemo.component';
import { IconsComponent } from './utilities/icons.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/home/details/details.component';
import { AuthComponent } from './auth/auth.component';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarGroupModule,
        AvatarModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipModule,
        ChipsModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FullCalendarModule,
        FileUploadModule,
        GalleriaModule,
        ImageModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        AppCodeModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppRightPanelComponent,
        AppBreadcrumbComponent,
        AppTopBarComponent,
        AppFooterComponent,
        DashboardDemoComponent,
        FormLayoutDemoComponent,
        FloatLabelDemoComponent,
        InvalidStateDemoComponent,
        InputDemoComponent,
        ButtonDemoComponent,
        TableDemoComponent,
        ListDemoComponent,
        TreeDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MediaDemoComponent,
        MenusComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        DocumentationComponent,
        IconsComponent,
        AppCrudComponent,
        AppCalendarComponent,
        AppTimelineDemoComponent,
        AppLoginComponent,
        AppInvoiceComponent,
        AppHelpComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        BlocksComponent,
        BlockViewer,
        CategoryComponent,
        ProductComponent,
        HomeComponent,
        DetailsComponent,
        AuthComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MenuService, AppBreadcrumbService, ConfigService,
        MessageService, ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
