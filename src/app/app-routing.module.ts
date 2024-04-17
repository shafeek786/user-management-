import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { RouteGuardService } from './service/route-guard.service';
import { AuthGuard } from './guard/is-login.guard';
import { UserAuthGuard } from './guard/roleAuth.guard';
import { UserAuthGuards } from './guard/user-auth.guard';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserlistComponent, canActivate: [UserAuthGuard] },
  { path: 'adduser', component: RegisterComponent, canActivate: [UserAuthGuard] },
  { path: 'updateuser', component: RegisterComponent, canActivate: [UserAuthGuard] },
  {
    path: 'userdashboard',
    component: UserDashboardComponent,
    canActivate: [RouteGuardService, UserAuthGuards],  // <-- Corrected spelling here
    data: {
      expectedRole: ['admin', 'user']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
