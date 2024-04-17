// Angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Angular Material modules
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

// Third-party modules
import { ToastrModule } from 'ngx-toastr';

// App components and modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from 'src/material.module';
import { TokenInterceptorInterceptor } from './service/token-interceptor.interceptor';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UpdateComponent } from './update/update.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { ChartModule } from 'angular-highcharts'
import { HighchartsChartModule } from 'highcharts-angular';
import { OtpComponent } from './otp/otp.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserDashboardComponent,
    UserlistComponent,
    UpdateComponent,
    ConfirmationDialogComponent,
    AddFoodComponent,
    OtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MaterialModule,
    ChartModule,
    HighchartsChartModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
