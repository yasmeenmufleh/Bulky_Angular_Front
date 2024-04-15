import {Component, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './auth/service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

    topbarTheme = 'light';

    menuTheme = 'dim';

    layoutMode = 'light';

    menuMode = 'static';

    isRTL = false;

    inputStyle = 'outlined';

    ripple: boolean;

    constructor(private primengConfig: PrimeNGConfig,private authService: AuthService) {}

    ngOnInit() {
        this.authService.autoLogin();
        this.primengConfig.ripple = true;
    }
}
