import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from './service/auth.service';
import { Register } from './models/register';
import { Role } from './models/role';
import { Login } from './models/login';
import { CompanyService } from '../pages/company/services/company.service';
import { Company } from '../pages/company/models/company';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit,OnDestroy {

  isLogin : boolean = true;

  confirmPassword : string;
  passwordInvalid: boolean = false;
  passwordTouched: boolean = false;
  passwordEntered: boolean = false;
  confirmPasswordTouched: boolean = false;
  confirmPasswordEntered: boolean = false;

  roles : Role[] = [];

  companies: Company[] = [];


  selectedRole : Role;

  slectedCompany : Company;

  loginUser : Login = {}

  registerUser : Register = {} ;

  loginFlagSubscription : Subscription;

  rolesSubscription : Subscription;

  companySub: Subscription


  constructor(private authService : AuthService,private router : Router,private messageService : MessageService,
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.loginFlagSubscription = this.authService.getLoginFlagSubject().subscribe(flag => {
      this.isLogin = flag;
    });

    this.rolesSubscription = this.authService.getRoles().subscribe(roles => {
      this.roles = roles;
    });

    this.companySub = this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
      console.log(companies);
    });

  }

  ngOnDestroy(): void {
    this.loginFlagSubscription.unsubscribe();
    this.rolesSubscription.unsubscribe();
    this.companySub.unsubscribe();
  }


  register(){
    this.registerUser.role = this.selectedRole.name;
    this.registerUser.name = this.registerUser.username;
    if (this.slectedCompany) {
      this.registerUser.CompanyId = this.slectedCompany.id;
    }

    this.authService.registerUser(this.registerUser).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'User Registered Successfully', life: 3000 });
        this.router.navigate(['/']);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Could Not be Registered', life: 3000 });
      }
    );
  }

  login(){
    this.authService.login(this.loginUser).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'User Logged In Successfully', life: 3000 });
        this.router.navigate(['/']);
        
      },
      (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Could Not be Logged in ,\n Please Check the username or password', life: 6000 });
      }
    );
  }




checkPassword() {
    this.passwordEntered = true;
    this.passwordInvalid = !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(this.registerUser.password);
}

checkConfirmPassword() {
    this.confirmPasswordEntered = true;
}


}
