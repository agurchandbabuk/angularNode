import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { TransactionComponent } from './transaction/transaction.component';
import { PasswordComponent } from './password/password.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: AuthComponent},
  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  {path: 'transaction', canActivate: [AuthGuard], component: TransactionComponent},
  {path: 'changepassword', canActivate: [AuthGuard], component: PasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
