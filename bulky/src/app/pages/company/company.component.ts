import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppBreadcrumbService } from 'src/app/appBreadcrumb/app.breadcrumb.service';
import { Company } from './models/company';
import { CompanyService } from './services/company.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {

  companies: Company[] = [];

  company: Company = {}

  companyDialoge = false;

  submitted: boolean = false;

  viewFlag: boolean = false;

  deletecompanyDialog: boolean = false;

  companySub: Subscription

  constructor(private companyService: CompanyService, private breadcrumbService: AppBreadcrumbService,
    private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Favourit' },
      { label: 'Company' }
    ]);
  }
  ngOnInit(): void {
    this.companySub = this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
      console.log(companies);
    });
  }

  ngOnDestroy(): void {
    this.companySub.unsubscribe();
  }

  openNew() {
    this.company = {};
    this.submitted = false;
    this.companyDialoge = true;
    this.viewFlag = false;
  }

  hideDialog() {
    this.companyDialoge = false;
    this.submitted = false;
  }


  editcompany(company: Company) {
    this.company = { ...company };
    this.companyDialoge = true;
    this.viewFlag = false;
  }

  viewcompany(company: Company) {
    this.company = { ...company };
    this.companyDialoge = true;
    this.viewFlag = true;
  }

  deletecompany(company: Company) {
    this.deletecompanyDialog = true;
    this.company = { ...company };
  }

  savecompany() {
    this.submitted = true;

    if (this.company.name?.trim()) {
      if (this.company.id) {

        const companyData: Company = {
          id: this.company.id,
          name: this.company.name,
          streetAddress: this.company.streetAddress,
          city: this.company.city,
          state: this.company.state,
          postalCode: this.company.postalCode,
          phoneNumber: this.company.phoneNumber
        }

        this.companyService.updateCompany(companyData).subscribe(
          response => {
            this.companyService.getCompanies().subscribe(companies => {
              this.companies = companies;
              this.companyDialoge = false;
              this.company = {};
            });
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'company Updated', life: 3000 });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'company Could not be Updated', life: 3000 });
          }
        );

      } else {

        const companyData: Company = {
          name: this.company.name,
          streetAddress: this.company.streetAddress,
          city: this.company.city,
          state: this.company.state,
          postalCode: this.company.postalCode,
          phoneNumber: this.company.phoneNumber
        }

        this.companyService.createCompany(companyData).subscribe(
          response => {
            this.companyService.getCompanies().subscribe(companies => {
              this.companies = companies;
              this.companyDialoge = false;
              this.company = {};
            });
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'company Created', life: 3000 });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'company Could not be created', life: 3000 });
          }
        );
      }



    }
  }

  confirmDelete() {
    this.deletecompanyDialog = false;
    this.companyService.deleteCompany(this.company.id).subscribe(response => {
      this.companyService.getCompanies().subscribe(companies => {
        this.companies = companies;
        this.companyDialoge = false;
        this.company = {};
      });
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'company Deleted', life: 3000 });

    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'company Could not be Deleted', life: 3000 });
      });
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
